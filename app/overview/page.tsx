import type { Metadata } from "next";
import Overview from "./Overview";

export const metadata: Metadata = {
  title: "Áttekintés",
  description: "Csík Szabolcs Alex összes projektje egy helyen, körülötte a TikTok-, YouTube- és Wattpad-tartalmai.",
  alternates: { canonical: "/overview" },
};

export default function OverviewPage() {
  return <Overview />;
}
