"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { signOut } from "next-auth/react";
import { Code2, LogOut, PlusCircle, Search, User as UserIcon } from "lucide-react";

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <Code2 className="h-6 w-6" />
            <span>OpenUI</span>
          </Link>
          <div className="hidden md:flex gap-4">
            <Link href="/components" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Components
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Leaderboard
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search components..."
              className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/submit"
                className="hidden md:flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Submit</span>
              </Link>
              {user.role === "admin" && (
                <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Admin
                </Link>
              )}
              <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <UserIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
