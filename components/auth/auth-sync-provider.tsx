'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext<{
  refetchAuth: () => void;
}>({
  refetchAuth: () => {},
});

export const useAuthSync = () => useContext(AuthContext);

export const AuthSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const { refetch } = authClient.useSession();

  const refetchAuth = () => {
    refetch();
  };

  useEffect(() => {
    const handleFocus = () => refetch();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && (e.key.includes('auth') || e.key.includes('session'))) {
        refetch();
      }
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) refetch();
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refetch]);

  return <AuthContext.Provider value={{ refetchAuth }}>{children}</AuthContext.Provider>;
};
