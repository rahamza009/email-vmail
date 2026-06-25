import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";

export default function Audit() {
  return (
    <section id="audit" className="py-20 md:py-28 px-6" style={{ backgroundColor: "#2D3A28" }}>
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-4xl md:text-5xl font-black mb-6 leading-tight"
            style={{ color: "#F5C124" }}
          >
            Want a Revenue Gap Analysis<br className="hidden md:block" /> of Your Store?
          </h2>
          <p
            className="font-inter text-lg leading-relaxed mb-10 max-w-xl mx-auto text-white/75"
          >
            Get your{" "}
            <strong>$0 Audit Report</strong> delivered in 7 days. No commitment.
            No fluff. Just a clear picture of what your email list is leaving on the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuditPopover position="above">
              <a
                href="https://tally.so/r/aQk8yW?utm_source=free-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block"
                style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}
              >
                Get $0 Account Audit
              </a>
            </AuditPopover>
            <a
              href="#contact"
              className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors hover:bg-white/10"
              style={{ borderColor: "#F5C124", color: "#F5C124" }}
            >
              Book a 20-min Call
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
