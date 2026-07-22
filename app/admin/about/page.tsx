"use client";

import { useEffect, useState, useRef } from "react";

type GalleryImage = string;
type TeamMember = { name: string; role: string; bio: string; photo: string };
type Review = { name: string; company: string; text: string; rating: number };

interface AboutContent {
  hero: { name: string; role: string; tagline: string };
  company: {
    headline: string;
    subheadline: string;
    missionStatement: string;
    missionBody: string;
    doctrineStatement: string;
    doctrineBody1: string;
    doctrineBody2: string;
  };
  founder: { intro1: string; intro2: string; intro3: string };
  brandStory: { title: string; body: string };
  myStory: { title: string; body: string };
  galleryImages: GalleryImage[];
  team: TeamMember[];
  reviews: Review[];
}

const DEFAULT: AboutContent = {
  hero: { name: "Ameer Hamza", role: "Email Strategist — Lifecycle & Retention Marketing", tagline: "" },
  company: {
    headline: "Done-For-You Email Marketing for Firearms, Ammo & Tactical Brands",
    subheadline: "We build and run the lifecycle email infrastructure that turns your subscriber list into your most reliable, highest-ROI revenue channel.",
    missionStatement: "Our mission is simple. Move your customers from subscribed to sold, again and again.",
    missionBody: "Most firearm and tactical stores already have a list. The gap is not the list. It is the system. We build the lifecycle email infrastructure, including flows, campaigns, segmentation, and execution, that turns subscribers into repeat buyers and repeat buyers into loyal customers.",
    doctrineStatement: "Our doctrine is simple. Precision.",
    doctrineBody1: "Every email must have a purpose. Every segment must be defined. Every send must be deliberate. We don't batch-and-blast. We build systems that deliver the right message to the right customer at the right point in their lifecycle.",
    doctrineBody2: "Precision in segmentation. Precision in messaging. Precision in timing. That's how email becomes your highest-ROI channel.",
  },
  founder: {
    intro1: "Hi, I am Ameer. After years of building lifecycle email programs for ecommerce brands, I realized generic email marketing rarely fits specialist industries.",
    intro2: "Firearms, tactical, and outdoor brands have unique customers, unique buying journeys, and unique challenges. They deserve email strategies built around those realities — not recycled ecommerce playbooks.",
    intro3: "That's why I founded EmailVMail. And it has a story to it.",
  },
  brandStory: { title: "", body: "" },
  myStory: { title: "", body: "" },
  galleryImages: [],
  team: [],
  reviews: [],
};

async function resizeImage(file: File, maxW = 1200): Promise<string> {
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
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.src = url;
  });
}

const TAB_LABELS = ["Gallery", "Company", "Founder", "Team", "Reviews"] as const;
type Tab = typeof TAB_LABELS[number];

const inputCls = "w-full font-inter text-sm px-4 py-3 rounded-lg border outline-none transition-colors bg-white";
const inputStyle = { borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" };
const labelCls = "font-barlow text-xs font-black uppercase tracking-wider mb-1.5 block";

export default function AboutCMS() {
  const [tab, setTab] = useState<Tab>("Gallery");
  const [content, setContent] = useState<AboutContent>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const galleryRef = useRef<HTMLInputElement>(null);
  const teamPhotoRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    fetch("/api/admin/content?page=about")
      .then(r => r.json())
      .then(d => {
        if (d.content?.sections) {
          const s = d.content.sections;
          setContent({
            ...DEFAULT,
            ...s,
            company: { ...DEFAULT.company, ...(s.company ?? {}) },
            founder: { ...DEFAULT.founder, ...(s.founder ?? {}) },
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageKey: "about", sections: content }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function setHero(field: keyof typeof content.hero, val: string) {
    setContent(p => ({ ...p, hero: { ...p.hero, [field]: val } }));
  }
  function setBrandStory(field: keyof typeof content.brandStory, val: string) {
    setContent(p => ({ ...p, brandStory: { ...p.brandStory, [field]: val } }));
  }
  function setMyStory(field: keyof typeof content.myStory, val: string) {
    setContent(p => ({ ...p, myStory: { ...p.myStory, [field]: val } }));
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const b64s = await Promise.all(files.map(f => resizeImage(f)));
    setContent(p => ({ ...p, galleryImages: [...p.galleryImages, ...b64s] }));
    if (galleryRef.current) galleryRef.current.value = "";
  }

  function removeGalleryImage(i: number) {
    setContent(p => ({ ...p, galleryImages: p.galleryImages.filter((_, idx) => idx !== i) }));
  }

  function moveGalleryImage(i: number, dir: -1 | 1) {
    const imgs = [...content.galleryImages];
    const j = i + dir;
    if (j < 0 || j >= imgs.length) return;
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    setContent(p => ({ ...p, galleryImages: imgs }));
  }

  function addTeamMember() {
    setContent(p => ({ ...p, team: [...p.team, { name: "", role: "", bio: "", photo: "" }] }));
  }

  function updateTeam(i: number, field: keyof TeamMember, val: string) {
    const team = [...content.team];
    team[i] = { ...team[i], [field]: val };
    setContent(p => ({ ...p, team }));
  }

  async function handleTeamPhoto(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await resizeImage(file, 600);
    updateTeam(i, "photo", b64);
  }

  function removeTeamMember(i: number) {
    setContent(p => ({ ...p, team: p.team.filter((_, idx) => idx !== i) }));
  }

  function addReview() {
    setContent(p => ({ ...p, reviews: [...p.reviews, { name: "", company: "", text: "", rating: 5 }] }));
  }

  function updateReview(i: number, field: keyof Review, val: string | number) {
    const reviews = [...content.reviews];
    reviews[i] = { ...reviews[i], [field]: val };
    setContent(p => ({ ...p, reviews }));
  }

  function removeReview(i: number) {
    setContent(p => ({ ...p, reviews: p.reviews.filter((_, idx) => idx !== i) }));
  }

  if (loading) return <div className="p-10 text-center font-inter text-sm" style={{ color: "rgba(45,58,40,0.5)" }}>Loading…</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>About Us Page</h1>
          <p className="font-inter text-sm mt-0.5" style={{ color: "rgba(45,58,40,0.5)" }}>Edit content shown at /about</p>
        </div>
        <button onClick={save} disabled={saving}
          className="font-barlow font-bold px-6 py-3 rounded-lg text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: saved ? "#16a34a" : "#2D3A28", color: "#F5C124" }}>
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 border" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
        {TAB_LABELS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 font-barlow text-sm font-bold py-2.5 rounded-lg transition-all"
            style={{ backgroundColor: tab === t ? "#2D3A28" : "transparent", color: tab === t ? "#F5C124" : "rgba(45,58,40,0.5)" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Gallery Tab */}
      {tab === "Gallery" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
            <p className="font-barlow text-sm font-black mb-1" style={{ color: "#2D3A28" }}>Gallery Images</p>
            <p className="font-inter text-xs mb-4" style={{ color: "rgba(45,58,40,0.5)" }}>Upload 6–8 images. They scroll vertically on the About page. Images are auto-resized to max 1200px.</p>
            <input ref={galleryRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" id="gallery-upload" />
            <label htmlFor="gallery-upload"
              className="inline-flex items-center gap-2 font-barlow font-bold px-5 py-3 rounded-lg text-sm cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Upload Images
            </label>
          </div>

          {content.galleryImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((src, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
                  <img src={src} alt="" className="w-full h-44 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => moveGalleryImage(i, -1)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/90 hover:bg-white transition-colors" style={{ color: "#2D3A28" }}>↑</button>
                    <button onClick={() => moveGalleryImage(i, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/90 hover:bg-white transition-colors" style={{ color: "#2D3A28" }}>↓</button>
                    <button onClick={() => removeGalleryImage(i)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors text-white">✕</button>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 text-white font-barlow text-xs px-2 py-0.5 rounded">#{i + 1}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Company Tab */}
      {tab === "Company" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
            <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Company Header</p>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Headline</label>
              <input className={inputCls} style={inputStyle} value={content.company.headline} onChange={e => setContent(p => ({ ...p, company: { ...p.company, headline: e.target.value } }))} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Subheadline</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={3} value={content.company.subheadline} onChange={e => setContent(p => ({ ...p, company: { ...p.company, subheadline: e.target.value } }))} />
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
            <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Mission</p>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Statement (bold)</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={2} value={content.company.missionStatement} onChange={e => setContent(p => ({ ...p, company: { ...p.company, missionStatement: e.target.value } }))} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Body</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={4} value={content.company.missionBody} onChange={e => setContent(p => ({ ...p, company: { ...p.company, missionBody: e.target.value } }))} />
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
            <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Doctrine</p>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Statement (bold)</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={2} value={content.company.doctrineStatement} onChange={e => setContent(p => ({ ...p, company: { ...p.company, doctrineStatement: e.target.value } }))} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Body Paragraph 1</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={3} value={content.company.doctrineBody1} onChange={e => setContent(p => ({ ...p, company: { ...p.company, doctrineBody1: e.target.value } }))} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Body Paragraph 2</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={2} value={content.company.doctrineBody2} onChange={e => setContent(p => ({ ...p, company: { ...p.company, doctrineBody2: e.target.value } }))} />
            </div>
          </div>
        </div>
      )}

      {/* Founder Tab */}
      {tab === "Founder" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
            <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Identity</p>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Name</label>
              <input className={inputCls} style={inputStyle} value={content.hero.name} onChange={e => setHero("name", e.target.value)} placeholder="Ameer Hamza" />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Role / Title</label>
              <input className={inputCls} style={inputStyle} value={content.hero.role} onChange={e => setHero("role", e.target.value)} placeholder="Founder & Email Marketing Strategist" />
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6 space-y-5" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
            <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Intro Paragraphs</p>
            <p className="font-inter text-xs -mt-3" style={{ color: "rgba(45,58,40,0.45)" }}>Shown below your name on the About page, above the full story.</p>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Paragraph 1</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={3} value={content.founder.intro1} onChange={e => setContent(p => ({ ...p, founder: { ...p.founder, intro1: e.target.value } }))} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Paragraph 2</label>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={3} value={content.founder.intro2} onChange={e => setContent(p => ({ ...p, founder: { ...p.founder, intro2: e.target.value } }))} />
            </div>
            <div>
              <label className={labelCls} style={{ color: "rgba(45,58,40,0.5)" }}>Closing Line (shown bold)</label>
              <input className={inputCls} style={inputStyle} value={content.founder.intro3} onChange={e => setContent(p => ({ ...p, founder: { ...p.founder, intro3: e.target.value } }))} />
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {tab === "Team" && (
        <div className="space-y-5">
          {content.team.map((member, i) => (
            <div key={i} className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
              <div className="flex items-center justify-between">
                <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Team Member {i + 1}</p>
                <button onClick={() => removeTeamMember(i)} className="font-inter text-xs px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#dc2626" }}>Remove</button>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {member.photo ? (
                    <img src={member.photo} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(45,58,40,0.08)" }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "rgba(45,58,40,0.3)" }}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" id={`team-photo-${i}`}
                    ref={el => { teamPhotoRefs.current[i] = el; }}
                    onChange={e => handleTeamPhoto(i, e)} />
                  <label htmlFor={`team-photo-${i}`} className="block mt-2 text-center font-inter text-xs cursor-pointer hover:opacity-70 transition-opacity" style={{ color: "#F5C124" }}>
                    {member.photo ? "Change" : "Upload"}
                  </label>
                </div>
                <div className="flex-1 space-y-3">
                  <input className={inputCls} style={inputStyle} placeholder="Full Name" value={member.name} onChange={e => updateTeam(i, "name", e.target.value)} />
                  <input className={inputCls} style={inputStyle} placeholder="Role / Title" value={member.role} onChange={e => updateTeam(i, "role", e.target.value)} />
                  <textarea className={inputCls + " resize-none"} style={inputStyle} rows={3} placeholder="Short bio…" value={member.bio} onChange={e => updateTeam(i, "bio", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addTeamMember}
            className="w-full font-barlow font-bold py-3.5 rounded-xl border-2 border-dashed text-sm hover:opacity-80 transition-opacity"
            style={{ borderColor: "rgba(45,58,40,0.2)", color: "rgba(45,58,40,0.5)" }}>
            + Add Team Member
          </button>
        </div>
      )}

      {/* Reviews Tab */}
      {tab === "Reviews" && (
        <div className="space-y-5">
          {content.reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "rgba(45,58,40,0.12)" }}>
              <div className="flex items-center justify-between">
                <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Review {i + 1}</p>
                <button onClick={() => removeReview(i)} className="font-inter text-xs px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#dc2626" }}>Remove</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input className={inputCls} style={inputStyle} placeholder="Client Name" value={review.name} onChange={e => updateReview(i, "name", e.target.value)} />
                <input className={inputCls} style={inputStyle} placeholder="Company / Store" value={review.company} onChange={e => updateReview(i, "company", e.target.value)} />
              </div>
              <textarea className={inputCls + " resize-none"} style={inputStyle} rows={3} placeholder="Review text…" value={review.text} onChange={e => updateReview(i, "text", e.target.value)} />
              <div className="flex items-center gap-3">
                <label className="font-barlow text-xs font-black uppercase tracking-wider" style={{ color: "rgba(45,58,40,0.5)" }}>Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => updateReview(i, "rating", n)}
                      className="transition-transform hover:scale-110">
                      <svg className="w-6 h-6" fill={n <= review.rating ? "#F5C124" : "none"} stroke="#F5C124" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button onClick={addReview}
            className="w-full font-barlow font-bold py-3.5 rounded-xl border-2 border-dashed text-sm hover:opacity-80 transition-opacity"
            style={{ borderColor: "rgba(45,58,40,0.2)", color: "rgba(45,58,40,0.5)" }}>
            + Add Review
          </button>
        </div>
      )}
    </div>
  );
}
