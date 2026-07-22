import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";

const PLANS = [
  {
    name: "Starter",
    badge: null,
    subtitle: "Under $1M annual revenue",
    uplift: "Up to 15%",
    price: "$997",
    period: "/mo",
    commission: "+ 15% of incremental revenue",
    categoryLabel: "FOUNDATION BUILD",
    includes: [
      "Automations built & optimized",
      "Unlimited email campaigns",
      "Advanced HTML templates",
      "Niche copy + A/B testing",
      "Weekly & monthly reports",
      "Dedicated success manager",
      "Annual & quarterly reviews",
      "SMS marketing (optional)",
    ],
  },
  {
    name: "Growth",
    badge: "Most Popular",
    subtitle: "$1M–$10M annual revenue",
    uplift: "Up to 10%",
    price: "$2,997",
    period: "/mo",
    commission: "+ 12% of incremental revenue",
    categoryLabel: "REVENUE OUTCOMES",
    includes: [
      "Everything in Starter",
      "Repeat-purchase flows for consumables",
      "Higher AOV via cross-sell segmentation",
      "Lower CAC vs restricted ad channels",
      "Quarterly cohort & LTV analysis",
    ],
  },
  {
    name: "Scale",
    badge: null,
    subtitle: "$10M+ annual revenue",
    uplift: "Up to 7%",
    price: "$6,997",
    period: "/mo",
    commission: "+ 8% of incremental revenue",
    categoryLabel: "RETENTION & LTV OUTCOMES",
    includes: [
      "Everything in Growth",
      "Predictive reorder automation",
      "VIP/loyalty retention program",
      "Blended CAC reduction program",
      "Win-back flows for high-LTV lapses",
      "Executive LTV/CAC/retention reporting",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pt-10 pb-20 md:pb-28 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#2D3A28" }}
          >
            Plans Built Around Your Revenue Stage
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-lg"
            style={{ color: "rgba(45,58,40,0.6)" }}
          >
            Pick the plan that matches your growth stage. Predictable revenue starts here.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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
                <p className="font-inter text-sm mb-4" style={{ color: "rgba(45,58,40,0.55)" }}>
                  {plan.subtitle}
                </p>

                {/* Revenue uplift target */}
                <div className="rounded-lg px-4 py-3 mb-5" style={{ backgroundColor: "#2D3A28" }}>
                  <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Revenue uplift target
                  </p>
                  <p className="font-barlow text-2xl font-black" style={{ color: "#F5C124" }}>
                    {plan.uplift}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-1">
                  <span className="font-barlow text-5xl font-black" style={{ color: "#F5C124" }}>
                    {plan.price}
                  </span>
                  <span className="font-inter text-base font-semibold ml-1" style={{ color: "rgba(45,58,40,0.6)" }}>
                    {plan.period}
                  </span>
                </div>
                <p className="font-inter text-sm mb-6" style={{ color: "rgba(45,58,40,0.55)" }}>
                  {plan.commission}
                </p>

                {/* Category label */}
                <p className="font-barlow text-xs font-black tracking-widest mb-3" style={{ color: "rgba(45,58,40,0.4)" }}>
                  {plan.categoryLabel}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.includes.map((item) => (
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
                      href="/audit"
                      className="font-barlow font-bold px-10 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90 block text-center"
                      style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
                    >
                      Get $0 Account Audit
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
