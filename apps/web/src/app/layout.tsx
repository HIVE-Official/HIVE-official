import type { Metadata } from "next";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { WelcomeMatProvider } from "../components/welcome-mat-provider";
import { FeedbackToast } from "../components/feedback-toast";
import { ErrorBoundary } from "../components/error-boundary";
import { UniversalShellProvider } from "./universal-shell-provider";

// Using Geist Sans via CSS import in globals.css instead of Next.js font optimization
// to match the HIVE design system approach

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HIVE",
  description: "The social platform for builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="antialiased bg-hive-background-primary text-hive-text-primary" style={{ backgroundColor: '#0A0A0B' }}>
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
