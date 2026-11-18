import type { Metadata } from "next";
import Creative from "../components/Creative";

export const metadata: Metadata = {
  title: "Alkotások",
  description: "Kódon túl: krimi a Wattpadon, dark fantasy webképregény, TikTok-rangsorok, vitaplatform és régi videóvágások.",
  alternates: { canonical: "/creative" },
};

export default function CreativePage() {
  return <Creative />;
}
