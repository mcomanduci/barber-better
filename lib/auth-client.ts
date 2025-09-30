import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const signIn = (provider: string) => {
  return authClient.signIn.social({
    provider: provider,
    callbackURL: window.location.href,
  });
};

export const signOut = () => {
  return authClient.signOut();
};
