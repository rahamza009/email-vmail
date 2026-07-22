import FadeIn from "@/components/FadeIn";

const PROBLEMS = [
  {
    title: "Compliance Challenges",
    body: "Firearms businesses have strict ESP compliance requirements. One policy violation and your account is gone, taking your list, your automations, and your entire revenue engine with it overnight.",
  },
  {
    title: "No Retention System",
    body: "You make the sale and move on. Without a system to engage your customers after purchase, you miss the relationship that turns a one-time buyer into a lifelong one.",
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
          <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#F5C124" }}>
            Your Challenges Range
          </p>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            Your Online Store Is<br />Leaking Revenue
          </h2>
          <p className="font-inter max-w-3xl mx-auto mb-4 text-lg text-white/60">
            Most firearm retailers treat email marketing as an afterthought due to compliance risk and fail to run a full-scope email marketing system for firearms, ammunition, tactical gear, knife and hunting brands. This leaks the revenue from your online sales funnel every month.
          </p>
          <p className="font-inter max-w-3xl mx-auto mb-14 text-lg text-white/60">
            At Email-Vmail, we offer 100% ownership of your Email Marketing setup. Our niche-specific, industry-compatible knowledge base enables us to offer you a seamless marketing experience.
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
