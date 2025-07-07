import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>HIVE</title>
      </head>
      <body>
        <Providers>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}