import { z } from "zod";

// Schema for section items (social links, presence, support, etc.)
const SectionItemSchema = z.object({
	id: z.string().optional(),
	icon: z.string().optional(),
	url: z.string().url().optional(),
});

// Schema for sections (socials, presence, support, etc.)
const SectionSchema = z.object({
	order: z.number().optional(),
	id: z.string().optional(),
	title: z.string().optional(),
	icon: z.string().optional(),
	items: z.array(SectionItemSchema).optional(),
});

// Schema for legal items
const LegalItemSchema = z.object({
	order: z.number().optional(),
	id: z.string().optional(),
	title: z.string().optional(),
	value: z.string().optional(),
});

// Schema for legal section
const LegalSchema = z.object({
	title: z.string().optional(),
	items: z.array(LegalItemSchema).optional(),
});

// Main profile schema
export const ProfileSchema = z.object({
	// Required field - only displayName is required
	displayName: z.string().min(1, "Full name is required"),
	firstName: z.string().min(1, "First name is required"),
	middleName: z.string().optional(),
	lastName: z.string().min(1, "Last name is required"),

	// Optional fields
	title: z.string().optional(),
	avatarUrl: z.string().url().optional(),
	avatarRounded: z.enum(["none", "sm", "md", "lg", "xl", "full"]).optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	homePage: z.string().url().optional(),
	location: z.string().optional(),
	sections: z.array(SectionSchema).optional(),
	legal: LegalSchema.optional(),
});

// TypeScript type inference from the schema
export type Profile = z.infer<typeof ProfileSchema>;

// Validation function
export function validateProfile(data: unknown): Profile {
	return ProfileSchema.parse(data);
}

// Safe validation function that returns result with errors
export function safeValidateProfile(data: unknown) {
	return ProfileSchema.safeParse(data);
}
