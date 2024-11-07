import { COOKIE_NAME, createOAuth2Client } from '$lib/google-auth';
import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {

    const code = url.searchParams.get('code');

    if (!code) {
        return new Response('No code returned from Google', { status: 400 });
    }

    try {
        const client = createOAuth2Client(url.origin);

        // Exchange the code for tokens
        const { tokens } = await client.getToken(code);

        client.setCredentials(tokens);

        // Fetch user info
        const oauth2 = google.oauth2({
            auth: client,
            version: 'v2'
        });

        const userInfo = await oauth2.userinfo.get();

        const session = {
            user: userInfo.data,
            tokens
        };

        // Store user data in a cookie or session as needed
        cookies.set(COOKIE_NAME, JSON.stringify(session), { path: '/' });

    } catch (error) {
        console.error('Error during authentication:', error);
        return new Response('Authentication failed', { status: 500 });
    }

    // Redirect to the homepage or a dashboard
    return redirect(302, '/');
};
