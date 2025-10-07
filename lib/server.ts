import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user || null;
};
