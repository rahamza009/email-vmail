"use client";

import { useRef, useState } from "react";

const CALL_POINTS = [
  "Your current email setup",
  "Revenue gaps we spot immediately",
  "Which plan fits your store",
  "Whether we're the right fit",
];

interface Props {
  children: React.ReactNode;
  position?: "above" | "below";
}

export default function CallPopover({ children, position = "above" }: Props) {
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
          } left-1/2 -translate-x-1/2 z-50 w-72 rounded-2xl shadow-2xl border`}
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

          <div className="p-4">
            <h3
              className="font-barlow text-base font-black text-center tracking-wide mb-3"
              style={{ color: "#F5C124" }}
            >
              30-min call. No pitch. Just answers.
            </h3>

            <ul className="space-y-2">
              {CALL_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#F5C124" }}
                  />
                  <span className="font-barlow text-sm font-semibold text-white">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-3 pt-2.5 border-t text-center"
              style={{ borderColor: "rgba(245,193,36,0.15)" }}
            >
              <p className="font-inter text-xs" style={{ color: "rgba(245,193,36,0.7)" }}>
                Free · No commitment · 30 minutes
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
