"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-4 w-full justify-center p-2 rounded-md hover:bg-muted/50"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  );
}
