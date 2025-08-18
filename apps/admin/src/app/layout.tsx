import type { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

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
    <html lang="en" className={`${spaceGrotesk.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 