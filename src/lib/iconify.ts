export function normalizeToSimpleIconsKey(input?: string): string | null {
	if (!input) return null;
	let key = String(input).trim().toLowerCase();
	if (!key) return null;
	// Common aliases and fixes
	const aliases: Record<string, string> = {
		// twitter → x (Iconify key is 'x')
		twitter: "x",
		twitteroriginal: "x",
		twitterfill: "x",
		x: "x",
		// linkedin
		linkedinoriginal: "linkedin",
		in: "linkedin",
		// youtube
		youtubeoriginal: "youtube",
		yt: "youtube",
		// telegram
		telegramoriginal: "telegram",
		// slack
		slackline: "slack",
		// paypal original → paypal
		paypaloriginal: "paypal",
		// instagram
		instagramoriginal: "instagram",
		ig: "instagram",
		// facebook/meta
		facebookfill: "facebook",
		facebookline: "facebook",
		facebookoval: "facebook",
		fb: "facebook",
		meta2: "meta",
		// tiktok
		tiktokalt: "tiktok",
		// generic mapping examples
		website: "internetexplorer",
	};
	key = aliases[key] || key;
	return key;
}

export function toIconifyNameSimpleIcons(input?: string): string | null {
	const key = normalizeToSimpleIconsKey(input);
	return key ? `simple-icons:${key}` : null;
}
