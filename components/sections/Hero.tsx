import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";
import CallPopover from "@/components/CallPopover";

const GRID_SVG = (size: number) =>
  `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D3A28' fill-opacity='1'%3E%3Cpath d='M0 0h2v${size}H0zm${size - 2} 0h2v${size}h-2zM0 0v2h${size}V0zm0 ${size - 2}v2h${size}v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center pt-32 pb-24 px-6 bg-white overflow-hidden">

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

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="inline-block mb-5">
            <p
              className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full"
              style={{ color: "#F5C124", backgroundColor: "#2D3A28" }}
            >
              Done-For-You Email Marketing Agency
            </p>
          </div>

          <h1
            className="font-barlow text-4xl md:text-5xl font-black leading-[1.1] mb-6"
            style={{ color: "#2D3A28" }}
          >
            DFY Email Marketing Agency For FFLs,<br />Firearms, Ammunition and 2-A Brands
          </h1>

          <p
            className="font-inter text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#2D3A28" }}
          >
            From subscribed to sold,{" "}
            <em
              className="font-rajdhani"
              style={{ color: "#F5C124", fontStyle: "italic", fontWeight: 900, fontSize: "1.1em" }}
            >
              again and again.
            </em>
            {" "}We bring shooters and gun owners back to your store through revenue-first, ESP compliant, retention and lifecycle strategies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <AuditPopover position="above">
              <a
                href="/audit"
                className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block text-center w-full sm:w-[240px]"
                style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
              >
                Get $0 Account Audit
              </a>
            </AuditPopover>
            <CallPopover position="above">
              <a
                href="https://calendly.com/rahamza009-dzou/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors text-center w-full sm:w-[240px] block bg-white hover:bg-[#F5C124] active:bg-[#C9930A] hover:border-[#F5C124] active:border-[#C9930A]"
                style={{ borderColor: "#2D3A28", color: "#2D3A28" }}
              >
                Fix My Retention
              </a>
            </CallPopover>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
