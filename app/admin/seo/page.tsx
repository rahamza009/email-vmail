"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE = "https://emailvmail.com";

interface SitemapEntry {
  path: string;
  label: string;
  priority: number;
  changeFrequency: string;
  lastmod: string;
  include: boolean;
}

const FREQ_OPTIONS = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];

const DEFAULT_ENTRIES: SitemapEntry[] = [
  { path: "/",                                          label: "Home",                    priority: 1.0, changeFrequency: "monthly", lastmod: "", include: true },
  { path: "/about",                                     label: "About",                   priority: 0.8, changeFrequency: "monthly", lastmod: "", include: true },
  { path: "/services/firearms-ammo",                    label: "Firearms & Ammo",         priority: 0.9, changeFrequency: "monthly", lastmod: "", include: true },
  { path: "/services/knife-tactical-outdoor",           label: "Knife & Tactical",        priority: 0.9, changeFrequency: "monthly", lastmod: "", include: true },
  { path: "/services/growth-services",                  label: "Growth Services",         priority: 0.85, changeFrequency: "monthly", lastmod: "", include: true },
  { path: "/audit",                                     label: "Free Audit",              priority: 0.8, changeFrequency: "monthly", lastmod: "", include: true },
  { path: "/blog",                                      label: "Blog Index",              priority: 0.7, changeFrequency: "weekly",  lastmod: "", include: true },
  { path: "/tactical-merchandise",                      label: "Tactical Merchandise",    priority: 0.6, changeFrequency: "monthly", lastmod: "", include: true },
  { path: "/blog/why-mailchimp-bans-firearms-businesses", label: "Blog: Mailchimp & Firearms", priority: 0.7, changeFrequency: "yearly", lastmod: "", include: true },
  { path: "/blog/is-klaviyo-good-for-gun-stores",       label: "Blog: Klaviyo for Gun Stores", priority: 0.7, changeFrequency: "yearly", lastmod: "", include: true },
  { path: "/blog/win-back-flow-for-gun-stores",         label: "Blog: Win-Back Flow",    priority: 0.7, changeFrequency: "yearly",  lastmod: "", include: true },
];

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /cgi-sys/
Disallow: /cgi-bin/
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /wp-json/
Disallow: /*?page_id=
Disallow: /*?feed=
Disallow: /*?p=
Disallow: /*?cat=

Sitemap: https://emailvmail.com/sitemap.xml`;

type Tab = "sitemap" | "robots";

function buildXmlPreview(entries: SitemapEntry[]): string {
  const rows = entries
    .filter(e => e.include)
    .map(e => {
      const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${BASE}${e.path}</loc>${lastmod}\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>`;
}

export default function SeoPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("sitemap");
  const [entries, setEntries] = useState<SitemapEntry[]>(DEFAULT_ENTRIES);
  const [robots, setRobots] = useState(DEFAULT_ROBOTS);
  const [showXml, setShowXml] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then(r => { if (r.status === 401) { router.push("/admin/login"); return null; } return r.json(); })
      .then(d => {
        if (!d) return;
        if (d.sitemap) setEntries(d.sitemap);
        if (d.robots)  setRobots(d.robots);
        setLoading(false);
      });
  }, [router]);

  async function saveSitemap() {
    setSaving(true); setSaved(false);
    await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "sitemap", entries }),
    });
    setSaved(true); setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  async function saveRobots() {
    setSaving(true); setSaved(false);
    await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "robots", content: robots }),
    });
    setSaved(true); setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateEntry(i: number, field: keyof SitemapEntry, value: string | number | boolean) {
    setEntries(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  }

  const includedCount = entries.filter(e => e.include).length;

  if (loading) return (
    <div className="p-8 space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} />)}
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>SEO & Sitemap</h1>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.5)" }}>Control which pages Google indexes and how they appear in search.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="font-inter text-sm font-semibold" style={{ color: "#16a34a" }}>✓ Saved</span>}
          <button
            onClick={tab === "sitemap" ? saveSitemap : saveRobots}
            disabled={saving}
            className="font-barlow font-bold px-5 py-2.5 rounded-xl text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white border" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
        {(["sitemap", "robots"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 font-barlow text-sm font-bold py-2 rounded-lg capitalize transition-all"
            style={{ backgroundColor: tab === t ? "#2D3A28" : "transparent", color: tab === t ? "#F5C124" : "rgba(45,58,40,0.5)" }}>
            {t === "sitemap" ? "Sitemap" : "Robots.txt"}
          </button>
        ))}
      </div>

      {tab === "sitemap" && (
        <div className="space-y-4">
          {/* Stats bar */}
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white border" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <div>
              <p className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>{includedCount}</p>
              <p className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.5)" }}>URLs in sitemap</p>
            </div>
            <div>
              <p className="font-barlow text-2xl font-black" style={{ color: "rgba(45,58,40,0.3)" }}>{entries.length - includedCount}</p>
              <p className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.5)" }}>excluded</p>
            </div>
            <div className="ml-auto flex gap-2">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="font-barlow text-sm font-bold px-4 py-2 rounded-xl border-2 transition-colors hover:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
                View Live sitemap.xml ↗
              </a>
              <button
                onClick={() => setShowXml(v => !v)}
                className="font-barlow text-sm font-bold px-4 py-2 rounded-xl border-2 transition-colors hover:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
                {showXml ? "Hide" : "Preview XML"}
              </button>
            </div>
          </div>

          {/* XML Preview */}
          {showXml && (
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
              <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: "#2D3A28" }}>
                <span className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "#F5C124" }}>sitemap.xml preview</span>
                <span className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{includedCount} URLs</span>
              </div>
              <pre className="p-4 text-xs leading-relaxed overflow-x-auto" style={{ backgroundColor: "#1a2316", color: "rgba(255,255,255,0.75)", fontFamily: "monospace" }}>
                {buildXmlPreview(entries)}
              </pre>
            </div>
          )}

          {/* Entries table */}
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <div className="grid grid-cols-[1fr_80px_140px_130px_70px] gap-0 px-5 py-3 border-b text-xs font-barlow font-bold tracking-widest uppercase" style={{ borderColor: "rgba(45,58,40,0.08)", color: "rgba(45,58,40,0.4)" }}>
              <span>Page / URL Path</span>
              <span className="text-center">Priority</span>
              <span>Change Freq</span>
              <span>Last Modified</span>
              <span className="text-center">Index</span>
            </div>
            {entries.map((entry, i) => (
              <div key={entry.path} className="grid grid-cols-[1fr_80px_140px_130px_70px] gap-0 px-5 py-3 border-b items-center" style={{ borderColor: "rgba(45,58,40,0.06)", opacity: entry.include ? 1 : 0.4 }}>
                <div>
                  <p className="font-barlow text-sm font-bold" style={{ color: "#2D3A28" }}>{entry.label}</p>
                  <p className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.45)" }}>{entry.path}</p>
                </div>
                <div className="flex justify-center">
                  <input
                    type="number" min="0" max="1" step="0.05"
                    value={entry.priority}
                    onChange={e => updateEntry(i, "priority", parseFloat(e.target.value))}
                    className="w-16 font-inter text-sm text-center px-2 py-1.5 rounded-lg border-2 outline-none focus:border-[#F5C124]"
                    style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }}
                  />
                </div>
                <div>
                  <select
                    value={entry.changeFrequency}
                    onChange={e => updateEntry(i, "changeFrequency", e.target.value)}
                    className="w-full font-inter text-sm px-2 py-1.5 rounded-lg border-2 outline-none focus:border-[#F5C124] bg-white"
                    style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }}>
                    {FREQ_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <input
                    type="date"
                    value={entry.lastmod}
                    onChange={e => updateEntry(i, "lastmod", e.target.value)}
                    className="w-full font-inter text-sm px-2 py-1.5 rounded-lg border-2 outline-none focus:border-[#F5C124]"
                    style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => updateEntry(i, "include", !entry.include)}
                    className="w-10 h-6 rounded-full transition-colors relative"
                    style={{ backgroundColor: entry.include ? "#2D3A28" : "rgba(45,58,40,0.2)" }}>
                    <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: entry.include ? "18px" : "2px" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.4)" }}>
            Toggle <strong>Index</strong> off to exclude a URL from sitemap.xml. Save, then deploy to apply changes.
          </p>
        </div>
      )}

      {tab === "robots" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl font-inter text-sm" style={{ backgroundColor: "rgba(245,193,36,0.12)", color: "#92610a" }}>
            <strong>robots.txt</strong> tells Google which pages to crawl. <code>Disallow: /admin/</code> blocks the admin from search. <code>Allow: /</code> allows everything else. After saving, deploy to push changes live.
          </div>
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: "rgba(45,58,40,0.08)", backgroundColor: "rgba(45,58,40,0.03)" }}>
              <span className="font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>robots.txt content</span>
              <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="font-inter text-xs underline" style={{ color: "rgba(45,58,40,0.45)" }}>
                View live ↗
              </a>
            </div>
            <textarea
              value={robots}
              onChange={e => setRobots(e.target.value)}
              rows={20}
              spellCheck={false}
              className="w-full font-mono text-sm p-5 outline-none resize-y"
              style={{ color: "#2D3A28", borderColor: "transparent" }}
            />
          </div>
          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(45,58,40,0.4)" }}>Preview</p>
            <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(45,58,40,0.65)" }}>{robots}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
