// Bounded Context Owner: Governance Guild
import "./globals.css";
import "@hive/ui/styles.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import AdminShell from "./shell";
import { Toaster } from "@hive/ui";
import { CommandK } from "./CommandK";

export const metadata: Metadata = {
  title: "HIVE Admin",
  description: "Administrative console for HIVE platform",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } }
};

const geistSans = GeistSans;
const geistMono = GeistMono;

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="min-h-screen bg-background text-foreground">
        <AdminShell>{children}</AdminShell>
        <CommandK />
        <Toaster />
      </body>
    </html>
  );
}
