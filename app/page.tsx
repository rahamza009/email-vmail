import type { Metadata } from "next";
import { getPageSeo } from "@/lib/getPageSeo";
import HomeClient from "./HomeClient";

const DEFAULT_TITLE = "Email-Vmail | DFY Email Marketing for Firearms & 2A Brands";
const DEFAULT_DESC  = "Done-For-You email marketing agency for gun stores, FFL dealers, ammo retailers, and 2A brands. ESP-compliant lifecycle systems that turn subscribers into repeat buyers.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return {
    title:       seo?.metaTitle       || DEFAULT_TITLE,
    description: seo?.metaDescription || DEFAULT_DESC,
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which ESPs do you work with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on your business size and channel needs. Klaviyo is the go-to for Starter and Growth stores on Shopify — it updated its policy to permit firearms messaging. ActiveCampaign is a solid email-only alternative that explicitly allows firearms businesses. For SMS and email combined, OtterText is the only platform purpose-built for firearms and 2A compliance. Listrak is enterprise-grade for Scale-level stores. Celerant fits stores with physical retail and POS operations. We avoid Mailchimp (high suspension risk), Sendlane (explicitly excludes 2A businesses), and GoHighLevel (runs on Twilio, which prohibits firearm-related SMS)."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with firearms businesses specifically?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, exclusively. Every strategy, template, and flow is tailored for the tactical industry, including compliance, buyer psychology, and the unique challenges of firearms, ammo, and tactical gear ecommerce."
                }
              },
              {
                "@type": "Question",
                "name": "What's included in the audit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The free Revenue Gap Audit covers current flow analysis, list health check, deliverability review, and a revenue opportunity breakdown, delivered as a PDF report within 7 days."
                }
              },
              {
                "@type": "Question",
                "name": "How long before we see results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most clients see measurable improvements in open rates and click-throughs within the first 30 days. Revenue impact from automations typically begins in weeks 2 to 6 as flows trigger for real buyers."
                }
              },
              {
                "@type": "Question",
                "name": "What if we have a small list?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We work best with stores at 2,000 or more subscribers, but a smaller, engaged list can still produce strong results with the right strategy."
                }
              }
            ]
          })
        }}
      />
      <HomeClient />
    </>
  );
}
