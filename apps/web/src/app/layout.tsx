import type { Metadata } from "next";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { Providers } from "./providers";
import "@hive/ui/styles.css";
import "./globals.css";
import { WelcomeMatProvider } from "../components/welcome-mat-provider";
import { FeedbackToast } from "../components/feedback-toast";
import { ErrorBoundary } from "../components/error-boundary";
import { ProductionSafetyCheck } from "../components/dev/ProductionSafetyCheck";

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover', // For iOS safe areas
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HIVE',
  },
  formatDetection: {
    telephone: false, // Prevent iOS from making phone numbers clickable
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
      className={`${spaceGrotesk.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body 
        className="antialiased bg-hive-background-primary text-hive-text-primary" 
        style={{ backgroundColor: '#0A0A0B' }}
        suppressHydrationWarning={true}
      >
        <ErrorBoundary>
          <ProductionSafetyCheck />
          <Providers>
            <WelcomeMatProvider>{children}</WelcomeMatProvider>
            <FeedbackToast />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
