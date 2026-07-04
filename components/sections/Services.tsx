import FadeIn from "@/components/FadeIn";

const SERVICES = [
  {
    title: "Email Strategy & Audit",
    desc: "We build a revenue-first email strategy before a single campaign goes live. We audit your current setup, identify every revenue gap, and map a data-driven Execution Plan tied directly to your store's growth targets. Each KPI is marked and reported, offering a clear path to predictable revenue.",
  },
  {
    title: "Email Automations",
    desc: "Curated email automations to generate revenue on auto-pilot & increase customers Lifetime Value. Automations use personalized touch points to keep customers in the loop and trigger repeat purchases of consumable gear.",
  },
  {
    title: "HTML Email Design",
    desc: "Battle-tested, responsive & creative templates that enhance user experience, prompting people to buy more. They render sharp in every inbox, ensuring every recipient is engaged, nurtured and converted.",
  },
  {
    title: "Campaign Management",
    desc: "We plan revenue-first email campaigns tied to brand value and loyalty. Each campaign follows a sales, promo or educational logic for content diversity and reading recipient behaviors. Full send calendar, scheduling, A/B testing. Everything.",
  },
  {
    title: "List Segmentation",
    desc: "Smart segments based on customer behaviour i.e. engagement, purchase, repeat purchase, never purchase, and VIP customers. We send the right message to the right buyer at the right time.",
  },
  {
    title: "Email Copywriting",
    desc: "Niche-specific, industry-compatible email copy to relate with gun and tactical gear users.",
  },
];

const ESPS = [
  { name: "Klaviyo",          accent: "#45E9A5" },
  { name: "Sendlane",         accent: "#4F8EF7" },
  { name: "Omnisend",         accent: "#00C09A" },
  { name: "ActiveCampaign",   accent: "#356AE6" },
  { name: "Drip",             accent: "#B14FFF" },
  { name: "Campaign Monitor", accent: "#EB4C36" },
  { name: "GetResponse",      accent: "#00BAFF" },
];

export default function Services() {
  return (
    <section id="services" className="pt-10 pb-6 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#2D3A28" }}
          >
            We Fix the Leaks for Predictable Revenue Growth.
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-lg"
            style={{ color: "rgba(45,58,40,0.6)" }}
          >
            Niche-Specific, Industry Compatible. End-to-End Email Marketing. DFY Strategy and Execution.
          </p>
        </FadeIn>

        <div className="grid grid-cols-12 gap-5 mb-16">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 90} className="col-span-12 sm:col-span-4">
              <div
                className="rounded-xl p-6 text-center border-2 h-full flex flex-col items-center gap-3"
                style={{ backgroundColor: "#2D3A28", borderColor: "#F5C124" }}
              >
                <h3
                  className="font-barlow text-lg font-bold text-white flex items-center justify-center"
                  style={{ minHeight: "2.75rem" }}
                >
                  {s.title}
                </h3>
                <p className="font-inter text-sm leading-relaxed text-white/75">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={350}>
          <div className="border-t pt-10" style={{ borderColor: "rgba(45,58,40,0.15)" }}>
            <p
              className="font-barlow text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: "rgba(45,58,40,0.45)" }}
            >
              Platforms We Work With
            </p>

            {/* Ticker */}
            <div className="overflow-hidden">
              <div className="ticker-track flex gap-8 w-max">
                {[...ESPS, ...ESPS].map((esp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg shrink-0"
                    style={{
                      border: "1px solid rgba(45,58,40,0.15)",
                      backgroundColor: "rgba(45,58,40,0.05)",
                    }}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: esp.accent }}
                    />
                    <span
                      className="font-rajdhani text-base font-bold whitespace-nowrap"
                      style={{ color: "#2D3A28" }}
                    >
                      {esp.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
