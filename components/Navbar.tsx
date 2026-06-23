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
      style={{ backgroundColor: "#1E2419" }}
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

        {/* CTA */}
        <a
          href="#audit"
          className="hidden md:inline-block font-barlow text-sm font-bold px-5 py-2.5 rounded transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#F5C124", color: "#1E2419" }}
        >
          Claim $0 Audit
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
        style={{ backgroundColor: "#1E2419" }}
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
            href="#audit"
            className="font-barlow text-sm font-bold px-5 py-3 rounded text-center mt-1"
            style={{ backgroundColor: "#F5C124", color: "#1E2419" }}
            onClick={() => setIsOpen(false)}
          >
            Claim $0 Audit
          </a>
        </div>
      </div>
    </nav>
  );
}
