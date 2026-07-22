"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Lead {
  _id: string;
  fullName: string;
  businessName: string;
  websiteUrl: string;
  email: string;
  phone: string;
  businessType: string;
  annualRevenue: string;
  listSize: string;
  ecommercePlatform: string;
  emailProvider: string;
  suspended: string;
  challenge: string;
  accessConsent: string;
  submittedAt: string;
  read: boolean;
  name?: string;
  brandUrl?: string;
  barriers?: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function Field({ label, value, link }: { label: string; value?: string; link?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(45,58,40,0.4)" }}>{label}</p>
      {link ? (
        <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="font-inter text-sm hover:underline break-all" style={{ color: "#2D3A28" }}>{value}</a>
      ) : (
        <p className="font-inter text-sm leading-relaxed break-words" style={{ color: "#2D3A28" }}>{value}</p>
      )}
    </div>
  );
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetch("/api/admin/leads")
      .then(r => { if (r.status === 401) router.push("/admin/login"); return r.json(); })
      .then(d => { setLeads(d.leads ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  async function markRead(id: string) {
    await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setLeads(prev => prev.map(l => l._id === id ? { ...l, read: true } : l));
  }

  const filtered = leads.filter(l => filter === "all" ? true : filter === "unread" ? !l.read : l.read);
  const unread = leads.filter(l => !l.read).length;
  const displayName = (l: Lead) => l.fullName || l.name || "—";
  const displayUrl  = (l: Lead) => l.websiteUrl || l.brandUrl || "—";

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-2xl font-black flex items-center gap-3" style={{ color: "#2D3A28" }}>
            Audit Leads
            {unread > 0 && (
              <span className="font-barlow text-xs font-black px-2.5 py-1 rounded-full" style={{ backgroundColor: "#F5C124", color: "#2D3A28" }}>
                {unread} new
              </span>
            )}
          </h1>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(45,58,40,0.5)" }}>{leads.length} total submissions</p>
        </div>
        {/* Filter pills */}
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="font-barlow text-xs font-bold px-3 py-1.5 rounded-lg capitalize transition-all"
              style={{
                backgroundColor: filter === f ? "#2D3A28" : "transparent",
                color: filter === f ? "#F5C124" : "rgba(45,58,40,0.5)",
                border: "1.5px solid",
                borderColor: filter === f ? "#2D3A28" : "rgba(45,58,40,0.2)",
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(45,58,40,0.06)" }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border-2 p-12 text-center bg-white" style={{ borderColor: "rgba(245,193,36,0.3)" }}>
          <p className="font-barlow text-lg font-bold" style={{ color: "rgba(45,58,40,0.4)" }}>No leads found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(lead => (
            <div key={lead._id} className="rounded-2xl border-2 overflow-hidden bg-white transition-all"
              style={{ borderColor: lead.read ? "rgba(45,58,40,0.1)" : "#F5C124" }}>
              <button
                className="w-full text-left px-6 py-4 flex items-center gap-4"
                onClick={() => { setExpanded(expanded === lead._id ? null : lead._id); if (!lead.read) markRead(lead._id); }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: lead.read ? "transparent" : "#F5C124" }} />
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                  <span className="font-barlow text-sm font-black truncate" style={{ color: "#2D3A28" }}>{displayName(lead)}</span>
                  <span className="font-inter text-sm truncate" style={{ color: "rgba(45,58,40,0.7)" }}>{lead.email}</span>
                  <span className="font-inter text-sm truncate" style={{ color: "rgba(45,58,40,0.6)" }}>{lead.businessName || displayUrl(lead)}</span>
                  <span className="font-barlow text-xs font-bold px-2 py-0.5 rounded-full self-start sm:self-center w-fit" style={{ backgroundColor: "rgba(245,193,36,0.15)", color: "#2D3A28" }}>{lead.annualRevenue}</span>
                </div>
                <span className="font-inter text-xs flex-shrink-0 hidden sm:block" style={{ color: "rgba(45,58,40,0.4)" }}>{formatDate(lead.submittedAt)}</span>
                <svg className="w-4 h-4 flex-shrink-0 transition-transform" style={{ color: "rgba(45,58,40,0.4)", transform: expanded === lead._id ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>

              {expanded === lead._id && (
                <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: "rgba(45,58,40,0.1)" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Full Name"               value={displayName(lead)} />
                    <Field label="Business Name"           value={lead.businessName} />
                    <Field label="Email"                   value={lead.email} />
                    <Field label="Phone / WhatsApp"        value={lead.phone} />
                    <Field label="Website"                 value={displayUrl(lead)} link />
                    <Field label="Business Type"           value={lead.businessType} />
                    <Field label="Annual Revenue"          value={lead.annualRevenue} />
                    <Field label="Email List Size"         value={lead.listSize} />
                    <Field label="Ecommerce Platform"      value={lead.ecommercePlatform} />
                    <Field label="Email / SMS Provider"    value={lead.emailProvider} />
                    <Field label="ESP Access Consent"      value={lead.accessConsent} />
                    <Field label="Submitted"               value={formatDate(lead.submittedAt)} />
                  </div>
                  <div className="mt-4 space-y-3">
                    <Field label="Account Suspended / Restricted?" value={lead.suspended} />
                    <Field label="Biggest Email Challenge"         value={lead.challenge || lead.barriers} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
