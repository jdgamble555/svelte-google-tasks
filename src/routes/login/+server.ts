import { getAuthUrl } from '$lib/google-auth';
import type { RequestHandler } from '../auth/callback/$types';

export const GET: RequestHandler = async () => {
  // Redirect to Google login page
  const authUrl = getAuthUrl();
  return Response.redirect(authUrl);
};
