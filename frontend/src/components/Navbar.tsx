
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Code2, Search, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export function Navbar() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/components?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/components`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <Code2 className="h-6 w-6" />
            <span>OpenUI</span>
          </Link>
          <div className="hidden md:flex gap-4">
            <Link to="/components" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Components
            </Link>
            <Link to="/leaderboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Leaderboard
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </form>

          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">

              {user.role === "admin" && (
                <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <UserIcon className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
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
