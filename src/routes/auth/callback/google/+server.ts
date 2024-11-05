import { oauth2Client } from '$lib/google-auth';
import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {

    const code = url.searchParams.get('code');

    if (!code) {
        return new Response('No code returned from Google', { status: 400 });
    }

    try {
        // Exchange the code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Fetch user info
        const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
        const userInfo = await oauth2.userinfo.get();

        // Store user data in a cookie or session as needed
        cookies.set('user', JSON.stringify(userInfo.data), { path: '/' });
        cookies.set('tokens', JSON.stringify(tokens), { path: '/' });

    } catch (error) {
        console.error('Error during authentication:', error);
        return new Response('Authentication failed', { status: 500 });
    }

    // Redirect to the homepage or a dashboard
    return redirect(302, '/');
};
