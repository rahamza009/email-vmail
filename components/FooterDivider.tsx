const PHRASES = [
  "BUILT FOR GUN STORES",
  "NICHE-SPECIFIC EMAIL MARKETING",
  "DONE-FOR-YOU",
  "TACTICAL INDUSTRY SPECIALISTS",
  "ESP COMPLIANT CAMPAIGNS",
  "PREDICTABLE REVENUE",
  "AMMO & TACTICAL GEAR",
  "DFY STRATEGY & EXECUTION",
];

export default function FooterDivider() {
  const track = [...PHRASES, ...PHRASES];

  return (
    <div
      className="w-full overflow-hidden py-4 border-t border-b"
      style={{ backgroundColor: "#F5C124", borderColor: "#F5C124" }}
    >
      <div className="ticker-track flex gap-0 w-max">
        {track.map((phrase, i) => (
          <span
            key={i}
            className="font-barlow text-sm font-black tracking-widest uppercase flex items-center shrink-0"
            style={{ color: "#2D3A28" }}
          >
            {phrase}
            <span className="mx-6 text-base opacity-50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
