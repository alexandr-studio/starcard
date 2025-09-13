declare module "virtual:starcard/config" {
	export const site: {
		meta?: {
			title?: string;
			description?: string;
			keywords?: string[];
			favicon?: string;
		};
		footer?: {
			text?: string;
		};
		profile: {
			displayName: string;
			firstName: string;
			middleName?: string;
			lastName: string;
			title?: string;
			avatarUrl?: string;
			avatarRounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
			email?: string;
			phone?: string;
			homePage?: string;
			location?: string;
			vcard: boolean;
			sections?: Array<{
				order?: number;
				id?: string;
				title?: string;
				icon?: string;
				items?: Array<{
					id?: string;
					icon?: string;
					url?: string;
					order?: number;
				}>;
			}>;
			legal?: {
				title?: string;
				items?: Array<{
					order?: number;
					id?: string;
					title?: string;
					value?: string;
				}>;
			};
		};
	};
}
