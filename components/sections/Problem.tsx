import FadeIn from "@/components/FadeIn";

const PROBLEMS = [
  {
    title: "Compliance Challenges",
    body: "Firearms businesses have strict ESP compliance requirements. One policy violation and your account is gone — your list, your automations, your entire revenue engine wiped overnight.",
  },
  {
    title: "No Retention System",
    body: "You make the sale and move on. Without a system to engage your customers after purchase, you're missing the relationship that turns a one-time buyer into a lifelong one.",
  },
  {
    title: "Poor Email Design",
    body: "Poorly structured templates and weak wireframing create a confusing experience for your customers. In a trust-driven industry like firearms, poor design costs you credibility before it costs you the sale.",
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
                  className="font-inter text-base leading-relaxed text-white/75"
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
