"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const GRID = (size: number) =>
  `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h2v${size}H0zm${size-2} 0h2v${size}h-2zM0 0v2h${size}V0zm0 ${size-2}v2h${size}v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

const DEFAULT = {
  hero: {
    name: "Ameer Hamza",
    role: "Founder & Email Marketing Strategist",
    tagline: "",
  },
  company: {
    headline: "Done-For-You Email Marketing for Firearms, Ammo & Tactical Brands",
    subheadline: "We build and run the lifecycle email infrastructure that turns your subscriber list into your most reliable, highest-ROI revenue channel.",
    missionStatement: "Our mission is simple. Move your customers from subscribed to sold, again and again.",
    missionBody: "Most firearm and tactical stores already have a list. The gap is not the list. It is the system. We build the lifecycle email infrastructure, including flows, campaigns, segmentation, and execution, that turns subscribers into repeat buyers and repeat buyers into loyal customers.",
    doctrineStatement: "Our doctrine is simple. Precision.",
    doctrineBody1: "Every email must have a purpose. Every segment must be defined. Every send must be deliberate. We don't batch-and-blast. We build systems that deliver the right message to the right customer at the right point in their lifecycle.",
    doctrineBody2: "Precision in segmentation. Precision in messaging. Precision in timing. That's how email becomes your highest-ROI channel.",
  },
  founder: {
    intro1: "Hi, I am Ameer. After years of building lifecycle email programs for ecommerce brands, I realized generic email marketing rarely fits specialist industries.",
    intro2: "Firearms, tactical, and outdoor brands have unique customers, unique buying journeys, and unique challenges. They deserve email strategies built around those realities — not recycled ecommerce playbooks.",
    intro3: "That's why I founded EmailVMail. And it has a story to it.",
  },
  brandStory: { title: "", body: "" },
  myStory: { title: "", body: "" },
  galleryImages: [
    "/slider/formal.jpg",
    "/slider/dsc-9600.jpg",
    "/slider/sniper-rifle.jpg",
    "/slider/drone-shot.jpg",
    "/slider/badminton.png",
    "/slider/firearm.jpg",
    "/slider/firearms2.jpg",
  ] as string[],
  team: [] as { name: string; role: string; bio: string; photo: string }[],
  reviews: [] as { name: string; company: string; text: string; rating: number }[],
};

type Content = typeof DEFAULT;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} className="w-4 h-4" fill={n <= rating ? "#F5C124" : "none"} stroke="#F5C124" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

const PLACEHOLDER_COLORS = [
  "rgba(255,255,255,0.07)",
  "rgba(255,255,255,0.04)",
  "rgba(245,193,36,0.06)",
  "rgba(255,255,255,0.05)",
  "rgba(245,193,36,0.04)",
  "rgba(255,255,255,0.06)",
];

function HeroGallery({ images }: { images: string[] }) {
  const usePlaceholders = images.length === 0;
  const items: (string | null)[] = usePlaceholders
    ? Array.from({ length: 6 }, () => null)
    : images;

  const col1 = items.filter((_, i) => i % 2 === 0);
  const col2 = items.filter((_, i) => i % 2 === 1);

  const d1 = [...col1, ...col1];
  const d2 = [...col2, ...col2];

  const dur1 = Math.max(18, col1.length * 5);
  const dur2 = Math.max(24, col2.length * 6);

  return (
    <>
      <style>{`
        @keyframes ev-up1 { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        @keyframes ev-up2 { 0% { transform: translateY(-8%); } 100% { transform: translateY(-58%); } }
        .ev-col1 { animation: ev-up1 ${dur1}s linear infinite; }
        .ev-col2 { animation: ev-up2 ${dur2}s linear infinite; }
        .ev-gallery-root:hover .ev-col1,
        .ev-gallery-root:hover .ev-col2 { animation-play-state: paused; }
      `}</style>
      <div style={{ height: "520px", overflow: "hidden", borderRadius: "16px", position: "relative" }}>
      <div className="ev-gallery-root" style={{ display: "flex", gap: "10px", position: "absolute", inset: "-70px -50px", transform: "rotate(-9deg)", transformOrigin: "center center" }}>
        {/* Column 1 */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div className="ev-col1" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {d1.map((src, i) =>
              src ? (
                <img key={i} src={src} alt="" style={{ width: "100%", height: "210px", objectFit: "contain", backgroundColor: "#1a2316", borderRadius: "8px", flexShrink: 0 }} />
              ) : (
                <div key={i} style={{ width: "100%", height: "210px", borderRadius: "8px", flexShrink: 0, backgroundColor: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length], border: "1px solid rgba(245,193,36,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="rgba(245,193,36,0.2)" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )
            )}
          </div>
        </div>
        {/* Column 2 */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div className="ev-col2" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {d2.map((src, i) =>
              src ? (
                <img key={i} src={src} alt="" style={{ width: "100%", height: "210px", objectFit: "contain", backgroundColor: "#1a2316", borderRadius: "8px", flexShrink: 0 }} />
              ) : (
                <div key={i} style={{ width: "100%", height: "210px", borderRadius: "8px", flexShrink: 0, backgroundColor: PLACEHOLDER_COLORS[(i + 3) % PLACEHOLDER_COLORS.length], border: "1px solid rgba(245,193,36,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="rgba(245,193,36,0.15)" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default function AboutPage() {
  const [content, setContent] = useState<Content>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about")
      .then(r => r.json())
      .then(d => {
        if (d.content) {
          setContent({
            ...DEFAULT,
            ...d.content,
            company: { ...DEFAULT.company, ...(d.content.company ?? {}) },
            founder: { ...DEFAULT.founder, ...(d.content.founder ?? {}) },
            galleryImages: d.content.galleryImages?.length > 0
              ? d.content.galleryImages
              : DEFAULT.galleryImages,
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const { hero, company, founder, galleryImages, team, reviews } = content;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Company Section ──────────────────────── */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden" style={{ backgroundColor: "#2D3A28" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRID(40), opacity: 0.04 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRID(80), opacity: 0.025 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", backgroundColor: "#F5C124" }} />

        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-barlow text-sm font-bold tracking-[0.25em] uppercase mb-5" style={{ color: "#F5C124" }}>About EmailVmail</p>
            <h1 className="font-barlow text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">
              {company.headline}
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {company.subheadline}
            </p>
          </div>

          {/* Gold divider */}
          <div className="w-16 h-1 mx-auto mb-12 rounded-full" style={{ backgroundColor: "#F5C124" }} />

          {/* Mission + Doctrine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,193,36,0.3)" }}>
              <p className="font-barlow text-sm font-bold tracking-[0.25em] uppercase mb-5" style={{ color: "#F5C124" }}>Mission</p>
              <p className="font-barlow text-2xl font-black text-white mb-5 leading-snug">
                {company.missionStatement}
              </p>
              <p className="font-inter text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {company.missionBody}
              </p>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,193,36,0.3)" }}>
              <p className="font-barlow text-sm font-bold tracking-[0.25em] uppercase mb-5" style={{ color: "#F5C124" }}>Doctrine</p>
              <p className="font-barlow text-2xl font-black text-white mb-5 leading-snug">
                {company.doctrineStatement}
              </p>
              <p className="font-inter text-lg leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                {company.doctrineBody1}
              </p>
              <p className="font-inter text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {company.doctrineBody2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder Section ──────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="font-barlow text-sm font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#F5C124" }}>About CEO &amp; Founder</p>
            <h2 className="font-barlow text-5xl md:text-6xl font-black leading-tight mb-4" style={{ color: "#2D3A28" }}>{hero.name}</h2>
            <p className="font-barlow text-xl font-semibold mb-8" style={{ color: "rgba(45,58,40,0.55)" }}>{hero.role}</p>
            <div className="space-y-5">
              <p className="font-inter text-lg leading-relaxed" style={{ color: "rgba(45,58,40,0.75)" }}>
                {founder.intro1}
              </p>
              <p className="font-inter text-lg leading-relaxed" style={{ color: "rgba(45,58,40,0.75)" }}>
                {founder.intro2}
              </p>
              <p className="font-inter text-lg leading-relaxed font-semibold" style={{ color: "#2D3A28" }}>
                {founder.intro3}
              </p>
            </div>
          </div>
          {/* Gallery */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <HeroGallery images={galleryImages} />
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f8f7f4" }}>
        <div className="max-w-3xl mx-auto">

          {/* Section label — P.S. treatment */}
          <div className="mb-12">
            <p className="font-barlow text-sm font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#F5C124" }}>P.S.</p>
            <h2 className="font-barlow text-3xl md:text-4xl font-black leading-tight" style={{ color: "#2D3A28" }}>The Story Behind Email-Vmail</h2>
            <div className="w-12 h-1 mt-4 rounded-full" style={{ backgroundColor: "#F5C124" }} />
          </div>

          <p className="font-inter text-lg leading-[1.85] mb-5" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            In 2012, I was a first-year college student, hanging out with a group of friends I&apos;m still close with today. One afternoon, we did what broke college kids do… brainstormed &ldquo;big money&rdquo; business ideas.
          </p>
          <p className="font-inter text-lg leading-[1.85] mb-10" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            Smuggling and Drugs were ruled out. Guns and arms trading came up. It didn&apos;t go anywhere that day. But the idea stuck.
          </p>

          {/* College image */}
          <figure className="mb-12">
            <img
              src="/about-story/college.png"
              alt="Hostel room where all conspiracies took place"
              className="w-full rounded-2xl"
              style={{ objectFit: "cover", maxHeight: "420px" }}
            />
            <figcaption className="font-inter text-base italic mt-3 text-center" style={{ color: "rgba(45,58,40,0.5)" }}>
              My hostel room where all conspiracies took place
            </figcaption>
          </figure>

          <p className="font-inter text-lg leading-[1.85] mb-10" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            I needed to figure out <em>how</em> to do Firearms for a living. The &ldquo;how&rdquo; became the project of the next 15 years.
          </p>

          <p className="font-inter text-lg leading-[1.85] mb-5" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            I enrolled at the National Defense University, Pakistan, majoring in Defense Economics, Small Arms, and Defense &amp; Aerospace Technologies. My Professor, Colonel Javed Islam, advised me to stay away from Small Arms &amp; Light Weapons due to black market, gun culture and terrorism in Pakistan.
          </p>

          {/* Pull quote */}
          <blockquote className="border-l-4 pl-6 my-8" style={{ borderColor: "#F5C124" }}>
            <p className="font-barlow text-2xl font-black leading-snug" style={{ color: "#2D3A28" }}>It was not worth it.</p>
          </blockquote>

          <p className="font-inter text-lg leading-[1.85] mb-5" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            Instead, he told me to focus on something with the same industry relevance but far less risk exposure: solving marketing problems for international firearms and defense companies.
          </p>

          {/* Callout with "best advice" merged in */}
          <div className="rounded-xl px-6 py-5 mb-10" style={{ backgroundColor: "rgba(245,193,36,0.1)", borderLeft: "3px solid #F5C124" }}>
            <p className="font-barlow text-lg font-black mb-1" style={{ color: "#2D3A28" }}>High compliance, low risk, workable.</p>
            <p className="font-barlow text-base font-semibold" style={{ color: "rgba(45,58,40,0.6)" }}>It turned out to be the best advice I ever got.</p>
          </div>

          {/* Degree image */}
          <figure className="mb-12">
            <img
              src="/about-story/degree.jpg"
              alt="Receiving Graduation Degree from President of Pakistan"
              className="w-full rounded-2xl"
              style={{ objectFit: "cover", maxHeight: "460px", objectPosition: "center top" }}
            />
            <figcaption className="font-inter text-base italic mt-3 text-center" style={{ color: "rgba(45,58,40,0.5)" }}>
              Receiving Graduation Degree from President of Islamic Republic of Pakistan &amp; President National Defense University, Islamabad — Dec 27, 2018
            </figcaption>
          </figure>

          <p className="font-inter text-lg leading-[1.85] mb-10" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            Walking out of university, I joined the Institute of Peace and Diplomatic Studies, a regional security think tank, where I built a real understanding of the politico-legal dynamics of the arms trade — export controls, compliance frameworks, and how this industry actually moves. In addition, I did a short academic course on Defense Acquisition Management from National Defense University, Pakistan in 2025.
          </p>

          {/* Zhao Lijian image */}
          <figure className="mb-12">
            <img
              src="/about-story/zhao-lijian.jpg"
              alt="Panel discussion with H.E Zhao Lijian"
              className="w-full rounded-2xl"
              style={{ objectFit: "cover", maxHeight: "460px", objectPosition: "center top" }}
            />
            <figcaption className="font-inter text-base italic mt-3 text-center" style={{ color: "rgba(45,58,40,0.5)" }}>
              During research days, sharing stage with H.E Zhao Lijian who later served as Spokesperson of China&apos;s Foreign Ministry
            </figcaption>
          </figure>

          <p className="font-inter text-lg leading-[1.85] mb-10" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            During COVID, I switched to hands-on marketing. Over the next four years, I generated $5M+ in revenue for clients while building the practical, execution-level skill set to go with the industry knowledge.
          </p>

          {/* IDEAS image */}
          <figure className="mb-12">
            <img
              src="/about-story/ideas.png"
              alt="IDEAS 2024 — International Defence Exhibition and Seminar, Karachi"
              className="w-full rounded-2xl"
              style={{ objectFit: "cover", maxHeight: "480px", objectPosition: "center" }}
            />
            <figcaption className="font-inter text-base italic mt-3 text-center" style={{ color: "rgba(45,58,40,0.5)" }}>
              Reception of International Defence Exhibition and Seminar 2024 — Karachi, Pakistan
            </figcaption>
          </figure>

          <p className="font-inter text-lg leading-[1.85] mb-5" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            By 2026, all of it had converged: the defense economics background, the compliance and regulatory fluency, the marketing expertise. Fifteen years after that college conversation, I&apos;d found the real answer to the &ldquo;how&rdquo; — email marketing, built specifically for firearms, defense, and aerospace companies.
          </p>
          <p className="font-inter text-lg leading-[1.85] mb-10" style={{ color: "rgba(45,58,40,0.8)", textAlign: "justify" }}>
            Now I help sellers in this industry turn inboxes into revenue.
          </p>

          {/* Closing line */}
          <p className="font-barlow text-3xl font-black" style={{ color: "#2D3A28" }}>Locked &amp; loaded.</p>

        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-barlow text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#F5C124" }}>Our Team</p>
              <h2 className="font-barlow text-4xl font-black" style={{ color: "#2D3A28" }}>The People Behind the Work</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
                  {member.photo && (
                    <img src={member.photo} alt={member.name} className="w-full h-56 object-cover object-top" />
                  )}
                  {!member.photo && (
                    <div className="w-full h-56 flex items-center justify-center" style={{ backgroundColor: "#2D3A28" }}>
                      <span className="font-barlow text-4xl font-black" style={{ color: "#F5C124" }}>{member.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="p-6">
                    <p className="font-barlow text-lg font-black mb-1" style={{ color: "#2D3A28" }}>{member.name}</p>
                    <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#F5C124" }}>{member.role}</p>
                    <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(45,58,40,0.65)" }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-20 px-6" style={{ backgroundColor: "#2D3A28" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-barlow text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#F5C124" }}>Client Reviews</p>
              <h2 className="font-barlow text-4xl font-black text-white">What Our Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="rounded-xl p-7" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(245,193,36,0.2)" }}>
                  <StarRating rating={review.rating} />
                  <p className="font-inter text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>"{review.text}"</p>
                  <div>
                    <p className="font-barlow text-sm font-black text-white">{review.name}</p>
                    <p className="font-inter text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{review.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-barlow text-3xl font-black mb-4" style={{ color: "#2D3A28" }}>Ready to Grow Your Email Revenue?</h2>
          <p className="font-inter text-base mb-8" style={{ color: "rgba(45,58,40,0.6)" }}>Book a free strategy call or get your email audit — zero commitment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/audit" className="font-barlow font-bold px-8 py-4 rounded-lg text-base tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
              Get Free Audit
            </Link>
            <a href="https://calendly.com/rahamza009-dzou/30min" target="_blank" rel="noopener noreferrer"
              className="font-barlow font-bold px-8 py-4 rounded-lg text-base tracking-wide hover:opacity-90 transition-opacity border-2"
              style={{ borderColor: "#2D3A28", color: "#2D3A28" }}>
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
