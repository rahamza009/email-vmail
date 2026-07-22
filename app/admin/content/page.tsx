"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "hero" | "problem" | "services" | "seo";

const DEFAULT_HERO = {
  tag: "DFY Email Marketing Agency for FFL & 2A Industry",
  h1Line1: "DFY Email Marketing Agency For FFLs,",
  h1Line2: "Firearms, Ammunition and 2-A Brands",
  subhead: "You built the brand. You earned the customers. But a single platform ban, a shadowban, or an algorithm update can erase it overnight. Email is the only channel you own. We build and run the system that turns your list into your most reliable revenue driver.",
  ctaPrimary: "Get $0 Account Audit",
  ctaSecondary: "Book a Strategy Call",
};

const DEFAULT_PROBLEM = {
  tag: "Your Challenges Range",
  h2Line1: "Why Your Email Isn't",
  h2Line2: "Printing What It Should",
  subhead: "Most 2A brands have a list. Most of them are leaving serious money on the table because the right systems aren't in place.",
  cards: [
    { title: "Your Email Account Gets Banned Without Warning", body: "Mainstream ESPs like Mailchimp, Klaviyo, and ActiveCampaign routinely suspend firearms, ammo, and tactical businesses. One policy update and your account is gone, taking your list, your automations, and your entire revenue engine with it overnight." },
    { title: "You're Sending Broadcasts Instead of Lifecycle Emails", body: "Blasting your full list with the same generic email every week isn't a strategy. Without segmentation, automation, and a real lifecycle system, you're leaving the majority of your revenue potential untouched every single month." },
    { title: "Social Reach Can Disappear Overnight", body: "Instagram, Facebook, and TikTok restrict 2A content aggressively. Your organic reach can vanish without warning. Email is the one channel where you own the relationship, with no algorithm deciding who sees your message." },
  ],
};

const DEFAULT_SERVICES = {
  tag: "The Solution",
  h2Line1: "Done-For-You Email Systems",
  h2Line2: "That Work While You Sell",
  subhead: "We handle everything from strategy to execution. You focus on the business, we make your list print.",
  cards: [
    { title: "Welcome & Onboarding Flows", body: "Turn new subscribers into first-time buyers with a sequenced onboarding series built around your products, your brand story, and the purchase triggers that actually work in 2A." },
    { title: "Abandoned Cart & Browse Recovery", body: "Recover lost revenue automatically. We build segmented cart and browse abandonment flows that re-engage high-intent buyers before they forget you exist." },
    { title: "Retention & Repeat Purchase Systems", body: "Your best customer is the one you already have. Post-purchase sequences, replenishment reminders, and loyalty flows keep buyers coming back without any ad spend." },
    { title: "Campaign Management", body: "Weekly or bi-weekly campaign execution — copywriting, design, scheduling, and optimization — so your list hears from you consistently without adding to your workload." },
    { title: "List Health & Deliverability", body: "Clean lists reach inboxes. We manage suppression, re-engagement campaigns, and deliverability monitoring to protect your sender reputation across every send." },
    { title: "ESP Migration & Setup", body: "Moving from a banned or restricted ESP? We handle the full migration: list transfer, automation rebuild, domain warmup, and compliance review for your new platform." },
  ],
};

const DEFAULT_SEO = {
  metaTitle: "Email-Vmail | DFY Email Marketing for Firearms & 2A Brands",
  metaDescription: "Done-For-You email marketing agency for gun stores, FFL dealers, ammo retailers, and 2A brands. ESP-compliant lifecycle systems that turn subscribers into repeat buyers.",
};

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

export default function ContentPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("hero");
  const [hero, setHero]       = useState(DEFAULT_HERO);
  const [problem, setProblem] = useState(DEFAULT_PROBLEM);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [seo, setSeo]         = useState(DEFAULT_SEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?page=home")
      .then(r => { if (r.status === 401) router.push("/admin/login"); return r.json(); })
      .then(d => {
        if (d.content?.sections) {
          const s = d.content.sections;
          if (s.hero)     setHero({ ...DEFAULT_HERO, ...s.hero });
          if (s.problem)  setProblem({ ...DEFAULT_PROBLEM, ...s.problem });
          if (s.services) setServices({ ...DEFAULT_SERVICES, ...s.services });
          if (s.seo)      setSeo({ ...DEFAULT_SEO, ...s.seo });
        }
        setLoading(false);
      });
  }, [router]);

  async function saveAll() {
    setSaving(true); setSaved(false);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageKey: "home", sections: { hero, problem, services, seo } }),
    });
    setSaved(true); setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return (
    <div className="p-8 space-y-4">
      {[1,2].map(i => <div key={i} className="h-32 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} />)}
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>Home Page Content</h1>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.5)" }}>Edit sections of the home page. Save, then deploy to publish.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="font-inter text-sm font-semibold" style={{ color: "#16a34a" }}>✓ Saved</span>}
          <button onClick={saveAll} disabled={saving}
            className="font-barlow font-bold px-5 py-2.5 rounded-xl text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
            {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      <div className="p-3 rounded-2xl mb-6 font-inter text-sm" style={{ backgroundColor: "rgba(245,193,36,0.12)", color: "#92610a" }}>
        <strong>Note:</strong> Changes are saved to the database. Go to <a href="/admin/settings" className="underline">Settings → Deploy</a> to publish them live.
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white border" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
        {(["hero","problem","services","seo"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 font-barlow text-sm font-bold py-2 rounded-lg capitalize transition-all"
            style={{ backgroundColor: tab === t ? "#2D3A28" : "transparent", color: tab === t ? "#F5C124" : "rgba(45,58,40,0.5)" }}>
            {t === "hero" ? "Hero" : t === "problem" ? "Problem" : t === "services" ? "Services" : "SEO"}
          </button>
        ))}
      </div>

      {tab === "hero" && (
        <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
          <Input label="Tag Line (small pill above H1)" value={hero.tag} onChange={v => setHero(p => ({ ...p, tag: v }))} />
          <Input label="H1 Line 1" value={hero.h1Line1} onChange={v => setHero(p => ({ ...p, h1Line1: v }))} />
          <Input label="H1 Line 2" value={hero.h1Line2} onChange={v => setHero(p => ({ ...p, h1Line2: v }))} />
          <Input label="Subheadline" value={hero.subhead} onChange={v => setHero(p => ({ ...p, subhead: v }))} rows={4} />
          <Input label="Primary CTA Label" value={hero.ctaPrimary} onChange={v => setHero(p => ({ ...p, ctaPrimary: v }))} />
          <Input label="Secondary CTA Label" value={hero.ctaSecondary} onChange={v => setHero(p => ({ ...p, ctaSecondary: v }))} />
        </div>
      )}

      {tab === "problem" && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Section Header</p>
            <Input label="Tag" value={problem.tag} onChange={v => setProblem(p => ({ ...p, tag: v }))} />
            <Input label="H2 Line 1" value={problem.h2Line1} onChange={v => setProblem(p => ({ ...p, h2Line1: v }))} />
            <Input label="H2 Line 2" value={problem.h2Line2} onChange={v => setProblem(p => ({ ...p, h2Line2: v }))} />
            <Input label="Subheadline" value={problem.subhead} onChange={v => setProblem(p => ({ ...p, subhead: v }))} rows={3} />
          </div>
          {problem.cards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Card {i+1}</p>
              <Input label="Title" value={card.title} onChange={v => setProblem(p => { const cards = [...p.cards]; cards[i] = { ...cards[i], title: v }; return { ...p, cards }; })} />
              <Input label="Body" value={card.body} onChange={v => setProblem(p => { const cards = [...p.cards]; cards[i] = { ...cards[i], body: v }; return { ...p, cards }; })} rows={4} />
            </div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Section Header</p>
            <Input label="Tag" value={services.tag} onChange={v => setServices(p => ({ ...p, tag: v }))} />
            <Input label="H2 Line 1" value={services.h2Line1} onChange={v => setServices(p => ({ ...p, h2Line1: v }))} />
            <Input label="H2 Line 2" value={services.h2Line2} onChange={v => setServices(p => ({ ...p, h2Line2: v }))} />
            <Input label="Subheadline" value={services.subhead} onChange={v => setServices(p => ({ ...p, subhead: v }))} rows={3} />
          </div>
          {services.cards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Card {i+1}</p>
              <Input label="Title" value={card.title} onChange={v => setServices(p => { const cards = [...p.cards]; cards[i] = { ...cards[i], title: v }; return { ...p, cards }; })} />
              <Input label="Body" value={card.body} onChange={v => setServices(p => { const cards = [...p.cards]; cards[i] = { ...cards[i], body: v }; return { ...p, cards }; })} rows={4} />
            </div>
          ))}
        </div>
      )}

      {tab === "seo" && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl font-inter text-sm" style={{ backgroundColor: "rgba(45,58,40,0.05)", color: "rgba(45,58,40,0.65)" }}>
            <strong style={{ color: "#2D3A28" }}>How this works:</strong> Save changes here, then deploy. The meta title and description will be baked into the HTML at deploy time — exactly what Google reads when it indexes your page.
          </div>
          <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.4)" }}>Search Engine Meta Tags — Home Page</p>
            <Input
              label="Meta Title"
              value={seo.metaTitle}
              onChange={v => setSeo(p => ({ ...p, metaTitle: v }))}
              max={60}
            />
            <p className="font-inter text-xs -mt-2" style={{ color: "rgba(45,58,40,0.4)" }}>Shown as the blue link in Google results. Keep under 60 characters.</p>
            <Input
              label="Meta Description"
              value={seo.metaDescription}
              onChange={v => setSeo(p => ({ ...p, metaDescription: v }))}
              rows={3}
              max={160}
            />
            <p className="font-inter text-xs -mt-2" style={{ color: "rgba(45,58,40,0.4)" }}>The snippet shown under your title in Google. Keep under 160 characters.</p>
          </div>
        </div>
      )}
    </div>
  );
}
