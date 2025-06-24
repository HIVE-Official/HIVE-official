// HIVE Brand System v1.0 - Effects Tokens
// Box shadows, blurs, and other visual effects

export const effects = {
  // Elevation system (Vercel-style shadows)
  shadow: {
    "elevation-1":
      "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
    "elevation-2":
      "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)",
    "elevation-3":
      "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "elevation-4":
      "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // HIVE Signature "Emboss" effect
  emboss: {
    // TODO: Define with HT-DS-02
    DEFAULT:
      "0px 1px 1px rgba(0,0,0,0.5), inset 0px 1px 1px rgba(255,255,255,0.1)",
  },

  // Glassmorphism effects
  blur: {
    sm: "4px",
    md: "12px",
    lg: "24px",
  },
} as const;

export type ShadowToken = keyof typeof effects.shadow;
export type BlurToken = keyof typeof effects.blur;

export default effects;
