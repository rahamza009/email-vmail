import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Email-Vmail",
  description: "Privacy Policy for Email-Vmail — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#F5C124" }}>Legal</p>
        <h1 className="font-barlow text-4xl md:text-5xl font-black mb-4" style={{ color: "#2D3A28" }}>Privacy Policy</h1>
        <p className="font-inter text-sm mb-12" style={{ color: "rgba(45,58,40,0.45)" }}>Last updated: July 2026</p>

        <div className="prose-custom space-y-10 font-inter text-base leading-relaxed" style={{ color: "rgba(45,58,40,0.8)" }}>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>1. Information We Collect</h2>
            <p>When you submit an audit request, book a call, or contact us through this website, we collect information you voluntarily provide, including your name, business name, email address, phone number, and details about your business. We also collect standard usage data through Google Analytics and Google Tag Manager, including pages visited, time on site, and general geographic location.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>2. How We Use Your Information</h2>
            <p>We use the information you provide to respond to audit requests, schedule strategy calls, and deliver the services you have requested. We do not sell, rent, or share your personal information with third parties for marketing purposes. Information may be shared with service providers (such as email platforms or CRM tools) solely to fulfill our services to you.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>3. Cookies and Tracking</h2>
            <p>This site uses Google Analytics (GA4) and Google Tag Manager to understand how visitors interact with our content. These tools use cookies and similar tracking technologies. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on. We do not use cookies for advertising or retargeting purposes.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>4. Data Security</h2>
            <p>We take reasonable measures to protect the information you provide, including secure transmission via HTTPS and access-controlled storage. However, no method of data transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>5. Third-Party Links</h2>
            <p>This website may contain links to external sites, including Calendly for scheduling. We are not responsible for the privacy practices of those sites and encourage you to review their respective privacy policies.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>6. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of any personal information we hold about you by contacting us directly at <a href="mailto:hello@emailvmail.com" className="underline" style={{ color: "#2D3A28" }}>hello@emailvmail.com</a>. We will respond within a reasonable timeframe.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of this website after changes are posted constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>8. Contact</h2>
            <p>For any questions regarding this Privacy Policy, please contact us at <a href="mailto:hello@emailvmail.com" className="underline" style={{ color: "#2D3A28" }}>hello@emailvmail.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
