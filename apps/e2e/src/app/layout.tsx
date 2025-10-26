import "./globals.css";
// Use a stable relative path to avoid alias resolution issues in CSS imports
import "../../../../packages/ui/styles.css";
// Align app with Storybook brand and component-level tokens
import "../../../../packages/ui/src/brand/brand.css";
import "../../../../packages/ui/src/styles/tokens.css";
import type { Metadata } from "next";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import EarlyAccessRibbon from "@web/components/layout/EarlyAccessRibbon";
import Footer from "@web/components/layout/Footer";
import AppShell from "./shell";
import { E2EProviders } from "../providers";

const metadataBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "HIVE — Campus OS run by students",
  description: "Student-owned. Tech-sleek. Trust-visible. Always evolving.",
  metadataBase: new URL(metadataBaseUrl),
  openGraph: {
    title: "HIVE — Campus OS run by students",
    description: "Student-owned. Tech-sleek. Trust-visible. Always evolving.",
    type: "website",
    url: metadataBaseUrl,
    siteName: "HIVE",
    images: [
      {
        url: "/og/hive-og.svg",
        width: 1200,
        height: 630,
        alt: "HIVE — Campus OS run by students"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HIVE — Campus OS run by students",
    description: "Student-owned. Tech-sleek. Trust-visible. Always evolving.",
    images: ["/og/hive-og.svg"],
    creator: "@hive"
  }
};

const geistSans = GeistSans;
const geistMono = GeistMono;

export default function RootLayout({ children }: { readonly children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className={`brand-hive dark ${geistSans.className} ${geistMono.className}`}>
      <body className="min-h-screen bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var key='hive-theme';
                  var stored=localStorage.getItem(key);
                  var prefersLight=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches;
                  var theme=(stored==="light"||stored==="dark")?stored:"dark";
                  var root=document.documentElement; root.classList.toggle('light', theme==='light'); root.classList.toggle('dark', theme==='dark');
                } catch(_){ /* noop */ }
              })();
            `
          }}
        />
        <E2EProviders>
          <EarlyAccessRibbon />
          <AppShell>{children}</AppShell>
          <Footer />
        </E2EProviders>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HIVE',
              url: metadataBaseUrl,
              slogan: 'Campus OS — run by students',
              sameAs: []
            })
          }}
        />
      </body>
    </html>
  );
}
