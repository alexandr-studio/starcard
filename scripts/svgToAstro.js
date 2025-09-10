import fs from "fs";
import path from "path";

const freeIconsDir = "./src/components/icons/svg";
const iconsDir = "./src/components/icons/astro";

const svgFiles = fs.readdirSync(freeIconsDir).filter((f) => f.endsWith(".svg"));

svgFiles.forEach((svgFile) => {
	const svgPath = path.join(freeIconsDir, svgFile);
	const svgContent = fs.readFileSync(svgPath, "utf8");

	// Extract viewBox and paths
	const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
	const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

	// Extract paths and replace colors
	let pathsContent = svgContent
		.replace(/<\?xml[^>]*\?>/g, "")
		.replace(/<svg[^>]*>/g, "")
		.replace(/<\/svg>/g, "")
		.replace(/fill="[^"]*"/g, 'fill="currentColor"')
		.replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
		.trim();

	// Component name
	const componentName = svgFile
		.replace(".svg", "")
		.replace(/[-_]/g, "")
		.replace(/^./, (c) => c.toUpperCase());

	// Generate Astro component
	const astroContent = `---
import IconBase from "../IconBase.astro";
export interface Props {
\ttitle?: string;
\tclass?: string;
}
const { title, class: className } = Astro.props;
---

<IconBase title={title} class={className} viewBox="${viewBox}">
\t${pathsContent
		.split("\n")
		.map((line) => "\t" + line)
		.join("\n")}
</IconBase>
`;

	// Write Astro file
	const astroPath = path.join(iconsDir, `${componentName}.astro`);
	fs.writeFileSync(astroPath, astroContent);
	console.log(`✅ Created ${componentName}.astro`);
});

console.log("🎉 All icons converted!");
