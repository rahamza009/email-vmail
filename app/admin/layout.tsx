"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, memo } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
  )},
  { href: "/admin/leads", label: "Leads", exact: false, badge: true, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" /></svg>
  )},
  { href: "/admin/blog", label: "Blog", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
  )},
  { href: "/admin/case-studies", label: "Case Studies", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  )},
  { href: "/admin/content", label: "Home Content", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
  )},
  { href: "/admin/services", label: "Service Pages", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  )},
  { href: "/admin/faq", label: "FAQ", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  )},
  { href: "/admin/about", label: "About Us", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  )},
  { href: "/admin/author", label: "Author Page", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  )},
  { href: "/admin/settings", label: "Settings", exact: false, icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  )},
];

interface SidebarProps {
  pathname: string;
  unread: number;
  onClose: () => void;
  onLogout: () => void;
}

const Sidebar = memo(function Sidebar({ pathname, unread, onClose, onLogout }: SidebarProps) {
  function isActive(item: { href: string; exact: boolean }) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href) && !(item.href === "/admin" && pathname !== "/admin");
  }

  return (
    <aside className="flex flex-col h-full" style={{ backgroundColor: "#1a2316" }}>
      <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(245,193,36,0.15)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F5C124" }}>
            <span className="font-barlow text-xs font-black" style={{ color: "#1a2316" }}>EV</span>
          </div>
          <div>
            <p className="font-barlow text-sm font-black text-white leading-none">Email-Vmail</p>
            <p className="font-inter text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="font-barlow text-xs font-bold tracking-widest uppercase px-3 mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Navigation</p>
        {NAV.map(item => {
          const active = isActive(item);
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{ backgroundColor: active ? "rgba(245,193,36,0.12)" : "transparent", color: active ? "#F5C124" : "rgba(255,255,255,0.6)" }}>
              <span style={{ color: active ? "#F5C124" : "rgba(255,255,255,0.4)" }}>{item.icon}</span>
              <span className="font-barlow text-sm font-bold flex-1">{item.label}</span>
              {item.badge && unread > 0 && (
                <span className="font-barlow text-xs font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#F5C124", color: "#1a2316" }}>{unread}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(245,193,36,0.12)" }}>
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          <span className="font-inter text-xs">View Live Site</span>
        </a>
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span className="font-inter text-xs">Sign Out</span>
        </button>
      </div>
    </aside>
  );
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/admin/leads")
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setUnread((d.leads ?? []).filter((l: { read: boolean }) => !l.read).length))
      .catch(() => {});
  }, [isLoginPage]);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  // Login page: plain wrapper, no sidebar
  if (isLoginPage) {
    return <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB" }}>{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#F0F2EE" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-60 flex-shrink-0">
        <Sidebar pathname={pathname} unread={unread} onClose={() => {}} onLogout={logout} />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-60 z-50">
            <Sidebar pathname={pathname} unread={unread} onClose={() => setMobileOpen(false)} onLogout={logout} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-white" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg" style={{ color: "#2D3A28" }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="font-barlow text-sm font-black" style={{ color: "#2D3A28" }}>Email-Vmail Admin</span>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
