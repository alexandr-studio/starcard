import QRCode from "qrcode";

export async function makeGoldQrSvg(text: string) {
	// 1) unique per call
	const uid = `qr-${Math.random().toString(36).slice(2)}`;
	const gid = `${uid}-gold`;

	let svg = await QRCode.toString(text, {
		type: "svg",
		errorCorrectionLevel: "M",
		margin: 1,
		color: {
			dark: "#000000", // we'll swap this to gradient
			light: "#0000", // transparent
		},
	});

	// 2) inject gradient defs (and keep attrs, add class safely)
	svg = svg
		.replace(
			/<svg\b([^>]*)>/i,
			(_m, attrs) => `
<svg${attrs} class="qr-gold-svg">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="100%" gradientUnits="objectBoundingBox">
      <stop stop-color="#D8C59C"/>
      <stop offset="1" stop-color="#A98E6F"/>
    </linearGradient>
  </defs>`
		)
		.trim();

	// 3) swap any black fill/stroke to the gradient (handle #000, #000000, black)
	svg = svg.replace(
		/(fill|stroke)=["'](?:#000000|#000|black)["']/gi,
		`$1="url(#${gid})"`
	);

	return svg;
}
