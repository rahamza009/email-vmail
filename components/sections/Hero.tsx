"use client";
import dynamic from "next/dynamic";
import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";
const TacticalAnimation = dynamic(() => import("@/components/TacticalAnimation"), { ssr: false });

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden"
      style={{ backgroundColor: "#0D1109" }}
    >
      <TacticalAnimation />

      {/* subtle center vignette so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(13,17,9,0.55) 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="inline-block mb-5">
            <p
              className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full"
              style={{ color: "#F5C124", backgroundColor: "rgba(245,193,36,0.15)", border: "1px solid rgba(245,193,36,0.3)" }}
            >
              DFY Email Marketing Agency
            </p>
          </div>

          <h1
            className="font-barlow text-4xl md:text-5xl font-black leading-[1.1] mb-6 text-white"
          >
            Email Marketing Built for<br />
            Gun Stores, Ammo and Tactical Gear.
          </h1>

          <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-white/75">
            From subscribed to sold,{" "}
            <em
              className="font-rajdhani"
              style={{ color: "#F5C124", fontStyle: "italic", fontWeight: 900, fontSize: "1.1em" }}
            >
              again and again.
            </em>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <AuditPopover position="above">
              <a
                href="https://tally.so/r/aQk8yW?utm_source=free-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block text-center w-full sm:w-[240px]"
                style={{ backgroundColor: "#F5C124", color: "#0D1109" }}
              >
                Get $0 Account Audit
              </a>
            </AuditPopover>
            <a
              href="https://calendly.com/rahamza009-dzou/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors hover:bg-white/10 text-center w-full sm:w-[240px] text-white"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}
            >
              Fix My Retention
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
