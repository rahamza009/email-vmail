import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Email-Vmail",
  description: "Disclaimer for Email-Vmail — important information about the nature of our content and services.",
};

export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#F5C124" }}>Legal</p>
        <h1 className="font-barlow text-4xl md:text-5xl font-black mb-4" style={{ color: "#2D3A28" }}>Disclaimer</h1>
        <p className="font-inter text-sm mb-12" style={{ color: "rgba(45,58,40,0.45)" }}>Last updated: July 2026</p>

        <div className="space-y-10 font-inter text-base leading-relaxed" style={{ color: "rgba(45,58,40,0.8)" }}>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>General Information Only</h2>
            <p>The content published on emailvmail.com — including blog posts, case studies, guides, and service descriptions — is provided for general informational purposes only. Nothing on this website constitutes legal, compliance, financial, or business advice. You should consult qualified professionals before making decisions based on any information found here.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>No Results Guarantee</h2>
            <p>Results described in case studies, testimonials, or examples on this website reflect specific client engagements and circumstances. They are not guarantees of future performance. Email marketing results vary based on list size, industry, product type, ESP, audience quality, and numerous other factors outside our control. Individual results will differ.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>ESP and Platform Compliance</h2>
            <p>Email service provider (ESP) policies change frequently. While we stay current with platform terms of service and build compliant systems, we cannot guarantee that any ESP will not revise its policies in ways that affect your account. We are not liable for account suspensions, platform bans, or policy changes made by third-party email platforms.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>External Links</h2>
            <p>This website may link to third-party resources for reference. We do not control the content of external sites and are not responsible for their accuracy, availability, or compliance with applicable laws. Links are provided for convenience and do not imply endorsement.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>Accuracy of Information</h2>
            <p>We make reasonable efforts to keep the information on this website accurate and current. However, we make no warranties or representations regarding the completeness, reliability, or timeliness of any content. We reserve the right to update, revise, or remove content at any time without notice.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>Contact</h2>
            <p>Questions about this disclaimer can be directed to <a href="mailto:hello@emailvmail.com" className="underline" style={{ color: "#2D3A28" }}>hello@emailvmail.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
