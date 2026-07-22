"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const SERVICE_LINKS = [
  { href: "/services/firearms-ammo",        title: "Email Marketing for Firearms & Ammo",         desc: "Email systems for gun stores and ammo retailers" },
  { href: "/services/knife-tactical-outdoor", title: "Email Marketing for Knife, Tactical & Outdoor", desc: "Retention flows for EDC, knife, and outdoor brands" },
  { href: "/services/growth-services",      title: "Growth Services",                              desc: "Web, SEO, content, and compliant digital marketing" },
];

const NAV_LINKS = [
  { href: "pricing",               label: "Pricing",              anchor: true  },
  { href: "/blog",                 label: "Blog",                 anchor: false },
  { href: "/tactical-merchandise", label: "Tactical Merchandise", anchor: false },
];

const WA_LINK =
  "https://wa.me/923001588645?text=Hi%2C%20I'm%20interested%20in%20the%20%240%20email%20audit%20for%20my%20store.%20When%20can%20I%20expect%20the%20report%3F";

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname  = usePathname();
  const router    = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function showServices() {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setServicesOpen(true);
  }
  function hideServices() {
    hideTimer.current = setTimeout(() => setServicesOpen(false), 180);
  }

  function handleAnchorClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setIsOpen(false);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTo", id);
      router.push("/");
    }
  }

  const linkClass = "font-barlow text-lg font-semibold tracking-wide transition-opacity hover:opacity-70 cursor-pointer";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={{ backgroundColor: "#2D3A28" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-rajdhani text-2xl font-bold tracking-widest uppercase" style={{ color: "#F5C124" }}>
          Email-Vmail
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">

          <Link href="/about" className={linkClass} style={{ color: "#F5C124" }}>About Us</Link>

          {/* Services dropdown */}
          <div className="relative" onMouseEnter={showServices} onMouseLeave={hideServices}>
            <button
              className={linkClass}
              style={{ color: "#F5C124", background: "none", border: "none", padding: 0 }}
            >
              Services
              <span className="ml-1 text-xs" style={{ color: "rgba(245,193,36,0.6)" }}>▾</span>
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-xl shadow-2xl border overflow-hidden"
                style={{ backgroundColor: "#1a2316", borderColor: "rgba(245,193,36,0.2)" }}
                onMouseEnter={showServices}
                onMouseLeave={hideServices}
              >
                {SERVICE_LINKS.map((s, i) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setServicesOpen(false)}
                    className="block px-5 py-4 transition-colors hover:bg-[rgba(245,193,36,0.07)]"
                    style={{ borderBottom: i < SERVICE_LINKS.length - 1 ? "1px solid rgba(245,193,36,0.1)" : "none" }}
                  >
                    <p className="font-barlow text-sm font-black" style={{ color: "#F5C124" }}>{s.title}</p>
                    <p className="font-inter text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</p>
                  </Link>
                ))}
                <div style={{ borderTop: "1px solid rgba(245,193,36,0.15)" }}>
                  <button
                    onClick={e => { setServicesOpen(false); handleAnchorClick(e, "services"); }}
                    className="w-full text-left px-5 py-3 font-barlow text-xs font-bold tracking-wide uppercase transition-colors hover:bg-[rgba(245,193,36,0.07)]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    View All Services →
                  </button>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map(link =>
            link.anchor ? (
              <button key={link.href} onClick={e => handleAnchorClick(e, link.href)} className={linkClass} style={{ color: "#F5C124", background: "none", border: "none", padding: 0 }}>
                {link.label}
              </button>
            ) : (
              <Link key={link.href} href={link.href} className={linkClass} style={{ color: "#F5C124" }}>
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* WhatsApp CTA */}
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 font-barlow text-sm font-bold px-5 py-2.5 rounded transition-opacity hover:opacity-90" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
          <WhatsAppIcon />
          Chat on WhatsApp
        </a>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <span className={`block h-0.5 w-6 transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`} style={{ backgroundColor: "#F5C124" }} />
          <span className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`} style={{ backgroundColor: "#F5C124" }} />
          <span className={`block h-0.5 w-6 transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ backgroundColor: "#F5C124" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen pb-6" : "max-h-0"}`} style={{ backgroundColor: "#2D3A28" }}>
        <div className="px-6 flex flex-col gap-4 pt-2">

          <Link href="/about" className="font-barlow text-lg font-semibold tracking-wide" style={{ color: "#F5C124" }} onClick={() => setIsOpen(false)}>About Us</Link>

          {/* Services toggle */}
          <button
            onClick={() => setMobileServices(v => !v)}
            className="font-barlow text-lg font-semibold tracking-wide text-left flex items-center justify-between"
            style={{ color: "#F5C124", background: "none", border: "none", padding: 0 }}
          >
            Services
            <span className="text-xs" style={{ color: "rgba(245,193,36,0.6)", transform: mobileServices ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}>▾</span>
          </button>

          {mobileServices && (
            <div className="ml-3 flex flex-col gap-3 border-l-2 pl-4" style={{ borderColor: "rgba(245,193,36,0.2)" }}>
              {SERVICE_LINKS.map(s => (
                <Link key={s.href} href={s.href} className="font-barlow text-base font-semibold" style={{ color: "#F5C124" }} onClick={() => { setIsOpen(false); setMobileServices(false); }}>
                  {s.title}
                </Link>
              ))}
              <button
                onClick={e => { setIsOpen(false); setMobileServices(false); handleAnchorClick(e, "services"); }}
                className="font-barlow text-sm font-semibold text-left"
                style={{ color: "rgba(245,193,36,0.5)", background: "none", border: "none", padding: 0 }}
              >
                All Services →
              </button>
            </div>
          )}

          {NAV_LINKS.map(link =>
            link.anchor ? (
              <button key={link.href} onClick={e => handleAnchorClick(e, link.href)} className="font-barlow text-lg font-semibold tracking-wide text-left" style={{ color: "#F5C124", background: "none", border: "none", padding: 0 }}>
                {link.label}
              </button>
            ) : (
              <Link key={link.href} href={link.href} className="font-barlow text-lg font-semibold tracking-wide" style={{ color: "#F5C124" }} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            )
          )}

          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-barlow text-sm font-bold px-5 py-3 rounded text-center mt-1 flex items-center justify-center gap-2" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }} onClick={() => setIsOpen(false)}>
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
