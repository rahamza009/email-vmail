import FadeIn from "@/components/FadeIn";

const ICP_ITEMS = [
  {
    icon: "🔫",
    title: "Online Gun Stores",
    desc: "FFL dealers and direct-to-consumer firearms retailers ready to scale retention and repeat purchases.",
  },
  {
    icon: "💥",
    title: "Ammo Retailers",
    desc: "High-volume ammo sellers who need consistent campaigns, automated flows, and compliant sends.",
  },
  {
    icon: "🪖",
    title: "Tactical Gear Brands",
    desc: "Holsters, optics, EDC gear — brands serving armed professionals and enthusiasts.",
  },
];

export default function ICP() {
  return (
    <section id="who-we-serve" className="py-20 md:py-28 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#1E2419" }}
          >
            Who This Is For
          </h2>
          <p className="font-inter text-gray-400 max-w-lg mx-auto mb-14 text-base">
            We work exclusively with businesses in the tactical and firearms space.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {ICP_ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 120}>
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 h-full">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="font-barlow text-xl font-bold mb-3"
                  style={{ color: "#1E2419" }}
                >
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={320}>
          <div
            className="inline-block rounded-xl px-8 py-5"
            style={{ backgroundColor: "#1E2419" }}
          >
            <p className="font-barlow text-sm font-semibold" style={{ color: "#F5C124" }}>
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
