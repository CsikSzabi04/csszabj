import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import StructuredData from "./components/StructuredData";
import { SITE_URL } from "./lib/site";

const inter = Inter({
  variable: "--font-inter",
  // latin-ext contains the Hungarian ő / ű glyphs
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Runs before the first paint: skips the intro splash when it was already shown in this tab
// session or the visitor prefers reduced motion, so reloads don't flash it again.
const splashScript = `try{if(sessionStorage.getItem("cs-splash-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("splash-seen")}catch(e){}`;

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: "Csík Szabolcs Portfólió",
    images: [
      {
        url: "/images/profile.png",
        width: 292,
        height: 391,
        alt: "Csík Szabolcs Portfólió",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Csík Szabolcs | Full Stack Fejlesztő",
    description: "Webfejlesztés és modern szoftvermegoldások.",
    images: ["/images/profile.png"],
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
    <html lang="hu" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </head>
      <body className={`${inter.variable} font-sans bg-black text-white antialiased overflow-x-hidden w-full`}>
        <StructuredData />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
