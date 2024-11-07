import { createOAuth2Client, getAuthUrl } from '$lib/google-auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {

  // Redirect to Google login page
  
  const client = createOAuth2Client(url.origin);

  const authUrl = getAuthUrl(client);

  return redirect(307, authUrl);
};
