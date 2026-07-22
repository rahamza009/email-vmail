"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  function scrollTo(id: string, e: React.MouseEvent) {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTo", id);
      router.push("/");
    }
  }

  const colHead = "font-barlow text-xs font-black tracking-[0.2em] uppercase mb-5 text-center";
  const colHeadStyle = { color: "#F5C124" };
  const linkCls = "font-inter text-base leading-relaxed transition-opacity hover:opacity-100 block mb-3 text-center";
  const linkStyle = { color: "rgba(255,255,255,0.55)" };

  return (
    <footer style={{ backgroundColor: "#1e2a1a" }}>
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* ── Column 1: Brand + About ─────────────────────────── */}
          <div className="flex flex-col items-start text-left">
            <div className="font-rajdhani text-2xl font-bold tracking-widest uppercase mb-3" style={{ color: "#F5C124" }}>
              Email-Vmail
            </div>
            <p className="font-inter text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              We exclusively help FFLs generate up to 20% more online revenue via email campaigns &amp; automations. It reduces your Customer Acquisition Cost &amp; increases customer lifetime value.
            </p>

          </div>

          {/* ── Column 2: Services ─────────────────────────────── */}
          <div className="flex flex-col items-center text-center">
            <p className={colHead} style={colHeadStyle}>Services</p>
            <Link href="/services/firearms-ammo" className={linkCls} style={linkStyle}>Email Marketing for Firearms &amp; Ammo</Link>
            <Link href="/services/knife-tactical-outdoor" className={linkCls} style={linkStyle}>Email Marketing for Knife, Tactical &amp; Outdoor</Link>
            <Link href="/services/growth-services" className={linkCls} style={linkStyle}>Growth Services</Link>
          </div>

          {/* ── Column 3: Resources ────────────────────────────── */}
          <div className="flex flex-col items-center text-center">
            <p className={colHead} style={colHeadStyle}>Resources</p>
            <Link href="/blog" className={linkCls} style={linkStyle}>Blog</Link>
            <Link href="/blog?category=Case+Study" className={linkCls} style={linkStyle}>Case Studies</Link>
            <button onClick={e => scrollTo("pricing", e)}
              className={`${linkCls} cursor-pointer bg-transparent border-0 p-0 w-full`} style={linkStyle}>
              Pricing
            </button>
          </div>

          {/* ── Column 4: Contact ─────────────────────────────── */}
          <div className="flex flex-col items-center text-center">
            <p className={colHead} style={colHeadStyle}>Contact</p>
            <a href="https://calendly.com/rahamza009-dzou/30min" target="_blank" rel="noopener noreferrer"
              className={linkCls} style={linkStyle}>
              Book a Strategy Call
            </a>
            <Link href="/audit" className={linkCls} style={linkStyle}>Get a Free Audit</Link>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://linkedin.com/in/rahamza009/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "rgba(245,193,36,0.12)", color: "#F5C124" }}
                aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://wa.me/923001588645?text=Hi%2C%20I'm%20interested%20in%20the%20%240%20email%20audit%20for%20my%20store.%20When%20can%20I%20expect%20the%20report%3F"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "rgba(245,193,36,0.12)", color: "#F5C124" }}
                aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Column 5: Legal ───────────────────────────────── */}
          <div className="flex flex-col items-center text-center">
            <p className={colHead} style={colHeadStyle}>Legal</p>
            <Link href="/privacy-policy" className={linkCls} style={linkStyle}>Privacy Policy</Link>
            <Link href="/disclaimer" className={linkCls} style={linkStyle}>Disclaimer</Link>
            <Link href="/terms" className={linkCls} style={linkStyle}>Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Email-Vmail. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="font-inter text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(255,255,255,0.25)" }}>Privacy</Link>
            <Link href="/disclaimer" className="font-inter text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(255,255,255,0.25)" }}>Disclaimer</Link>
            <Link href="/terms" className="font-inter text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(255,255,255,0.25)" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
