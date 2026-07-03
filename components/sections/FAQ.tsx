"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";

const FAQS = [
  {
    q: "Which ESPs do you work with?",
    a: "We specialize in Klaviyo, Sendlane, and Omnisend — all firearms-friendly platforms that won't shut down your account for selling legal products.",
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
  {
    q: "How does the discounted offer work?",
    a: "The Starter Plan discount ($1,000/mo instead of $2,000/mo) applies for the first 3 months for a limited number of new clients. After the introductory period, it moves to the standard rate.",
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
          <p className="font-inter mb-14 text-lg text-white/60">
            Industry players ask this to understand how emails fix revenue growth.
          </p>
        </FadeIn>

        <div className="space-y-3 text-left">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 70}>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-barlow font-bold text-base transition-colors hover:bg-white/10 cursor-pointer text-white"
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
                  className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-64" : "max-h-0"}`}
                >
                  <p
                    className="font-inter text-sm leading-relaxed px-6 pb-5 text-white/75"
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
