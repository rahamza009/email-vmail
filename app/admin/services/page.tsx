"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PageKey = "firearms-ammo" | "knife-tactical-outdoor" | "growth-services";

interface PainCard { num: string; title: string; body: string; }
interface PageSeo { metaTitle: string; metaDescription: string; }
interface ServiceContent {
  heroTag: string; heroH1Line1: string; heroH1Line2: string; heroSubhead: string;
  problemTag: string; problemH2Line1: string; problemH2Line2: string;
  painPoints: PainCard[];
  services: string[];
  ctaH2Line1: string; ctaH2Line2: string; ctaBody: string;
  seo: PageSeo;
}

const DEFAULTS: Record<PageKey, ServiceContent> = {
  "firearms-ammo": {
    heroTag: "More Revenue. Less Compliance Risk.",
    heroH1Line1: "Email Marketing Agency for Gun Stores,",
    heroH1Line2: "FFL Dealers & Ammo Retailers",
    heroSubhead: "Gun stores face stricter rules than most online shops. One wrong move with your email tool can freeze your whole list. We fix that first.",
    problemTag: "The Problem",
    problemH2Line1: "Want to Generate More Revenue from Email?",
    problemH2Line2: "Start by fixing these 3 things.",
    painPoints: [
      { num: "01", title: "Compliance Risk", body: "Email is one of your highest-ROI channels, but firearms retailers operate under stricter ESP policies than most ecommerce brands. A compliance misstep can disrupt campaigns and automations, putting your most valuable revenue stream at risk." },
      { num: "02", title: "Low Customer Lifetime Value", body: "The next problem is repeat sales. Most FFL dealers win a buyer once, then the tie ends there. No restock note. No related offer. No reason to return. We build the flows that fix this: welcome notes, post-sale check-ins, restock alerts, and win-back sends." },
      { num: "03", title: "One-Size-Fits-All Emails", body: "A first-time buyer and a top collector should not get the same note. We split your list by what they bought, what they like, and how active they are. This works the same in Texas, Florida, Ohio, and Georgia alike." },
    ],
    services: [
      "Compliance Review",
      "ESP Best Practices",
      "Template & Content Review",
      "Deliverability & Account Health",
      "Revenue Campaign Calendar",
      "Lifecycle Automations",
      "Advanced Customer Segmentation",
      "Performance Reporting",
    ],
    ctaH2Line1: "Ready to Turn Your Gun Store's",
    ctaH2Line2: "Subscribers Into Repeat Buyers?",
    ctaBody: "We work with gun stores, FFL dealers, and ammo retailers across the United States. Let's find the biggest revenue leaks in your email program and build the lifecycle system that fixes them.",
    seo: {
      metaTitle: "Email Marketing Agency for Gun Stores & FFL Dealers | Email-Vmail",
      metaDescription: "Email marketing agency for gun stores, FFL dealers, and ammo retailers across the United States. Compliance-first lifecycle and retention systems that grow customer lifetime value and drive repeat revenue for firearms ecommerce.",
    },
  },
  "knife-tactical-outdoor": {
    heroTag: "Knife, Hunting & EDC",
    heroH1Line1: "Email Marketing for Knife Stores,",
    heroH1Line2: "Hunting Retailers & Outdoor Gear Brands",
    heroSubhead: "Knife stores and hunting retailers sell differently than mainstream ecommerce. Buyers feel real pride in what they carry. Generic email marketing misses that entirely.",
    problemTag: "The Revenue Leaks",
    problemH2Line1: "Are You Aware of Revenue Leaks",
    problemH2Line2: "in Your Email Setup?",
    painPoints: [
      { num: "01", title: "Poor Customer Segmentation", body: "We split your list by what they love, not just when they bought: collectors, hunters, everyday carriers, campers, and gift shoppers all need their own path. We build that path from first email to repeat buy to win-back." },
      { num: "02", title: "Generic Customer Journeys", body: "Timing matters more here than most trades. Hunt season brings one wave of buyers. Gift season brings a second wave. New drops bring a third. We build your plan around your real year, not a flat template built for any store, anywhere." },
      { num: "03", title: "Low Repeat Purchases", body: "The first purchase should never be the last. Without post-purchase journeys, cross-sell, upsell, and win-back automations, customers naturally drift — and never reach their full lifetime value for your store." },
    ],
    services: [
      "Seasonal campaign calendar (hunt season, gift season, new drops)",
      "Browse abandonment and multi-touch nurture sequences",
      "Post-purchase accessory and care kit cross-sell flows",
      "New collection and product drop announcement emails",
      "EDC education and product showcase sequences",
      "Seasonal win-back campaigns for lapsed buyers",
      "Segmentation by product category and order value",
      "Monthly campaign management and performance reporting",
    ],
    ctaH2Line1: "Ready to Turn Subscribers Into",
    ctaH2Line2: "Repeat Customers?",
    ctaBody: "Let's uncover the biggest revenue leaks in your email program and build a lifecycle strategy that keeps customers coming back — again and again.",
    seo: {
      metaTitle: "Email Marketing for Knife Stores, Hunting & Outdoor Gear Brands | Email-Vmail",
      metaDescription: "Email marketing agency for knife stores, hunting retailers, tactical gear brands, EDC companies, and outdoor gear ecommerce across the United States. Lifecycle and retention systems that build repeat purchases and grow customer lifetime value.",
    },
  },
  "growth-services": {
    heroTag: "Digital Marketing Agency for Gun Stores",
    heroH1Line1: "One Partner for Everything",
    heroH1Line2: "Your Firearms Store Needs to Grow",
    heroSubhead: "Web development, SEO for firearms ecommerce, content writing, and compliant digital marketing — built by people who know the 2A industry.",
    problemTag: "What We Offer",
    problemH2Line1: "Four Services. One Partner.",
    problemH2Line2: "Built for Firearms & Tactical Brands.",
    painPoints: [
      { num: "01", title: "Web Development & Store Management", body: "High-converting, compliant storefronts built for the firearms and tactical industry. From Shopify customization to full-stack builds — we handle development, ongoing maintenance, and performance optimization so your store stays fast, functional, and converting." },
      { num: "02", title: "Industry-Compatible SEO", body: "Search engine optimization built around the unique restrictions of the firearms and tactical space. We target high-intent keywords, build compliant content architecture, and grow your organic visibility without triggering platform restrictions or policy flags." },
      { num: "03", title: "Niche Content Writing", body: "Product descriptions, blog posts, buying guides, and brand copy written by people who actually understand the industry. Accurate terminology, compliant language, and content that converts — not generic AI copy that sounds like it was written by someone who's never held a firearm." },
      { num: "04", title: "Compliant Digital Marketing", body: "Paid and organic marketing strategies that work within the strict advertising policies of the 2A space. We know what Google, Meta, and other platforms will and won't allow — and we build campaigns that generate revenue without getting your accounts flagged or banned." },
    ],
    services: [
      "High-converting storefront development",
      "Shopify customization & maintenance",
      "SEO for firearms ecommerce",
      "Compliant content architecture",
      "Product descriptions & buying guides",
      "Compliant digital marketing campaigns",
      "Google & Meta policy-safe ad strategy",
      "Performance reporting with clear KPIs",
    ],
    ctaH2Line1: "Ready to Grow Your Store",
    ctaH2Line2: "With the Right Partner?",
    ctaBody: "Tell us about your current challenges and which services you need. We'll follow up within 1 business day with a clear plan.",
    seo: {
      metaTitle: "Digital Marketing Agency for Gun Stores | SEO, Web & Content | Email-Vmail",
      metaDescription: "Digital marketing agency for gun stores, FFL dealers, and 2A brands in the United States. SEO for firearms ecommerce, web development, and content writing — one partner for everything your store needs to grow online.",
    },
  },
};

const TABS: { key: PageKey; label: string }[] = [
  { key: "firearms-ammo",        label: "Firearms & Ammo" },
  { key: "knife-tactical-outdoor", label: "Knife, Tactical & Outdoor" },
  { key: "growth-services",      label: "Growth Services" },
];

function Input({ label, value, onChange, rows, max }: { label: string; value: string; onChange: (v: string) => void; rows?: number; max?: number }) {
  const len = value.length;
  const countColor = !max ? undefined : len === 0 ? "rgba(45,58,40,0.3)" : len <= max * 0.85 ? "#16a34a" : len <= max ? "#ca8a04" : "#dc2626";
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.5)" }}>{label}</label>
        {max && <span className="font-inter text-xs font-semibold tabular-nums" style={{ color: countColor }}>{len}/{max}</span>}
      </div>
      {rows ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
          className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none transition-colors focus:border-[#F5C124] resize-y"
          style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none transition-colors focus:border-[#F5C124]"
          style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
      )}
    </div>
  );
}

export default function ServicePagesEditor() {
  const router = useRouter();
  const [active, setActive] = useState<PageKey>("firearms-ammo");
  const [data, setData] = useState<Record<PageKey, ServiceContent>>(structuredClone(DEFAULTS));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all(TABS.map(t => fetch(`/api/admin/content?page=${t.key}`).then(r => r.json()).then(d => ({ key: t.key, content: d.content }))))
      .then(results => {
        const next = { ...DEFAULTS };
        results.forEach(({ key, content }) => {
          if (content?.sections) next[key as PageKey] = { ...DEFAULTS[key as PageKey], ...content.sections };
        });
        setData(next);
        setLoading(false);
      })
      .catch(() => { setLoading(false); });
    fetch("/api/admin/settings").then(r => { if (r.status === 401) router.push("/admin/login"); });
  }, [router]);

  async function save() {
    setSaving(true); setSaved(false);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageKey: active, sections: data[active] }),
    });
    setSaved(true); setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function setField(field: keyof ServiceContent, val: string) {
    setData(p => ({ ...p, [active]: { ...p[active], [field]: val } }));
    setSaved(false);
  }

  function setPain(idx: number, key: keyof PainCard, val: string) {
    setData(p => {
      const pts = [...p[active].painPoints];
      pts[idx] = { ...pts[idx], [key]: val };
      return { ...p, [active]: { ...p[active], painPoints: pts } };
    });
  }

  function setService(idx: number, val: string) {
    setData(p => {
      const srvs = [...p[active].services];
      srvs[idx] = val;
      return { ...p, [active]: { ...p[active], services: srvs } };
    });
  }

  if (loading) return (
    <div className="p-8 space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} />)}
    </div>
  );

  const cur = data[active];


  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>Service Pages</h1>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.5)" }}>Edit content for each service page. Save, then deploy to publish.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="font-inter text-sm font-semibold" style={{ color: "#16a34a" }}>✓ Saved</span>}
          <button onClick={save} disabled={saving}
            className="font-barlow font-bold px-5 py-2.5 rounded-xl text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
            {saving ? "Saving…" : "Save Page"}
          </button>
        </div>
      </div>

      <div className="p-3 rounded-2xl mb-6 font-inter text-sm" style={{ backgroundColor: "rgba(245,193,36,0.12)", color: "#92610a" }}>
        <strong>Note:</strong> Changes are saved to the database. Go to <a href="/admin/settings" className="underline">Settings → Deploy</a> to publish them live.
      </div>

      {/* Page tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white border" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => { setActive(t.key); setSaved(false); }}
            className="flex-1 font-barlow text-xs font-bold py-2 rounded-lg transition-all"
            style={{ backgroundColor: active === t.key ? "#2D3A28" : "transparent", color: active === t.key ? "#F5C124" : "rgba(45,58,40,0.5)" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {/* Hero */}
        <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
          <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Hero Section</p>
          <Input label="Tag Pill" value={cur.heroTag} onChange={v => setField("heroTag", v)} />
          <Input label="H1 Line 1" value={cur.heroH1Line1} onChange={v => setField("heroH1Line1", v)} />
          <Input label="H1 Line 2" value={cur.heroH1Line2} onChange={v => setField("heroH1Line2", v)} />
          <Input label="Subheadline" value={cur.heroSubhead} onChange={v => setField("heroSubhead", v)} rows={4} />
        </div>

        {/* Problem header */}
        <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
          <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Problem Section Header</p>
          <Input label="Tag" value={cur.problemTag} onChange={v => setField("problemTag", v)} />
          <Input label="H2 Line 1" value={cur.problemH2Line1} onChange={v => setField("problemH2Line1", v)} />
          <Input label="H2 Line 2" value={cur.problemH2Line2} onChange={v => setField("problemH2Line2", v)} />
        </div>

        {/* Pain point cards */}
        {cur.painPoints.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Pain Point Card {i + 1}</p>
            <Input label="Title" value={card.title} onChange={v => setPain(i, "title", v)} />
            <Input label="Body" value={card.body} onChange={v => setPain(i, "body", v)} rows={4} />
          </div>
        ))}

        {/* Services list */}
        <div className="bg-white rounded-2xl border p-6 space-y-3" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
          <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(45,58,40,0.4)" }}>What We Deliver (bullet list)</p>
          {cur.services.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-barlow text-xs font-black w-5 text-center flex-shrink-0" style={{ color: "rgba(45,58,40,0.3)" }}>{i+1}</span>
              <input value={s} onChange={e => setService(i, e.target.value)}
                className="flex-1 font-inter text-sm px-3 py-2.5 rounded-xl border-2 outline-none transition-colors focus:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
          <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Bottom CTA Section</p>
          <Input label="H2 Line 1" value={cur.ctaH2Line1} onChange={v => setField("ctaH2Line1", v)} />
          <Input label="H2 Line 2" value={cur.ctaH2Line2} onChange={v => setField("ctaH2Line2", v)} />
          <Input label="Body Text" value={cur.ctaBody} onChange={v => setField("ctaBody", v)} rows={3} />
        </div>

        {/* SEO section */}
        <div className="rounded-2xl border-2 p-6 space-y-4" style={{ borderColor: "#F5C124", backgroundColor: "rgba(245,193,36,0.03)" }}>
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#F5C124" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
            <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "#2D3A28" }}>SEO — Meta Tags</p>
          </div>
          <p className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.55)" }}>
            These fields control what Google shows for this page. Save then deploy to apply changes.
          </p>
          <Input
            label="Meta Title"
            value={cur.seo?.metaTitle ?? ""}
            onChange={v => setData(p => ({ ...p, [active]: { ...p[active], seo: { ...p[active].seo, metaTitle: v } } }))}
            max={60}
          />
          <p className="font-inter text-xs -mt-2" style={{ color: "rgba(45,58,40,0.4)" }}>Shown as the blue link in Google results. Keep under 60 characters.</p>
          <Input
            label="Meta Description"
            value={cur.seo?.metaDescription ?? ""}
            onChange={v => setData(p => ({ ...p, [active]: { ...p[active], seo: { ...p[active].seo, metaDescription: v } } }))}
            rows={3}
            max={160}
          />
          <p className="font-inter text-xs -mt-2" style={{ color: "rgba(45,58,40,0.4)" }}>The snippet shown under your title in Google. Keep under 160 characters.</p>
        </div>
      </div>
    </div>
  );
}
