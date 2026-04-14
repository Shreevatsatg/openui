import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Code2, Search, User as UserIcon, ChevronDown, LayoutGrid, Trophy, GitPullRequest, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/components", label: "Components", icon: LayoutGrid },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/contribute", label: "Contribute", icon: GitPullRequest },
];

export function Navbar() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/components?search=${encodeURIComponent(searchQuery)}` : `/components`);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md ">
      <div className="container mx-auto flex h-14 items-center justify-between px-6 gap-0 py-8">

        {/* Left — Brand + Nav */}
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-bold tracking-tight text-foreground mr-4 shrink-0 text-2xl"
          >
            <img src='/favicon.svg' className='h-6'/>
            OpenUI
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  isActive(to)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {label}
                {isActive(to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — Search + Actions */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Search
              className={cn(
                "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 transition-colors",
                searchFocused ? "text-primary" : "text-muted-foreground"
              )}
            />
            <input
              type="search"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                "h-8 w-52 rounded-md border bg-muted/40 pl-8 pr-3 text-sm transition-all duration-200 outline-none",
                "placeholder:text-muted-foreground/60",
                searchFocused
                  ? "w-64 border-primary/50 bg-background ring-2 ring-primary/10"
                  : "border-border/50 hover:border-border hover:bg-muted/70"
              )}
            />
            <kbd className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] text-muted-foreground/60 font-mono transition-opacity",
              searchFocused && "opacity-0"
            )}>
              ⌘K
            </kbd>
          </form>

          <ThemeToggle />

          <div className="w-px h-5 bg-border/60 hidden md:block" />

          {user ? (
            <div className="flex items-center gap-1.5">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="hidden md:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors border border-amber-200/60 dark:border-amber-800/40"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Admin
                </Link>
              )}
              <Link
                to="/profile"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border/60 hover:bg-muted/80 hover:border-border transition-colors"
                title="Profile"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted/60"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md transition-colors"
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