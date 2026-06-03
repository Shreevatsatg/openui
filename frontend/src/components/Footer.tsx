import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand/Project Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-xs">
                UI
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                OpenUI
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-sm leading-relaxed">
              A community-driven marketplace for beautiful, responsive React and Tailwind CSS components. Build your next idea faster.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Explore</h4>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>
                <Link to="/components" className="hover:text-foreground transition-colors duration-200">
                  Browse Components
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-foreground transition-colors duration-200">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Share */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Community</h4>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>
                <Link to="/contribute" className="hover:text-foreground transition-colors duration-200">
                  Contribute Guide
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-foreground transition-colors duration-200">
                  Submit Component
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OpenUI. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Final Year Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
}