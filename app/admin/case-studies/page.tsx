"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  _id: string; title: string; slug: string; category: string;
  status: "draft" | "published"; isActive: boolean;
  createdAt: string; displayOrder: number; tags: string[]; excerpt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isCaseStudy(p: Post) {
  return p.category === "Case Study" || (Array.isArray(p.tags) && p.tags.includes("case study"));
}

export default function CaseStudiesPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetch("/api/admin/blog")
      .then(r => { if (r.status === 401) { router.push("/admin/login"); throw new Error(); } return r.json(); })
      .then(d => {
        setPosts((d.posts ?? []).filter(isCaseStudy));
        setLoading(false);
      }).catch(() => setLoading(false));
  }, [router]);

  async function patch(id: string, updates: Partial<Post>) {
    await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    setPosts(prev => prev.map(p => p._id === id ? { ...p, ...updates } : p));
  }

  async function deletePost(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    setPosts(prev => prev.filter(p => p._id !== id));
    setDeleting(null);
  }

  const visible = posts.filter(p =>
    filter === "all" ? true : filter === "published" ? p.status === "published" : p.status === "draft"
  );
  const published = posts.filter(p => p.status === "published").length;
  const active = posts.filter(p => p.isActive).length;

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>Case Studies</h1>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.5)" }}>
            {posts.length} case studies &middot; {published} published &middot; {active} visible on site
          </p>
        </div>
        <Link href="/admin/case-studies/new"
          className="font-barlow text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 flex items-center gap-2"
          style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          New Case Study
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 bg-white rounded-xl border mb-5 w-fit" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
        {(["all", "published", "draft"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="font-barlow text-sm font-bold px-4 py-1.5 rounded-lg capitalize transition-all"
            style={{ backgroundColor: filter === f ? "#2D3A28" : "transparent", color: filter === f ? "#F5C124" : "rgba(45,58,40,0.5)" }}>
            {f} {f === "all" ? `(${posts.length})` : f === "published" ? `(${published})` : `(${posts.length - published})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} />)}</div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border-2 p-16 text-center bg-white" style={{ borderColor: "rgba(245,193,36,0.3)" }}>
          <p className="font-barlow text-xl font-bold mb-2" style={{ color: "rgba(45,58,40,0.4)" }}>No case studies yet</p>
          <p className="font-inter text-sm mb-6" style={{ color: "rgba(45,58,40,0.35)" }}>Create your first case study to showcase client results.</p>
          <Link href="/admin/case-studies/new" className="font-barlow text-sm font-bold px-5 py-2.5 rounded-xl inline-block" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>
            Create First Case Study
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b" style={{ borderColor: "rgba(45,58,40,0.08)", backgroundColor: "#F9FAFB" }}>
            <span className="col-span-4 font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>Title</span>
            <span className="col-span-3 font-barlow text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>Status</span>
            <span className="col-span-2 font-barlow text-xs font-bold tracking-widets uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>Visible</span>
            <span className="col-span-1 font-barlow text-xs font-bold tracking-widets uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>Order</span>
            <span className="col-span-1 font-barlow text-xs font-bold tracking-widets uppercase" style={{ color: "rgba(45,58,40,0.45)" }}>Date</span>
            <span className="col-span-1" />
          </div>

          {visible.map((post, idx) => (
            <div key={post._id}
              className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 items-center ${idx < visible.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "rgba(45,58,40,0.08)", opacity: !post.isActive ? 0.55 : 1 }}>

              <div className="sm:col-span-4">
                <p className="font-barlow text-sm font-bold leading-snug" style={{ color: "#2D3A28" }}>{post.title}</p>
                <p className="font-inter text-xs mt-0.5 line-clamp-1" style={{ color: "rgba(45,58,40,0.45)" }}>{post.excerpt || `/blog/${post.slug}`}</p>
              </div>

              <div className="sm:col-span-3">
                <button onClick={() => patch(post._id, { status: post.status === "published" ? "draft" : "published" })}
                  className="font-barlow text-xs font-bold px-2.5 py-1 rounded-full transition-all"
                  style={{
                    backgroundColor: post.status === "published" ? "rgba(74,222,128,0.15)" : "rgba(245,193,36,0.15)",
                    color: post.status === "published" ? "#16a34a" : "#92610a",
                  }}>
                  {post.status === "published" ? "● Published" : "○ Draft"}
                </button>
              </div>

              <div className="sm:col-span-2 flex items-center">
                <button onClick={() => patch(post._id, { isActive: !post.isActive })}
                  title={post.isActive ? "Showing — click to hide" : "Hidden — click to show"}
                  className="relative inline-flex items-center gap-2 font-barlow text-xs font-bold">
                  <span className="relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 transition-colors duration-200"
                    style={{ backgroundColor: post.isActive ? "#2D3A28" : "rgba(45,58,40,0.15)", borderColor: post.isActive ? "#2D3A28" : "rgba(45,58,40,0.2)" }}>
                    <span className="pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5"
                      style={{ marginLeft: post.isActive ? "18px" : "2px" }} />
                  </span>
                  <span style={{ color: post.isActive ? "#16a34a" : "rgba(45,58,40,0.4)" }}>
                    {post.isActive ? "Active" : "Hidden"}
                  </span>
                </button>
              </div>

              <span className="sm:col-span-1 font-barlow text-xs font-bold" style={{ color: "rgba(45,58,40,0.4)" }}>#{post.displayOrder}</span>
              <span className="sm:col-span-1 font-inter text-xs" style={{ color: "rgba(45,58,40,0.45)" }}>{formatDate(post.createdAt)}</span>

              <div className="sm:col-span-1 flex gap-1 justify-end">
                <Link href={`/admin/case-studies/${post._id}`}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Edit" style={{ color: "#2D3A28" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </Link>
                <button onClick={() => deletePost(post._id, post.title)} disabled={deleting === post._id}
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40" title="Delete" style={{ color: "#e11d48" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
