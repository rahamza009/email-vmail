"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const WA_LINK =
  "https://wa.me/923001588645?text=Hi%2C%20I'm%20interested%20in%20the%20%240%20email%20audit%20for%20my%20store.%20When%20can%20I%20expect%20the%20report%3F";

function WhatsAppIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={{ backgroundColor: "#2D3A28" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-rajdhani text-2xl font-bold tracking-widest uppercase"
          style={{ color: "#F5C124" }}
        >
          Email-Vmail
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-barlow text-sm font-semibold tracking-wide transition-opacity hover:opacity-70"
              style={{ color: "#F5C124" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 font-barlow text-sm font-bold px-5 py-2.5 rounded transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}
        >
          <WhatsAppIcon />
          Chat on WhatsApp
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ backgroundColor: "#F5C124" }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`}
            style={{ backgroundColor: "#F5C124" }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ backgroundColor: "#F5C124" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-6" : "max-h-0"}`}
        style={{ backgroundColor: "#2D3A28" }}
      >
        <div className="px-6 flex flex-col gap-5 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-barlow text-sm font-semibold tracking-wide"
              style={{ color: "#F5C124" }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-barlow text-sm font-bold px-5 py-3 rounded text-center mt-1 flex items-center justify-center gap-2"
            style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}
            onClick={() => setIsOpen(false)}
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
