import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { COOKIE_NAME } from '$lib/google-auth';

export const GET: RequestHandler = async ({ cookies }) => {
    // Clear the user cookie
    cookies.delete(COOKIE_NAME, { path: '/' });

    // Redirect to the homepage or login page
    return redirect(302, '/');
};
