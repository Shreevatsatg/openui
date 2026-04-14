import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, Code2, Layers, Palette, Workflow, PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sections = [
  {
    label: "Installation",
    items: [
      { to: "/contribute/installation/react", icon: Layers, label: "React + Vite" },
      { to: "/contribute/installation/nextjs", icon: Layers, label: "Next.js" },
    ],
  },
  {
    label: "Getting Started",
    items: [
      { to: "/contribute", end: true, icon: BookOpen, label: "Overview" },
      { to: "/contribute/workflow", icon: Workflow, label: "Workflow" },
      { to: "/contribute/themes", icon: Palette, label: "Themes" },
      { to: "/contribute/snippets", icon: Code2, label: "Snippets" },
    ],
  },
  
];

export default function ContributeLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col shrink-0 border-r border-border/50 bg-background transition-all duration-300",
          collapsed ? "w-12" : "w-52"
        )}
      >
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto flex flex-col">
          {/* Header row */}
          <div className={cn("flex items-center border-b border-border/40 h-11 px-3", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && (
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Docs
              </span>
            )}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>

          {!collapsed && (
            <nav className="flex flex-col gap-4 p-2 flex-1">
              {sections.map((section) => (
                <div key={section.label}>
                  <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    {section.label}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {section.items.map(({ to, end, icon: Icon, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                          cn(
                            "group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all duration-150",
                            isActive
                              ? "bg-muted text-foreground font-medium"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={cn(
                              "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-200",
                              isActive ? "h-4 bg-foreground" : "h-0"
                            )} />
                            <Icon className={cn(
                              "h-3.5 w-3.5 shrink-0 transition-colors",
                              isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                            {label}
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div className="mt-auto pt-2">
                <div className="rounded-lg border border-dashed border-border/50 px-3 py-2.5 text-[11px] text-muted-foreground leading-relaxed">
                  Questions?{" "}
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    Open an issue
                  </a>
                </div>
              </div>
            </nav>
          )}

          {/* Collapsed: icon-only */}
          {collapsed && (
            <nav className="flex flex-col items-center gap-1 p-2 flex-1">
              {sections.flatMap((s) =>
                s.items.map(({ to, end, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    title={label}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md p-2 transition-colors",
                        isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </NavLink>
                ))
              )}
            </nav>
          )}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-3.5rem)]">
        {/* Mobile nav */}
        <div className="lg:hidden border-b border-border/50 px-4 py-3">
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground list-none">
              <PanelLeft className="h-4 w-4" />
              <span>Documentation</span>
            </summary>
            <nav className="mt-3 flex flex-col gap-0.5">
              {sections.flatMap((s) =>
                s.items.map(({ to, end, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all duration-150",
                        isActive ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )
                    }
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {label}
                  </NavLink>
                ))
              )}
            </nav>
          </details>
        </div>

        <div className="px-8 py-10 mx-auto w-full max-w-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
