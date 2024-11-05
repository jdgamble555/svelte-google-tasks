import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const user = cookies.get('user');

  return {
    user: user ? JSON.parse(user) : null,
  };
};