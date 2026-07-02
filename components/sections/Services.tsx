import FadeIn from "@/components/FadeIn";

const SERVICES = [
  {
    title: "Email Automations & Flows",
    desc: "Welcome, abandoned cart, post-purchase, win-back — every flow built and optimized for tactical buyers.",
  },
  {
    title: "HTML Email Design",
    desc: "Battle-tested responsive templates that render sharp in every inbox on every device.",
  },
  {
    title: "Campaign Management",
    desc: "Full send calendar, scheduling, A/B testing — every campaign handled start to finish.",
  },
  {
    title: "Email Copywriting",
    desc: "Direct, compelling copy written for the tactical community — built to convert.",
  },
  {
    title: "List Segmentation",
    desc: "Smart segments that send the right message to the right buyer at the right time.",
  },
];

const ESPS = ["Klaviyo", "Sendlane", "Omnisend"];

export default function Services() {
  return (
    <section id="services" className="pt-10 pb-20 md:pb-28 px-6" style={{ backgroundColor: "#2D3A28" }}>
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            We Fix the Leaks for Predictable Revenue Growth.
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-lg text-white/60"
          >
            End-to-End Email Marketing. DFY Strategy and Execution.
          </p>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-5 mb-16">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 90}>
              <div
                className="w-full sm:w-56 rounded-xl p-6 text-center border-2 flex flex-col items-center gap-3"
                style={{ borderColor: "#F5C124" }}
              >
                <h3
                  className="font-barlow text-base font-bold leading-tight text-white"
                >
                  {s.title}
                </h3>
                <p
                  className="font-inter text-xs leading-relaxed text-white/75"
                >
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={350}>
          <div className="border-t border-white/10 pt-10">
            <p
              className="font-barlow text-xs font-bold tracking-[0.2em] uppercase mb-6 text-white/50"
            >
              Platforms We Work With
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {ESPS.map((esp) => (
                <div
                  key={esp}
                  className="font-rajdhani text-lg font-bold px-7 py-3 rounded-lg border-2 text-white"
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  {esp}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
