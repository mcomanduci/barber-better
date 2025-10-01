import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/prisma"; // adjust path as needed

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const currentUser = await db.user.findFirst({
    where: { id: session.user.id },
  });

  if (!currentUser) {
    redirect("/");
  }

  return {
    ...session,
    currentUser,
  };
};

// Non-redirecting version for optional authentication
export const getCurrentUserOptional = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return null;
    }

    const currentUser = await db.user.findFirst({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...session,
      currentUser,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
