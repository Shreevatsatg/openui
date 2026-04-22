import { useMemo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, LayoutGrid, PanelLeft } from "lucide-react";
import { MiniLivePreview } from "@/components/MiniLivePreview";
import { api } from "@/lib/api";
import { COMPONENT_CATEGORY_OPTIONS } from "@/lib/componentCategories";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Boxes, MousePointerClick, CreditCard, FormInput, TextCursorInput,
  AppWindow, Navigation, Sparkles, Loader, LayoutTemplate,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  buttons: MousePointerClick, cards: CreditCard, forms: FormInput,
  inputs: TextCursorInput, modals: AppWindow, navigation: Navigation,
  animations: Sparkles, loaders: Loader, layouts: LayoutTemplate,
};

export default function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const [components, setComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/components${search ? `?search=${encodeURIComponent(search)}` : ""}`)
      .then((res) => setComponents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [search]);

  const filtered = useMemo(() => {
    if (!category) return components;
    return components.filter((c: any) => String(c.category).toLowerCase() === category.toLowerCase());
  }, [components, category]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of components) {
      const key = String(c.category || "").toLowerCase();
      m.set(key, (m.get(key) ?? 0) + 1);
    }
    return m;
  }, [components]);

  const setCategory = (slug: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (slug) next.set("category", slug);
    else next.delete("category");
    setSearchParams(next);
    setMobileNavOpen(false);
  };

  // Mobile-only sidebar
  const MobileSidebar = () => (
    <nav className="flex flex-col gap-0.5 p-2">
      <button
        type="button"
        onClick={() => setCategory(null)}
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-all duration-150",
          !category ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
      >
        <Boxes className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1">All Components</span>
        <span className="tabular-nums text-xs text-muted-foreground">{components.length}</span>
      </button>
      <div className="pt-3 pb-1 px-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Categories</p>
      </div>
      {COMPONENT_CATEGORY_OPTIONS.map(({ slug, label }) => {
        const Icon = CATEGORY_ICONS[slug] ?? LayoutGrid;
        return (
          <button
            key={slug}
            type="button"
            onClick={() => setCategory(slug)}
            className={cn(
              "group relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-all duration-150",
              category === slug ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span className="flex-1">{label}</span>
            <span className="tabular-nums text-xs text-muted-foreground">{counts.get(slug) ?? 0}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex flex-col w-full">
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4 lg:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Components</h1>
          <p className="text-sm text-muted-foreground">Browse by category</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setMobileNavOpen((o) => !o)} className="gap-2">
          <PanelLeft className="h-4 w-4" />
          {mobileNavOpen ? "Close" : "Categories"}
        </Button>
      </div>

      {mobileNavOpen && (
        <div className="rounded-lg border border-border/50 bg-card/30 mb-4 lg:hidden">
          <MobileSidebar />
        </div>
      )}

      {/* Page heading (desktop) */}
      <div className="mb-8 hidden lg:block">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {category
            ? COMPONENT_CATEGORY_OPTIONS.find((o) => o.slug === category)?.label ?? category
            : "Components"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {category
            ? <>Filtered by <span className="text-foreground font-medium">"{COMPONENT_CATEGORY_OPTIONS.find((o) => o.slug === category)?.label ?? category}"</span>.</>
            : "Beautifully designed components you can copy into your apps."}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="flex flex-col overflow-hidden border-border/50">
              <Skeleton className="aspect-[4/3] rounded-none" />
              <CardHeader className="p-4 pb-0 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </CardHeader>
              <CardFooter className="p-4 pt-3">
                <Skeleton className="h-5 w-16 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed rounded-lg bg-muted/20 text-center space-y-4">
          <LayoutGrid className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-xl font-medium">No components found</h3>
          <p className="text-muted-foreground max-w-sm">
            {category ? "Try another category or clear the filter." : "No components have been approved yet. Be the first to submit one!"}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {category && (
              <Button type="button" variant="outline" size="sm" onClick={() => setCategory(null)}>
                Clear category
              </Button>
            )}
            <Link to="/submit" className="text-sm font-medium bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-md">
              Submit Component
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((comp: any) => (
            <Card
              key={comp._id.toString()}
              className="flex flex-col overflow-hidden group hover:border-border transition-colors border-border/50 bg-background shadow-xs relative"
            >
              <div className="aspect-[4/3] bg-muted/20 border-b border-border/50 relative group flex items-center justify-center p-0 overflow-hidden">
                {comp.previewImage ? (
                  <img
                    src={comp.previewImage}
                    alt={comp.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <MiniLivePreview code={comp.code} themeSupport={comp.themeSupport || "both"} />
                )}
              </div>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                  <Link to={`/components/${comp.slug}`} className="before:absolute before:inset-0 flex items-center justify-between">
                    <span>{comp.title}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-1 text-sm text-muted-foreground">{comp.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-3 mt-auto text-xs text-muted-foreground flex justify-between items-center">
                <Badge variant="secondary" className="text-[10px] bg-muted hover:bg-muted text-muted-foreground border-transparent font-normal capitalize">
                  {comp.category}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
