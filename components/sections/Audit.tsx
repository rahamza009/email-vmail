import FadeIn from "@/components/FadeIn";

export default function Audit() {
  return (
    <section id="audit" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2
            className="font-barlow text-4xl md:text-5xl font-black mb-6 leading-tight"
            style={{ color: "#1E2419" }}
          >
            Want a Revenue Gap Analysis<br className="hidden md:block" /> of Your Store?
          </h2>
          <p
            className="font-inter text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "#1E2419" }}
          >
            Get your{" "}
            <strong>$0 Audit Report</strong> delivered in 7 days. No commitment.
            No fluff. Just a clear picture of what your email list is leaving on the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@email-vmail.com"
              className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1E2419", color: "#F5C124" }}
            >
              Claim $0 Audit
            </a>
            <a
              href="#contact"
              className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: "#1E2419", color: "#1E2419" }}
            >
              Book a 20-min Call
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
