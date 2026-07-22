"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BlogFormData, EMPTY_FORM, DEFAULT_CATEGORIES,
  slugify, Field, TextInput, TextArea, RichEditor,
  ImageUploader, TagSelector, CategorySelector, RobotsToggle,
} from "../../blog/_BlogForm";

const CS_DEFAULT: BlogFormData = {
  ...EMPTY_FORM,
  category: "Case Study",
  tags: ["case study"],
};

export default function NewCaseStudy() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<BlogFormData>(CS_DEFAULT);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [tab, setTab] = useState<"content" | "seo" | "og" | "settings">("content");

  function set<K extends keyof BlogFormData>(key: K, val: BlogFormData[K]) {
    setForm(prev => {
      const next = { ...prev, [key]: val };
      if (key === "title") {
        if (!prev.slug) next.slug = slugify(val as string);
        if (!prev.seoTitle) next.seoTitle = val as string;
        if (!prev.ogTitle) next.ogTitle = val as string;
      }
      if (key === "excerpt") {
        if (!prev.seoDescription) next.seoDescription = val as string;
        if (!prev.ogDescription) next.ogDescription = val as string;
      }
      return next;
    });
  }

  async function save(status: "draft" | "published") {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true); setError("");
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status, slug: form.slug || slugify(form.title) }),
    });
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/admin/case-studies/${id}`);
    } else {
      setError("Failed to save. Try again.");
      setSaving(false);
    }
  }

  const TABS = [
    { key: "content", label: "Content" },
    { key: "seo", label: "SEO" },
    { key: "og", label: "OG / Social" },
    { key: "settings", label: "Settings" },
  ] as const;

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/case-studies" className="p-1.5 rounded-lg hover:bg-black/5 transition-colors" style={{ color: "rgba(45,58,40,0.5)" }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <h1 className="font-barlow text-2xl font-black flex-1" style={{ color: "#2D3A28" }}>New Case Study</h1>
        <button onClick={() => save("draft")} disabled={saving}
          className="font-barlow text-sm font-bold px-4 py-2 rounded-xl border-2 hover:border-[#2D3A28] transition-colors disabled:opacity-50"
          style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>Save Draft</button>
        <button onClick={() => save("published")} disabled={saving}
          className="font-barlow text-sm font-bold px-5 py-2 rounded-xl hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
          {saving ? "Saving…" : "Publish"}
        </button>
      </div>

      {error && <div className="mb-4 px-4 py-3 rounded-xl font-inter text-sm font-semibold" style={{ backgroundColor: "rgba(225,29,72,0.1)", color: "#e11d48" }}>{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">

          <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <Field label="Case Study Title *">
              <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="Client name + result, e.g. How Gun Store X Grew Email Revenue 40%…"
                className="w-full font-barlow text-xl font-bold px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
            </Field>
            <Field label="URL Slug">
              <div className="flex items-center gap-2">
                <span className="font-inter text-sm" style={{ color: "rgba(45,58,40,0.4)" }}>/blog/</span>
                <input value={form.slug} onChange={e => set("slug", slugify(e.target.value))} placeholder="client-name-result"
                  className="flex-1 font-inter text-sm px-3 py-2.5 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                  style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
              </div>
            </Field>
            <Field label="Summary / Excerpt">
              <TextArea value={form.excerpt} onChange={v => set("excerpt", v)} rows={2} placeholder="One-line result: increased email revenue 40% in 90 days for a firearms retailer…" />
            </Field>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white rounded-xl border" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex-1 font-barlow text-sm font-bold py-2 rounded-lg transition-all"
                style={{ backgroundColor: tab === t.key ? "#2D3A28" : "transparent", color: tab === t.key ? "#F5C124" : "rgba(45,58,40,0.5)" }}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "content" && (
            <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <Field label="Full Case Study Content">
                <RichEditor value={form.content} onChange={v => set("content", v)} />
              </Field>
              <ImageUploader label="Cover Image (hero banner)" value={form.coverImage} onChange={v => set("coverImage", v)} />
              <ImageUploader label="Main Content Image (results screenshot, chart, etc.)" value={form.mainImage} onChange={v => set("mainImage", v)} />
            </div>
          )}

          {tab === "seo" && (
            <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <Field label="Focus Keywords (comma-separated)">
                <TextInput value={form.keywords} onChange={v => set("keywords", v)} placeholder="email marketing case study, gun store email results…" />
              </Field>
              <Field label="SEO Title">
                <TextInput value={form.seoTitle} onChange={v => set("seoTitle", v)} />
                <p className="font-inter text-xs mt-1" style={{ color: form.seoTitle.length > 60 ? "#e11d48" : "rgba(45,58,40,0.4)" }}>{form.seoTitle.length}/60</p>
              </Field>
              <Field label="Meta Description">
                <TextArea value={form.seoDescription} onChange={v => set("seoDescription", v)} rows={3} />
                <p className="font-inter text-xs mt-1" style={{ color: form.seoDescription.length > 160 ? "#e11d48" : "rgba(45,58,40,0.4)" }}>{form.seoDescription.length}/160</p>
              </Field>
              <Field label="Robots Directives">
                <RobotsToggle indexVal={form.robotsIndex} followVal={form.robotsFollow}
                  onIndexChange={v => set("robotsIndex", v)} onFollowChange={v => set("robotsFollow", v)} />
              </Field>
              <div className="p-4 rounded-xl border" style={{ borderColor: "rgba(45,58,40,0.1)", backgroundColor: "#F9FAFB" }}>
                <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(45,58,40,0.4)" }}>SERP Preview</p>
                <p className="font-inter text-xs mb-1" style={{ color: "#1a7f37" }}>emailvmail.com › blog › {form.slug || "case-study-slug"}</p>
                <p className="font-barlow text-base font-bold mb-1 leading-snug" style={{ color: "#1a0dab" }}>{form.seoTitle || form.title || "Case Study Title"}</p>
                <p className="font-inter text-sm leading-snug" style={{ color: "#4d5156" }}>{form.seoDescription || form.excerpt || "Description…"}</p>
              </div>
            </div>
          )}

          {tab === "og" && (
            <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <Field label="OG Title">
                <TextInput value={form.ogTitle} onChange={v => set("ogTitle", v)} />
              </Field>
              <Field label="OG Description">
                <TextArea value={form.ogDescription} onChange={v => set("ogDescription", v)} rows={3} />
              </Field>
              <Field label="OG Type">
                <select value={form.ogType} onChange={e => set("ogType", e.target.value)}
                  className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                  style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }}>
                  <option value="article">article</option>
                  <option value="website">website</option>
                </select>
              </Field>
              <ImageUploader label="OG Image (1200×630px recommended)" value={form.coverImage} onChange={v => set("coverImage", v)} />
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(45,58,40,0.15)" }}>
                {form.coverImage
                  ? <img src={form.coverImage} alt="" className="w-full h-40 object-cover" />
                  : <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: "#2D3A28" }}><span className="font-rajdhani font-bold tracking-widest uppercase" style={{ color: "#F5C124" }}>Email-Vmail</span></div>}
                <div className="p-3" style={{ backgroundColor: "#F0F2F5" }}>
                  <p className="font-inter text-xs mb-1" style={{ color: "#606770" }}>emailvmail.com</p>
                  <p className="font-barlow text-sm font-bold leading-snug" style={{ color: "#1d2129" }}>{form.ogTitle || form.title || "Case Study Title"}</p>
                  <p className="font-inter text-xs mt-1" style={{ color: "#606770" }}>{form.ogDescription || form.excerpt || "Description…"}</p>
                </div>
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <Field label="Display Order (lower = appears first)">
                <input type="number" value={form.displayOrder} onChange={e => set("displayOrder", Number(e.target.value))}
                  className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                  style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
              </Field>
              <Field label="Scheduled Publish Date">
                <input type="datetime-local" value={form.publishDate} onChange={e => set("publishDate", e.target.value)}
                  className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                  style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
              </Field>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border p-5 space-y-3" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>Publish</p>
            <button onClick={() => save("published")} disabled={saving}
              className="w-full font-barlow font-bold py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
              {saving ? "Saving…" : "Publish Now"}
            </button>
            <button onClick={() => save("draft")} disabled={saving}
              className="w-full font-barlow font-bold py-3 rounded-xl text-sm border-2 hover:border-[#2D3A28] disabled:opacity-50"
              style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
              Save as Draft
            </button>
          </div>

          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(45,58,40,0.45)" }}>Category</p>
            <CategorySelector value={form.category} onChange={v => set("category", v)}
              categories={categories} onAddCategory={c => setCategories(prev => [...prev, c])} />
          </div>

          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(45,58,40,0.45)" }}>Tags</p>
            <TagSelector tags={form.tags} onChange={v => set("tags", v)} />
          </div>

          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(45,58,40,0.45)" }}>Visibility on Website</p>
            <button type="button" onClick={() => set("isActive", !form.isActive)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all"
              style={{ borderColor: form.isActive ? "#2D3A28" : "rgba(45,58,40,0.15)", backgroundColor: form.isActive ? "rgba(45,58,40,0.04)" : "transparent" }}>
              <div className="text-left">
                <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>{form.isActive ? "Active — Showing" : "Hidden from site"}</p>
                <p className="font-inter text-xs mt-0.5" style={{ color: "rgba(45,58,40,0.5)" }}>{form.isActive ? "Will appear on site" : "Will not appear on site"}</p>
              </div>
              <span className="relative inline-flex h-6 w-11 rounded-full border-2 transition-colors flex-shrink-0"
                style={{ backgroundColor: form.isActive ? "#2D3A28" : "rgba(45,58,40,0.15)", borderColor: form.isActive ? "#2D3A28" : "rgba(45,58,40,0.2)" }}>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform mt-0.5"
                  style={{ marginLeft: form.isActive ? "22px" : "2px" }} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
