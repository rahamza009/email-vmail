const ITEMS = [
  "Built Exclusively for the Tactical Industry",
  "ESP Compliant Campaigns",
  "Fully Done For You Service",
];

export default function TrustBar() {
  return (
    <section style={{ backgroundColor: "#2D3A28" }} className="py-5 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 text-center">
        {ITEMS.map((item, i) => (
          <div key={item} className="flex items-center">
            <span
              className="font-barlow text-sm font-semibold tracking-wide"
              style={{ color: "#F5C124" }}
            >
              {item}
            </span>
            {i < ITEMS.length - 1 && (
              <span className="hidden md:block mx-8 text-white/20 text-lg">|</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
