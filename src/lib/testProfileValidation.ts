// Example file to demonstrate profile validation
// This file shows how the validation would catch errors

import { safeValidateProfile } from "../schemas/profile.js";

// Example of valid profile data
const validProfile = {
	fullname: "Alexander Sedeke", // Required field
	title: "Full-stack Developer",
	email: "alexandr@alexandr.codes",
};

// Example of invalid profile data (missing required fullname)
const invalidProfile = {
	title: "Full-stack Developer",
	email: "alexandr@alexandr.codes",
	// Missing required 'fullname' field
};

// Example of profile with invalid email
const invalidEmailProfile = {
	fullname: "Alexander Sedeke",
	email: "not-a-valid-email", // Invalid email format
};

console.log("Testing valid profile:");
const validResult = safeValidateProfile(validProfile);
console.log("Valid:", validResult.success);

console.log("\nTesting invalid profile (missing fullname):");
const invalidResult = safeValidateProfile(invalidProfile);
console.log("Valid:", invalidResult.success);
if (!invalidResult.success) {
	console.log(
		"Errors:",
		invalidResult.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`)
	);
}

console.log("\nTesting invalid email profile:");
const invalidEmailResult = safeValidateProfile(invalidEmailProfile);
console.log("Valid:", invalidEmailResult.success);
if (!invalidEmailResult.success) {
	console.log(
		"Errors:",
		invalidEmailResult.error.errors.map(
			(e) => `${e.path.join(".")}: ${e.message}`
		)
	);
}

