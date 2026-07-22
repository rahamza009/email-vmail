import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Email-Vmail",
  description: "Meet Ameer Hamza, founder of Email-Vmail — a done-for-you email marketing agency built exclusively for the firearms, ammo, and tactical industry.",
  robots: { index: true, follow: true },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
