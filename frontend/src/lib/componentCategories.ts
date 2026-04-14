/** Categories used for submission, filtering, and docs navigation. */
export const COMPONENT_CATEGORY_OPTIONS = [
  { slug: "buttons", label: "Buttons" },
  { slug: "cards", label: "Cards" },
  { slug: "forms", label: "Forms" },
  { slug: "inputs", label: "Inputs" },
  { slug: "modals", label: "Modals" },
  { slug: "navigation", label: "Navigation" },
  { slug: "animations", label: "Animations" },
  { slug: "loaders", label: "Loaders" },
  { slug: "layouts", label: "Layouts" },
] as const;

export type ComponentCategorySlug = (typeof COMPONENT_CATEGORY_OPTIONS)[number]["slug"];
