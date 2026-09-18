export type ComponentEntry = {
  slug: string;
  title: string;
  file: string;
  category: string;
};

const TITLE_OVERRIDES: Record<string, string> = {
  otp: "OTP",
};

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => TITLE_OVERRIDES[w] ?? w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

/** Grouped the same way the sidebar in Pipelean's /components layout is —
 *  by rough function, not alphabetically, so related components sit
 *  together while browsing. */
const CATEGORIES: [string, string[]][] = [
  ["Layout", ["aspect-ratio", "resizable", "scroll-area", "separator", "sidebar", "skeleton"]],
  ["Navigazione", ["breadcrumb", "menubar", "navigation-menu", "pagination", "tabs"]],
  ["Form & Input", [
    "button", "button-group", "checkbox", "combobox", "field", "input", "input-group",
    "input-otp", "label", "native-select", "radio-group", "select", "slider", "switch", "textarea", "toggle", "toggle-group",
  ]],
  ["Overlay", ["alert-dialog", "context-menu", "dialog", "drawer", "dropdown-menu", "hover-card", "popover", "sheet", "tooltip"]],
  ["Data display", ["accordion", "avatar", "badge", "calendar", "card", "carousel", "chart", "collapsible", "empty", "item", "kbd", "marker", "table"]],
  ["Feedback", ["alert", "progress", "sonner", "spinner", "toast"]],
  ["Comunicazione", ["attachment", "bubble", "chat-input", "command", "message", "message-scroller", "questionnaire"]],
  ["Altro", ["direction"]],
];

export const allEntries: ComponentEntry[] = CATEGORIES.flatMap(([category, slugs]) =>
  slugs.map((slug) => ({
    slug,
    title: titleFromSlug(slug),
    file: `${slug}.tsx`,
    category,
  }))
);

export const categories = CATEGORIES.map(([name]) => name);

export function getEntry(slug: string): ComponentEntry | undefined {
  return allEntries.find((e) => e.slug === slug);
}
