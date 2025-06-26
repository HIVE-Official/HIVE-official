import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

// Configure Inter for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

// Configure Space Grotesk for display text
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

// Configure JetBrains Mono for code
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// Export configured fonts
export const fonts = {
  sans: inter.variable,
  display: spaceGrotesk.variable,
  mono: jetbrainsMono.variable,
}; 