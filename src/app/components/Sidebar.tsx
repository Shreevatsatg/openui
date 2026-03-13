"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type ComponentItem = {
  title: string;
  slug: string;
  category: string;
};

export function Sidebar({ components }: { components: ComponentItem[] }) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Group components by category
  const grouped = components.reduce((acc, comp) => {
    const cat = comp.category.toLowerCase();
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(comp);
    return acc;
  }, {} as Record<string, ComponentItem[]>);

  // Initialize expanded state for categories that are active
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: prev[category] === undefined ? false : !prev[category]
    }));
  };

  const isCategoryExpanded = (category: string) => {
    if (expandedCategories[category] !== undefined) {
      return expandedCategories[category];
    }
    // Default to expanded if a component in this category is currently active
    return grouped[category]?.some(c => pathname === `/components/${c.slug}`) || true;
  };

  return (
    <div className="h-full py-6 pr-6 pl-4 overflow-y-auto">
      <div className="mb-4">
        <Link 
           href="/components" 
           className={`text-sm font-semibold hover:underline ${pathname === '/components' ? 'text-primary' : 'text-foreground'}`}
        >
          All Components
        </Link>
      </div>

      <div className="space-y-4">
        {Object.keys(grouped).sort().map(category => (
          <div key={category} className="space-y-1 text-sm text-muted-foreground w-full">
            <button 
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between w-full font-semibold text-foreground py-1 text-left"
            >
              <span className="capitalize">{category}</span>
              {isCategoryExpanded(category) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <div className={`flex flex-col space-y-1 ml-2 border-l border-border/50 pl-4 py-1 pb-2 transition-all ${isCategoryExpanded(category) ? 'block' : 'hidden'}`}>
              {grouped[category].sort((a,b) => a.title.localeCompare(b.title)).map(comp => {
                const isActive = pathname === `/components/${comp.slug}`;
                return (
                  <Link
                    key={comp.slug}
                    href={`/components/${comp.slug}`}
                    className={`block py-1 hover:text-foreground transition-colors ${
                      isActive ? "text-primary font-medium" : ""
                    }`}
                  >
                    {comp.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
