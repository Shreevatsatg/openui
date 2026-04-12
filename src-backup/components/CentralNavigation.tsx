"use client";

import { useAuth } from "./AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// Centralized navigation that handles routing decisions and redirects based on state
export function CentralNavigation({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/signup", "/components"];
    const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/components/");

    try {
      if (!user) {
        // No User
        if (!isPublicRoute) {
          router.replace("/login");
        }
      } else {
        // Has User
        if (!profile) {
          // No Profile -> Create Profile
          if (pathname !== "/create-profile") {
            router.replace("/create-profile");
          }
        } else {
          // Complete Profile -> Main App
          // (Assuming profile is complete since we set it to session user in context)
          if (pathname === "/login" || pathname === "/signup") {
            router.replace("/");
          }
        }
      }
    } catch (e) {
      // All failures should default to the login screen
      console.error("Navigation error:", e);
      router.replace("/login");
    }
  }, [user, profile, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
