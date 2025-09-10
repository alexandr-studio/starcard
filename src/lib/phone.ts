import { parsePhoneNumberFromString } from "libphonenumber-js/min"; // small metadata

export function formatPhoneE164(input: string) {
	const p = parsePhoneNumberFromString(input);
	return p?.isValid() ? p.number : null; // +420777123456
}

export function formatPhoneIntl(input: string) {
	const p = parsePhoneNumberFromString(input);
	return p?.isValid() ? p.formatInternational() : null; // +420 777 123 456
}

export function formatPhoneNational(input: string) {
	const p = parsePhoneNumberFromString(input);
	return p?.isValid() ? p.formatNational() : null;
}
