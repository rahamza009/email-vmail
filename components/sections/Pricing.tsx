import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";

const SHARED_INCLUDES = [
  "Strategic Automations built & optimized",
  "Email Campaigns required per strategy (no cap)",
  "Advanced HTML email design templates",
  "Niche specific email copy + A/B testing",
  "Weekly work updates & Monthly revenue performance reports",
  "Dedicated Client Success Manager for non-stop coordination",
  "Annual strategy & quarterly reviews",
  "SMS Marketing (if required)",
];

const PLANS = [
  {
    name: "Starter",
    badge: "LIMITED OFFER",
    subscribers: "Up to 10,000 subscribers",
    originalPrice: "$2,000",
    price: "$1,200",
    period: "/mo · first 2 months",
    spotsLabel: "Discounted Spots: 1 / 3 remaining before discount closes",
  },
  {
    name: "Growth",
    badge: "LIMITED OFFER",
    subscribers: "10,000–30,000 subscribers",
    originalPrice: "$3,500",
    price: "$2,500",
    period: "/mo · first 2 months",
    spotsLabel: "Discounted Spots: 0 / 2 remaining before discount closes",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pt-10 pb-20 md:pb-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#2D3A28" }}
          >
            Limited Availability
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-lg"
            style={{ color: "rgba(45,58,40,0.6)" }}
          >
            Pick the plan that matches your growth stage. Predictable revenue starts here.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120}>
              <div
                className="relative border-2 rounded-2xl p-8 text-left h-full flex flex-col"
                style={{ borderColor: "#F5C124", backgroundColor: "#F9FAFB" }}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-7">
                    <span
                      className="font-barlow text-xs font-black px-3 py-1 rounded-full tracking-wide"
                      style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <h3 className="font-barlow text-2xl font-black mb-1 mt-2" style={{ color: "#2D3A28" }}>
                  {plan.name}
                </h3>

                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="font-inter text-base line-through"
                    style={{ color: "rgba(45,58,40,0.35)" }}
                  >
                    {plan.originalPrice}/mo
                  </span>
                  <span
                    className="font-barlow text-xs font-black px-2 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(245,193,36,0.2)", color: "#2D3A28" }}
                  >
                    INTRO RATE
                  </span>
                </div>

                <div className="mb-2">
                  <span className="font-barlow text-5xl font-black" style={{ color: "#F5C124" }}>
                    {plan.price}
                  </span>
                </div>
                <div className="mb-5">
                  <span
                    className="font-inter text-base font-semibold"
                    style={{ color: "rgba(45,58,40,0.7)" }}
                  >
                    {plan.period}
                  </span>
                </div>

                <div
                  className="rounded-lg px-4 py-3 mb-6 text-center"
                  style={{ backgroundColor: "#F5C124" }}
                >
                  <p className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>
                    {plan.spotsLabel}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <span style={{ color: "#F5C124" }} className="mt-0.5 flex-shrink-0 text-lg">✓</span>
                    <span className="font-inter text-base" style={{ color: "rgba(45,58,40,0.8)" }}>
                      {plan.subscribers}
                    </span>
                  </li>
                  {SHARED_INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: "#F5C124" }} className="mt-0.5 flex-shrink-0 text-lg">✓</span>
                      <span className="font-inter text-base" style={{ color: "rgba(45,58,40,0.8)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center">
                  <AuditPopover position="above">
                    <a
                      href="https://tally.so/r/aQk8yW?utm_source=free-audit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-barlow font-bold px-10 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90 block text-center"
                      style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
                    >
                      $0 Account Audit Before You Start
                    </a>
                  </AuditPopover>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
