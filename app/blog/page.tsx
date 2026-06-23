import Link from "next/link";

const POSTS = [
  {
    title: "Best Email Platforms for Firearms Retailers in 2025",
    category: "Email Strategy",
    date: "June 10, 2025",
    excerpt:
      "Mailchimp isn't the only option — and for firearms retailers, it's probably the worst one. Here's what actually works and why compliant ESPs are a business necessity.",
    slug: "best-email-platforms-firearms-retailers-2025",
  },
  {
    title: "5 Email Flows Every Gun Store Should Have Running",
    category: "Automation",
    date: "May 28, 2025",
    excerpt:
      "Most gun stores are leaving thousands per month on the table. These five automation flows fix that — and they run on autopilot once they're live.",
    slug: "5-email-flows-gun-store",
  },
  {
    title: "Why Mailchimp Banned Your Gun Store and What to Do Next",
    category: "Compliance",
    date: "May 14, 2025",
    excerpt:
      "It's not personal — it's policy. Here's exactly why mainstream ESPs ban firearms businesses and which compliant alternatives won't ghost you at the worst moment.",
    slug: "why-mailchimp-banned-gun-store",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Email Strategy": "#F5C124",
  Automation: "#F5C124",
  Compliance: "#F5C124",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p
          className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4"
          style={{ color: "#F5C124" }}
        >
          Insights &amp; Strategy
        </p>
        <h1
          className="font-barlow text-5xl md:text-6xl font-black mb-4"
          style={{ color: "#1E2419" }}
        >
          Tactical Email Insights
        </h1>
        <p className="font-inter text-gray-400 mb-16 text-lg max-w-xl mx-auto">
          Strategy, compliance, and execution — written exclusively for the firearms and tactical industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Thumbnail */}
              <div
                className="h-48 flex items-center justify-center"
                style={{ backgroundColor: "#1E2419" }}
              >
                <span
                  className="font-rajdhani text-2xl font-bold tracking-widest uppercase"
                  style={{ color: "#F5C124" }}
                >
                  Email-Vmail
                </span>
              </div>

              <div className="p-6">
                <span
                  className="font-barlow text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: CATEGORY_COLORS[post.category],
                    color: "#1E2419",
                  }}
                >
                  {post.category}
                </span>

                <h2
                  className="font-barlow text-xl font-bold mt-4 mb-2 leading-snug"
                  style={{ color: "#1E2419" }}
                >
                  {post.title}
                </h2>

                <p className="font-inter text-sm text-gray-500 mb-5 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-inter text-xs text-gray-400">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-barlow text-sm font-bold transition-opacity hover:opacity-70"
                    style={{ color: "#1E2419" }}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
