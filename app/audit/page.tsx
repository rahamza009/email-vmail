"use client";

import { useState } from "react";
import Link from "next/link";

const AUDIT_DIMENSIONS = [
  "Email Revenue Attribution",
  "Flow Coverage Gap Analysis",
  "List Health & Deliverability Score",
  "Segmentation & Targeting Review",
  "Compliance Risk Assessment",
  "Campaign Performance Benchmarks",
  "30-Day Revenue Recovery Roadmap",
];

const REVENUE_OPTIONS = ["Under $500K/year", "$500K – $1M/year", "$1M – $5M/year", "$5M+/year"];
const LIST_OPTIONS    = ["Under 2,000 subscribers", "2,000 – 5,000 subscribers", "5,000+ subscribers"];

type Form = {
  fullName: string; email: string; phone: string; websiteUrl: string;
  revenue: string; listSize: string; challenge: string;
};
const EMPTY: Form = { fullName: "", email: "", phone: "", websiteUrl: "", revenue: "", listSize: "", challenge: "" };

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7" fill="#F5C124" />
        <text x="16" y="22.5" fontFamily="Arial Black, Arial, sans-serif" fontSize="15" fontWeight="900" fill="#2D3A28" textAnchor="middle" letterSpacing="0.5">EV</text>
      </svg>
      <span className="font-barlow text-base font-black tracking-wide" style={{ color: "#2D3A28" }}>Email-Vmail</span>
    </Link>
  );
}

function SectionCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden" style={{ border: "1px solid #e2e8e0", boxShadow: "0 1px 4px rgba(45,58,40,0.06)" }}>
      <div className="px-8 py-5 flex items-center gap-4" style={{ backgroundColor: "#2D3A28", borderBottom: "3px solid #F5C124" }}>
        <span className="w-8 h-8 rounded flex items-center justify-center font-barlow text-sm font-black flex-shrink-0" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>{number}</span>
        <p className="font-barlow text-sm font-black tracking-[0.2em] uppercase text-white">{title}</p>
      </div>
      <div className="px-8 py-8">{children}</div>
    </div>
  );
}

function TextInput({ id, name, type, autoComplete, placeholder, value, onChange }: {
  id: string; name: string; type: string; autoComplete: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  const filled = value.trim().length > 0;
  return (
    <input
      id={id} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder}
      value={value} onChange={e => onChange(e.target.value)}
      className="w-full font-inter text-base px-4 py-4 rounded-lg outline-none transition-all"
      style={{
        backgroundColor: "#f8f7f4",
        border: `2px solid ${filled ? "#2D3A28" : "#d4d8d2"}`,
        color: "#2D3A28",
        caretColor: "#F5C124",
      }}
    />
  );
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map(opt => {
        const selected = value === opt;
        return (
          <button
            key={opt} type="button" onClick={() => onChange(opt)}
            className="text-left px-5 py-4 rounded-lg font-inter text-base font-medium transition-all"
            style={{
              border: `2px solid ${selected ? "#2D3A28" : "#d4d8d2"}`,
              backgroundColor: selected ? "#2D3A28" : "#f8f7f4",
              color: selected ? "#F5C124" : "#2D3A28",
            }}
          >
            <span className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                style={{ borderColor: selected ? "#F5C124" : "#9aa89a", backgroundColor: "transparent" }}>
                {selected && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F5C124" }} />}
              </span>
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function AuditPage() {
  const [form, setForm]     = useState<Form>(EMPTY);
  const [error, setError]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function set(field: keyof Form, val: string) {
    setError("");
    setForm(prev => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { fullName, email, phone, websiteUrl, revenue, listSize, challenge } = form;
    if (!fullName.trim() || !email.trim() || !phone.trim() || !websiteUrl.trim() || !revenue || !listSize || !challenge.trim()) {
      setError("Please complete all fields before submitting.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); }
      else {
        const d = await res.json();
        setError(d.error ?? "Something went wrong.");
        setStatus("idle");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#F5C124" }}>
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2D3A28" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-barlow text-3xl font-black mb-3" style={{ color: "#2D3A28" }}>Audit Request Received</h2>
          <p className="font-inter text-base leading-relaxed mb-8" style={{ color: "rgba(45,58,40,0.6)" }}>
            Our Client Success Manager will be in touch within 24 hours.
          </p>
          <Link href="/" className="inline-block font-barlow font-bold px-8 py-4 rounded-lg text-base tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f4f2ed" }}>

      {/* Hero banner */}
      <div className="relative" style={{ backgroundColor: "#2D3A28" }}>
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img src="/audit-page.jpg" alt="" className="w-full h-full object-cover object-center" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(45,58,40,0.55) 0%, rgba(45,58,40,0.75) 60%, rgba(45,58,40,0.95) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-10 pb-14 text-center">
          <div className="flex items-center justify-between mb-12">
            <Logo />
            <Link href="/" className="font-inter text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.5)" }}>← Back</Link>
          </div>

          <span className="inline-block font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
            $0 Account Audit
          </span>
          <h1 className="font-barlow text-5xl md:text-6xl font-black leading-tight text-white mb-5">
            Get Your Free Email Account Audit
          </h1>
          <p className="font-inter text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
            We review your program across <span style={{ color: "#F5C124" }}>7 critical dimensions</span> and follow up within 1 business day with a personalised roadmap.
          </p>

          {/* Dimension pills — flex justify-center, fixed 25% width → 4+3 centered */}
          <div className="flex flex-wrap justify-center gap-2">
            {AUDIT_DIMENSIONS.map((dim, i) => {
              const words = dim.split(" ");
              const lastWord = i < 2 ? words[words.length - 1] : null;
              const main = i < 2 ? words.slice(0, -1).join(" ") : dim;
              return (
                <span key={dim} className="font-barlow text-xs font-semibold px-3 py-2 rounded-full text-center leading-snug" style={{ width: "calc(25% - 6px)", backgroundColor: "rgba(245,193,36,0.12)", color: "#F5C124", border: "1px solid rgba(245,193,36,0.3)" }}>
                  {main}{lastWord && <><br />{lastWord}</>}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gold stripe */}
      <div className="h-1" style={{ backgroundColor: "#F5C124" }} />

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Section 1 */}
          <SectionCard number="01" title="About You">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="font-barlow text-xs font-black uppercase tracking-widest mb-2 block" style={{ color: "rgba(45,58,40,0.5)" }}>Full Name</label>
                <TextInput id="fullName" name="name" type="text" autoComplete="name" placeholder="Your full name" value={form.fullName} onChange={v => set("fullName", v)} />
              </div>
              <div>
                <label htmlFor="email" className="font-barlow text-xs font-black uppercase tracking-widest mb-2 block" style={{ color: "rgba(45,58,40,0.5)" }}>Email Address</label>
                <TextInput id="email" name="email" type="email" autoComplete="email" placeholder="you@yourstore.com" value={form.email} onChange={v => set("email", v)} />
              </div>
              <div>
                <label htmlFor="phone" className="font-barlow text-xs font-black uppercase tracking-widest mb-2 block" style={{ color: "rgba(45,58,40,0.5)" }}>Phone / WhatsApp</label>
                <TextInput id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={v => set("phone", v)} />
              </div>
              <div>
                <label htmlFor="websiteUrl" className="font-barlow text-xs font-black uppercase tracking-widest mb-2 block" style={{ color: "rgba(45,58,40,0.5)" }}>Website URL</label>
                <TextInput id="websiteUrl" name="url" type="url" autoComplete="url" placeholder="yourstore.com" value={form.websiteUrl} onChange={v => set("websiteUrl", v)} />
              </div>
            </div>
          </SectionCard>

          {/* Section 2 */}
          <SectionCard number="02" title="Annual Online Revenue">
            <RadioGroup options={REVENUE_OPTIONS} value={form.revenue} onChange={v => set("revenue", v)} />
          </SectionCard>

          {/* Section 3 */}
          <SectionCard number="03" title="Email List Size">
            <RadioGroup options={LIST_OPTIONS} value={form.listSize} onChange={v => set("listSize", v)} />
          </SectionCard>

          {/* Section 4 */}
          <SectionCard number="04" title="Your Biggest Email Challenge">
            <textarea
              id="challenge" rows={5}
              placeholder="What's not working — or what are you trying to improve?"
              value={form.challenge}
              onChange={e => { setError(""); set("challenge", e.target.value); }}
              className="w-full font-inter text-base px-4 py-4 rounded-lg outline-none resize-none transition-all"
              style={{
                backgroundColor: "#f8f7f4",
                border: `2px solid ${form.challenge.trim() ? "#2D3A28" : "#d4d8d2"}`,
                color: "#2D3A28",
                caretColor: "#F5C124",
              }}
            />
          </SectionCard>

          {error && (
            <p className="font-inter text-sm font-semibold px-1" style={{ color: "#dc2626" }}>{error}</p>
          )}

          <button
            type="submit" disabled={status === "loading"}
            className="w-full font-barlow font-bold py-5 rounded-lg text-lg tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
          >
            {status === "loading" ? "Submitting…" : (
              <>Submit Audit Request <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></>
            )}
          </button>

          <p className="font-inter text-xs text-center" style={{ color: "rgba(45,58,40,0.35)" }}>
            Free · No commitment · Response within 1 business day
          </p>
        </form>
      </div>
    </main>
  );
}
