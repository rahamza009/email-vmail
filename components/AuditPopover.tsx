"use client";

import { useRef, useState } from "react";

const AUDIT_VECTORS = [
  {
    title: "Email Revenue Attribution",
    desc: "Exactly how much your email channel is (or isn't) generating vs. total store revenue — with a gap estimate of what you're leaving monthly.",
  },
  {
    title: "Flow Coverage Gap Analysis",
    desc: "Which automations — welcome, abandoned cart, post-purchase, browse abandon, win-back — are missing, broken, or firing wrong.",
  },
  {
    title: "List Health & Deliverability Score",
    desc: "Sender reputation, bounce rate, spam trap exposure, and inbox placement assessment across major email clients.",
  },
  {
    title: "Segmentation & Targeting Review",
    desc: "Whether your list is being used as a precision asset or blasted as a single audience — and what that gap is costing you in conversion rate.",
  },
  {
    title: "Compliance Risk Assessment",
    desc: "Firearms-specific ESP policy flags, CAN-SPAM exposure, and account suspension risks identified before they shut you down.",
  },
  {
    title: "Campaign Performance Benchmarks",
    desc: "Your open rates, CTR, and revenue-per-email stacked against tactical and firearms DTC industry benchmarks.",
  },
  {
    title: "30-Day Revenue Recovery Roadmap",
    desc: "A prioritized fix list showing exactly which changes produce the fastest measurable revenue lift for your store.",
  },
];

interface Props {
  children: React.ReactNode;
  position?: "above" | "below";
}

export default function AuditPopover({ children, position = "above" }: Props) {
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(true);
  };

  const hide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (!visible) {
      e.stopPropagation();
      show();
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onClickCapture={handleClickCapture}
    >
      {visible && (
        <div
          className={`absolute ${
            position === "above" ? "bottom-full mb-4" : "top-full mt-4"
          } left-1/2 -translate-x-1/2 z-50 w-80 md:w-96 rounded-2xl shadow-2xl border`}
          style={{ backgroundColor: "#1a2316", borderColor: "rgba(245,193,36,0.25)" }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {/* Arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
            style={{
              backgroundColor: "#1a2316",
              ...(position === "above"
                ? { top: "100%", marginTop: "-7px", borderRightWidth: 1, borderBottomWidth: 1, borderColor: "rgba(245,193,36,0.25)", borderStyle: "solid" }
                : { bottom: "100%", marginBottom: "-7px", borderLeftWidth: 1, borderTopWidth: 1, borderColor: "rgba(245,193,36,0.25)", borderStyle: "solid" }),
            }}
          />

          <div className="p-5">
            {/* Heading */}
            <h3
              className="font-barlow text-base font-black text-center tracking-wide mb-1"
              style={{ color: "#F5C124" }}
            >
              Vectors of Audit Report
            </h3>
            <p className="font-inter text-xs text-white/40 text-center mb-4">
              7 high-value diagnostics delivered in your report
            </p>

            {/* Bullet points */}
            <ul className="space-y-3.5">
              {AUDIT_VECTORS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#F5C124" }}
                  />
                  <div>
                    <span className="font-barlow text-sm font-bold text-white">
                      {item.title}
                    </span>
                    <span className="font-inter text-xs text-white/55 block mt-0.5 leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer nudge */}
            <div
              className="mt-4 pt-3 border-t text-center"
              style={{ borderColor: "rgba(245,193,36,0.15)" }}
            >
              <p className="font-barlow text-xs font-semibold" style={{ color: "#F5C124" }}>
                Delivered within 7 days · No commitment
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
