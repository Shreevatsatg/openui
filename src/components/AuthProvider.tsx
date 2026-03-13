"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";

// The AuthContext only manages state as requested
interface AuthContextType {
  user: any;
  profile: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (session?.user) {
      // Here we could fetch extended profile data if needed
      // For now, we use the session user as a complete profile
      setProfile(session.user);
      setLoading(false);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user: session?.user || null, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}
