"use client";

export default function TacticalAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes pack1 {
          0%,2%  { transform:translate(340px,-260px) rotate(18deg); opacity:0; }
          8%     { opacity:1; }
          38%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          72%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          84%    { transform:translate(0,0) rotate(0deg); opacity:0; }
          100%   { transform:translate(340px,-260px) rotate(18deg); opacity:0; }
        }
        @keyframes pack2 {
          0%,2%  { transform:translate(-380px,80px) rotate(-12deg); opacity:0; }
          8%     { opacity:1; }
          38%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          72%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          84%    { transform:translate(0,0) rotate(0deg); opacity:0; }
          100%   { transform:translate(-380px,80px) rotate(-12deg); opacity:0; }
        }
        @keyframes pack3 {
          0%,2%  { transform:translate(-260px,-300px) rotate(-20deg); opacity:0; }
          8%     { opacity:1; }
          38%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          72%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          84%    { transform:translate(0,0) rotate(0deg); opacity:0; }
          100%   { transform:translate(-260px,-300px) rotate(-20deg); opacity:0; }
        }
        @keyframes pack4 {
          0%,2%  { transform:translate(300px,260px) rotate(10deg); opacity:0; }
          8%     { opacity:1; }
          38%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          72%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          84%    { transform:translate(0,0) rotate(0deg); opacity:0; }
          100%   { transform:translate(300px,260px) rotate(10deg); opacity:0; }
        }
        @keyframes pack5 {
          0%,2%  { transform:translate(80px,-340px) rotate(-15deg); opacity:0; }
          8%     { opacity:1; }
          38%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          72%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          84%    { transform:translate(0,0) rotate(0deg); opacity:0; }
          100%   { transform:translate(80px,-340px) rotate(-15deg); opacity:0; }
        }
        @keyframes bagPulse {
          0%,100% { opacity:0.7; }
          50%     { opacity:1; }
        }
      `}</style>

      <svg
        viewBox="0 0 1440 900"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="#2D3A28"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.14 }}
      >
        {/* ── Tactical Bag (static, center-right) ── */}
        <g transform="translate(1040,600)" style={{ animation: "bagPulse 4s ease-in-out infinite" }}>
          {/* main body */}
          <rect x="-110" y="-90" width="220" height="180" rx="16" strokeWidth="3"/>
          {/* top handle */}
          <path d="M -28,-90 Q 0,-118 28,-90" strokeWidth="3"/>
          {/* zipper */}
          <line x1="-100" y1="-38" x2="100" y2="-38" strokeWidth="2" strokeDasharray="6 4"/>
          <circle cx="100" cy="-38" r="5" strokeWidth="2"/>
          {/* MOLLE rows */}
          <rect x="-95" y="-28" width="190" height="9" rx="3" strokeWidth="1.5"/>
          <rect x="-95" y="-12" width="190" height="9" rx="3" strokeWidth="1.5"/>
          <rect x="-95" y="4"  width="190" height="9" rx="3" strokeWidth="1.5"/>
          <rect x="-95" y="20" width="190" height="9" rx="3" strokeWidth="1.5"/>
          {/* front pocket */}
          <rect x="-80" y="42" width="160" height="55" rx="8" strokeWidth="2"/>
          <line x1="-70" y1="60" x2="70" y2="60" strokeWidth="1.5" strokeDasharray="5 3"/>
          {/* shoulder straps */}
          <path d="M -80,-85 C -120,-60 -130,40 -110,90" strokeWidth="2.5"/>
          <path d="M  80,-85 C  120,-60  130,40  110,90" strokeWidth="2.5"/>
        </g>

        {/* ── Pistol ── */}
        <g transform="translate(990,548)" style={{ animation: "pack1 11s ease-in-out infinite" }}>
          {/* slide/frame */}
          <rect x="-52" y="-10" width="104" height="20" rx="4" strokeWidth="2.2"/>
          {/* barrel */}
          <rect x="34" y="-6" width="28" height="12" rx="3" strokeWidth="1.8"/>
          {/* grip */}
          <rect x="-44" y="10" width="26" height="36" rx="4" strokeWidth="2.2"/>
          {/* trigger guard */}
          <path d="M -18,10 Q 0,28 18,10" strokeWidth="1.8"/>
          {/* trigger */}
          <line x1="2" y1="12" x2="5" y2="24" strokeWidth="1.5"/>
          {/* slide serrations */}
          <line x1="8"  y1="-9" x2="8"  y2="9" strokeWidth="1.2"/>
          <line x1="16" y1="-9" x2="16" y2="9" strokeWidth="1.2"/>
          <line x1="24" y1="-9" x2="24" y2="9" strokeWidth="1.2"/>
        </g>

        {/* ── Magazine ── */}
        <g transform="translate(1080,555)" style={{ animation: "pack2 11s ease-in-out infinite", animationDelay: "2s" }}>
          <rect x="-11" y="-30" width="22" height="52" rx="4" strokeWidth="2.2"/>
          <line x1="-7" y1="-22" x2="7" y2="-22" strokeWidth="1.3"/>
          <line x1="-7" y1="-14" x2="7" y2="-14" strokeWidth="1.3"/>
          <line x1="-7" y1="-6"  x2="7" y2="-6"  strokeWidth="1.3"/>
          <line x1="-7" y1=" 2"  x2="7" y2=" 2"  strokeWidth="1.3"/>
          <path d="M -8,-30 Q 0,-38 8,-30" strokeWidth="1.8"/>
        </g>

        {/* ── Flashlight ── */}
        <g transform="translate(1025,582)" style={{ animation: "pack3 11s ease-in-out infinite", animationDelay: "4s" }}>
          {/* head */}
          <ellipse cx="0" cy="-32" rx="12" ry="7" strokeWidth="2"/>
          <ellipse cx="0" cy="-32" rx="7"  ry="4"  strokeWidth="1.3"/>
          {/* body */}
          <rect x="-8" y="-25" width="16" height="48" rx="5" strokeWidth="2.2"/>
          {/* grip knurling */}
          <line x1="-7" y1="-10" x2="7" y2="-10" strokeWidth="1.2"/>
          <line x1="-7" y1=" -2" x2="7" y2=" -2" strokeWidth="1.2"/>
          <line x1="-7" y1="  6" x2="7" y2="  6" strokeWidth="1.2"/>
          {/* tail cap */}
          <rect x="-9" y="23" width="18" height="8" rx="3" strokeWidth="1.8"/>
        </g>

        {/* ── Tactical Knife ── */}
        <g transform="translate(1060,578)" style={{ animation: "pack4 11s ease-in-out infinite", animationDelay: "6s" }}>
          {/* blade */}
          <path d="M -6,-38 L 6,-38 L 7,5 L 0,10 L -7,5 Z" strokeWidth="2"/>
          {/* fuller groove */}
          <line x1="2" y1="-32" x2="4" y2="2" strokeWidth="1"/>
          {/* guard */}
          <rect x="-12" y="10" width="24" height="6" rx="2" strokeWidth="2"/>
          {/* handle */}
          <rect x="-9" y="16" width="18" height="32" rx="3" strokeWidth="2.2"/>
          <line x1="-6" y1="23" x2="6" y2="23" strokeWidth="1.2"/>
          <line x1="-6" y1="30" x2="6" y2="30" strokeWidth="1.2"/>
          <line x1="-6" y1="37" x2="6" y2="37" strokeWidth="1.2"/>
          {/* pommel */}
          <ellipse cx="0" cy="51" rx="9" ry="4" strokeWidth="1.8"/>
        </g>

        {/* ── Ammo Box ── */}
        <g transform="translate(1000,590)" style={{ animation: "pack5 11s ease-in-out infinite", animationDelay: "8s" }}>
          <rect x="-22" y="-16" width="44" height="32" rx="3" strokeWidth="2.2"/>
          {/* lid line */}
          <line x1="-22" y1="-6" x2="22" y2="-6" strokeWidth="1.5"/>
          {/* clasp */}
          <rect x="-5" y="-10" width="10" height="8" rx="2" strokeWidth="1.5"/>
          {/* label lines */}
          <line x1="-14" y1="3"  x2="14" y2="3"  strokeWidth="1.2"/>
          <line x1="-14" y1="9"  x2="10" y2="9"  strokeWidth="1.2"/>
          {/* handle */}
          <path d="M -8,-16 Q 0,-24 8,-16" strokeWidth="1.8"/>
        </g>
      </svg>
    </div>
  );
}
