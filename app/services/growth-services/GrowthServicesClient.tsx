"use client";

import { useState } from "react";

const SERVICES = [
  {
    title: "Web Development & Store Management",
    desc: "High-converting, compliant storefronts built for the firearms and tactical industry. From Shopify customization to full-stack builds — we handle development, ongoing maintenance, and performance optimization so your store stays fast, functional, and converting.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Industry-Compatible SEO",
    desc: "Search engine optimization built around the unique restrictions of the firearms and tactical space. We target high-intent keywords, build compliant content architecture, and grow your organic visibility without triggering platform restrictions or policy flags.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>
    ),
  },
  {
    title: "Niche Content Writing",
    desc: "Product descriptions, blog posts, buying guides, and brand copy written by people who actually understand the industry. Accurate terminology, compliant language, and content that converts — not generic AI copy that sounds like it was written by someone who's never held a firearm.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Compliant Digital Marketing",
    desc: "Paid and organic marketing strategies that work within the strict advertising policies of the 2A space. We know what Google, Meta, and other platforms will and won't allow — and we build campaigns that generate revenue without getting your accounts flagged or banned.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const SERVICE_NAMES = SERVICES.map(s => s.title);

function Modal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", businessName: "", service: "", challenge: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function set(field: string, val: string) {
    setError("");
    setForm(prev => ({ ...prev, [field]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { fullName, email, phone, businessName, service, challenge } = form;
    if (!fullName.trim() || !email.trim() || !phone.trim() || !businessName.trim() || !service.trim() || !challenge.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/services-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const d = await res.json();
        setError(d.error ?? "Something went wrong.");
        setStatus("idle");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  const inputCls = "w-full font-inter text-base px-4 py-3 rounded-xl border-2 outline-none bg-transparent text-white transition-colors placeholder:text-white/30";
  const inputStyle = (val: string) => ({ borderColor: val ? "#F5C124" : "rgba(255,255,255,0.15)", caretColor: "#F5C124" });
  const labelCls = "font-barlow text-xs font-bold tracking-[0.15em] uppercase mb-1.5 block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-2xl border overflow-y-auto max-h-[90vh]"
        style={{ backgroundColor: "#1a2316", borderColor: "rgba(245,193,36,0.2)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: "rgba(245,193,36,0.1)" }}>
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70" style={{ color: "rgba(255,255,255,0.4)" }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <p className="font-barlow text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "#F5C124" }}>Service Request</p>
          <h3 className="font-barlow text-2xl font-black text-white">Tell us about your project</h3>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>We'll follow up within 1 business day.</p>
        </div>

        {status === "success" ? (
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#F5C124" }}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#2D3A28" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h4 className="font-barlow text-xl font-black text-white mb-2">Request Received</h4>
            <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Our team will be in touch within 1 business day.</p>
            <button onClick={onClose} className="mt-6 font-barlow font-bold px-7 py-3 rounded-xl text-sm tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-8 py-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls} style={{ color: "#F5C124" }}>Full Name</label>
                <input type="text" placeholder="Your full name" value={form.fullName} onChange={e => set("fullName", e.target.value)} className={inputCls} style={inputStyle(form.fullName)} />
              </div>
              <div>
                <label className={labelCls} style={{ color: "#F5C124" }}>Business Name</label>
                <input type="text" placeholder="Your store or brand" value={form.businessName} onChange={e => set("businessName", e.target.value)} className={inputCls} style={inputStyle(form.businessName)} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls} style={{ color: "#F5C124" }}>Email</label>
                <input type="email" placeholder="you@yourstore.com" value={form.email} onChange={e => set("email", e.target.value)} className={inputCls} style={inputStyle(form.email)} />
              </div>
              <div>
                <label className={labelCls} style={{ color: "#F5C124" }}>Phone / WhatsApp</label>
                <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} style={inputStyle(form.phone)} />
              </div>
            </div>
            <div>
              <label className={labelCls} style={{ color: "#F5C124" }}>Service Needed</label>
              <select value={form.service} onChange={e => set("service", e.target.value)} className={inputCls} style={{ ...inputStyle(form.service), backgroundColor: "#1a2316" }}>
                <option value="" disabled>Select a service…</option>
                {SERVICE_NAMES.map(name => <option key={name} value={name} style={{ backgroundColor: "#1a2316" }}>{name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} style={{ color: "#F5C124" }}>Current Challenge</label>
              <textarea rows={4} placeholder="Describe what you're trying to solve or achieve…" value={form.challenge} onChange={e => set("challenge", e.target.value)} className={inputCls + " resize-none"} style={inputStyle(form.challenge)} />
            </div>
            {error && <p className="font-inter text-sm font-semibold" style={{ color: "#f87171" }}>{error}</p>}
            <button type="submit" disabled={status === "loading"} className="w-full font-barlow font-bold py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
              {status === "loading" ? "Sending…" : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function GrowthServicesClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-6" style={{ backgroundColor: "#2D3A28" }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-5" style={{ color: "#F5C124" }}>Other Services</p>
            <h1 className="font-barlow text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white mb-6">
              We offer you a complete<br className="hidden md:block" /> marketing package
            </h1>
            <p className="font-inter text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              A one-stop window for growth with clear KPIs and benchmarks. Everything your store needs to compete — built by people who know the industry.
            </p>
          </div>
        </section>

        <section className="py-20 px-6" style={{ backgroundColor: "#f7f5f0" }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
              {SERVICES.map(service => (
                <div key={service.title} className="rounded-2xl border p-8 bg-white" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(245,193,36,0.12)", color: "#2D3A28" }}>
                    {service.icon}
                  </div>
                  <h2 className="font-barlow text-xl font-black mb-3" style={{ color: "#2D3A28" }}>{service.title}</h2>
                  <p className="font-inter text-base leading-relaxed" style={{ color: "rgba(45,58,40,0.65)" }}>{service.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 font-barlow font-bold px-10 py-5 rounded-xl text-lg tracking-wide transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
              >
                Request a Service
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <p className="font-inter text-sm mt-3" style={{ color: "rgba(45,58,40,0.4)" }}>We respond within 1 business day</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
