export interface LabelColor {
  bg: string;
  border: string;
}

export const labelColors: LabelColor[] = [
  // Row 1: Deep Rich Tones
  { bg: "#881337", border: "#FB7185" },
  { bg: "#7C2D12", border: "#F97316" },
  { bg: "#064E3B", border: "#34D399" },
  { bg: "#0C4A6E", border: "#38BDF8" },
  { bg: "#4C1D95", border: "#A78BFA" },

  // Row 2: Muted Dark Tones
  { bg: "#6F1D2F", border: "#E11D48" },
  { bg: "#693A17", border: "#EA580C" },
  { bg: "#0F5132", border: "#198754" },
  { bg: "#134E5E", border: "#0EA5E9" },
  { bg: "#3B1754", border: "#9333EA" },

  // Row 3: Slate & Cool Dark Tones
  { bg: "#581C24", border: "#FFA3B1" },
  { bg: "#5C2E0B", border: "#FFB077" },
  { bg: "#14452F", border: "#76E3B1" },
  { bg: "#1A435E", border: "#7DD3FC" },
  { bg: "#2E1C47", border: "#C084FC" },

  // Row 4: Saturated Mid-Dark Tones (Brightened up)
  { bg: "#9F1239", border: "#FDA4AF" }, // Saturated Rose / Light Pink Border
  { bg: "#9A3412", border: "#FED7AA" }, // Saturated Rust / Light Peach Border
  { bg: "#065F46", border: "#A7F3D0" }, // Deep Emerald / Mint Border
  { bg: "#075985", border: "#BAE6FD" }, // Deep Sky Blue / Ice Blue Border
  { bg: "#5B21B6", border: "#DDD6FE" }, // Royal Purple / Lavender Border

  // Row 5: Vibrant Jewel Mid-Tones (Brightened up)
  { bg: "#B91C1C", border: "#FECACA" }, // Rich Red / Soft Red Border
  { bg: "#C2410C", border: "#FFEDD5" }, // Rich Orange / Cream Border
  { bg: "#047857", border: "#D1FAE5" }, // Forest Green / Pale Green Border
  { bg: "#0369A1", border: "#E0F2FE" }, // Ocean Blue / Pale Sky Border
  { bg: "#6D28D9", border: "#EDE9FE" }, // Vivid Violet / Pale Purple Border
];
