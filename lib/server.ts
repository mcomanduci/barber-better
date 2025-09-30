import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user || null;
};
