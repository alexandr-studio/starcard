// vcard.ts
export type Profile = {
	firstName: string;
	middleName?: string;
	lastName: string;
	title?: string;
	avatarUrl?: string;
	email?: string;
	phone?: string;
	homePage?: string;
	location?: string; // e.g., "Prague, Czech Republic"
};

type VCardVersion = "3.0" | "4.0";

/** RFC-compliant folding at 75 octets */
function foldLines(v: string): string {
	const bytes = new TextEncoder().encode(v);
	const out: number[] = [];
	const lines: string[] = [];
	const max = 75;
	let lineLen = 0;

	for (let i = 0; i < bytes.length; i++) {
		const b = bytes[i];
		if (lineLen >= max && b !== 10) {
			lines.push(new TextDecoder().decode(new Uint8Array(out)));
			lines.push("\r\n ");
			out.length = 0;
			lineLen = 1;
		}
		out.push(b);
		lineLen++;
	}
	lines.push(new TextDecoder().decode(new Uint8Array(out)));
	return lines.join("");
}

function esc(text: string, version: VCardVersion): string {
	if (!text) return "";
	let t = text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n");
	t = t.replace(/,/g, "\\,").replace(/;/g, "\\;");
	return t;
}

/** Build a vCard string */
export function buildVCard(
	profile: Profile,
	version: VCardVersion = "3.0"
): string {
	const {
		firstName,
		middleName,
		lastName,
		title,
		avatarUrl,
		email,
		phone,
		homePage,
		location,
	} = profile;

	const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

	const lines: string[] = [];
	lines.push("BEGIN:VCARD");
	lines.push(`VERSION:${version}`);

	// N (family;given;additional;prefix;suffix)
	lines.push(
		`N:${esc(lastName, version)};${esc(firstName, version)};${esc(
			middleName || "",
			version
		)};;`
	);
	// FN
	lines.push(`FN:${esc(fullName, version)}`);

	if (title) lines.push(`TITLE:${esc(title, version)}`);

	if (email) {
		if (version === "3.0")
			lines.push(`EMAIL;TYPE=INTERNET:${esc(email, version)}`);
		else lines.push(`EMAIL:${esc(email, version)}`);
	}

	if (phone) {
		if (version === "3.0")
			lines.push(`TEL;TYPE=CELL,VOICE:${esc(phone, version)}`);
		else lines.push(`TEL;TYPE=cell,voice:${esc(phone, version)}`);
	}

	if (avatarUrl) {
		if (version === "3.0")
			lines.push(`PHOTO;VALUE=URI:${esc(avatarUrl, version)}`);
		else lines.push(`PHOTO:${esc(avatarUrl, version)}`);
	}

	if (location) {
		const m = location.split(",").map((s) => s.trim());
		const city = m[0] || "";
		const country = m[1] || "";
		if (version === "3.0") {
			lines.push(
				`ADR;TYPE=HOME:;;;;${esc(city, version)};;${esc(country, version)}`
			);
		} else {
			lines.push(
				`ADR;TYPE=home:;;;;${esc(city, version)};;${esc(country, version)}`
			);
		}
	}

	if (homePage) lines.push(`URL:${esc(homePage, version)}`);

	lines.push("END:VCARD");

	const raw = lines.join("\r\n");
	return foldLines(raw);
}

/** Convenience: make a data URL for download anchors */
export function vcardDataUrl(vcard: string): string {
	return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
}
