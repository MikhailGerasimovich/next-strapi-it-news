import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "IT News Portal ",
    template: "%s | IT News Portal",
  },
  description:
    "Actual news from the world of information technology, development and IT industry",
  keywords: ["news", "IT", "technology", "development", "programming"],
  authors: [{ name: "IT News Portal" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "IT News Portal",
    title: "IT News Portal | News",
    description: "Actual news from the world of information technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
