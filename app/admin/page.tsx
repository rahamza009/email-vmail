"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  totalLeads: number;
  unreadLeads: number;
  totalPosts: number;
  publishedPosts: number;
}

const MODULES = [
  {
    href: "/admin/leads",
    title: "Audit Leads",
    desc: "Review incoming audit requests and lead details",
    color: "#F5C124",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" /></svg>
    ),
  },
  {
    href: "/admin/blog",
    title: "Blog",
    desc: "Create, edit and publish blog articles",
    color: "#4ade80",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
    ),
  },
  {
    href: "/admin/content",
    title: "Home Content",
    desc: "Edit hero, problem, services, and pricing sections",
    color: "#60a5fa",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
    ),
  },
  {
    href: "/admin/services",
    title: "Service Pages",
    desc: "Update content on firearms, knives, and tactical gear pages",
    color: "#f472b6",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
  },
  {
    href: "/admin/case-studies",
    title: "Case Studies",
    desc: "Manage client case studies and results stories",
    color: "#34d399",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
  },
  {
    href: "/admin/faq",
    title: "FAQ",
    desc: "Edit frequently asked questions shown on the home page",
    color: "#fb923c",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  {
    href: "/admin/settings",
    title: "Settings",
    desc: "CTA URLs, Calendly link, tracking IDs, and deploy",
    color: "#a78bfa",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, unreadLeads: 0, totalPosts: 0, publishedPosts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [leadsRes, blogRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/blog"),
      ]);
      if (leadsRes.status === 401) { router.push("/admin/login"); return; }
      const leadsData = leadsRes.ok ? await leadsRes.json() : { leads: [] };
      const blogData = blogRes.ok ? await blogRes.json() : { posts: [] };
      const leads = leadsData.leads ?? [];
      const posts = blogData.posts ?? [];
      setStats({
        totalLeads: leads.length,
        unreadLeads: leads.filter((l: { read: boolean }) => !l.read).length,
        totalPosts: posts.length,
        publishedPosts: posts.filter((p: { status: string }) => p.status === "published").length,
      });
      setLoading(false);
    }
    load();
  }, [router]);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="font-barlow text-2xl font-black" style={{ color: "#2D3A28" }}>Dashboard</h1>
        <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.55)" }}>Welcome back. Here's an overview of your site.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Leads", value: stats.totalLeads, sub: `${stats.unreadLeads} unread` },
          { label: "Unread Leads", value: stats.unreadLeads, sub: "need attention", highlight: stats.unreadLeads > 0 },
          { label: "Blog Posts", value: stats.totalPosts, sub: "total articles" },
          { label: "Published", value: stats.publishedPosts, sub: "live on site" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 bg-white border" style={{ borderColor: s.highlight ? "#F5C124" : "rgba(45,58,40,0.1)" }}>
            {loading ? (
              <div className="h-8 w-12 rounded-lg animate-pulse mb-2" style={{ backgroundColor: "rgba(45,58,40,0.08)" }} />
            ) : (
              <p className="font-barlow text-3xl font-black" style={{ color: s.highlight ? "#F5C124" : "#2D3A28" }}>{s.value}</p>
            )}
            <p className="font-barlow text-sm font-bold mt-1" style={{ color: "#2D3A28" }}>{s.label}</p>
            <p className="font-inter text-xs mt-0.5" style={{ color: "rgba(45,58,40,0.45)" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Module Cards */}
      <h2 className="font-barlow text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(45,58,40,0.45)" }}>Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {MODULES.map(m => (
          <Link key={m.href} href={m.href}
            className="group bg-white rounded-2xl border p-6 flex items-start gap-4 hover:shadow-md transition-all"
            style={{ borderColor: "rgba(45,58,40,0.1)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ backgroundColor: `${m.color}18`, color: m.color }}>
              {m.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-barlow text-base font-black" style={{ color: "#2D3A28" }}>{m.title}</p>
              <p className="font-inter text-sm mt-1 leading-snug" style={{ color: "rgba(45,58,40,0.55)" }}>{m.desc}</p>
            </div>
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-1" style={{ color: "rgba(45,58,40,0.25)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-8 rounded-2xl bg-white border p-5" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
        <p className="font-barlow text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(45,58,40,0.45)" }}>Quick Links</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "New Blog Post", href: "/admin/blog/new" },
            { label: "View Leads", href: "/admin/leads" },
            { label: "Live Site", href: "/", external: true },
            { label: "Audit Page", href: "/audit", external: true },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
              className="font-barlow text-sm font-bold px-4 py-2 rounded-xl border-2 transition-colors hover:border-[#F5C124]"
              style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
