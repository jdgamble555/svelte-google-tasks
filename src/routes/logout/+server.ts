import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
    // Clear the user cookie
    cookies.delete('user', { path: '/' });
    cookies.delete('tokens', { path: '/' });

    // Redirect to the homepage or login page
    return redirect(302, '/');
};
