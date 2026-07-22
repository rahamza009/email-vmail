import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free $0 Email Account Audit for Gun Stores | Email-Vmail",
  description: "Get a free 7-point email audit: flow coverage, list health, deliverability, segmentation, and compliance risk. Report back in 1 business day.",
  openGraph: {
    title: "Free $0 Email Account Audit for Gun Stores | Email-Vmail",
    description: "See where your store's email program is leaking revenue — free audit, no commitment, results in 1 business day.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free $0 Email Account Audit for Gun Stores | Email-Vmail",
    description: "Get a free 7-point email audit: flow coverage, list health, deliverability, segmentation, and compliance risk.",
  },
  alternates: { canonical: "https://emailvmail.com/audit" },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
