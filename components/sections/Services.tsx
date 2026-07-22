import FadeIn from "@/components/FadeIn";

const SERVICES = [
  {
    title: "Email Strategy & Audit",
    desc: "We start with evaluating your current infrastructure, identifying challenges & loopholes. It follows a revenue-first email marketing strategy for firearms stores before a single campaign goes live. A data-driven strategy leads your brand growth in a way each KPI is marked and reported, offering a clear path to predictable revenue.",
  },
  {
    title: "Email Automations",
    desc: "Email Automations for gun and ammo stores generate revenue on auto-pilot & increase customers Lifetime Value. It reduces your Customer Acquisition Cost making email marketing a sustainable revenue engine. Automations use personalized touch points to keep customers in the loop and trigger repeat purchases of consumable gear.",
  },
  {
    title: "HTML Email Design",
    desc: "Firearms, ammunition and tactical gear stores holds a reputation for dull email designs. We create battle-tested, responsive & creative templates that beats the industry and enhance user experience, prompting shooters & gun owners to buy more. They render sharp in every inbox, ensuring every recipient is engaged, nurtured and converted.",
  },
  {
    title: "Campaign Management",
    desc: "We craft tailored email campaigns for firearms, hunting and knives stores. Each campaign tied to brand value and customer loyalty. Usually, stores send newsletter emails once a week. We curate email campaigns based on customer browsing & purchasing behaviours focusing sales, promo, seasonal or educational. Full send calendar, scheduling, A/B testing.",
  },
  {
    title: "List Segmentation",
    desc: "List building and segmentation for firearms stores is tricky. We create smart segments based on customer's engagement & purchasing behaviours to send tailored emails i.e. engagement, purchase, repeat purchase, never purchase, and VIP customers. We send the right message to the right buyer at the right time.",
  },
  {
    title: "Email Copywriting",
    desc: "There are hardly any firearms copywriters. At Email-Vmail, we write sales driven, industry-compatible email copy that convert gun owners, shooters and tactical gear users. Every word is crafted to build rapport, reflect their mindset, and drive action. Its intent remains to turn subscribers and browsers into buyers, again and again.",
  },
];

const ESPS = [
  { name: "Klaviyo",        accent: "#45E9A5" },
  { name: "ActiveCampaign", accent: "#356AE6" },
  { name: "SendGrid",       accent: "#1A82E2" },
  { name: "Listrak",        accent: "#FF6B35" },
  { name: "OtterText",      accent: "#00D4FF" },
  { name: "Celerant",       accent: "#B14FFF" },
  { name: "Dotdigital",     accent: "#F5A623" },
];

export default function Services() {
  return (
    <section id="services" className="pt-10 pb-6 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#F5C124" }}>
            The Solution
          </p>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            We Fix the Leaks for<br />Predictable Revenue Growth.
          </h2>
          <p
            className="font-inter max-w-3xl mx-auto mb-14 text-lg"
            style={{ color: "rgba(45,58,40,0.6)" }}
          >
            Email-Vmail is the email marketing agency for gun stores that builds the full system: compliant flows, real list splits, and copy built for firearms retailers — not a generic crowd. We serve FFL dealers, ammo stores, and tactical, hunting, and knife brands across the United States.
          </p>
        </FadeIn>

        <div className="grid grid-cols-12 gap-5 mb-16">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 90} className="col-span-12 sm:col-span-4">
              <div
                className="rounded-xl p-6 border-2 h-full flex flex-col gap-3"
                style={{ backgroundColor: "#2D3A28", borderColor: "#F5C124" }}
              >
                <h3
                  className="font-barlow text-xl font-bold text-white text-justify"
                  style={{ minHeight: "2.75rem" }}
                >
                  {s.title}
                </h3>
                <p className="font-inter text-xl leading-relaxed text-white/75 text-justify">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={280}>
          <p className="font-inter text-lg max-w-3xl mx-auto mb-10" style={{ color: "rgba(45,58,40,0.6)" }}>
            We fix all three. Each flow follows the rules. Each list split comes from real buying habits, not guesswork. Each template is built to sell, not just to look neat. The result: buyers come back, again and again.
          </p>
        </FadeIn>

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
