import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import StructuredData from "./components/StructuredData";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://csszabj.netlify.app"), // Frissítsd a végleges domainre ha megvan
  title: {
    default: "Csík Szabolcs | Full Stack Fejlesztő & Szoftverfejlesztő",
    template: "%s | Csík Szabolcs"
  },
  description: "Csík Szabolcs (csszabj) portfóliója. Tapasztalt Full Stack fejlesztő Kecskeméten. Webfejlesztés, React, Node.js, Java és modern szoftvermegoldások.",
  keywords: [
    "Csík Szabolcs", 
    "csszabj", 
    "Szabolcs", 
    "Csík", 
    "webfejlesztő", 
    "frontend fejlesztő", 
    "backend fejlesztő", 
    "full stack fejlesztő", 
    "Kecskemét", 
    "szoftverfejlesztő",
    "programozó",
    "portfolio",
    "React fejlesztő",
    "Node.js fejlesztő"
  ],
  authors: [{ name: "Csík Szabolcs", url: "https://github.com/csikszabi04" }],
  creator: "Csík Szabolcs",
  openGraph: {
    title: "Csík Szabolcs | Full Stack Fejlesztő",
    description: "Csík Szabolcs (csszabj) - Innovatív webes megoldások és szoftverfejlesztés.",
    url: "https://csszabj.netlify.app",
    siteName: "Csík Szabolcs Portfólió",
    images: [
      {
        url: "https://i.imgur.com/go8utBV.png", // A fő kép amit a látni akar a keresőben
        width: 1200,
        height: 630,
        alt: "Csík Szabolcs Portfólió",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Csík Szabolcs | Full Stack Fejlesztő",
    description: "Webfejlesztés és modern szoftvermegoldások.",
    images: ["https://i.imgur.com/go8utBV.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/02.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-black text-white antialiased overflow-x-hidden w-full`}>
        <StructuredData />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
