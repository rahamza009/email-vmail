import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";
import CallPopover from "@/components/CallPopover";
import { getServiceContent } from "@/lib/getServiceContent";

export const revalidate = 60;

const DEFAULT_TITLE = "Email Marketing for Knife Stores, Hunting & Outdoor Gear Brands | Email-Vmail";
const DEFAULT_DESC  = "Email marketing agency for knife stores, hunting retailers, tactical gear brands, EDC companies, and outdoor gear ecommerce across the United States. Lifecycle and retention systems that build repeat purchases and grow customer lifetime value.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getServiceContent("knife-tactical-outdoor");
  return {
    title:       cms?.seo?.metaTitle       || DEFAULT_TITLE,
    description: cms?.seo?.metaDescription || DEFAULT_DESC,
    alternates: { canonical: "https://emailvmail.com/services/knife-tactical-outdoor" },
  };
}

const GRID_SVG = (size: number) =>
  `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D3A28' fill-opacity='1'%3E%3Cpath d='M0 0h2v${size}H0zm${size - 2} 0h2v${size}h-2zM0 0v2h${size}V0zm0 ${size - 2}v2h${size}v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

const PAIN_POINTS = [
  {
    num: "01",
    title: "Poor Customer Segmentation",
    body: "We split your list by what they love, not just when they bought: collectors, hunters, everyday carriers, campers, and gift shoppers all need their own path. We build that path from first email to repeat buy to win-back.",
  },
  {
    num: "02",
    title: "Generic Customer Journeys",
    body: "Timing matters more here than most trades. Hunt season brings one wave of buyers. Gift season brings a second wave. New drops bring a third. We build your plan around your real year, not a flat template built for any store, anywhere.",
  },
  {
    num: "03",
    title: "Low Repeat Purchases",
    body: "The first purchase should never be the last. Without post-purchase journeys, cross-sell, upsell, and win-back automations, customers naturally drift — and never reach their full lifetime value for your store.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "Smarter Customer Segmentation",
    body: "We organize your audience by purchase history, product interests, engagement, and buying behavior so every customer receives more relevant emails that convert and keep them coming back.",
  },
  {
    num: "02",
    title: "Lifecycle Customer Journeys",
    body: "From welcome flows and browse recovery to post-purchase follow-ups and win-back campaigns, we build journeys that guide subscribers from their first interaction to repeat purchases.",
  },
  {
    num: "03",
    title: "Higher Customer Lifetime Value",
    body: "We create cross-sell, upsell, replenishment, and loyalty automations that keep customers engaged long after their first order — increasing lifetime value without increasing acquisition costs.",
  },
];

const PHASES = [
  {
    num: "01",
    title: "Protect",
    body: "Build a reliable email foundation that keeps your list healthy, your deliverability strong, and every campaign performing.",
    items: ["Deliverability Best Practices", "Email Infrastructure", "Template Optimization", "List Health & Hygiene"],
  },
  {
    num: "02",
    title: "Grow",
    body: "Generate consistent revenue through strategic campaigns, lifecycle automations, and customer journeys built around how outdoor enthusiasts actually shop.",
    items: ["Revenue Campaign Calendar", "Lifecycle Automations", "Customer Journeys", "Promotional Campaigns"],
  },
  {
    num: "03",
    title: "Scale",
    body: "Increase customer lifetime value through advanced segmentation, ongoing optimization, and revenue-focused lifecycle strategies that compound over time.",
    items: ["Advanced Customer Segmentation", "Customer Lifetime Value Growth", "Revenue Optimization", "Performance Reporting"],
  },
];

const WHY_US = [
  {
    title: "Customer-First Strategy",
    body: "Every campaign and automation is built around the interests, buying behavior, and purchase lifecycle of outdoor and enthusiast customers — not a generic ecommerce template.",
  },
  {
    title: "Industry-Specific Lifecycle Marketing",
    body: "We understand seasonal demand, product launches, accessories, collections, and repeat buying patterns unique to knife, tactical, and outdoor brands.",
  },
  {
    title: "Revenue-Focused Execution",
    body: "We focus on the metrics that matter most — repeat purchases, customer lifetime value, and attributable email revenue — not vanity metrics.",
  },
];

const TAG = "font-barlow text-base font-bold tracking-[0.2em] uppercase mb-3 text-center";
const CARD_BODY = "font-inter text-xl leading-relaxed";

export default async function KnifeTacticalOutdoorPage() {
  const cms = await getServiceContent("knife-tactical-outdoor");

  const heroTag    = cms?.heroTag      || "Knife, Hunting & EDC";
  const h1Line1    = cms?.heroH1Line1  || "Email Marketing for Knife Stores,";
  const h1Line2    = cms?.heroH1Line2  || "Hunting Retailers & Outdoor Gear Brands";
  const heroSub    = cms?.heroSubhead  || "Knife stores and hunting retailers sell differently than mainstream ecommerce. Buyers feel real pride in what they carry. Generic email marketing misses that entirely.";
  const probTag    = cms?.problemTag   || "The Revenue Leaks";
  const probH2L1   = cms?.problemH2Line1 || "Are You Aware of Revenue Leaks";
  const probH2L2   = cms?.problemH2Line2 || "in Your Email Setup?";
  const painPoints = cms?.painPoints?.length ? cms.painPoints : PAIN_POINTS;
  const ctaH2L1    = cms?.ctaH2Line1  || "Ready to Turn Subscribers Into";
  const ctaH2L2    = cms?.ctaH2Line2  || "Repeat Customers?";
  const ctaBody    = cms?.ctaBody     || "Let's uncover the biggest revenue leaks in your email program and build a lifecycle strategy that keeps customers coming back — again and again.";

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

            <p className="font-inter text-2xl md:text-3xl max-w-3xl mx-auto mb-4 leading-relaxed" style={{ color: "rgba(45,58,40,0.75)" }}>
              {heroSub}
            </p>
            <p className="font-inter text-lg max-w-2xl mx-auto mb-10" style={{ color: "rgba(45,58,40,0.5)" }}>
              Serving knife stores, hunting retailers, EDC brands, tactical gear companies, outdoor gear ecommerce, survival gear retailers, and self-defense product businesses across the United States.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
              <AuditPopover position="above">
                <a href="/audit" className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block text-center w-full sm:w-[240px]" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
                  Get $0 Account Audit
                </a>
              </AuditPopover>
              <CallPopover position="above">
                <a href="https://calendly.com/rahamza009-dzou/30min" target="_blank" rel="noopener noreferrer" className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors text-center w-full sm:w-[240px] block bg-white hover:bg-[#F5C124] active:bg-[#C9930A] hover:border-[#F5C124] active:border-[#C9930A]" style={{ borderColor: "#2D3A28", color: "#2D3A28" }}>
                  Book a Strategy Call
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
              {probH2L1}<br />{probH2L2}
            </h2>
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
              Turn One-Time Buyers Into<br />Loyal Customers
            </h2>
            <p className="font-inter text-xl text-center mb-14 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              We build lifecycle email marketing systems that increase customer retention, maximize customer lifetime value, and generate predictable repeat revenue for knife, tactical, and outdoor brands.
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

      {/* ── Framework ─────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className={TAG} style={{ color: "#F5C124" }}>Our Framework</p>
            <h2 className="font-barlow text-3xl md:text-4xl font-black text-center mb-3" style={{ color: "#2D3A28" }}>
              From Subscribed to Sold, Again and Again.
            </h2>
            <p className="font-inter text-xl text-center mb-14 max-w-2xl mx-auto" style={{ color: "rgba(45,58,40,0.6)" }}>
              A three-phase lifecycle email marketing framework that turns subscribers into loyal repeat customers while continuously increasing customer lifetime value.
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
            <p className={TAG} style={{ color: "#F5C124" }}>Why Email-Vmail</p>
            <h2 className="font-barlow text-3xl md:text-4xl font-black text-center mb-3" style={{ color: "#2D3A28" }}>
              We Craft Emails for Users,<br />Not Customers.
            </h2>
            <p className="font-inter text-xl text-center mb-14 max-w-2xl mx-auto" style={{ color: "rgba(45,58,40,0.6)" }}>
              Knife, tactical, hunting, and outdoor customers don&apos;t buy like the average online shopper. These users attach emotions to whatever they buy — and we acknowledge it.
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
