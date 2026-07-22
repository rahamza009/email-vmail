import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";
import CallPopover from "@/components/CallPopover";
import type { HeroSection } from "@/lib/getHomeContent";

const GRID_SVG = (size: number) =>
  `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D3A28' fill-opacity='1'%3E%3Cpath d='M0 0h2v${size}H0zm${size - 2} 0h2v${size}h-2zM0 0v2h${size}V0zm0 ${size - 2}v2h${size}v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

const D: Required<HeroSection> = {
  tag: "Done-For-You Email Marketing Agency",
  h1Line1: "Email Marketing Agency for Gun Stores,",
  h1Line2: "FFL Dealers & Firearms Retailers",
  subhead: "From subscribed to sold, again and again. We build compliant retention and lifecycle email marketing systems for firearms retailers, ammo stores, and 2A brands across the United States.",
  ctaPrimary: "Get $0 Account Audit",
  ctaSecondary: "Fix My Retention",
};

export default function Hero({ data }: { data?: HeroSection }) {
  const tag          = data?.tag          || D.tag;
  const h1Line1      = data?.h1Line1      || D.h1Line1;
  const h1Line2      = data?.h1Line2      || D.h1Line2;
  const subhead      = data?.subhead      || D.subhead;
  const ctaPrimary   = data?.ctaPrimary   || D.ctaPrimary;
  const ctaSecondary = data?.ctaSecondary || D.ctaSecondary;

  return (
    <section className="relative flex items-center justify-center pt-32 pb-24 px-6 bg-white overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRID_SVG(40), opacity: 0.055, animation: "gridDrift 18s linear infinite" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRID_SVG(70), opacity: 0.03, animation: "gridDriftReverse 28s linear infinite" }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="inline-block mb-5">
            <p
              className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full"
              style={{ color: "#F5C124", backgroundColor: "#2D3A28" }}
            >
              {tag}
            </p>
          </div>

          <h1
            className="font-barlow text-4xl md:text-5xl font-black leading-[1.1] mb-6"
            style={{ color: "#2D3A28" }}
          >
            {h1Line1}<br />{h1Line2}
          </h1>

          <p
            className="font-inter text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#2D3A28" }}
          >
            {subhead}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <AuditPopover position="above">
              <a
                href="/audit"
                className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block text-center w-full sm:w-[240px]"
                style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
              >
                {ctaPrimary}
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
                {ctaSecondary}
              </a>
            </CallPopover>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
