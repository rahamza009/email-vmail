"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";

const FAQS = [
  {
    q: "Which ESPs do you work with?",
    a: "It depends on your business size and channel needs. For Starter and Growth stores on Shopify, Klaviyo is the go-to — it updated its policy to permit firearms messaging and has strong flow and segmentation tooling. ActiveCampaign is a solid email-only alternative that explicitly allows firearms businesses. For SMS and email combined, OtterText is the only platform purpose-built for firearms and 2A compliance — we recommend it across all tiers. At the Scale tier, Listrak is enterprise-grade and openly supports firearm retailers, though the cost reflects that. Celerant is ideal for stores with physical retail and POS needs — it pairs with OtterText for compliant email and SMS across the full stack. We steer clear of Mailchimp (high suspension risk), Sendlane (explicitly does not support 2A), and GoHighLevel for SMS (it runs on Twilio underneath, which blocks firearm-related texting).",
  },
  {
    q: "Do you work with firearms businesses specifically?",
    a: "Yes — exclusively. Every strategy, template, and flow we build is tailored for the tactical industry. We understand compliance, buyer psychology, and the unique challenges of this space.",
  },
  {
    q: "What's included in the audit?",
    a: "Your free Revenue Gap Audit covers: current flow analysis, list health check, deliverability review, and a revenue opportunity breakdown — delivered in a clear PDF report within 7 days.",
  },
  {
    q: "How long before we see results?",
    a: "Most clients see measurable improvements in open rates and click-throughs within the first 30 days. Revenue impact from automations typically begins in weeks 2–6 as flows trigger for real buyers.",
  },
  {
    q: "What if we have a small list?",
    a: "We work best with stores at 2,000+ subscribers, but happy to chat if you're close. A smaller but engaged list can still produce strong results with the right strategy.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 px-6" style={{ backgroundColor: "#2D3A28" }}>
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            Common Questions
          </h2>
          <p className="font-inter mb-14 text-xl text-white/60">
            Industry players ask this to understand how emails fix revenue growth.
          </p>
        </FadeIn>

        <div className="space-y-3 text-left">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 70}>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-barlow font-bold text-lg transition-colors hover:bg-white/10 cursor-pointer text-white"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span
                    className="ml-4 text-2xl leading-none flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: "#F5C124",
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-[500px]" : "max-h-0"}`}
                >
                  <p
                    className="font-inter text-base leading-relaxed px-6 pb-5 text-white/75"
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
