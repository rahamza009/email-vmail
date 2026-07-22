"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  BlogFormData, EMPTY_FORM, DEFAULT_CATEGORIES,
  slugify, Field, TextInput, TextArea, RichEditor,
  ImageUploader, TagSelector, CategorySelector, RobotsToggle,
} from "../_BlogForm";

export default function EditBlogPost() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<BlogFormData>(EMPTY_FORM);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [tab, setTab] = useState<"content" | "seo" | "og" | "settings">("content");
  const [totalPosts, setTotalPosts] = useState(0);
  const [postIndex, setPostIndex] = useState(0);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then(r => { if (r.status === 401) { router.push("/admin/login"); throw new Error(); } return r.json(); })
      .then(d => {
        const posts = d.posts ?? [];
        setTotalPosts(posts.length);
        const idx = posts.findIndex((p: { _id: string }) => p._id === id);
        setPostIndex(idx + 1);
        const post = posts[idx];
        if (post) {
          setForm({
            title: post.title ?? "",
            slug: post.slug ?? "",
            category: post.category ?? "Email Strategy",
            tags: Array.isArray(post.tags) ? post.tags : [],
            excerpt: post.excerpt ?? "",
            content: post.content ?? "",
            coverImage: post.coverImage ?? post.featuredImage ?? "",
            mainImage: post.mainImage ?? "",
            keywords: post.keywords ?? "",
            publishDate: post.publishDate ? new Date(post.publishDate).toISOString().slice(0, 16) : "",
            displayOrder: post.displayOrder ?? 99,
            seoTitle: post.seoTitle ?? "",
            seoDescription: post.seoDescription ?? "",
            robotsIndex: post.robotsIndex !== false,
            robotsFollow: post.robotsFollow !== false,
            ogTitle: post.ogTitle ?? post.title ?? "",
            ogDescription: post.ogDescription ?? post.excerpt ?? "",
            ogType: post.ogType ?? "article",
            status: post.status ?? "draft",
            isActive: post.isActive !== false,
          });
          if (!DEFAULT_CATEGORIES.includes(post.category)) {
            setCategories(prev => [...prev, post.category]);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, router]);

  function set<K extends keyof BlogFormData>(key: K, val: BlogFormData[K]) {
    setForm(prev => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  async function save(statusOverride?: string) {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true); setError(""); setSaved(false);
    const res = await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...form, status: statusOverride ?? form.status }),
    });
    if (res.ok) {
      setSaved(true);
      if (statusOverride) setForm(prev => ({ ...prev, status: statusOverride }));
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError("Save failed. Try again.");
    }
    setSaving(false);
  }

  const TAB_ITEMS = [
    { key: "content", label: "Content" },
    { key: "seo", label: "SEO" },
    { key: "og", label: "OG / Social" },
    { key: "settings", label: "Settings" },
  ] as const;

  if (loading) return (
    <div className="p-8 space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} />)}
    </div>
  );

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="p-1.5 rounded-lg hover:bg-black/5 transition-colors" style={{ color: "rgba(45,58,40,0.5)" }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-barlow text-xl font-black truncate" style={{ color: "#2D3A28" }}>{form.title || "Edit Post"}</h1>
          <p className="font-inter text-xs mt-0.5" style={{ color: "rgba(45,58,40,0.45)" }}>
            Post {postIndex} of {totalPosts} &nbsp;·&nbsp; Order #{form.displayOrder} &nbsp;·&nbsp;
            <span style={{ color: form.status === "published" ? "#16a34a" : "#92610a" }}>
              {form.status === "published" ? "● Published" : "○ Draft"}
            </span>
          </p>
        </div>
        {saved && <span className="font-inter text-sm font-semibold flex-shrink-0" style={{ color: "#16a34a" }}>✓ Saved</span>}
        <button onClick={() => save()} disabled={saving}
          className="font-barlow text-sm font-bold px-4 py-2 rounded-xl border-2 hover:border-[#2D3A28] transition-colors disabled:opacity-50 flex-shrink-0"
          style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error && <div className="mb-4 px-4 py-3 rounded-xl font-inter text-sm font-semibold" style={{ backgroundColor: "rgba(225,29,72,0.1)", color: "#e11d48" }}>{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left */}
        <div className="xl:col-span-2 space-y-5">

          <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <Field label="Title *">
              <input value={form.title} onChange={e => set("title", e.target.value)}
                className="w-full font-barlow text-xl font-bold px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
            </Field>
            <Field label="URL Slug">
              <div className="flex items-center gap-2">
                <span className="font-inter text-sm" style={{ color: "rgba(45,58,40,0.4)" }}>/blog/</span>
                <input value={form.slug} onChange={e => set("slug", slugify(e.target.value))}
                  className="flex-1 font-inter text-sm px-3 py-2.5 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                  style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
              </div>
            </Field>
            <Field label="Excerpt">
              <TextArea value={form.excerpt} onChange={v => set("excerpt", v)} rows={2} />
            </Field>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white rounded-xl border" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            {TAB_ITEMS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex-1 font-barlow text-sm font-bold py-2 rounded-lg transition-all"
                style={{ backgroundColor: tab === t.key ? "#2D3A28" : "transparent", color: tab === t.key ? "#F5C124" : "rgba(45,58,40,0.5)" }}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "content" && (
            <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <Field label="Content">
                <RichEditor value={form.content} onChange={v => set("content", v)} />
              </Field>
              <ImageUploader label="Cover Image (hero banner)" value={form.coverImage} onChange={v => set("coverImage", v)} />
              <ImageUploader label="Main Content Image (in-article)" value={form.mainImage} onChange={v => set("mainImage", v)} />
            </div>
          )}

          {tab === "seo" && (
            <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <Field label="Focus Keywords (comma-separated)">
                <TextInput value={form.keywords} onChange={v => set("keywords", v)} placeholder="email marketing firearms, FFL email…" />
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
                <p className="font-inter text-xs mb-1" style={{ color: "#1a7f37" }}>emailvmail.com › blog › {form.slug || "post-slug"}</p>
                <p className="font-barlow text-base font-bold mb-1 leading-snug" style={{ color: "#1a0dab" }}>{form.seoTitle || form.title || "Post Title"}</p>
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
                  <option value="profile">profile</option>
                </select>
              </Field>
              <ImageUploader label="OG Image (1200×630px)" value={form.coverImage} onChange={v => set("coverImage", v)} />
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(45,58,40,0.15)" }}>
                {form.coverImage
                  ? <img src={form.coverImage} alt="" className="w-full h-40 object-cover" />
                  : <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: "#2D3A28" }}><span className="font-rajdhani font-bold tracking-widest uppercase" style={{ color: "#F5C124" }}>Email-Vmail</span></div>}
                <div className="p-3" style={{ backgroundColor: "#F0F2F5" }}>
                  <p className="font-inter text-xs mb-1" style={{ color: "#606770" }}>emailvmail.com</p>
                  <p className="font-barlow text-sm font-bold leading-snug" style={{ color: "#1d2129" }}>{form.ogTitle || form.title || "Post Title"}</p>
                  <p className="font-inter text-xs mt-1" style={{ color: "#606770" }}>{form.ogDescription || form.excerpt || "Description…"}</p>
                </div>
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
              <Field label="Display Order (lower = appears first on site)">
                <input type="number" value={form.displayOrder} onChange={e => set("displayOrder", Number(e.target.value))}
                  className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                  style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
                <p className="font-inter text-xs mt-1" style={{ color: "rgba(45,58,40,0.4)" }}>This post is #{postIndex} of {totalPosts} total posts</p>
              </Field>
              <Field label="Scheduled / Published Date">
                <input type="datetime-local" value={form.publishDate} onChange={e => set("publishDate", e.target.value)}
                  className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F5C124]"
                  style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
              </Field>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border p-5 space-y-3" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>Publish</p>
            <span className="inline-block font-barlow text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: form.status === "published" ? "rgba(74,222,128,0.15)" : "rgba(245,193,36,0.15)", color: form.status === "published" ? "#16a34a" : "#92610a" }}>
              {form.status === "published" ? "● Published" : "○ Draft"}
            </span>
            {form.status === "draft" ? (
              <button onClick={() => save("published")} disabled={saving}
                className="w-full font-barlow font-bold py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
                {saving ? "Saving…" : "Publish Now"}
              </button>
            ) : (
              <button onClick={() => save("draft")} disabled={saving}
                className="w-full font-barlow font-bold py-3 rounded-xl text-sm border-2 disabled:opacity-50"
                style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
                Revert to Draft
              </button>
            )}
            <button onClick={() => save()} disabled={saving}
              className="w-full font-barlow font-bold py-2.5 rounded-xl text-sm border-2 hover:border-[#2D3A28] transition-colors disabled:opacity-50"
              style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
              {saving ? "Saving…" : "Save Changes"}
            </button>
            {form.status === "published" && (
              <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer"
                className="w-full font-barlow font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-70 transition-opacity"
                style={{ color: "rgba(45,58,40,0.5)" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                View Live
              </a>
            )}
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

          {/* Active / Inactive toggle */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(45,58,40,0.45)" }}>Visibility on Website</p>
            <button type="button" onClick={() => set("isActive", !form.isActive)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all"
              style={{ borderColor: form.isActive ? "#2D3A28" : "rgba(45,58,40,0.15)", backgroundColor: form.isActive ? "rgba(45,58,40,0.04)" : "transparent" }}>
              <div className="text-left">
                <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>{form.isActive ? "Active — Showing" : "Hidden from site"}</p>
                <p className="font-inter text-xs mt-0.5" style={{ color: "rgba(45,58,40,0.5)" }}>{form.isActive ? "Appears on /blog" : "Hidden from /blog"}</p>
              </div>
              <span className="relative inline-flex h-6 w-11 rounded-full border-2 transition-colors flex-shrink-0"
                style={{ backgroundColor: form.isActive ? "#2D3A28" : "rgba(45,58,40,0.15)", borderColor: form.isActive ? "#2D3A28" : "rgba(45,58,40,0.2)" }}>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform mt-0.5"
                  style={{ marginLeft: form.isActive ? "22px" : "2px" }} />
              </span>
            </button>
          </div>

          <div className="rounded-xl p-4 border" style={{ backgroundColor: "rgba(45,58,40,0.03)", borderColor: "rgba(45,58,40,0.1)" }}>
            <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(45,58,40,0.4)" }}>Post Info</p>
            <p className="font-inter text-xs leading-relaxed" style={{ color: "rgba(45,58,40,0.55)" }}>
              Post <strong>{postIndex}</strong> of <strong>{totalPosts}</strong><br />
              Order: <strong>#{form.displayOrder}</strong> &nbsp;·&nbsp; OG: <strong>{form.ogType}</strong><br />
              Robots: <strong>{form.robotsIndex ? "index" : "noindex"}, {form.robotsFollow ? "follow" : "nofollow"}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
