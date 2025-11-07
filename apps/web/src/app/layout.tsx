import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "./providers";
import "./globals.css";
import "../styles/css-variables.css";
import "../styles/mobile-optimizations.css";
import { WelcomeMatProvider } from "../components/welcome-mat-provider";
import { FeedbackToast } from "../components/feedback-toast";
import { ErrorBoundary } from "../components/error-boundary";
import { UniversalShellProvider } from "./universal-shell-provider";
import { cookies } from "next/headers";
import { verifySession } from "../lib/session";

// Route-level rendering should be configured per page when needed.

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inject CSRF token for admin sessions across all pages
  const cookieStore = await cookies();
  const token = cookieStore.get("hive_session")?.value;
  let csrf: string | null = null;

  if (token) {
    const session = await verifySession(token);
    if (session?.isAdmin && session.csrf) {
      csrf = session.csrf;
    }
  }

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        {csrf ? <meta name="csrf-token" content={csrf} /> : null}
      </head>
  <body className={`${GeistSans.className} antialiased bg-hive-background-primary text-hive-text-primary`}>
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
