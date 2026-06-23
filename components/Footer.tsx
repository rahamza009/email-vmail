import Link from "next/link";

const LINKS = ["Services", "Pricing", "Case Studies", "Blog", "Contact"];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2D3A28" }} className="py-14 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="font-rajdhani text-3xl font-bold tracking-widest uppercase mb-1"
          style={{ color: "#F5C124" }}
        >
          Email-Vmail
        </div>
        <p className="font-inter text-sm text-white/50 mb-8">
          DFY Email Marketing Agency
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {LINKS.map((item) => (
            <Link
              key={item}
              href={item === "Blog" ? "/blog" : `#${item.toLowerCase().replace(" ", "-")}`}
              className="font-barlow text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#F5C124" }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* LinkedIn */}
        <div className="flex justify-center mb-10">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{ color: "#F5C124" }}
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        <p className="font-inter text-xs text-white/30">
          © 2025 Email-Vmail. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
