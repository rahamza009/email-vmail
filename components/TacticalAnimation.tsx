"use client";

export default function TacticalAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes driftIn1 {
          0%,3%  { transform:translate(420px,-180px) rotate(22deg); opacity:0; }
          12%    { opacity:1; }
          42%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          78%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          90%    { opacity:0; }
          100%   { transform:translate(420px,-180px) rotate(22deg); opacity:0; }
        }
        @keyframes driftIn2 {
          0%,3%  { transform:translate(-460px,60px) rotate(-18deg); opacity:0; }
          12%    { opacity:1; }
          42%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          78%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          90%    { opacity:0; }
          100%   { transform:translate(-460px,60px) rotate(-18deg); opacity:0; }
        }
        @keyframes driftIn3 {
          0%,3%  { transform:translate(-200px,-380px) rotate(-25deg); opacity:0; }
          12%    { opacity:1; }
          42%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          78%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          90%    { opacity:0; }
          100%   { transform:translate(-200px,-380px) rotate(-25deg); opacity:0; }
        }
        @keyframes driftIn4 {
          0%,3%  { transform:translate(360px,300px) rotate(14deg); opacity:0; }
          12%    { opacity:1; }
          42%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          78%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          90%    { opacity:0; }
          100%   { transform:translate(360px,300px) rotate(14deg); opacity:0; }
        }
        @keyframes driftIn5 {
          0%,3%  { transform:translate(60px,-420px) rotate(-10deg); opacity:0; }
          12%    { opacity:1; }
          42%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          78%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          90%    { opacity:0; }
          100%   { transform:translate(60px,-420px) rotate(-10deg); opacity:0; }
        }
        @keyframes driftIn6 {
          0%,3%  { transform:translate(-380px,-200px) rotate(16deg); opacity:0; }
          12%    { opacity:1; }
          42%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          78%    { transform:translate(0,0) rotate(0deg); opacity:1; }
          90%    { opacity:0; }
          100%   { transform:translate(-380px,-200px) rotate(16deg); opacity:0; }
        }
        @keyframes humanIdle {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-6px); }
        }
        @keyframes bagGlow {
          0%,100% { opacity:0.75; }
          50%     { opacity:1; }
        }
      `}</style>

      <svg
        viewBox="0 0 1440 900"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >

        {/* ─── TACTICAL DUFFEL BAG (static anchor, bottom-center-right) ─── */}
        <g transform="translate(980,680)" style={{ animation:"bagGlow 3s ease-in-out infinite" }} fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1">
          {/* main body */}
          <ellipse cx="0" cy="0" rx="160" ry="55" fill="#161616"/>
          <ellipse cx="0" cy="0" rx="160" ry="55" fill="none" stroke="#2D3A28" strokeWidth="2"/>
          {/* top seam */}
          <path d="M -140,-20 Q 0,-75 140,-20" fill="none" stroke="#2D3A28" strokeWidth="2.5"/>
          {/* zipper */}
          <path d="M -120,-18 Q 0,-65 120,-18" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeDasharray="7 4"/>
          {/* MOLLE webbing */}
          <rect x="-130" y="-8"  width="260" height="10" rx="3" fill="#1e1e1e" stroke="#2D3A28" strokeWidth="1.2"/>
          <rect x="-130" y="8"   width="260" height="10" rx="3" fill="#1e1e1e" stroke="#2D3A28" strokeWidth="1.2"/>
          <rect x="-130" y="24"  width="260" height="10" rx="3" fill="#1e1e1e" stroke="#2D3A28" strokeWidth="1.2"/>
          {/* carry handles */}
          <path d="M -30,-55 Q -30,-80 30,-80 Q 30,-55 30,-55" fill="none" stroke="#2D3A28" strokeWidth="4" strokeLinecap="round"/>
          {/* end patches */}
          <ellipse cx="-160" cy="0" rx="12" ry="40" fill="#1c1c1c" stroke="#2D3A28" strokeWidth="1.5"/>
          <ellipse cx="160"  cy="0" rx="12" ry="40" fill="#1c1c1c" stroke="#2D3A28" strokeWidth="1.5"/>
        </g>

        {/* ─── KNEELING HUMAN SILHOUETTE (operator packing) ─── */}
        <g transform="translate(1080,580)" fill="#1a2618" style={{ animation:"humanIdle 4s ease-in-out infinite" }}>
          {/* head */}
          <circle cx="0" cy="-175" r="32" fill="#1c2a18"/>
          {/* tactical helmet */}
          <path d="M -32,-175 Q -36,-218 0,-225 Q 36,-218 32,-175 Z" fill="#161e14"/>
          <rect x="-28" y="-212" width="56" height="8" rx="2" fill="#1a2618"/>
          {/* neck */}
          <rect x="-10" y="-143" width="20" height="20" rx="3" fill="#1c2a18"/>
          {/* torso with plate carrier */}
          <path d="M -55,-123 L 55,-123 L 65,-20 L -65,-20 Z" fill="#161e14"/>
          {/* plate carrier details */}
          <rect x="-45" y="-115" width="90" height="55" rx="4" fill="#1a2618" stroke="#2D3A28" strokeWidth="1.5"/>
          <rect x="-35" y="-108" width="30" height="18" rx="2" fill="#131a11"/>
          <rect x="5"   y="-108" width="30" height="18" rx="2" fill="#131a11"/>
          <line x1="-45" y1="-85" x2="45" y2="-85" stroke="#2D3A28" strokeWidth="1"/>
          <rect x="-40" y="-82" width="80" height="22" rx="3" fill="#161e14" stroke="#2D3A28" strokeWidth="1"/>
          {/* left arm extending toward bag */}
          <path d="M -55,-110 Q -100,-80 -140,-30 Q -165,10 -180,50" fill="none" stroke="#1a2618" strokeWidth="28" strokeLinecap="round"/>
          <path d="M -55,-110 Q -100,-80 -140,-30 Q -165,10 -180,50" fill="none" stroke="#161e14" strokeWidth="22" strokeLinecap="round"/>
          {/* right arm reaching into bag */}
          <path d="M 55,-100 Q 110,-60 150,10 Q 165,40 170,80" fill="none" stroke="#1a2618" strokeWidth="28" strokeLinecap="round"/>
          <path d="M 55,-100 Q 110,-60 150,10 Q 165,40 170,80" fill="none" stroke="#161e14" strokeWidth="22" strokeLinecap="round"/>
          {/* left thigh (kneeling) */}
          <path d="M -65,-20 Q -80,40 -90,100" fill="none" stroke="#1a2618" strokeWidth="40" strokeLinecap="round"/>
          {/* right knee on ground */}
          <path d="M 65,-20 Q 80,50 70,110" fill="none" stroke="#1a2618" strokeWidth="40" strokeLinecap="round"/>
          {/* boots */}
          <ellipse cx="-95" cy="112" rx="22" ry="14" fill="#111510"/>
          <ellipse cx="74"  cy="118" rx="22" ry="14" fill="#111510"/>
        </g>

        {/* ─── PISTOL (Glock-style, detailed) ─── */}
        <g
          transform="translate(265,310)"
          fill="#181818"
          stroke="#282828"
          strokeWidth="1.2"
          style={{ animation:"driftIn1 13s ease-in-out infinite" }}
        >
          {/* slide */}
          <rect x="-75" y="-28" width="150" height="38" rx="5"/>
          {/* barrel shroud */}
          <rect x="55" y="-22" width="38" height="26" rx="4"/>
          {/* muzzle hole */}
          <circle cx="88" cy="-9" r="7" fill="#0d0d0d" stroke="#333" strokeWidth="1"/>
          {/* slide serrations rear */}
          <line x1="-55" y1="-26" x2="-55" y2="8"  stroke="#303030" strokeWidth="2"/>
          <line x1="-45" y1="-26" x2="-45" y2="8"  stroke="#303030" strokeWidth="2"/>
          <line x1="-35" y1="-26" x2="-35" y2="8"  stroke="#303030" strokeWidth="2"/>
          <line x1="-25" y1="-26" x2="-25" y2="8"  stroke="#303030" strokeWidth="2"/>
          {/* ejection port */}
          <rect x="5" y="-26" width="35" height="16" rx="2" fill="#111"/>
          {/* frame */}
          <rect x="-75" y="10" width="130" height="22" rx="4"/>
          {/* trigger guard */}
          <path d="M -20,32 Q 10,58 40,32" fill="none" stroke="#282828" strokeWidth="8" strokeLinecap="round"/>
          {/* trigger */}
          <path d="M 8,16 L 12,44" stroke="#383838" strokeWidth="4" strokeLinecap="round"/>
          {/* grip */}
          <path d="M -70,32 L -55,110 Q -50,118 -38,118 L -22,118 Q -12,118 -10,108 L -10,32 Z"/>
          {/* grip texture */}
          <line x1="-60" y1="45"  x2="-18" y2="45"  stroke="#222" strokeWidth="1.5"/>
          <line x1="-60" y1="58"  x2="-18" y2="58"  stroke="#222" strokeWidth="1.5"/>
          <line x1="-60" y1="71"  x2="-18" y2="71"  stroke="#222" strokeWidth="1.5"/>
          <line x1="-60" y1="84"  x2="-18" y2="84"  stroke="#222" strokeWidth="1.5"/>
          <line x1="-60" y1="97"  x2="-18" y2="97"  stroke="#222" strokeWidth="1.5"/>
          {/* mag base */}
          <rect x="-62" y="110" width="48" height="10" rx="3" fill="#141414"/>
          {/* sights */}
          <rect x="-70" y="-32" width="10" height="6" rx="1" fill="#383838"/>
          <rect x="60"  y="-32" width="10" height="6" rx="1" fill="#383838"/>
        </g>

        {/* ─── AR-15 STYLE RIFLE ─── */}
        <g
          transform="translate(600,165)"
          fill="#181818"
          stroke="#282828"
          strokeWidth="1.2"
          style={{ animation:"driftIn2 13s ease-in-out infinite", animationDelay:"2s" }}
        >
          {/* stock */}
          <path d="M -260,-12 L -210,-12 L -210,8 L -260,8 Z" rx="3"/>
          <path d="M -260,-8 L -280,-18 L -295,-18 L -295,-2 L -280,18 L -260,8 Z"/>
          <line x1="-295" y1="-2"  x2="-280" y2="-2"  stroke="#252525" strokeWidth="3"/>
          <line x1="-265" y1="-12" x2="-265" y2="8"   stroke="#252525" strokeWidth="2"/>
          <line x1="-240" y1="-12" x2="-240" y2="8"   stroke="#252525" strokeWidth="2"/>
          {/* buffer tube */}
          <rect x="-210" y="-8" width="40" height="16" rx="6"/>
          {/* lower receiver */}
          <path d="M -170,-18 L 60,-18 L 60,30 L -170,30 Z" rx="4"/>
          {/* pistol grip */}
          <path d="M -20,30 L -5,30 L 0,80 Q 0,92 -10,92 L -30,92 Q -40,92 -40,80 L -35,30 Z"/>
          <line x1="-35" y1="42" x2="-5" y2="42" stroke="#222" strokeWidth="1.5"/>
          <line x1="-35" y1="54" x2="-5" y2="54" stroke="#222" strokeWidth="1.5"/>
          <line x1="-35" y1="66" x2="-5" y2="66" stroke="#222" strokeWidth="1.5"/>
          {/* trigger guard */}
          <path d="M -60,30 Q -40,55 -10,30" fill="none" stroke="#282828" strokeWidth="7" strokeLinecap="round"/>
          {/* trigger */}
          <line x1="-38" y1="32" x2="-35" y2="52" stroke="#383838" strokeWidth="3.5" strokeLinecap="round"/>
          {/* mag well + mag */}
          <rect x="-80" y="30" width="40" height="12" rx="2"/>
          <path d="M -78,42 Q -80,100 -72,108 L -50,108 Q -42,100 -44,42 Z"/>
          <line x1="-75" y1="58"  x2="-47" y2="58"  stroke="#222" strokeWidth="1.2"/>
          <line x1="-75" y1="72"  x2="-47" y2="72"  stroke="#222" strokeWidth="1.2"/>
          <line x1="-75" y1="86"  x2="-47" y2="86"  stroke="#222" strokeWidth="1.2"/>
          {/* upper receiver */}
          <rect x="-170" y="-32" width="230" height="14" rx="4"/>
          {/* charging handle */}
          <rect x="-155" y="-42" width="18" height="12" rx="3"/>
          {/* handguard */}
          <rect x="60" y="-26" width="180" height="38" rx="5"/>
          <line x1="80"  y1="-26" x2="80"  y2="12"  stroke="#252525" strokeWidth="2"/>
          <line x1="100" y1="-26" x2="100" y2="12"  stroke="#252525" strokeWidth="2"/>
          <line x1="120" y1="-26" x2="120" y2="12"  stroke="#252525" strokeWidth="2"/>
          <line x1="140" y1="-26" x2="140" y2="12"  stroke="#252525" strokeWidth="2"/>
          <line x1="160" y1="-26" x2="160" y2="12"  stroke="#252525" strokeWidth="2"/>
          <line x1="180" y1="-26" x2="180" y2="12"  stroke="#252525" strokeWidth="2"/>
          <line x1="200" y1="-26" x2="200" y2="12"  stroke="#252525" strokeWidth="2"/>
          {/* barrel */}
          <rect x="240" y="-8" width="160" height="16" rx="4"/>
          {/* muzzle device */}
          <rect x="398" y="-12" width="30" height="24" rx="3"/>
          <line x1="405" y1="-12" x2="405" y2="12" stroke="#333" strokeWidth="2"/>
          <line x1="415" y1="-12" x2="415" y2="12" stroke="#333" strokeWidth="2"/>
          <line x1="425" y1="-12" x2="425" y2="12" stroke="#333" strokeWidth="2"/>
          {/* optic rail */}
          <rect x="-165" y="-46" width="225" height="14" rx="2"/>
          {/* red dot scope */}
          <rect x="-60" y="-72" width="80" height="26" rx="6" fill="#141414" stroke="#303030" strokeWidth="1.5"/>
          <circle cx="-20" cy="-59" r="9" fill="#0d0d0d" stroke="#383838" strokeWidth="1.2"/>
          <circle cx="-20" cy="-59" r="3" fill="#F5C124" stroke="none" opacity="0.6"/>
        </g>

        {/* ─── TACTICAL FLASHLIGHT ─── */}
        <g
          transform="translate(1280,240)"
          fill="#181818"
          stroke="#282828"
          strokeWidth="1.2"
          style={{ animation:"driftIn3 13s ease-in-out infinite", animationDelay:"4s" }}
        >
          {/* head */}
          <ellipse cx="0" cy="-80" rx="28" ry="18"/>
          <ellipse cx="0" cy="-80" rx="20" ry="12" fill="#111" stroke="#333" strokeWidth="1.5"/>
          <circle  cx="0" cy="-80" r="10" fill="#F5C124" opacity="0.15"/>
          {/* bezel step */}
          <ellipse cx="0" cy="-62" rx="20" ry="8"/>
          {/* body */}
          <rect x="-14" y="-54" width="28" height="90" rx="6"/>
          {/* knurling */}
          <line x1="-13" y1="-38" x2="13" y2="-38" stroke="#252525" strokeWidth="2"/>
          <line x1="-13" y1="-26" x2="13" y2="-26" stroke="#252525" strokeWidth="2"/>
          <line x1="-13" y1="-14" x2="13" y2="-14" stroke="#252525" strokeWidth="2"/>
          <line x1="-13" y1="-2"  x2="13" y2="-2"  stroke="#252525" strokeWidth="2"/>
          <line x1="-13" y1="10"  x2="13" y2="10"  stroke="#252525" strokeWidth="2"/>
          {/* side switch */}
          <rect x="12" y="-5" width="8" height="16" rx="3" fill="#222" stroke="#333" strokeWidth="1"/>
          {/* tail cap */}
          <rect x="-16" y="36" width="32" height="14" rx="5"/>
          <ellipse cx="0" cy="50" rx="14" ry="6"/>
        </g>

        {/* ─── FIXED BLADE KNIFE ─── */}
        <g
          transform="translate(155,560)"
          fill="#181818"
          stroke="#282828"
          strokeWidth="1.2"
          style={{ animation:"driftIn4 13s ease-in-out infinite", animationDelay:"5.5s" }}
        >
          {/* blade */}
          <path d="M -8,-130 L 8,-130 L 10,-20 L 0,-10 L -10,-20 Z" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
          {/* fuller groove */}
          <line x1="3" y1="-120" x2="6" y2="-25" stroke="#2a2a2a" strokeWidth="2"/>
          {/* sharpened edge glint */}
          <line x1="-8" y1="-130" x2="-10" y2="-20" stroke="#333" strokeWidth="1.5"/>
          {/* guard */}
          <rect x="-18" y="-12" width="36" height="10" rx="3" fill="#141414" stroke="#2D3A28" strokeWidth="1.5"/>
          {/* handle */}
          <rect x="-13" y="-2" width="26" height="68" rx="5"/>
          {/* handle grooves */}
          <line x1="-10" y1="10"  x2="10" y2="10"  stroke="#252525" strokeWidth="2"/>
          <line x1="-10" y1="22"  x2="10" y2="22"  stroke="#252525" strokeWidth="2"/>
          <line x1="-10" y1="34"  x2="10" y2="34"  stroke="#252525" strokeWidth="2"/>
          <line x1="-10" y1="46"  x2="10" y2="46"  stroke="#252525" strokeWidth="2"/>
          <line x1="-10" y1="58"  x2="10" y2="58"  stroke="#252525" strokeWidth="2"/>
          {/* pommel */}
          <ellipse cx="0" cy="70" rx="15" ry="8" fill="#141414" stroke="#2D3A28" strokeWidth="1.5"/>
          <ellipse cx="0" cy="70" rx="6" ry="3" fill="#111"/>
        </g>

        {/* ─── AMMO BOX ─── */}
        <g
          transform="translate(420,680)"
          fill="#181818"
          stroke="#282828"
          strokeWidth="1.2"
          style={{ animation:"driftIn5 13s ease-in-out infinite", animationDelay:"7s" }}
        >
          <rect x="-55" y="-35" width="110" height="70" rx="5"/>
          {/* lid */}
          <rect x="-55" y="-35" width="110" height="22" rx="5" fill="#161616" stroke="#2D3A28" strokeWidth="1.5"/>
          {/* latch */}
          <rect x="-10" y="-36" width="20" height="14" rx="3" fill="#141414" stroke="#2D3A28" strokeWidth="1.5"/>
          {/* label area */}
          <rect x="-40" y="-4"  width="80" height="28" rx="3" fill="#141414" stroke="#252525" strokeWidth="1"/>
          {/* label lines */}
          <line x1="-32" y1="4"  x2="32" y2="4"  stroke="#2a2a2a" strokeWidth="1.5"/>
          <line x1="-32" y1="12" x2="32" y2="12" stroke="#2a2a2a" strokeWidth="1.5"/>
          <line x1="-32" y1="20" x2="20" y2="20" stroke="#2a2a2a" strokeWidth="1.5"/>
          {/* carry handle */}
          <path d="M -20,-35 Q -20,-55 20,-55 Q 20,-35 20,-35" fill="none" stroke="#2D3A28" strokeWidth="4" strokeLinecap="round"/>
          {/* corner reinforcements */}
          <rect x="-55" y="-35" width="12" height="12" rx="2" fill="#141414"/>
          <rect x="43"  y="-35" width="12" height="12" rx="2" fill="#141414"/>
          <rect x="-55" y="23"  width="12" height="12" rx="2" fill="#141414"/>
          <rect x="43"  y="23"  width="12" height="12" rx="2" fill="#141414"/>
        </g>

        {/* ─── HANDGUN MAGAZINE ─── */}
        <g
          transform="translate(1310,590)"
          fill="#181818"
          stroke="#282828"
          strokeWidth="1.2"
          style={{ animation:"driftIn6 13s ease-in-out infinite", animationDelay:"9s" }}
        >
          {/* feed lips */}
          <path d="M -14,-65 Q -14,-80 0,-80 Q 14,-80 14,-65" fill="none" stroke="#2D3A28" strokeWidth="3" strokeLinecap="round"/>
          {/* body */}
          <rect x="-16" y="-65" width="32" height="100" rx="5"/>
          {/* round witness holes */}
          <circle cx="14" cy="-40" r="4" fill="#111" stroke="#333" strokeWidth="1"/>
          <circle cx="14" cy="-22" r="4" fill="#111" stroke="#333" strokeWidth="1"/>
          <circle cx="14" cy="-4"  r="4" fill="#111" stroke="#333" strokeWidth="1"/>
          <circle cx="14" cy="14"  r="4" fill="#111" stroke="#333" strokeWidth="1"/>
          {/* floor plate */}
          <rect x="-18" y="35" width="36" height="12" rx="4" fill="#141414" stroke="#2D3A28" strokeWidth="1.5"/>
          {/* spine */}
          <line x1="-16" y1="-55" x2="-16" y2="35" stroke="#252525" strokeWidth="2"/>
        </g>

      </svg>
    </div>
  );
}
