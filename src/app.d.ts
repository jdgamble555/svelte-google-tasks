// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { oauth2_v2 } from 'googleapis';
import type { Credentials, OAuth2Client } from 'google-auth-library';


declare global {

	type Todo = {
		id: string;
		uid: string;
		text: string;
		complete: boolean;
		createdAt: Date;
	};

	type GoogleSession = {
		user: oauth2_v2.Schema$Userinfo;
		tokens: Credentials
	}

	namespace App {
		// interface Error {}
		interface Locals {
			getGoogleSession(): {
				data: GoogleSession;
				client: OAuth2Client;
			} | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
