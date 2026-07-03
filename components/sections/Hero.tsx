import FadeIn from "@/components/FadeIn";
import AuditPopover from "@/components/AuditPopover";

function Crosshair() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="50" cy="50" r="30" />
      <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
      <line x1="50" y1="2"  x2="50" y2="32" />
      <line x1="50" y1="68" x2="50" y2="98" />
      <line x1="2"  y1="50" x2="32" y2="50" />
      <line x1="68" y1="50" x2="98" y2="50" />
      <circle cx="50" cy="50" r="46" strokeWidth="1" strokeDasharray="4 7" />
    </svg>
  );
}

function Target() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <circle cx="50" cy="50" r="48" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="36" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="24" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="12" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="4"  fill="currentColor" stroke="none" />
      <line x1="50" y1="0"   x2="50" y2="100" strokeWidth="0.7" strokeDasharray="3 9" />
      <line x1="0"  y1="50"  x2="100" y2="50"  strokeWidth="0.7" strokeDasharray="3 9" />
    </svg>
  );
}

function Bullet() {
  return (
    <svg viewBox="0 0 36 100" fill="currentColor">
      <path d="M18 2 C26 2 30 20 30 38 L6 38 C6 20 10 2 18 2Z" />
      <rect x="6"  y="38" width="24" height="44" rx="2" />
      <rect x="4"  y="82" width="28" height="12" rx="2" />
      <rect x="7"  y="94" width="22" height="4"  rx="1" opacity="0.5" />
    </svg>
  );
}

function HexPlate() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <polygon points="50,3 93,27 93,73 50,97 7,73 7,27"   strokeWidth="2" />
      <polygon points="50,22 78,37 78,63 50,78 22,63 22,37" strokeWidth="1.5" />
      <polygon points="50,38 65,46 65,54 50,62 35,54 35,46" strokeWidth="1" />
    </svg>
  );
}

function ShellCasing() {
  return (
    <svg viewBox="0 0 40 100" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8"  y="5"  width="24" height="60" rx="3" />
      <rect x="4"  y="65" width="32" height="14" rx="2" />
      <rect x="6"  y="79" width="28" height="6"  rx="1" />
      <line x1="14" y1="15" x2="14" y2="55" strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="10" x2="20" y2="60" strokeWidth="1" opacity="0.5" />
      <line x1="26" y1="15" x2="26" y2="55" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function Reticle() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="20" />
      <circle cx="50" cy="50" r="3" fill="currentColor" stroke="none" />
      <line x1="10"  y1="50" x2="30"  y2="50" />
      <line x1="70"  y1="50" x2="90"  y2="50" />
      <line x1="50"  y1="10" x2="50"  y2="30" />
      <line x1="50"  y1="70" x2="50"  y2="90" />
      <line x1="21"  y1="21" x2="34"  y2="34" strokeWidth="1" />
      <line x1="79"  y1="21" x2="66"  y2="34" strokeWidth="1" />
      <line x1="21"  y1="79" x2="34"  y2="66" strokeWidth="1" />
      <line x1="79"  y1="79" x2="66"  y2="66" strokeWidth="1" />
    </svg>
  );
}

const ELEMENTS = [
  { Svg: Crosshair,   x: "6%",  y: "14%", size: 52,  opacity: 0.07,  dur: "6s",    delay: "0s",   rot: 0   },
  { Svg: Target,      x: "3%",  y: "54%", size: 80,  opacity: 0.045, dur: "9s",    delay: "0.8s", rot: 0   },
  { Svg: Bullet,      x: "16%", y: "76%", size: 32,  opacity: 0.07,  dur: "5s",    delay: "2s",   rot: 18  },
  { Svg: ShellCasing, x: "23%", y: "8%",  size: 36,  opacity: 0.055, dur: "7s",    delay: "3.5s", rot: -12 },
  { Svg: HexPlate,    x: "87%", y: "10%", size: 56,  opacity: 0.05,  dur: "7.5s",  delay: "0.4s", rot: 15  },
  { Svg: Reticle,     x: "90%", y: "48%", size: 42,  opacity: 0.06,  dur: "5.5s",  delay: "3s",   rot: 0   },
  { Svg: Bullet,      x: "82%", y: "72%", size: 26,  opacity: 0.07,  dur: "4.5s",  delay: "1.5s", rot: -20 },
  { Svg: Target,      x: "70%", y: "4%",  size: 96,  opacity: 0.035, dur: "11s",   delay: "2.5s", rot: 0   },
  { Svg: HexPlate,    x: "76%", y: "75%", size: 40,  opacity: 0.05,  dur: "6s",    delay: "4s",   rot: 30  },
  { Svg: ShellCasing, x: "57%", y: "82%", size: 28,  opacity: 0.055, dur: "6.5s",  delay: "1.2s", rot: 10  },
  { Svg: Crosshair,   x: "44%", y: "4%",  size: 32,  opacity: 0.045, dur: "8s",    delay: "2.8s", rot: 45  },
  { Svg: Reticle,     x: "45%", y: "78%", size: 38,  opacity: 0.04,  dur: "7s",    delay: "0.5s", rot: 0   },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 bg-white overflow-hidden">

      {/* Floating tactical elements */}
      {ELEMENTS.map(({ Svg, x, y, size, opacity, dur, delay, rot }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: x, top: y, width: size, height: size, opacity, color: "#2D3A28" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${rot}deg)`,
              animation: `tacticalFloat ${dur} ease-in-out infinite`,
              animationDelay: delay,
            }}
          >
            <Svg />
          </div>
        </div>
      ))}

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="inline-block mb-5">
            <p
              className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full"
              style={{ color: "#F5C124", backgroundColor: "#2D3A28" }}
            >
              DFY Email Marketing Agency
            </p>
          </div>

          <h1
            className="font-barlow text-4xl md:text-5xl font-black leading-[1.1] mb-6"
            style={{ color: "#2D3A28" }}
          >
            Email Marketing Built for<br />
            Gun Stores, Ammo and Tactical Gear.
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
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <AuditPopover position="above">
              <a
                href="https://tally.so/r/aQk8yW?utm_source=free-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide transition-opacity hover:opacity-90 block text-center w-full sm:w-[240px]"
                style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}
              >
                Get $0 Account Audit
              </a>
            </AuditPopover>
            <a
              href="https://calendly.com/rahamza009-dzou/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow font-bold px-9 py-4 rounded text-base tracking-wide border-2 transition-colors hover:bg-gray-50 text-center w-full sm:w-[240px]"
              style={{ borderColor: "#2D3A28", color: "#2D3A28" }}
            >
              Fix My Retention
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
