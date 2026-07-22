import FadeIn from "@/components/FadeIn";

const PROBLEMS = [
  {
    title: "Compliance Challenges",
    body: "FFL dealers and firearms retailers face strict ESP compliance requirements that generic agencies ignore. One policy violation and your account is gone — taking your list, your automations, and your entire revenue engine with it overnight.",
  },
  {
    title: "No Retention System",
    body: "Gun stores make the sale and move on. Without a retention email marketing system built for firearms ecommerce, you miss the relationship that turns a one-time buyer into a repeat customer worth 3–5x more.",
  },
  {
    title: "Poor Email Design",
    body: "Poorly structured templates and weak copy create a confusing experience. In a trust-driven industry like firearms and ammo, poor email design costs you credibility with gun owners before it costs you the sale.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="pt-10 pb-20 md:pb-28 px-6" style={{ backgroundColor: "#2D3A28" }}>
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#F5C124" }}>
            Your Challenges Range
          </p>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            Gun Stores Are Losing Email Revenue<br />Every Single Month
          </h2>
          <p className="font-inter max-w-3xl mx-auto mb-4 text-lg text-white/60">
            Most gun stores treat email as an afterthought. Risk scares them off. So they send one flat newsletter and call it done. That leaves real cash on the table each month.
          </p>
          <p className="font-inter max-w-3xl mx-auto mb-14 text-lg text-white/60">
            Risk is real. One bad move can cost your list overnight. Weak repeat sales cost you too. Most stores chase new buyers and ignore the ones they already won. Flat templates make it worse — a dull email loses trust fast in this trade.
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
                  className="font-barlow text-xl font-bold mb-3 text-white text-justify"
                >
                  {p.title}
                </h3>
                <p
                  className="font-inter text-xl leading-relaxed text-white/75 text-justify"
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
