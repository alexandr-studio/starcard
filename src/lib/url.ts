export function formatUrlPath(url: string, { stripLeadingSlash = false } = {}) {
	try {
		const u = new URL(url);
		const out = (u.pathname || "/") + (u.search || "") + (u.hash || "");
		return stripLeadingSlash ? out.replace(/^\//, "") : out;
	} catch {
		return url;
	}
}

export function fmtUrlHostname(url: string) {
	try {
		return new URL(url).hostname;
	} catch {
		return url;
	}
}
