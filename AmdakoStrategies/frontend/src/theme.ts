export const theme = {
  colors: {
    // Institutional wealth-management palette
    primary: "#0B3D2E", // deep forest green
    primaryDark: "#07291F", // darker green for hover
    primaryLight: "#E8F0EC", // soft green tint
    secondary: "#1A1A18", // charcoal
    gold: "#C9A227", // refined gold accent
    goldLight: "#F5EDD8", // soft gold tint
    ivory: "#F8F6F1", // page background
    surface: "#FFFFFF",
    surfaceAlt: "#F3F1EA", // subtle warm alt surface
    border: "#E3DFD4", // hairline warm border
    borderLight: "#ECE9E0",
    text: "#1A1A18", // charcoal
    textSecondary: "#5C5A52", // warm gray
    textMuted: "#8A877B", // muted warm gray
    success: "#0B7A55",
    danger: "#B3403A",
    warning: "#C9A227",
    shadow: "rgba(26, 26, 24, 0.07)",
    shadowHover: "rgba(26, 26, 24, 0.12)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
    headingWeight: 600,
    bodyWeight: 400,
    lineHeight: 1.6,
  },
  radii: {
    small: "6px",
    medium: "10px",
    large: "14px",
    xl: "20px",
  },
  shadows: {
    card: "0 1px 2px rgba(26, 26, 24, 0.04), 0 4px 12px rgba(26, 26, 24, 0.04)",
    cardHover: "0 2px 4px rgba(26, 26, 24, 0.06), 0 12px 28px rgba(26, 26, 24, 0.08)",
    button: "0 2px 6px rgba(11, 61, 46, 0.25)",
    buttonHover: "0 4px 14px rgba(11, 61, 46, 0.35)",
  },
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
  },
};

export type Theme = typeof theme;