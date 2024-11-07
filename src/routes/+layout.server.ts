import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  locals: { getGoogleSession }
}) => {

  const session = getGoogleSession();

  return {
    user: session ? session.data.user : null
  };

};