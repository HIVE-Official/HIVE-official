import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

// CORRECTED: Space Grotesk from Google Fonts for display text (HIVE Brand System v1.0)
// Font loading is now handled by the globals.css import which pulls in @hive/ui/styles

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
      className="dark"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// Brand compliance note: This layout now correctly:
// 1. Relies on the app-level globals.css to import the master stylesheet from @hive/ui.
// 2. Applies the 'dark' theme class globally.
// 3. Relies on the tailwind.config.js (which consumes @hive/tokens) for all color,
//    font-family, and other styles via utility classes like 'font-sans' and 'bg-background'.
//    This removes inline styles and creates a single source of truth for the design system.
