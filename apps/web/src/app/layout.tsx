import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// CORRECTED: Space Grotesk from Google Fonts for display text (HIVE Brand System v1.0)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HIVE",
  description: "The social platform for builders.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${GeistSans.variable} dark`}
      style={
        {
          colorScheme: "dark",
          // CORRECTED: Use proper brand fonts
          "--font-display":
            "var(--font-space-grotesk), Space Grotesk, system-ui, sans-serif",
          "--font-body":
            "var(--font-geist-sans), Geist Sans Variable, Geist Sans, system-ui, sans-serif",
          // Brand color tokens
          "--background": "#0A0A0A",
          "--surface": "#111111",
          "--border": "#2A2A2A", // CORRECTED border color
          "--foreground": "#FFFFFF",
          "--muted": "#6B7280",
          "--accent": "#FFD700",
          "--accent-hover": "#EAC200", // CORRECTED hover
          "--accent-active": "#C4A500", // CORRECTED active
          // Motion tokens
          "--motion-fast": "90ms",
          "--motion-content": "220ms",
          "--motion-slow": "300ms",
          "--motion-easing": "cubic-bezier(0.22, 0.61, 0.36, 1)",
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <body
        className="font-body bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// Brand compliance note: This layout enforces:
// - Space Grotesk from Google Fonts for headlines (--font-display)
// - Geist Sans from NPM package for body text (--font-body)
// - CORRECTED color tokens with proper border (#2A2A2A) and gold values
// - Motion timing tokens for consistent animations across the app
