import { useMemo, useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Boxes, MousePointerClick, CreditCard, FormInput, TextCursorInput,
  AppWindow, Navigation, Sparkles, Loader, LayoutTemplate, LayoutGrid,
  PanelLeftClose, PanelLeft, ChevronRight,
} from "lucide-react";
import { COMPONENT_CATEGORY_OPTIONS } from "@/lib/componentCategories";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  buttons: MousePointerClick,
  cards: CreditCard,
  forms: FormInput,
  inputs: TextCursorInput,
  modals: AppWindow,
  navigation: Navigation,
  animations: Sparkles,
  loaders: Loader,
  layouts: LayoutTemplate,
};

export function ComponentsSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [components, setComponents] = useState<any[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  // expandedCategories is a Set — multiple can be open, or restrict to one below
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    api.get("/api/components").then((res) => setComponents(res.data)).catch(() => {});
  }, []);

  // On mount, if URL already has a category, pre-expand it (but don't navigate)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      setExpandedCategories((prev) => {
        if (prev.has(cat)) return prev;
        return new Set(prev).add(cat);
      });
    }
    // Only run on mount — intentionally omitting location.search from deps
    // so that user-driven expansions don't get overwritten by URL changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const byCategory = useMemo(() => {
    const m = new Map<string, any[]>();
    for (const c of components) {
      const key = String(c.category || "").toLowerCase();
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(c);
    }
    return m;
  }, [components]);

  const isOnList = location.pathname === "/components";
  const urlCategory = new URLSearchParams(location.search).get("category") || "";

  /**
   * Clicking a category label ONLY toggles the accordion.
   * It does NOT navigate anywhere. Navigation only happens when
   * the user clicks an individual component inside the accordion.
   */
  const handleCategoryToggle = useCallback((slug: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const handleAllClick = useCallback(() => {
    navigate("/components");
  }, [navigate]);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col shrink-0 border-r border-border/50 bg-background transition-all duration-300",
        collapsed ? "w-12" : "w-56"
      )}
    >
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className={cn(
            "flex items-center border-b border-border/40 h-11 px-3 shrink-0",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Components
            </span>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Expanded nav */}
        {!collapsed && (
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex flex-col gap-0.5 p-2">
              {/* All */}
              <button
                type="button"
                onClick={handleAllClick}
                className={cn(
                  "group relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-all duration-150",
                  isOnList && !urlCategory
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-200",
                    isOnList && !urlCategory ? "h-4 bg-foreground" : "h-0"
                  )}
                />
                <Boxes className="h-3.5 w-3.5 shrink-0" />
                <span className="flex-1">All</span>
                <span className="tabular-nums text-xs text-muted-foreground">
                  {components.length}
                </span>
              </button>

              {/* Section label */}
              <div className="pt-3 pb-1 px-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Categories
                </p>
              </div>

              {/* Category rows — accordion, no navigation on label click */}
              {COMPONENT_CATEGORY_OPTIONS.map(({ slug, label }) => {
                const Icon = CATEGORY_ICONS[slug] ?? LayoutGrid;
                const isExpanded = expandedCategories.has(slug);
                const items = byCategory.get(slug) ?? [];

                // A category row is "active" only when a child component is open
                const isChildActive = items.some(
                  (comp) => location.pathname === `/components/${comp.slug}`
                );

                return (
                  <div key={slug}>
                    {/*
                     * This is purely a toggle button.
                     * It does NOT call navigate() — no accidental route changes.
                     */}
                    <button
                      type="button"
                      onClick={() => handleCategoryToggle(slug)}
                      className={cn(
                        "group relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-all duration-150",
                        isChildActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      {/* Active indicator bar */}
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-200",
                          isChildActive ? "h-4 bg-foreground" : "h-0"
                        )}
                      />
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="flex-1">{label}</span>
                      <span className="tabular-nums text-xs text-muted-foreground mr-1">
                        {items.length}
                      </span>
                      <ChevronRight
                        className={cn(
                          "h-3 w-3 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                          isExpanded ? "rotate-90" : ""
                        )}
                      />
                    </button>

                    {/* Accordion: component list — clicking here navigates */}
                    {isExpanded && (
                      <div className="ml-3 pl-3 border-l border-border/40 mt-0.5 mb-1 flex flex-col gap-0.5">
                        {items.length === 0 ? (
                          <p className="px-2 py-1.5 text-xs text-muted-foreground/50 italic">
                            No components yet
                          </p>
                        ) : (
                          items.map((comp) => (
                            <Link
                              key={comp._id}
                              to={`/components/${comp.slug}`}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all duration-150",
                                location.pathname === `/components/${comp.slug}`
                                  ? "bg-muted text-foreground font-medium"
                                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                              )}
                            >
                              <span className="w-1 h-1 rounded-full bg-current opacity-40 shrink-0" />
                              <span className="truncate">{comp.title}</span>
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <div className="p-2 mt-auto">
              <Link
                to="/contribute/installation/react"
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-border/50 px-3 py-2.5 text-[11px] text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors leading-relaxed"
              >
                New here? Install guide →
              </Link>
            </div>
          </div>
        )}

        {/* Collapsed icon-only nav */}
        {collapsed && (
          <nav className="flex flex-col items-center gap-1 p-2 flex-1">
            <button
              type="button"
              onClick={handleAllClick}
              title="All Components"
              className={cn(
                "rounded-md p-2 transition-colors",
                isOnList && !urlCategory
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Boxes className="h-4 w-4" />
            </button>
            {COMPONENT_CATEGORY_OPTIONS.map(({ slug, label }) => {
              const Icon = CATEGORY_ICONS[slug] ?? LayoutGrid;
              const isExpanded = expandedCategories.has(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => handleCategoryToggle(slug)}
                  title={label}
                  className={cn(
                    "rounded-md p-2 transition-colors",
                    isExpanded
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </aside>
  );
}