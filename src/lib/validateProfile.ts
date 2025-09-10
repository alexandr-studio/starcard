import { validateProfile, safeValidateProfile } from "../schemas/profile.js";
import profileData from "../data/profile.json";

// Validate the profile data at import time
export function checkProfileData() {
	console.log("🔍 Validating profile data...");

	const result = safeValidateProfile(profileData);

	if (!result.success) {
		console.error("❌ Profile validation failed:");
		result.error.errors.forEach((error) => {
			console.error(`  - ${error.path.join(".")}: ${error.message}`);
		});
		throw new Error(
			"Profile data validation failed. Please check the console for details."
		);
	}

	console.log("✅ Profile data is valid!");
	return result.data;
}

// Export the validated profile data
export const validatedProfile = checkProfileData();

// Export the validation functions for use elsewhere
export { validateProfile, safeValidateProfile };

