import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  title: "HIVE Admin",
  description: "HIVE administration and moderation tools.",
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
      style={{ colorScheme: 'dark' }}
    >
      <body className={`${GeistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
} 
