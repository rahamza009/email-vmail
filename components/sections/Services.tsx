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
    <section id="services" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#1E2419" }}
          >
            What We Handle For You
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-base"
            style={{ color: "#1E2419" }}
          >
            End-to-end email marketing — strategy through execution — fully done for you.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 90}>
              <div
                className="rounded-xl p-6 text-center border-2 h-full flex flex-col items-center gap-3"
                style={{ borderColor: "#1E2419" }}
              >
                <h3
                  className="font-barlow text-base font-bold leading-tight"
                  style={{ color: "#1E2419" }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-inter text-xs leading-relaxed"
                  style={{ color: "#1E2419" }}
                >
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={350}>
          <div className="border-t border-gray-100 pt-10">
            <p
              className="font-barlow text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: "#1E2419" }}
            >
              Platforms We Work With
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {ESPS.map((esp) => (
                <div
                  key={esp}
                  className="font-rajdhani text-lg font-bold px-7 py-3 rounded-lg border-2"
                  style={{ borderColor: "#1E2419", color: "#1E2419" }}
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
