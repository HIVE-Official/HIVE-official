import type { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import { Providers } from './providers';
import "./globals.css";
import { WelcomeMatProvider } from '../components/welcome-mat-provider';

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-display',
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
    <html lang="en" className={`${spaceGrotesk.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body>
        <Providers>
          <WelcomeMatProvider>
            {children}
          </WelcomeMatProvider>
        </Providers>
      </body>
    </html>
  );
} 