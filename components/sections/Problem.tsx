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
    <section id="problem" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#2D3A28" }}
          >
            Sound Familiar?
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-base"
            style={{ color: "#2D3A28" }}
          >
            These are the three biggest problems we see killing tactical email programs.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEMS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 120}>
              <div
                className="bg-gray-50 rounded-xl p-8 text-left border-t-4 h-full"
                style={{ borderTopColor: "#F5C124" }}
              >
                <h3
                  className="font-barlow text-xl font-bold mb-3"
                  style={{ color: "#2D3A28" }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: "#2D3A28" }}
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
