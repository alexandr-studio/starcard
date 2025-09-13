// Lightweight Astro integration to expose Starcard config via a virtual module
// and validate options using zod at config time.
import { z } from "zod";

// Recreate the Profile schema here in JS to avoid TS import issues at config time
const SectionItemSchema = z.object({
	id: z.string().optional(),
	icon: z.string().optional(),
	url: z.string().url().optional(),
});

const SectionSchema = z.object({
	order: z.number().optional(),
	id: z.string().optional(),
	title: z.string().optional(),
	icon: z.string().optional(),
	items: z.array(SectionItemSchema).optional(),
});

const LegalItemSchema = z.object({
	order: z.number().optional(),
	id: z.string().optional(),
	title: z.string().optional(),
	value: z.string().optional(),
});

const LegalSchema = z.object({
	title: z.string().optional(),
	items: z.array(LegalItemSchema).optional(),
});

const ProfileSchema = z.object({
	displayName: z.string().min(1, "Full name is required"),
	firstName: z.string().min(1, "First name is required"),
	middleName: z.string().optional(),
	lastName: z.string().min(1, "Last name is required"),
	title: z.string().optional(),
	avatarUrl: z.string().url().optional(),
	avatarRounded: z.enum(["none", "sm", "md", "lg", "xl", "full"]).optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	homePage: z.string().url().optional(),
	location: z.string().optional(),
	vcard: z.boolean().default(false),
	sections: z.array(SectionSchema).optional(),
	legal: LegalSchema.optional(),
});

const MetaSchema = z
	.object({
		title: z.string().optional(),
		description: z.string().optional(),
		keywords: z.array(z.string()).optional(),
		favicon: z.string().optional(),
	})
	.optional();

const FooterSchema = z
	.object({
		text: z.string().optional(),
	})
	.optional();

const OptionsSchema = z.object({
	meta: MetaSchema,
	footer: FooterSchema,
	profile: ProfileSchema,
});

export default function starcard(userOptions = {}) {
	const parsed = OptionsSchema.safeParse(userOptions);
	if (!parsed.success) {
		const details = parsed.error.issues
			.map((e) => `- ${e.path.join(".")}: ${e.message}`)
			.join("\n");
		throw new Error(
			`Starcard config validation failed. Please fix your astro.config.* options.\n${details}`
		);
	}

	const site = parsed.data;

	const virtualId = "virtual:starcard/config";
	const resolvedVirtualId = "\0" + virtualId;

	return {
		name: "starcard-integration",
		hooks: {
			"astro:config:setup"({ updateConfig }) {
				updateConfig({
					vite: {
						plugins: [
							{
								name: "starcard-virtual-config",
								resolveId(id) {
									if (id === virtualId) return resolvedVirtualId;
								},
								load(id) {
									if (id === resolvedVirtualId) {
										return `export const site = ${JSON.stringify(site)};`;
									}
								},
							},
						],
					},
				});
			},
		},
	};
}
