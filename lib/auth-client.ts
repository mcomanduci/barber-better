import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const signIn = async (provider: string) => {
  try {
    const result = await authClient.signIn.social({
      provider,
      callbackURL: window.location.href,
    });

    return result;
  } catch (error) {
    console.error(`Sign-in with ${provider} failed:`, error);
    throw error; // Re-throw so calling code can handle it
  }
};

export const signOut = async () => {
  try {
    await authClient.signOut();
    // Refresh the page after successful sign out
    window.location.reload();
  } catch (error) {
    console.error("Sign-out failed:", error);
    // Still refresh even if there's an error to clear any stale state
    window.location.reload();
  }
};
