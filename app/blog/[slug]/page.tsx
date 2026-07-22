import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import clientPromise from "@/lib/mongodb";

export const revalidate = 60;

interface Post {
  title: string; slug: string; category: string; content: string;
  excerpt: string; featuredImage: string; seoTitle: string; seoDescription: string;
  publishedAt: string; status: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const client = await clientPromise;
    const post = await client.db("emailvmail").collection("blog_posts").findOne({ slug, status: "published" });
    if (!post) return null;
    return { ...post, _id: undefined, publishedAt: post.publishedAt?.toISOString() ?? "" } as unknown as Post;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, type: "article", images: post.featuredImage ? [post.featuredImage] : [] },
  };
}

function renderMarkdown(md: string) {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="font-barlow text-2xl font-black mt-8 mb-3" style="color:#2D3A28">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="font-barlow text-xl font-bold mt-6 mb-2" style="color:#2D3A28">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^([^<\n].+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>')
    .replace(/\n\n/g, '');
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const formatted = new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <main className="min-h-screen bg-white pt-24 pb-24">
      {/* Hero */}
      <div className="px-6 py-12" style={{ backgroundColor: "#2D3A28" }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-barlow text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full inline-block mb-5" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
            {post.category}
          </span>
          <h1 className="font-barlow text-3xl md:text-4xl font-black text-white leading-snug mb-4">{post.title}</h1>
          <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{formatted}</p>
        </div>
      </div>

      {/* Featured image */}
      {post.featuredImage && (
        <div className="w-full max-w-3xl mx-auto px-6 -mt-1">
          <img src={post.featuredImage} alt={post.title} className="w-full h-64 object-cover rounded-b-2xl" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 mt-10">
        <p className="font-inter text-lg leading-relaxed mb-8 font-medium" style={{ color: "rgba(45,58,40,0.75)" }}>{post.excerpt}</p>
        <div className="font-inter text-base leading-relaxed" style={{ color: "rgba(45,58,40,0.85)" }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </div>

      {/* Back */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pt-8 border-t" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
        <Link href="/blog" className="font-barlow text-sm font-bold flex items-center gap-2 transition-opacity hover:opacity-70" style={{ color: "#2D3A28" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
