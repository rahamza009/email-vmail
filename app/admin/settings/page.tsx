"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Settings {
  calendlyUrl: string;
  linkedinUrl: string;
  ctaAuditLabel: string;
  ctaCallLabel: string;
  ctaAuditHref: string;
  ga4Id: string;
  gtmId: string;
  vercelDeployHook: string;
}

const DEFAULTS: Settings = {
  calendlyUrl: "https://calendly.com/rahamza009-dzou/30min",
  linkedinUrl: "https://linkedin.com/in/rahamza009/",
  ctaAuditLabel: "Get $0 Account Audit",
  ctaCallLabel: "Book a Strategy Call",
  ctaAuditHref: "/audit",
  ga4Id: "G-28L8BWNRYP",
  gtmId: "GTM-KW478NFN",
  vercelDeployHook: "",
};

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployMsg, setDeployMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(r => { if (r.status === 401) router.push("/admin/login"); return r.json(); })
      .then(d => { setSettings({ ...DEFAULTS, ...(d.settings ?? {}) }); setLoading(false); });
  }, [router]);

  function set(key: keyof Settings, val: string) {
    setSettings(prev => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  async function save() {
    setSaving(true); setSaved(false);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  async function triggerDeploy() {
    if (!settings.vercelDeployHook) {
      setDeployMsg("Add a Vercel deploy hook URL first (see below).");
      return;
    }
    setDeploying(true); setDeployMsg("");
    try {
      await fetch(settings.vercelDeployHook, { method: "POST" });
      setDeployMsg("Deploy triggered. Live in ~60 seconds.");
    } catch {
      setDeployMsg("Failed to trigger deploy. Check the hook URL.");
    }
    setDeploying(false);
  }

  if (loading) return (
    <div className="p-8 space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} />)}
    </div>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
      <p className="font-barlow text-sm font-bold tracking-widest uppercase mb-5" style={{ color: "rgba(45,58,40,0.45)" }}>{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const Field = ({ label, note, value, onChange, type = "text" }: { label: string; note?: string; value: string; onChange: (v: string) => void; type?: string }) => (
    <div>
      <label className="block font-barlow text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(45,58,40,0.5)" }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none transition-colors focus:border-[#F5C124]"
        style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
      {note && <p className="font-inter text-xs mt-1" style={{ color: "rgba(45,58,40,0.4)" }}>{note}</p>}
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>Settings</h1>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.5)" }}>Manage CTAs, tracking IDs, and site-wide settings</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="font-inter text-sm font-semibold" style={{ color: "#16a34a" }}>✓ Saved</span>}
          <button onClick={save} disabled={saving}
            className="font-barlow font-bold px-5 py-2.5 rounded-xl text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* CTA Buttons */}
        <Section title="CTA Buttons">
          <Field label="Audit CTA Label" value={settings.ctaAuditLabel} onChange={v => set("ctaAuditLabel", v)} />
          <Field label="Audit CTA URL" value={settings.ctaAuditHref} onChange={v => set("ctaAuditHref", v)} />
          <Field label="Call CTA Label" value={settings.ctaCallLabel} onChange={v => set("ctaCallLabel", v)} />
          <Field label="Calendly URL" value={settings.calendlyUrl} onChange={v => set("calendlyUrl", v)} note="Used for 'Book a Strategy Call' buttons across the site" />
        </Section>

        {/* Social */}
        <Section title="Social Links">
          <Field label="LinkedIn URL" value={settings.linkedinUrl} onChange={v => set("linkedinUrl", v)} />
        </Section>

        {/* Tracking */}
        <Section title="Tracking & Analytics">
          <Field label="GA4 Measurement ID" value={settings.ga4Id} onChange={v => set("ga4Id", v)} note="Format: G-XXXXXXXXXX (stored for reference, update in layout.tsx to apply)" />
          <Field label="GTM Container ID" value={settings.gtmId} onChange={v => set("gtmId", v)} note="Format: GTM-XXXXXXX (stored for reference, update in layout.tsx to apply)" />
        </Section>

        {/* Deploy */}
        <Section title="Deploy">
          <Field
            label="Vercel Deploy Hook URL"
            value={settings.vercelDeployHook}
            onChange={v => set("vercelDeployHook", v)}
            note="Get this from Vercel: Project → Settings → Git → Deploy Hooks. Paste the hook URL here to enable 1-click deploys."
          />
          <div>
            <button onClick={triggerDeploy} disabled={deploying}
              className="font-barlow font-bold px-5 py-3 rounded-xl text-sm tracking-wide border-2 transition-colors hover:border-[#2D3A28] disabled:opacity-50 flex items-center gap-2"
              style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              {deploying ? "Triggering…" : "Trigger Deploy"}
            </button>
            {deployMsg && (
              <p className="font-inter text-sm mt-2 font-semibold" style={{ color: deployMsg.includes("triggered") ? "#16a34a" : "#e11d48" }}>{deployMsg}</p>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
