export const theme = {
  colors: {
    primary: "#635BFF",
    primaryDark: "#4C45E8",
    primaryLight: "#EEEDFF",
    secondary: "#0A2540",
    surface: "#FFFFFF",
    surfaceAlt: "#F6F8FA",
    border: "#E6E8EB",
    borderLight: "#F0F2F5",
    text: "#0A2540",
    textSecondary: "#425466",
    textMuted: "#7A8BA0",
    success: "#0BA17C",
    danger: "#D64545",
    warning: "#F5A623",
    shadow: "rgba(10, 37, 64, 0.08)",
    shadowHover: "rgba(10, 37, 64, 0.14)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
    lineHeight: 1.6,
  },
  radii: {
    small: "8px",
    medium: "12px",
    large: "16px",
    xl: "24px",
  },
  shadows: {
    card: "0 1px 3px rgba(10, 37, 64, 0.06), 0 4px 12px rgba(10, 37, 64, 0.06)",
    cardHover: "0 2px 6px rgba(10, 37, 64, 0.08), 0 12px 32px rgba(10, 37, 64, 0.1)",
    button: "0 2px 8px rgba(99, 91, 255, 0.35)",
    buttonHover: "0 4px 16px rgba(99, 91, 255, 0.45)",
  },
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
  },
};

export type Theme = typeof theme;