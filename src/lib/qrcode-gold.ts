import QRCode from "qrcode";

const GOLD_DEFS = `
  <defs>
    <linearGradient id="qr-gold" x1="0" y1="0" x2="0" y2="100%" gradientUnits="objectBoundingBox">
      <stop stop-color="#D8C59C"/>
      <stop offset="1" stop-color="#A98E6F"/>
    </linearGradient>
  </defs>
`;

export async function makeGoldQrSvg(text: string) {
	let svg = await QRCode.toString(text, {
		type: "svg",
		errorCorrectionLevel: "M",
		margin: 1,
		color: {
			dark: "#000000",
			light: "#0000", // transparent background
		},
	});

	// Insert gradient defs
	svg = svg.replace(
		/<svg([^>]*)>/,
		(_m, attrs) => `<svg class="qr-gold"${attrs}>
      <defs>
        <linearGradient id="qr-gold" x1="0" y1="0" x2="0" y2="100%" gradientUnits="objectBoundingBox">
          <stop stop-color="#D8C59C"/>
          <stop offset="1" stop-color="#A98E6F"/>
        </linearGradient>
      </defs>`
	);

	// Swap dark modules to gradient
	svg = svg
		.replace(/fill="#000(?:000)?"/gi, 'fill="url(#qr-gold)"')
		.replace(/stroke="#000(?:000)?"/gi, 'stroke="url(#qr-gold)"');

	return svg;
}
