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
    heroH1Line1: "Retention & Lifecycle Email Marketing for",
    heroH1Line2: "Firearms Retailers",
    heroSubhead: "Helping FFL dealers, gun stores, ammo retailers, and tactical gear brands increase repeat purchases through compliance-first automations, advanced segmentation, and deliverability-focus.",
    problemTag: "The Problem",
    problemH2Line1: "Want to Generate More Revenue from Email?",
    problemH2Line2: "Start by fixing these 3 things.",
    painPoints: [
      { num: "01", title: "Compliance Risk", body: "Email is one of your highest-ROI channels, but firearms retailers operate under stricter ESP policies than most ecommerce brands. A compliance misstep can disrupt campaigns and automations, putting your most valuable revenue stream at risk." },
      { num: "02", title: "Low Customer Lifetime Value", body: "Most stores work hard to acquire customers but leave repeat revenue untapped. Without post-purchase journeys, replenishment reminders, and personalized follow-ups, customers have little reason to return for their next purchase." },
      { num: "03", title: "One-Size-Fits-All Emails", body: "Sending identical campaigns to first-time buyers, loyal customers, and high-value shoppers misses revenue. Smarter segmentation increases engagement, improves relevance, and drives significantly more repeat purchases from the same list." },
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
    ctaH2Line1: "Ready to Turn Subscribers Into",
    ctaH2Line2: "Repeat Customers?",
    ctaBody: "Let's identify the biggest revenue leaks in your email program and build a lifecycle strategy that keeps customers buying again and again.",
    seo: {
      metaTitle: "Email Marketing for Firearms & Ammo Retailers | Email-Vmail",
      metaDescription: "Compliance-first lifecycle email marketing for FFL dealers, gun stores, ammo retailers, and tactical gear brands. Deliverability-focused automations, advanced segmentation, and repeat revenue systems built for firearms ecommerce.",
    },
  },
  "knife-tactical-outdoor": {
    heroTag: "Email Marketing for Knife & EDC Retailers",
    heroH1Line1: "Lifecycle Email Marketing for",
    heroH1Line2: "Knife, Tactical & Outdoor Retailers",
    heroSubhead: "EDC and knife buyers are among the most seasonally predictable and loyal customers in ecommerce, when you know how to reach them. We build the gift-occasion campaign architecture and lifecycle flows that turn seasonal browsers into year-round repeat buyers.",
    problemTag: "The Problem",
    problemH2Line1: "Where Knife and Tactical Stores",
    problemH2Line2: "Lose Their Best Customers",
    painPoints: [
      { num: "01", title: "Gift-Season Revenue Gets Left on the Table", body: "Father's Day, Christmas, birthdays, hunting season. Knife and EDC buyers make predictable, high-value purchases around specific calendar events. Without a gift-occasion campaign system, you hand that revenue to competitors." },
      { num: "02", title: "High-Value Browsers Leave Without Buying", body: "A $300 custom blade or premium self-defense tool is not an impulse purchase. These buyers research, compare, and take days or weeks to decide. Without a browse abandonment and multi-touch nurture sequence, you lose them when they close the tab." },
      { num: "03", title: "One-Time Buyers Stay One-Time Buyers", body: "A knife buyer who loved their first purchase will buy sheaths, maintenance kits, accessories, and upgrade pieces — if a post-purchase sequence surfaces those options at the right time." },
    ],
    services: [
      "Father's Day, Christmas, and gift-occasion campaigns",
      "High-AOV browse abandonment and multi-touch nurture sequences",
      "Post-purchase accessory and care kit cross-sell flows",
      "New collection and product drop announcement emails",
      "EDC education and product showcase sequences",
      "Seasonal win-back campaigns for lapsed buyers",
      "Segmentation by product category and average order value",
      "Monthly campaign calendar management and performance reporting",
    ],
    ctaH2Line1: "Your Next Gift Season Is",
    ctaH2Line2: "a Planned Email Campaign Away",
    ctaBody: "We audit your current email setup and show you the seasonal revenue opportunities sitting uncaptured in your list. Free audit, no commitment, delivered in 7 days.",
    seo: {
      metaTitle: "Email Marketing for Knife, Tactical & Outdoor Brands | Email-Vmail",
      metaDescription: "Lifecycle email marketing for knife stores, hunting retailers, EDC brands, outdoor gear companies, survival gear retailers, and self-defense product businesses.",
    },
  },
  "growth-services": {
    heroTag: "Growth Services",
    heroH1Line1: "We offer you a complete",
    heroH1Line2: "marketing package",
    heroSubhead: "A one-stop window for growth with clear KPIs and benchmarks. Everything your store needs to compete — built by people who know the industry.",
    problemTag: "What We Offer",
    problemH2Line1: "Four Services. One Partner.",
    problemH2Line2: "Built for Firearms & Tactical Brands.",
    painPoints: [
      { num: "01", title: "Web Development & Store Management", body: "High-converting, compliant storefronts built for the firearms and tactical industry. From Shopify customization to full-stack builds — we handle development, maintenance, and performance optimization." },
      { num: "02", title: "Industry-Compatible SEO", body: "Search engine optimization built around the unique restrictions of the firearms and tactical space. High-intent keywords, compliant content architecture, and organic visibility without triggering platform restrictions." },
      { num: "03", title: "Niche Content Writing", body: "Product descriptions, blog posts, buying guides, and brand copy written by people who understand the industry. Accurate terminology, compliant language, and content that converts." },
    ],
    services: [
      "High-converting storefront development",
      "Shopify customization & maintenance",
      "Industry-compatible SEO strategy",
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
      metaTitle: "Growth Services for Firearms & Tactical Brands | Email-Vmail",
      metaDescription: "Web development, SEO, content writing, and compliant digital marketing for gun stores, FFL dealers, and 2A brands. One partner for everything your store needs to grow.",
    },
  },
};

const TABS: { key: PageKey; label: string }[] = [
  { key: "firearms-ammo",        label: "Firearms & Ammo" },
  { key: "knife-tactical-outdoor", label: "Knife, Tactical & Outdoor" },
  { key: "growth-services",      label: "Growth Services" },
];

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

  const Input = ({ label, value, onChange, rows, max }: { label: string; value: string; onChange: (v: string) => void; rows?: number; max?: number }) => {
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
  };

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
