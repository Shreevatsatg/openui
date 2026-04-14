import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, Code2, Layers, Palette, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-muted text-foreground border border-border/60"
      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
  );

export default function ContributeLayout() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:gap-10">
      <aside className="lg:w-56 shrink-0 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border border-border/50 bg-card/30 p-3">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Documentation</p>
          <nav className="flex flex-col gap-0.5">
            <NavLink to="/contribute" end className={navClass}>
              <BookOpen className="h-4 w-4 shrink-0" />
              Overview
            </NavLink>
            <NavLink to="/contribute/workflow" className={navClass}>
              <Workflow className="h-4 w-4 shrink-0" />
              Workflow
            </NavLink>
            <NavLink to="/contribute/themes" className={navClass}>
              <Palette className="h-4 w-4 shrink-0" />
              Themes
            </NavLink>
            <NavLink to="/contribute/snippets" className={navClass}>
              <Code2 className="h-4 w-4 shrink-0" />
              Snippets
            </NavLink>
            <p className="mt-4 mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Installation</p>
            <NavLink to="/contribute/installation/react" className={navClass}>
              <Layers className="h-4 w-4 shrink-0" />
              React + Vite
            </NavLink>
            <NavLink to="/contribute/installation/nextjs" className={navClass}>
              <Layers className="h-4 w-4 shrink-0" />
              Next.js
            </NavLink>
          </nav>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
