import type { Metadata, Viewport } from "next";
import { Outfit, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const shippori = Shippori_Mincho({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-shippori", display: "swap" });

export const metadata: Metadata = {
  title: "Nami Sushi Bar: Kaiten sushi",
  description: "Grab a plate off the belt. The colour of the plate tells you the price.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#14130f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${shippori.variable}`}>
      <body>{children}</body>
    </html>
  );
}
