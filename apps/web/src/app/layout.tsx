import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// CORRECTED: Space Grotesk from Google Fonts for display text (HIVE Brand System v1.0)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
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
      className={`${spaceGrotesk.variable} ${GeistSans.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
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
