import Link from "next/link";
import clientPromise from "@/lib/mongodb";

export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const client = await clientPromise;
    const posts = await client.db("emailvmail").collection("blog_posts")
      .find({ status: "published" })
      .sort({ publishedAt: -1 })
      .toArray();
    return posts.map(p => ({ ...p, _id: p._id.toString(), publishedAt: p.publishedAt?.toISOString() ?? p.createdAt?.toISOString() ?? "" })) as Post[];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-barlow text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#F5C124" }}>
          Insights &amp; Strategy
        </p>
        <h1 className="font-barlow text-5xl md:text-6xl font-black mb-4" style={{ color: "#2D3A28" }}>
          Tactical Email Insights
        </h1>
        <p className="font-inter mb-16 text-lg max-w-xl mx-auto" style={{ color: "#2D3A28" }}>
          Strategy, compliance, and execution — written exclusively for the firearms and tactical industry.
        </p>

        {posts.length === 0 ? (
          <div className="py-20">
            <p className="font-barlow text-xl font-bold" style={{ color: "rgba(45,58,40,0.35)" }}>
              Articles coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {posts.map(post => (
              <article key={post._id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden" style={{ backgroundColor: "#2D3A28" }}>
                  {post.featuredImage ? (
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-rajdhani text-2xl font-bold tracking-widest uppercase" style={{ color: "#F5C124" }}>Email-Vmail</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="font-barlow text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
                    {post.category}
                  </span>
                  <h2 className="font-barlow text-xl font-bold mt-4 mb-2 leading-snug" style={{ color: "#2D3A28" }}>
                    {post.title}
                  </h2>
                  <p className="font-inter text-sm mb-5 leading-relaxed" style={{ color: "rgba(45,58,40,0.7)" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.45)" }}>{formatDate(post.publishedAt)}</span>
                    <Link href={`/blog/${post.slug}`} className="font-barlow text-sm font-bold transition-opacity hover:opacity-70" style={{ color: "#2D3A28" }}>
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
