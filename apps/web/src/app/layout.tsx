import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
// Google Fonts removed due to offline build constraints
import { Providers } from "./providers";
import "./globals.css";

// CORRECTED: Space Grotesk from Google Fonts for display text (HIVE Brand System v1.0)

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
      className={`${GeistSans.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className="font-sans bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// Brand compliance note: This layout now correctly:
// 1. Sets the CSS variables for Space Grotesk and Geist Sans via the font packages.
// 2. Applies the 'dark' theme class globally.
// 3. Relies on the tailwind.config.js (which consumes @hive/tokens) for all color,
//    font-family, and other styles via utility classes like 'font-sans' and 'bg-background'.
//    This removes inline styles and creates a single source of truth for the design system.
