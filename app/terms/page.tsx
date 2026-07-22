import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Email-Vmail",
  description: "Terms and Conditions governing your use of the Email-Vmail website and services.",
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#F5C124" }}>Legal</p>
        <h1 className="font-barlow text-4xl md:text-5xl font-black mb-4" style={{ color: "#2D3A28" }}>Terms &amp; Conditions</h1>
        <p className="font-inter text-sm mb-12" style={{ color: "rgba(45,58,40,0.45)" }}>Last updated: July 2026</p>

        <div className="space-y-10 font-inter text-base leading-relaxed" style={{ color: "rgba(45,58,40,0.8)" }}>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>1. Acceptance of Terms</h2>
            <p>By accessing or using emailvmail.com, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use this website. These terms apply to all visitors, users, and clients of Email-Vmail.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>2. Services</h2>
            <p>Email-Vmail provides done-for-you email marketing services for businesses in the firearms, ammunition, and tactical industry. The specific scope, deliverables, pricing, and terms of any engagement are governed by a separate service agreement signed between Email-Vmail and the client. These Terms and Conditions govern only the use of this website.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>3. Intellectual Property</h2>
            <p>All content on this website — including text, graphics, logos, and code — is the property of Email-Vmail or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>4. User Conduct</h2>
            <p>You agree to use this website only for lawful purposes. You must not use this site to transmit any unsolicited communications, introduce malicious code, or engage in any activity that could damage, disable, or impair the website or its infrastructure.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>5. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Email-Vmail shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on any content published here. Our total liability for any claim arising out of use of this site shall not exceed $100 USD.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>6. Third-Party Services</h2>
            <p>This website integrates with third-party services including Calendly for scheduling. Your use of those services is subject to their own terms and policies. We are not responsible for the practices or content of any third-party service.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>7. Governing Law</h2>
            <p>These Terms and Conditions are governed by the laws of the jurisdiction in which Email-Vmail operates. Any disputes arising from use of this website shall be resolved through good-faith negotiation before pursuing formal legal remedies.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>8. Modifications</h2>
            <p>We reserve the right to modify these Terms and Conditions at any time. Changes are effective immediately upon posting. The updated date at the top of this page reflects the most recent revision. Continued use of the website constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>9. Contact</h2>
            <p>For questions about these Terms and Conditions, please contact us at <a href="mailto:hello@emailvmail.com" className="underline" style={{ color: "#2D3A28" }}>hello@emailvmail.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
