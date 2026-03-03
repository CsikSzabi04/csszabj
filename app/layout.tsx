import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

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
  title: "Csík Szabolcs Alex | Full Stack Developer",
  description: "Portfolio of Csík Szabolcs Alex - Full Stack Developer based in Kecskemét, Hungary.",
  keywords: ["Full Stack Developer", "React", "Node.js", "Portfolio"],
  authors: [{ name: "Csík Szabolcs Alex" }],
  openGraph: {
    title: "Csík Szabolcs Alex | Full Stack Developer",
    description: "Passionate full stack developer",
    type: "website",
    locale: "hu_HU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-black text-white antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
