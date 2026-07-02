const ITEMS = [
  "Built Exclusively for the Tactical Industry",
  "ESP Compliant Campaigns",
  "Fully Done For You Service",
];

export default function TrustBar() {
  return (
    <section style={{ backgroundColor: "#2D3A28" }} className="pt-5 pb-0 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 text-center pb-5">
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

      {/* Decorative gold divider */}
      <div className="flex items-center gap-0 max-w-5xl mx-auto">
        <div
          className="flex-1 h-px"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #F5C124 0px, #F5C124 8px, transparent 8px, transparent 16px)",
            opacity: 0.5,
          }}
        />
        <div className="px-4 flex items-center gap-2" style={{ color: "#F5C124", opacity: 0.85 }}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
            <polygon points="3,0 6,3 3,6 0,3" />
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <polygon points="5,0 10,5 5,10 0,5" />
          </svg>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
            <polygon points="3,0 6,3 3,6 0,3" />
          </svg>
        </div>
        <div
          className="flex-1 h-px"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #F5C124 0px, #F5C124 8px, transparent 8px, transparent 16px)",
            opacity: 0.5,
          }}
        />
      </div>
    </section>
  );
}
