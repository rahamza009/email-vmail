import FadeIn from "@/components/FadeIn";

const STARTER_INCLUDES = [
  "Up to 10,000 subscribers",
  "2 automated flows built & optimized",
  "4 campaign sends per month",
  "HTML email design",
  "Full copywriting",
  "Monthly performance report",
];

const GROWTH_INCLUDES = [
  "10,000–30,000 subscribers",
  "5 automated flows built & optimized",
  "8 campaign sends per month",
  "Advanced HTML email design",
  "Full copywriting + A/B testing",
  "Weekly performance reports",
  "Dedicated account manager",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 md:py-28 px-6"
      style={{ backgroundColor: "#2D3A28" }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            Limited Availability
          </h2>
          <p className="font-inter text-white/60 max-w-lg mx-auto mb-14 text-base">
            We keep our client roster lean so every store gets full attention. Spots fill fast.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Starter */}
          <FadeIn delay={100}>
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
              <div className="absolute -top-3.5 left-7">
                <span
                  className="font-barlow text-xs font-black px-3 py-1 rounded-full tracking-wide"
                  style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}
                >
                  LIMITED OFFER
                </span>
              </div>

              <h3 className="font-barlow text-2xl font-black text-white mb-1 mt-2">
                Starter
              </h3>
              <p className="font-inter text-white/40 text-sm mb-4">
                Up to 10,000 subscribers
              </p>

              <div className="mb-1">
                <span className="font-inter text-white/30 line-through text-base">
                  $2,000/mo
                </span>
              </div>
              <div className="mb-5">
                <span
                  className="font-barlow text-5xl font-black"
                  style={{ color: "#F5C124" }}
                >
                  $1,000
                </span>
                <span className="font-inter text-white/50 text-sm ml-2">
                  /mo · first 3 months
                </span>
              </div>

              {/* Slot counter */}
              <div
                className="rounded-lg px-4 py-3 mb-6 text-center"
                style={{ backgroundColor: "#F5C124" }}
              >
                <p
                  className="font-barlow text-sm font-black"
                  style={{ color: "#2D3A28" }}
                >
                  Discounted Spots Remaining: 2 / 3
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {STARTER_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: "#F5C124" }} className="mt-0.5 flex-shrink-0">✓</span>
                    <span className="font-inter text-sm text-white/75">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#audit"
                className="block w-full text-center font-barlow font-bold py-4 rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}
              >
                Claim This Spot
              </a>
            </div>
          </FadeIn>

          {/* Growth */}
          <FadeIn delay={200}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
              <h3 className="font-barlow text-2xl font-black text-white mb-1">
                Growth
              </h3>
              <p className="font-inter text-white/40 text-sm mb-4">
                10,000–30,000 subscribers
              </p>
              <div className="mb-6">
                <span
                  className="font-barlow text-5xl font-black"
                  style={{ color: "#F5C124" }}
                >
                  $3,500
                </span>
                <span className="font-inter text-white/50 text-sm ml-2">/mo</span>
              </div>

              <ul className="space-y-3 mb-8">
                {GROWTH_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: "#F5C124" }} className="mt-0.5 flex-shrink-0">✓</span>
                    <span className="font-inter text-sm text-white/75">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#audit"
                className="block w-full text-center font-barlow font-bold py-4 rounded-xl border-2 transition-colors hover:bg-white/5"
                style={{ borderColor: "#F5C124", color: "#F5C124" }}
              >
                Claim This Spot
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
