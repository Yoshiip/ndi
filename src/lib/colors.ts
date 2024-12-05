type CanvasColor = "water" | "raft" | "plastic";

const COLORS: Record<CanvasColor, string[]> = {
  water: ["#030712", "#f3f4f6"],
  raft: ["##6b7280", "#4b5563"],
  plastic: ["#dbeafe", "#4b5563"],
};

const isDarkMode =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
export default function getColor(color: CanvasColor) {
  return COLORS[color][isDarkMode ? 1 : 0];
}
