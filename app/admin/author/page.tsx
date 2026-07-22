"use client";

import { useEffect, useState, useRef } from "react";

interface AuthorContent {
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  photo: string;
  linkedin: string;
  whatsapp: string;
}

const DEFAULT: AuthorContent = {
  name: "", title: "", shortBio: "", fullBio: "", photo: "",
  linkedin: "https://linkedin.com/in/rahamza009/",
  whatsapp: "https://wa.me/923001588645",
};

async function resizeImage(file: File, maxW = 800): Promise<string> {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.src = url;
  });
}

const inputCls = "w-full font-inter text-sm px-4 py-3 rounded-lg border outline-none transition-colors bg-white";
const inputStyle = { borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" };
const labelCls = "font-barlow text-xs font-black uppercase tracking-wider mb-1.5 block";

export default function AuthorCMS() {
  const [content, setContent] = useState<AuthorContent>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const photoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/content?page=author")
      .then(r => r.json())
      .then(d => { if (d.content?.sections) setContent({ ...DEFAULT, ...d.content.sections }); })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageKey: "author", sections: content }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function set(field: keyof AuthorContent, val: string) {
    setContent(p => ({ ...p, [field]: val }));
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await resizeImage(file, 600);
    set("photo", b64);
  }

  if (loading) return <div className="p-10 text-center font-inter text-sm" style={{ color: "rgba(45,58,40,0.5)" }}>Loading…</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>Author Page</h1>
          <p className="font-inter text-sm mt-0.5" style={{ color: "rgba(45,58,40,0.5)" }}>Edits /author — not indexed by search engines</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/author" target="_blank" rel="noopener noreferrer"
            className="font-inter text-xs px-4 py-2.5 rounded-lg border hover:opacity-70 transition-opacity"
            style={{ borderColor: "rgba(45,58,40,0.2)", color: "rgba(45,58,40,0.6)" }}>
            Preview ↗
          </a>
          <button onClick={save} disabled={saving}
            className="font-barlow font-bold px-6 py-3 rounded-lg text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{ backgroundColor: saved ? "#16a34a" : "#2D3A28", color: "#F5C124" }}>
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-6">

        {/* Photo */}
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
          <p className="font-barlow text-sm font-black mb-4" style={{ color: "#2D3A28" }}>Author Photo</p>
          <div className="flex items-center gap-6">
            {content.photo ? (
              <img src={content.photo} alt="" className="w-24 h-24 rounded-full object-cover object-top border-2" style={{ borderColor: "#F5C124" }} />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed" style={{ borderColor: "rgba(45,58,40,0.2)", backgroundColor: "rgba(45,58,40,0.04)" }}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "rgba(45,58,40,0.3)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <div>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              <button onClick={() => photoRef.current?.click()}
                className="font-barlow font-bold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
                {content.photo ? "Change Photo" : "Upload Photo"}
              </button>
              <p className="font-inter text-xs mt-2" style={{ color: "rgba(45,58,40,0.4)" }}>Auto-resized to 600px. Recommended: square crop.</p>
              {content.photo && (
                <button onClick={() => set("photo", "")} className="font-inter text-xs mt-1 hover:opacity-70 transition-opacity" style={{ color: "#dc2626" }}>Remove photo</button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
          <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Basic Info</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Full Name</label>
              <input className={inputCls} style={inputStyle} placeholder="Ameer Hamza" value={content.name} onChange={e => set("name", e.target.value)} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Title / Role</label>
              <input className={inputCls} style={inputStyle} placeholder="Founder & Email Marketing Strategist" value={content.title} onChange={e => set("title", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Short Bio (shown in hero)</label>
            <textarea className={inputCls + " resize-none"} style={inputStyle} rows={2} placeholder="One or two sentences…" value={content.shortBio} onChange={e => set("shortBio", e.target.value)} />
          </div>
          <div>
            <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Full Bio (shown in body)</label>
            <textarea className={inputCls + " resize-none"} style={inputStyle} rows={8} placeholder="Longer biography…" value={content.fullBio} onChange={e => set("fullBio", e.target.value)} />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
          <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Social Links</p>
          <div>
            <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>LinkedIn URL</label>
            <input className={inputCls} style={inputStyle} placeholder="https://linkedin.com/in/…" value={content.linkedin} onChange={e => set("linkedin", e.target.value)} />
          </div>
          <div>
            <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>WhatsApp URL</label>
            <input className={inputCls} style={inputStyle} placeholder="https://wa.me/…" value={content.whatsapp} onChange={e => set("whatsapp", e.target.value)} />
          </div>
        </div>

        {/* Usage note */}
        <div className="rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(245,193,36,0.08)", border: "1px solid rgba(245,193,36,0.25)" }}>
          <p className="font-barlow text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#F5C124" }}>Linking from Blog Posts</p>
          <p className="font-inter text-xs leading-relaxed" style={{ color: "rgba(45,58,40,0.6)" }}>
            Link to <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: "rgba(45,58,40,0.08)" }}>/author</code> from any blog post byline. This page is not indexed by search engines.
          </p>
        </div>
      </div>
    </div>
  );
}
