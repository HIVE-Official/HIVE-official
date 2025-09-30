import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "./providers";
import "./globals.css";
import { WelcomeMatProvider } from "../components/welcome-mat-provider";
import { FeedbackToast } from "../components/feedback-toast";
import { ErrorBoundary } from "../components/error-boundary";
import { UniversalShellProvider } from "./universal-shell-provider";

// Force all routes to be dynamically rendered (disable SSG)
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

// Using Geist font family from Vercel for optimal readability and modern aesthetics
// Geist Sans for UI text and Geist Mono for code snippets

export const metadata: Metadata = {
  title: "HIVE",
  description: "The social platform for builders.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover", // Enable safe area insets for notch support
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
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className={`${GeistSans.className} antialiased bg-hive-background-primary text-hive-text-primary`} style={{ backgroundColor: '#0A0A0B' }}>
        <ErrorBoundary>
          <Providers>
            <UniversalShellProvider>
              <WelcomeMatProvider>{children}</WelcomeMatProvider>
            </UniversalShellProvider>
            <FeedbackToast />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
