import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tactical Gear & Ammo Marketplace (Coming Soon) | Email-Vmail",
  description: "A curated wholesale marketplace for tactical gear and ammunition, sourced from verified brands for dealers and retailers.",
  openGraph: {
    title: "Tactical Gear & Ammo Marketplace | Email-Vmail",
    description: "A new wholesale vertical for tactical gear and ammo — join the wish list to get early access.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tactical Gear & Ammo Marketplace (Coming Soon) | Email-Vmail",
    description: "A curated wholesale marketplace for tactical gear and ammunition, sourced from verified brands.",
  },
  alternates: { canonical: "https://emailvmail.com/tactical-merchandise" },
};

export default function TacticalMerchandiseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
