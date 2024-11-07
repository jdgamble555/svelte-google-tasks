import { COOKIE_NAME, createOAuth2Client } from "$lib/google-auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.getGoogleSession = () => {

        const session = event.cookies.get(COOKIE_NAME);

        if (!session) {
            return null;
        }

        const client = createOAuth2Client(event.url.origin);

        const data = JSON.parse(session) as GoogleSession;

        client.setCredentials(data.tokens);

        return {
            data,
            client
        };
    };

    return resolve(event);
};
