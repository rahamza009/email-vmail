"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error ?? "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-16" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <svg width="36" height="36" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="7" fill="#2D3A28" />
            <text x="16" y="22.5" fontFamily="Arial Black, Arial, sans-serif" fontSize="15" fontWeight="900" fill="#F5C124" textAnchor="middle" letterSpacing="0.5">EV</text>
          </svg>
          <span className="font-barlow text-lg font-black tracking-wide" style={{ color: "#2D3A28" }}>
            Admin Panel
          </span>
        </div>

        <div
          className="rounded-2xl border-2 p-8"
          style={{ borderColor: "#F5C124", backgroundColor: "#FEFEFE" }}
        >
          <h1 className="font-barlow text-xl font-black mb-6" style={{ color: "#2D3A28" }}>
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-barlow text-sm font-bold mb-1.5" style={{ color: "#2D3A28" }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none transition-colors focus:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}
              />
            </div>

            <div>
              <label className="block font-barlow text-sm font-bold mb-1.5" style={{ color: "#2D3A28" }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none transition-colors focus:border-[#F5C124]"
                style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}
              />
            </div>

            {error && (
              <p className="font-inter text-sm font-semibold" style={{ color: "#c0392b" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-barlow font-bold py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
