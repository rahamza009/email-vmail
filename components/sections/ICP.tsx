import FadeIn from "@/components/FadeIn";

const ICP_ITEMS = [
  {
    title: "Online Gun Stores",
    desc: "FFL dealers and direct-to-consumer firearms retailers ready to scale retention and repeat purchases.",
  },
  {
    title: "Ammo Retailers",
    desc: "High-volume ammo sellers who need consistent campaigns, automated flows, and compliant sends.",
  },
  {
    title: "Tactical Gear Brands",
    desc: "Holsters, optics, EDC gear — brands serving armed professionals and enthusiasts.",
  },
];

export default function ICP() {
  return (
    <section id="who-we-serve" className="pt-10 pb-6 px-6" style={{ backgroundColor: "#2D3A28" }}>
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-3xl md:text-4xl font-black mb-4"
            style={{ color: "#F5C124" }}
          >
            Who We Work With
          </h2>
          <p
            className="font-inter max-w-lg mx-auto mb-14 text-lg text-white/60"
          >
            We Grow Revenue for Gun Stores, Ammo and Tactical Gear Retailers.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {ICP_ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 120}>
              <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10 h-full">
                <h3
                  className="font-barlow text-xl font-bold mb-3 text-white"
                >
                  {item.title}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed text-white/75"
                >
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={320}>
          <div
            className="inline-block rounded-xl px-8 py-5"
            style={{ backgroundColor: "#F5C124" }}
          >
            <p className="font-barlow text-sm font-semibold" style={{ color: "#2D3A28" }}>
              Best suited for stores with{" "}
              <span className="font-black">2,000–10,000 email subscribers</span> doing{" "}
              <span className="font-black">$20,000+/mo</span> in revenue
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
