"use client";

import { useState, FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("non-ok");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full inline-block mb-5"
          style={{ color: "#F5C124", backgroundColor: "#2D3A28" }}
        >
          Bi-Monthly Email Newsletter
        </p>

        <h2
          className="font-barlow text-3xl md:text-4xl font-black mb-4 leading-tight"
          style={{ color: "#2D3A28" }}
        >
          Email Strategies to Grow Your Gun Store Revenue — Free.
        </h2>

        <p
          className="font-inter text-lg mb-10"
          style={{ color: "rgba(45,58,40,0.65)" }}
        >
          Practical tactics, real examples, no fluff. Sent twice a month to gun store owners and tactical retailers.
        </p>

        {status === "done" ? (
          <div
            className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border-2"
            style={{ borderColor: "#F5C124", backgroundColor: "#fff" }}
          >
            <span className="text-2xl" style={{ color: "#F5C124" }}>✓</span>
            <p className="font-barlow text-xl font-black" style={{ color: "#2D3A28" }}>
              You&apos;re in!
            </p>
            <p className="font-inter text-sm" style={{ color: "rgba(45,58,40,0.6)" }}>
              First issue lands in your inbox soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="your@store.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 font-inter text-base px-5 py-4 rounded-lg border outline-none focus:border-[#2D3A28] transition-colors"
              style={{
                borderColor: "rgba(45,58,40,0.2)",
                color: "#2D3A28",
              }}
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="font-barlow font-black text-base tracking-wide px-8 py-4 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
              style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
            >
              {status === "submitting" ? "Subscribing..." : "Get Free Tips"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="font-inter text-sm text-red-600 mt-3">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="font-inter text-xs mt-5" style={{ color: "rgba(45,58,40,0.4)" }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
