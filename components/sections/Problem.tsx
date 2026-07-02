import FadeIn from "@/components/FadeIn";

const PROBLEMS = [
  {
    title: "Compliance Challenges",
    body: "Mainstream ESPs restrict or ban firearms businesses without warning — leaving your revenue exposed overnight with zero recourse.",
  },
  {
    title: "No Retention System",
    body: "Your customers buy once and never come back. Without strategic automations, you're leaving repeat revenue on the table every single month.",
  },
  {
    title: "Poor Email Design",
    body: "Unresponsive, broken templates that hurt customer experience and tank your deliverability before the sell even starts.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="pt-10 pb-20 md:pb-28 px-6" style={{ backgroundColor: "#2D3A28" }}>
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            Your Online Store Is Leaking Revenue
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-lg text-white/60"
          >
            These are the three biggest problems we see killing email revenue for gun stores.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEMS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 120}>
              <div
                className="rounded-xl p-8 text-left border-t-4 h-full bg-white/5 border border-white/10"
                style={{ borderTopColor: "#F5C124" }}
              >
                <h3
                  className="font-barlow text-xl font-bold mb-3 text-white"
                >
                  {p.title}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed text-white/75"
                >
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
