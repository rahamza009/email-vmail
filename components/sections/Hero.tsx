import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden" style={{ backgroundColor: "#2D3A28" }}>
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231E2419' fill-opacity='1'%3E%3Cpath d='M0 0h2v40H0zm38 0h2v40h-2zM0 0v2h40V0zm0 38v2h40v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <p
            className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-5"
            style={{ color: "#F5C124" }}
          >
            DFY Email Marketing Agency
          </p>

          <h1 className="font-barlow text-5xl md:text-7xl font-black leading-[1.05] mb-6 text-white">
            From Subscribed To Sold.<br />
            <span style={{ color: "#F5C124" }}>Again and Again.</span>
          </h1>

          <p className="font-inter text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-white/70">
            Done-For-You Email Marketing Agency For Gun Stores, Ammo and Tactical Gear.
            It&apos;s time to fix leaks in retention and turn one-time buyers into lifetime customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuditPopover position="above">
              <a
                href="https://www.linkedin.com/in/umehabiba2210/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block"
                style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}
              >
                Get $0 Account Audit
              </a>
            </AuditPopover>
            <a
              href="https://calendly.com/rahamza009-dzou/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors hover:bg-white/10"
              style={{ borderColor: "#F5C124", color: "#F5C124" }}
            >
              Fix My Retention
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
