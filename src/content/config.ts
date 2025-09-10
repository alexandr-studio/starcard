// src/content/config.ts
import { defineCollection, z } from "astro:content";

const cards = defineCollection({
	type: "content",
	schema: z.object({
		name: z.string(),
		title: z.string(),
		avatarUrl: z.string().url(),
		orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
		imageSide: z.enum(["left", "right"]).default("left"),
		phone: z.string().optional(),
		email: z.string().optional(),
		address: z.string().optional(),
		socials: z
			.array(
				z.object({
					id: z.string(), // e.g. "yt", "gh", "li"
					label: z.string(),
					url: z.string().url(),
				})
			)
			.default([]),
		projects: z.array(z.string()).default([]),
		channels: z.array(z.string()).default([]),
		publications: z.array(z.string()).default([]),
	}),
});

export const collections = { cards };
