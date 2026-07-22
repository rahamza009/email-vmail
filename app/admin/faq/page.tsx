"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FaqItem { q: string; a: string; }

const DEFAULTS: FaqItem[] = [
  { q: "Do you work with businesses that sell firearms or ammo?", a: "Yes. We work exclusively with the firearms, ammo, and tactical industry. ESP compliance is the foundation of everything we build." },
  { q: "Which email platforms do you work with?", a: "We work with compliant ESPs including Klaviyo (where allowed), Sendlane, Drip, Omnisend, ActiveCampaign, and industry-specific platforms like Gunbroker Email. We match the platform to your business type." },
  { q: "What does Done-For-You actually mean?", a: "It means we handle everything: strategy, copywriting, design, scheduling, automation builds, list management, and reporting. You review and approve. We execute." },
  { q: "How long does onboarding take?", a: "Most clients are fully onboarded with their first flows live within 14–21 days of signing." },
  { q: "Do I need a large email list to work with you?", a: "No. We work with lists of all sizes. Smaller lists often see faster results because we can segment and personalize more precisely from the start." },
  { q: "What is the free audit?", a: "A no-cost review of your current email setup. We look at your ESP, your active automations, your deliverability health, and your campaign history, then deliver a written breakdown of the gaps and opportunities within 7 business days." },
];

export default function FaqPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?page=faq")
      .then(r => { if (r.status === 401) { router.push("/admin/login"); throw new Error(); } return r.json(); })
      .then(d => {
        if (d.content?.sections?.faqs) setFaqs(d.content.sections.faqs);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, [router]);

  async function save() {
    setSaving(true); setSaved(false);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageKey: "faq", sections: { faqs } }),
    });
    setSaved(true); setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function update(i: number, key: "q" | "a", val: string) {
    setFaqs(prev => { const n = [...prev]; n[i] = { ...n[i], [key]: val }; return n; });
  }

  function addItem() { setFaqs(prev => [...prev, { q: "", a: "" }]); }

  function remove(i: number) {
    if (!confirm("Remove this FAQ item?")) return;
    setFaqs(prev => prev.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    setFaqs(prev => {
      const n = [...prev];
      const j = i + dir;
      if (j < 0 || j >= n.length) return n;
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
  }

  if (loading) return <div className="p-8"><div className="h-48 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} /></div>;

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>FAQ Editor</h1>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.5)" }}>{faqs.length} questions · drag to reorder</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="font-inter text-sm font-semibold" style={{ color: "#16a34a" }}>✓ Saved</span>}
          <button onClick={save} disabled={saving}
            className="font-barlow font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
            {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-5">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border p-5 space-y-3" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-barlow text-xs font-black px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(245,193,36,0.15)", color: "#2D3A28" }}>Q{i + 1}</span>
              <div className="flex-1" />
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors" title="Move up" style={{ color: "#2D3A28" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === faqs.length - 1}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors" title="Move down" style={{ color: "#2D3A28" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button type="button" onClick={() => remove(i)}
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete" style={{ color: "#e11d48" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block font-barlow text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(45,58,40,0.5)" }}>Question</label>
              <input value={faq.q} onChange={e => update(i, "q", e.target.value)} placeholder="Enter question…"
                className="w-full font-barlow text-sm font-bold px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
            </div>
            <div>
              <label className="block font-barlow text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(45,58,40,0.5)" }}>Answer</label>
              <textarea value={faq.a} onChange={e => update(i, "a", e.target.value)} rows={3} placeholder="Enter answer…"
                className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124] resize-y"
                style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28", lineHeight: 1.7 }} />
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem}
        className="w-full font-barlow font-bold py-3 rounded-2xl border-2 border-dashed text-sm hover:border-[#F5C124] transition-colors flex items-center justify-center gap-2"
        style={{ borderColor: "rgba(45,58,40,0.2)", color: "rgba(45,58,40,0.5)" }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        Add FAQ Item
      </button>
    </div>
  );
}
