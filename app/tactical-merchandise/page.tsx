"use client";

import { useState, FormEvent } from "react";

const GRID_SVG = (size: number) =>
  `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D3A28' fill-opacity='1'%3E%3Cpath d='M0 0h2v${size}H0zm${size - 2} 0h2v${size}h-2zM0 0v2h${size}V0zm0 ${size - 2}v2h${size}v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

function WishlistForm() {
  const [fields, setFields] = useState({ name: "", company: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      // TODO: replace with your API endpoint
      // await fetch("/api/wishlist", { method: "POST", body: JSON.stringify(fields) });
      await new Promise((r) => setTimeout(r, 800)); // placeholder delay
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full font-inter text-base px-4 py-3 rounded-lg border outline-none transition-colors";
  const inputStyle = {
    borderColor: "rgba(45,58,40,0.2)",
    color: "#2D3A28",
    backgroundColor: "#fff",
  };
  const inputFocusClass = "focus:border-[#2D3A28]";

  if (status === "done") {
    return (
      <div className="text-center py-10">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 text-2xl"
          style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
        >
          ✓
        </div>
        <h3 className="font-barlow text-2xl font-black mb-2" style={{ color: "#2D3A28" }}>
          You&apos;re on the list!
        </h3>
        <p className="font-inter text-base" style={{ color: "rgba(45,58,40,0.65)" }}>
          We&apos;ll reach out as soon as the marketplace goes live.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-barlow text-sm font-bold mb-1.5 tracking-wide" style={{ color: "#2D3A28" }}>
          Name <span style={{ color: "#F5C124" }}>*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Your full name"
          value={fields.name}
          onChange={set("name")}
          className={`${inputClass} ${inputFocusClass}`}
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block font-barlow text-sm font-bold mb-1.5 tracking-wide" style={{ color: "#2D3A28" }}>
          Company Name <span style={{ color: "#F5C124" }}>*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Store or business name"
          value={fields.company}
          onChange={set("company")}
          className={`${inputClass} ${inputFocusClass}`}
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block font-barlow text-sm font-bold mb-1.5 tracking-wide" style={{ color: "#2D3A28" }}>
          Email Address <span style={{ color: "#F5C124" }}>*</span>
        </label>
        <input
          type="email"
          required
          placeholder="you@yourstore.com"
          value={fields.email}
          onChange={set("email")}
          className={`${inputClass} ${inputFocusClass}`}
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <p className="font-inter text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full font-barlow font-black text-base tracking-wide py-4 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
        style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
      >
        {status === "submitting" ? "Joining..." : "Join Wait List"}
      </button>

      <p className="font-inter text-xs text-center" style={{ color: "rgba(45,58,40,0.45)" }}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}

export default function TacticalMerchandise() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero — matches home page */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-16 px-6 bg-white overflow-hidden text-center">
        {/* Layer 1 — small 40px grid drifts forward (near) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: GRID_SVG(40),
            opacity: 0.055,
            animation: "gridDrift 18s linear infinite",
          }}
        />
        {/* Layer 2 — larger 70px grid drifts backward (far) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: GRID_SVG(70),
            opacity: 0.03,
            animation: "gridDriftReverse 28s linear infinite",
          }}
        />

        <div className="relative max-w-4xl mx-auto w-full">
          <div className="inline-block mb-5">
            <p
              className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full"
              style={{ color: "#F5C124", backgroundColor: "#2D3A28" }}
            >
              New Vertical
            </p>
          </div>
          <h1
            className="font-barlow text-4xl md:text-6xl font-black mb-6 leading-tight"
            style={{ color: "#2D3A28" }}
          >
            Coming Soon....!
          </h1>
          <p
            className="font-barlow text-xl md:text-2xl font-semibold leading-relaxed max-w-2xl mx-auto mb-14"
            style={{ color: "#2D3A28" }}
          >
            A curated marketplace of tactical gear and ammunition — sourced from verified brands, ready for dealers and retailers to stock their stores.
          </p>

          {/* Wishlist form */}
          <div
            className="max-w-md mx-auto rounded-2xl border-2 p-8 text-left"
            style={{ borderColor: "#F5C124", backgroundColor: "#fff" }}
          >
            <h2
              className="font-barlow text-2xl font-black mb-1"
              style={{ color: "#2D3A28" }}
            >
              Join Wish List
            </h2>
            <p
              className="font-inter text-sm mb-6"
              style={{ color: "rgba(45,58,40,0.6)" }}
            >
              Be the first to know when new brands and products go live.
            </p>
            <WishlistForm />
          </div>
        </div>
      </section>
    </main>
  );
}
