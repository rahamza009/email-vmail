"use client";

const GRID_SVG = (size: number) =>
  `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D3A28' fill-opacity='1'%3E%3Cpath d='M0 0h2v${size}H0zm${size - 2} 0h2v${size}h-2zM0 0v2h${size}V0zm0 ${size - 2}v2h${size}v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

export default function TacticalMerchandise() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero — matches home page */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 px-6 bg-white overflow-hidden text-center">
        {/* Layer 1 — small 40px grid drifts forward (near) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: GRID_SVG(40),
            opacity: 0.055,
            animation: "gridDrift 18s linear infinite",
          }}
        />
        {/* Layer 2 — larger 70px grid drifts backward (far) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: GRID_SVG(70),
            opacity: 0.03,
            animation: "gridDriftReverse 28s linear infinite",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block mb-5">
            <p
              className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full"
              style={{ color: "#F5C124", backgroundColor: "#2D3A28" }}
            >
              New Vertical
            </p>
          </div>
          <h1
            className="font-barlow text-4xl md:text-6xl font-black mb-6 leading-tight"
            style={{ color: "#2D3A28" }}
          >
            Coming Soon....!
          </h1>
          <p
            className="font-barlow text-xl md:text-2xl font-semibold leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#2D3A28" }}
          >
            A curated marketplace of tactical gear and ammunition — sourced from verified brands, ready for dealers and retailers to stock their stores.
          </p>
        </div>
      </section>
    </main>
  );
}
