import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { RootProvider } from 'fumadocs-ui/provider';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ShipNext",
  description: "An opinionated Next.js SaaS template for your next project, free and open-source.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body className={`font-sans ${inter.variable}`}>
      <RootProvider>{children}</RootProvider>
      </body>
     
    </html>
  );
}
