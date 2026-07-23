import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";
import CallPopover from "@/components/CallPopover";
import { getServiceContent } from "@/lib/getServiceContent";

export const revalidate = 60;

const DEFAULT_TITLE = "Email Marketing Agency for Gun Stores & FFL Dealers | Email-Vmail";
const DEFAULT_DESC  = "Email marketing agency for gun stores, FFL dealers, and ammo retailers across the United States. Compliance-first lifecycle and retention systems that grow customer lifetime value and drive repeat revenue for firearms ecommerce.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getServiceContent("firearms-ammo");
  return {
    title:       cms?.seo?.metaTitle       || DEFAULT_TITLE,
    description: cms?.seo?.metaDescription || DEFAULT_DESC,
    alternates: { canonical: "https://emailvmail.com/services/firearms-ammo" },
  };
}

const GRID_SVG = (size: number) =>
  `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D3A28' fill-opacity='1'%3E%3Cpath d='M0 0h2v${size}H0zm${size - 2} 0h2v${size}h-2zM0 0v2h${size}V0zm0 ${size - 2}v2h${size}v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

const PAIN_POINTS = [
  {
    num: "01",
    title: "Compliance Risk",
    body: "Email is one of your highest-ROI channels, but firearms retailers operate under stricter ESP policies than most ecommerce brands. A compliance misstep can disrupt campaigns and automations, putting your most valuable revenue stream at risk.",
  },
  {
    num: "02",
    title: "Low Customer Lifetime Value",
    body: "The next problem is repeat sales. Most FFL dealers win a buyer once, then the tie ends there. No restock note. No related offer. No reason to return. We build the flows that fix this: welcome notes, post-sale check-ins, restock alerts, and win-back sends.",
  },
  {
    num: "03",
    title: "One-Size-Fits-All Emails",
    body: "The third problem is flat copy. A first-time buyer and a top collector should not get the same note. We split your list by what they bought, what they like, and how active they are. This works the same in Texas, Florida, Ohio, and Georgia alike.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "Protect Your Revenue",
    body: "Firearms retailers face unique ESP requirements. We build campaigns and automations that prioritize long-term account health — growing your email revenue without taking unnecessary compliance risks.",
  },
  {
    num: "02",
    title: "Grow Customer Lifetime Value",
    body: "The first purchase is only the beginning. We create post-purchase journeys, replenishment reminders, cross-sells, and win-back campaigns that bring customers back for their second, third, and fourth order.",
  },
  {
    num: "03",
    title: "Maximize Revenue Per Recipient",
    body: "No two customers buy the same way. We segment by purchase history, product interests, and buying behavior to deliver relevant emails that increase conversions and compound repeat revenue over time.",
  },
];

const PHASES = [
  {
    num: "01",
    title: "Protect",
    body: "Build a strong foundation with compliance-first practices that keep your account healthy and your revenue protected.",
    items: ["Compliance Review", "ESP Best Practices", "Template & Content Review", "Deliverability & Account Health"],
  },
  {
    num: "02",
    title: "Grow",
    body: "Generate consistent revenue through strategic campaigns, lifecycle automations, and customer journeys built for firearms retailers.",
    items: ["Revenue Campaign Calendar", "Lifecycle Automations", "Customer Journeys", "Promotional Campaigns"],
  },
  {
    num: "03",
    title: "Scale",
    body: "Turn every customer into a higher-value customer through segmentation, optimization, and lifecycle refinement that compounds over time.",
    items: ["Advanced Customer Segmentation", "Customer Lifetime Value Growth", "Revenue Optimization", "Performance Reporting"],
  },
];

const WHY_US = [
  {
    title: "Compliance-First Strategy",
    body: "Every campaign and automation is built around long-term account health and ESP best practices for regulated ecommerce — not adapted from a generic playbook.",
  },
  {
    title: "Industry-Specific Lifecycle Marketing",
    body: "We understand how firearms customers buy — first purchase through replenishment, accessories, and repeat orders — and build email journeys around that behavior.",
  },
  {
    title: "Revenue-Focused Execution",
    body: "We don't chase vanity metrics. Every decision is made to increase repeat purchases, customer lifetime value, and measurable email revenue for your store.",
  },
];

const TAG = "font-barlow text-base font-bold tracking-[0.2em] uppercase mb-3 text-center";
const CARD_BODY = "font-inter text-xl leading-relaxed";

export default async function FirearmsAmmoPage() {
  const cms = await getServiceContent("firearms-ammo");

  const heroTag    = cms?.heroTag      || "More Revenue. Less Compliance Risk.";
  const h1Line1    = cms?.heroH1Line1  || "Email Marketing Agency for Gun Stores,";
  const h1Line2    = cms?.heroH1Line2  || "FFL Dealers & Ammo Retailers";
  const heroSub    = cms?.heroSubhead  || "Gun stores face stricter rules than most online shops. One wrong move with your email tool can freeze your whole list. We fix that first.";
  const probTag    = cms?.problemTag   || "The Problem";
  const probH2L1   = cms?.problemH2Line1 || "Want to Generate More Revenue from Email?";
  const probH2L2   = cms?.problemH2Line2 || "Start by fixing these 3 things.";
  const painPoints = cms?.painPoints?.length ? cms.painPoints : PAIN_POINTS;
  const ctaH2L1    = cms?.ctaH2Line1  || "Ready to Turn Your Gun Store’s";
  const ctaH2L2    = cms?.ctaH2Line2  || "Subscribers Into Repeat Buyers?";
  const ctaBody    = cms?.ctaBody     || "We work with gun stores, FFL dealers, and ammo retailers across the United States. Let’s find the biggest revenue leaks in your email program and build the lifecycle system that fixes them.";

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative flex items-center justify-center pt-32 pb-24 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRID_SVG(40), opacity: 0.055, animation: "gridDrift 18s linear infinite" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRID_SVG(70), opacity: 0.03, animation: "gridDriftReverse 28s linear infinite" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-block mb-5">
              <p className="font-barlow text-sm font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full" style={{ color: "#F5C124", backgroundColor: "#2D3A28" }}>
                {heroTag}
              </p>
            </div>

            <h1 className="font-barlow text-4xl md:text-5xl font-black leading-[1.1] mb-6" style={{ color: "#2D3A28" }}>
              {h1Line1}<br />{h1Line2}
            </h1>

            <p className="font-inter text-2xl md:text-3xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(45,58,40,0.75)" }}>
              {heroSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
              <AuditPopover position="above">
                <a href="/audit" className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block text-center w-full sm:w-[240px]" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
                  Get $0 Account Audit
                </a>
              </AuditPopover>
              <CallPopover position="above">
                <a href="https://calendly.com/rahamza009-dzou/30min" target="_blank" rel="noopener noreferrer" className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors text-center w-full sm:w-[240px] block bg-white hover:bg-[#F5C124] active:bg-[#C9930A] hover:border-[#F5C124] active:border-[#C9930A]" style={{ borderColor: "#2D3A28", color: "#2D3A28" }}>
                  Fix My Retention
                </a>
              </CallPopover>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem ───────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className={TAG} style={{ color: "#F5C124" }}>{probTag}</p>
            <h2 className="font-barlow text-3xl md:text-4xl font-black text-center mb-3" style={{ color: "#2D3A28" }}>
              {probH2L1}
            </h2>
            <p className="font-inter text-xl text-center mb-14 max-w-xl mx-auto" style={{ color: "rgba(45,58,40,0.6)" }}>
              {probH2L2}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => (
              <FadeIn key={p.num} delay={i * 100}>
                <div className="rounded-2xl p-9 h-full" style={{ backgroundColor: "#F9FAFB", border: "1px solid #F5C124" }}>
                  <span className="font-barlow text-4xl font-black block mb-5" style={{ color: "rgba(45,58,40,0.12)" }}>{p.num}</span>
                  <h3 className="font-barlow text-2xl font-black mb-4" style={{ color: "#2D3A28", minHeight: "64px" }}>{p.title}</h3>
                  <p className={CARD_BODY} style={{ color: "rgba(45,58,40,0.7)" }}>{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ──────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#2D3A28" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className={TAG} style={{ color: "#F5C124" }}>The Solution</p>
            <h2 className="font-barlow text-3xl md:text-4xl font-black text-center mb-3 text-white">
              Here&apos;s How We Turn Email Into<br />Your Highest-ROI Channel.
            </h2>
            <p className="font-inter text-xl text-center mb-14 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              Compliance-first lifecycle systems that protect your account, maximize customer lifetime value, and generate predictable repeat revenue.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOLUTIONS.map((s, i) => (
              <FadeIn key={s.title} delay={i * 100}>
                <div className="rounded-2xl p-9 h-full" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,193,36,0.45)" }}>
                  <span className="font-barlow text-4xl font-black block mb-5" style={{ color: "rgba(245,193,36,0.2)" }}>{s.num}</span>
                  <h3 className="font-barlow text-2xl font-black mb-4" style={{ color: "#F5C124", minHeight: "64px" }}>{s.title}</h3>
                  <p className={CARD_BODY} style={{ color: "rgba(255,255,255,0.65)" }}>{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className={TAG} style={{ color: "#F5C124" }}>Our Process</p>
            <h2 className="font-barlow text-3xl md:text-4xl font-black text-center mb-3" style={{ color: "#2D3A28" }}>
              Our Lifecycle Revenue Framework
            </h2>
            <p className="font-inter text-xl text-center mb-14 max-w-2xl mx-auto" style={{ color: "rgba(45,58,40,0.6)" }}>
              A proven process that protects your email program, grows repeat revenue, and continuously improves customer lifetime value.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHASES.map((phase, i) => (
              <FadeIn key={phase.num} delay={i * 100}>
                <div className="rounded-2xl p-9 h-full" style={{ backgroundColor: "#F9FAFB", border: "1px solid rgba(45,58,40,0.3)" }}>
                  <div className="mb-5">
                    <span className="font-barlow text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
                      Phase {phase.num}
                    </span>
                  </div>
                  <h3 className="font-barlow text-2xl font-black mb-3" style={{ color: "#2D3A28", minHeight: "36px" }}>{phase.title}</h3>
                  <p className={CARD_BODY + " mb-6"} style={{ color: "rgba(45,58,40,0.65)" }}>{phase.body}</p>
                  <ul className="space-y-2.5">
                    {phase.items.map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F5C124" }} />
                        <span className="font-inter text-lg" style={{ color: "rgba(45,58,40,0.75)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className={TAG} style={{ color: "#F5C124" }}>Why Us</p>
            <h2 className="font-barlow text-3xl md:text-4xl font-black text-center mb-3" style={{ color: "#2D3A28" }}>
              An Email Marketing Agency Built for<br />Gun Stores — Not Generic Ecommerce.
            </h2>
            <p className="font-inter text-xl text-center mb-14 max-w-xl mx-auto" style={{ color: "rgba(45,58,40,0.6)" }}>
              Most email marketing agencies treat FFL dealers and firearms retailers like any other online store. We don&apos;t — and that difference shows in your results.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="rounded-2xl p-9 h-full bg-white" style={{ border: "1px solid #2D3A28" }}>
                  <h3 className="font-barlow text-2xl font-black mb-4" style={{ color: "#2D3A28", minHeight: "64px" }}>{item.title}</h3>
                  <p className={CARD_BODY} style={{ color: "rgba(45,58,40,0.7)" }}>{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-barlow text-3xl md:text-4xl font-black mb-4" style={{ color: "#2D3A28" }}>
              {ctaH2L1}<br />{ctaH2L2}
            </h2>
            <p className="font-inter text-xl mb-8" style={{ color: "rgba(45,58,40,0.65)" }}>
              {ctaBody}
            </p>
            <AuditPopover position="above">
              <a href="/audit" className="inline-block font-barlow font-bold px-10 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
                Get $0 Account Audit
              </a>
            </AuditPopover>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
