import FadeIn from "@/components/FadeIn";

const BIO = [
  "Defense Studies graduate. Majored in warfare and defense economics at National Defense University, Pakistan. I studied marketing and firearms long enough to make both a living.",
  "I'm a gun owner who also happens to be an email marketer — because this industry seriously needs to catch up on this marketing vector. All I see is compliance challenges, bland email designs, and no niche-specific, industry-compatible copy. And no one is willing to change it.",
  "So I built a retention system that sells firearms and EDC gear online.",
];

export default function Founder() {
  return (
    <section className="py-14 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-10 text-center"
            style={{ color: "#2D3A28" }}
          >
            Who You Will Work With
          </h2>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Left — photo + name */}
            <div className="flex flex-col items-center sm:items-start gap-2 flex-shrink-0">
              <div
                className="w-44 h-44 rounded-full overflow-hidden border-2 relative"
                style={{ borderColor: "#F5C124" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-me.png"
                  alt="Ameer Hamza"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "auto",
                    left: "0%",
                    top: "-5%",
                  }}
                />
              </div>
              <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>
                Ameer Hamza
              </p>
              <a
                href="https://linkedin.com/in/rahamza009/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
                style={{ color: "#F5C124" }}
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                More on LinkedIn
              </a>
            </div>

            {/* Right — bio */}
            <div className="space-y-4 flex-1">
              {BIO.map((para, i) => (
                <p
                  key={i}
                  className="font-inter text-base leading-relaxed"
                  style={{ color: i === 2 ? "#2D3A28" : "rgba(45,58,40,0.75)", fontWeight: i === 2 ? 600 : 400 }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
