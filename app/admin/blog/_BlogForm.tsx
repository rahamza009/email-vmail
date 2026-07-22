"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface BlogFormData {
  title: string; slug: string; category: string; tags: string[];
  excerpt: string; content: string; coverImage: string; mainImage: string;
  keywords: string; publishDate: string; displayOrder: number;
  seoTitle: string; seoDescription: string;
  robotsIndex: boolean; robotsFollow: boolean;
  ogTitle: string; ogDescription: string; ogType: string;
  status: string; isActive: boolean;
}

export const EMPTY_FORM: BlogFormData = {
  title: "", slug: "", category: "Email Strategy", tags: [],
  excerpt: "", content: "", coverImage: "", mainImage: "",
  keywords: "", publishDate: "", displayOrder: 99,
  seoTitle: "", seoDescription: "",
  robotsIndex: true, robotsFollow: true,
  ogTitle: "", ogDescription: "", ogType: "article",
  status: "draft", isActive: true,
};

export const DEFAULT_CATEGORIES = [
  "Email Strategy", "Automation", "Compliance",
  "Case Study", "Industry News", "Tips & Tactics",
];

export function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-barlow text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(45,58,40,0.5)" }}>{label}</label>
      {children}
    </div>
  );
}

const iCls = "w-full font-inter text-sm px-4 py-3 rounded-xl border-2 outline-none transition-colors focus:border-[#F5C124]";
const iSty = { borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" };

export function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iSty} />;
}
export function TextArea({ value, onChange, rows = 3, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={`${iCls} resize-y`} style={iSty} />;
}

// ── Advanced Rich Text Editor ────────────────────────────────────────────────
export function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [showLinkBox, setShowLinkBox] = useState(false);
  const [showImgBox, setShowImgBox] = useState(false);
  const [linkHref, setLinkHref] = useState("https://");
  const [imgSrc, setImgSrc] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = value || "";
    document.execCommand("styleWithCSS", false, "true");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sync() {
    const html = editorRef.current?.innerHTML ?? "";
    onChange(html);
    const text = editorRef.current?.innerText ?? "";
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
  }

  function exec(cmd: string, val?: string) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val ?? "");
    sync();
  }

  function saveRange() {
    const sel = window.getSelection();
    if (sel?.rangeCount) savedRangeRef.current = sel.getRangeAt(0).cloneRange();
  }

  function restoreRange() {
    const r = savedRangeRef.current;
    if (!r) return;
    const sel = window.getSelection();
    if (sel) { sel.removeAllRanges(); sel.addRange(r); }
  }

  function insertLink() {
    restoreRange();
    const sel = window.getSelection();
    const text = sel?.toString() || linkHref;
    exec("insertHTML", `<a href="${linkHref}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline">${text}</a>`);
    setShowLinkBox(false); setLinkHref("https://");
  }

  function insertImage(src: string) {
    restoreRange();
    exec("insertHTML", `<img src="${src}" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0" />`);
    setShowImgBox(false); setImgSrc("");
  }

  function handleImgFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setImgUploading(true);
    const reader = new FileReader();
    reader.onload = () => { insertImage(reader.result as string); setImgUploading(false); };
    reader.readAsDataURL(file);
  }

  const ToolBtn = ({ title, onClick, children, active }: { title: string; onClick: () => void; children: React.ReactNode; active?: boolean }) => (
    <button type="button" title={title} onMouseDown={e => { e.preventDefault(); onClick(); }}
      className="h-7 min-w-[28px] px-1.5 flex items-center justify-center rounded text-xs font-bold transition-colors hover:bg-white"
      style={{ color: active ? "#F5C124" : "#2D3A28", backgroundColor: active ? "#2D3A28" : "transparent" }}>
      {children}
    </button>
  );

  const Sep = () => <div className="w-px h-5 mx-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(45,58,40,0.12)" }} />;

  return (
    <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: "rgba(45,58,40,0.15)" }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b sticky top-0 z-10" style={{ borderColor: "rgba(45,58,40,0.1)", backgroundColor: "#F5F6F4" }}>
        {/* Undo / Redo */}
        <ToolBtn title="Undo" onClick={() => exec("undo")}>↩</ToolBtn>
        <ToolBtn title="Redo" onClick={() => exec("redo")}>↪</ToolBtn>
        <Sep />

        {/* Headings */}
        {(["H1","H2","H3","H4","H5","H6"] as const).map(h => (
          <ToolBtn key={h} title={`Heading ${h[1]}`} onClick={() => exec("formatBlock", h)}>{h}</ToolBtn>
        ))}
        <ToolBtn title="Paragraph" onClick={() => exec("formatBlock", "P")}>¶</ToolBtn>
        <Sep />

        {/* Font size */}
        <select title="Font Size" onMouseDown={e => e.stopPropagation()}
          onChange={e => { exec("fontSize", e.target.value); e.target.value = ""; }}
          className="h-7 text-xs rounded border outline-none px-1 cursor-pointer"
          style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28", backgroundColor: "#F5F6F4" }}>
          <option value="">Size</option>
          <option value="1">10px</option>
          <option value="2">13px</option>
          <option value="3">16px</option>
          <option value="4">18px</option>
          <option value="5">24px</option>
          <option value="6">32px</option>
          <option value="7">48px</option>
        </select>
        <Sep />

        {/* Style */}
        <ToolBtn title="Bold" onClick={() => exec("bold")}><strong>B</strong></ToolBtn>
        <ToolBtn title="Italic" onClick={() => exec("italic")}><em>I</em></ToolBtn>
        <ToolBtn title="Underline" onClick={() => exec("underline")}><u>U</u></ToolBtn>
        <ToolBtn title="Strikethrough" onClick={() => exec("strikeThrough")}><s>S</s></ToolBtn>
        <ToolBtn title="Inline code" onClick={() => exec("insertHTML", '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em">code</code>')}>{"</>"}</ToolBtn>
        <Sep />

        {/* Text color */}
        <label title="Text Color" className="flex items-center gap-1 h-7 px-1.5 rounded cursor-pointer hover:bg-white text-xs font-bold" style={{ color: "#2D3A28" }}>
          A
          <input type="color" defaultValue="#2D3A28" onInput={e => exec("foreColor", (e.target as HTMLInputElement).value)} className="w-4 h-4 cursor-pointer rounded border-0 p-0" />
        </label>

        {/* Highlight color */}
        <label title="Highlight Color" className="flex items-center gap-1 h-7 px-1.5 rounded cursor-pointer hover:bg-white text-xs font-bold" style={{ color: "#2D3A28" }}>
          ▌
          <input type="color" defaultValue="#F5C124" onInput={e => exec("hiliteColor", (e.target as HTMLInputElement).value)} className="w-4 h-4 cursor-pointer rounded border-0 p-0" />
        </label>
        <Sep />

        {/* Alignment */}
        <ToolBtn title="Align Left" onClick={() => exec("justifyLeft")}>⬅</ToolBtn>
        <ToolBtn title="Center" onClick={() => exec("justifyCenter")}>⬛</ToolBtn>
        <ToolBtn title="Align Right" onClick={() => exec("justifyRight")}>➡</ToolBtn>
        <ToolBtn title="Justify" onClick={() => exec("justifyFull")}>☰</ToolBtn>
        <Sep />

        {/* Lists */}
        <ToolBtn title="Bullet List" onClick={() => exec("insertUnorderedList")}>• List</ToolBtn>
        <ToolBtn title="Numbered List" onClick={() => exec("insertOrderedList")}>1. List</ToolBtn>
        <ToolBtn title="Indent" onClick={() => exec("indent")}>&nbsp;→</ToolBtn>
        <ToolBtn title="Outdent" onClick={() => exec("outdent")}>←</ToolBtn>
        <Sep />

        {/* Blockquote */}
        <ToolBtn title="Blockquote" onClick={() => exec("formatBlock", "BLOCKQUOTE")}>" Quote</ToolBtn>
        <ToolBtn title="Horizontal Rule" onClick={() => exec("insertHTML", "<hr style='border:1px solid #e5e7eb;margin:1rem 0' />")}>───</ToolBtn>
        <Sep />

        {/* Link */}
        <ToolBtn title="Insert Link" onClick={() => { saveRange(); setShowLinkBox(v => !v); setShowImgBox(false); }}>🔗 Link</ToolBtn>

        {/* Image */}
        <ToolBtn title="Insert Image" onClick={() => { saveRange(); setShowImgBox(v => !v); setShowLinkBox(false); }}>🖼 Image</ToolBtn>
        <Sep />

        {/* Clear */}
        <ToolBtn title="Clear Formatting" onClick={() => exec("removeFormat")}>✕ Clear</ToolBtn>
      </div>

      {/* Link dialog */}
      {showLinkBox && (
        <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "rgba(45,58,40,0.1)", backgroundColor: "#FEFEFE" }}>
          <span className="font-barlow text-xs font-bold" style={{ color: "#2D3A28" }}>URL:</span>
          <input value={linkHref} onChange={e => setLinkHref(e.target.value)} onKeyDown={e => e.key === "Enter" && insertLink()}
            className="flex-1 font-inter text-xs px-3 py-1.5 rounded-lg border-2 outline-none focus:border-[#F5C124]"
            style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} autoFocus />
          <button type="button" onClick={insertLink}
            className="font-barlow text-xs font-bold px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>Insert</button>
          <button type="button" onClick={() => setShowLinkBox(false)}
            className="font-barlow text-xs font-bold px-3 py-1.5 rounded-lg border" style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>Cancel</button>
        </div>
      )}

      {/* Image dialog */}
      {showImgBox && (
        <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "rgba(45,58,40,0.1)", backgroundColor: "#FEFEFE" }}>
          <span className="font-barlow text-xs font-bold" style={{ color: "#2D3A28" }}>URL:</span>
          <input value={imgSrc} onChange={e => setImgSrc(e.target.value)} onKeyDown={e => e.key === "Enter" && insertImage(imgSrc)}
            placeholder="https://... or upload below"
            className="flex-1 font-inter text-xs px-3 py-1.5 rounded-lg border-2 outline-none focus:border-[#F5C124]"
            style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} autoFocus />
          <button type="button" onClick={() => insertImage(imgSrc)}
            className="font-barlow text-xs font-bold px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>Insert URL</button>
          <button type="button" onClick={() => imgInputRef.current?.click()} disabled={imgUploading}
            className="font-barlow text-xs font-bold px-3 py-1.5 rounded-lg border" style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
            {imgUploading ? "…" : "Upload File"}
          </button>
          <button type="button" onClick={() => setShowImgBox(false)}
            className="font-barlow text-xs font-bold px-2 py-1.5 rounded-lg" style={{ color: "rgba(45,58,40,0.4)" }}>✕</button>
          <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgFile} />
        </div>
      )}

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={() => { saveRange(); sync(); }}
        className="outline-none overflow-y-auto font-inter text-sm"
        style={{
          minHeight: 420, maxHeight: 700, padding: "1.25rem 1.5rem",
          color: "#2D3A28", lineHeight: 1.8,
        }}
        data-placeholder="Start writing your blog post…"
      />

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t" style={{ borderColor: "rgba(45,58,40,0.08)", backgroundColor: "#F9FAFB" }}>
        <span className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.4)" }}>{wordCount} words</span>
        <span className="font-inter text-xs" style={{ color: "rgba(45,58,40,0.4)" }}>HTML stored · renders on blog page</span>
      </div>

      <style>{`
        [contenteditable]:empty:before { content: attr(data-placeholder); color: rgba(45,58,40,0.3); pointer-events: none; }
        [contenteditable] h1 { font-size:2rem; font-weight:900; margin:1.5rem 0 0.75rem; font-family:var(--font-barlow); }
        [contenteditable] h2 { font-size:1.5rem; font-weight:900; margin:1.25rem 0 0.6rem; font-family:var(--font-barlow); }
        [contenteditable] h3 { font-size:1.25rem; font-weight:800; margin:1rem 0 0.5rem; font-family:var(--font-barlow); }
        [contenteditable] h4 { font-size:1.1rem; font-weight:700; margin:0.9rem 0 0.4rem; }
        [contenteditable] h5 { font-size:1rem; font-weight:700; margin:0.75rem 0 0.35rem; }
        [contenteditable] h6 { font-size:0.9rem; font-weight:700; margin:0.7rem 0 0.3rem; }
        [contenteditable] blockquote { border-left:4px solid #F5C124; padding-left:1rem; color:#555; margin:1rem 0; font-style:italic; }
        [contenteditable] ul { list-style:disc; padding-left:1.5rem; margin:0.75rem 0; }
        [contenteditable] ol { list-style:decimal; padding-left:1.5rem; margin:0.75rem 0; }
        [contenteditable] li { margin-bottom:0.3rem; }
        [contenteditable] hr { border:1px solid #e5e7eb; margin:1rem 0; }
        [contenteditable] a { color:#2563eb; text-decoration:underline; }
        [contenteditable] img { max-width:100%; height:auto; border-radius:8px; margin:8px 0; }
        [contenteditable] code { background:#f1f5f9; padding:2px 6px; border-radius:4px; font-family:monospace; font-size:0.9em; }
        [contenteditable] p { margin-bottom:0.75rem; }
      `}</style>
    </div>
  );
}

// ── Image uploader (for cover/main) ──────────────────────────────────────────
export function ImageUploader({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => { onChange(reader.result as string); setUploading(false); };
    reader.readAsDataURL(file);
  }, [onChange]);
  return (
    <div>
      <label className="block font-barlow text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(45,58,40,0.5)" }}>{label}</label>
      <div className="flex gap-2 mb-2">
        <input value={value.startsWith("data:") ? "(uploaded file)" : value} onChange={e => onChange(e.target.value)}
          placeholder="Paste image URL or upload…"
          className="flex-1 font-inter text-sm px-3 py-2.5 rounded-xl border-2 outline-none focus:border-[#F5C124]"
          style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="font-barlow text-xs font-bold px-4 py-2 rounded-xl border-2 hover:border-[#F5C124] transition-colors whitespace-nowrap disabled:opacity-50"
          style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>
          {uploading ? "…" : "Upload"}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {value && <img src={value} alt="" className="w-full h-36 object-cover rounded-xl border" style={{ borderColor: "rgba(45,58,40,0.1)" }} />}
    </div>
  );
}

// ── Tag selector ─────────────────────────────────────────────────────────────
const PRESET_TAGS = ["firearms","ammo","FFL","email marketing","klaviyo","automation","compliance","ESP","2A","tactical","edc","self-defense","knives","gun store","deliverability","case study"];

export function TagSelector({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState("");
  function add(tag: string) { const t = tag.trim().toLowerCase(); if (t && !tags.includes(t)) onChange([...tags, t]); setInput(""); }
  function remove(tag: string) { onChange(tags.filter(t => t !== tag)); }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(input); }
    if (e.key === "Backspace" && !input && tags.length) remove(tags[tags.length - 1]);
  }
  const suggestions = PRESET_TAGS.filter(t => !tags.includes(t) && (!input || t.includes(input.toLowerCase())));
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 min-h-[42px] px-3 py-2 rounded-xl border-2 focus-within:border-[#F5C124] transition-colors" style={{ borderColor: "rgba(45,58,40,0.15)" }}>
        {tags.map(t => (
          <span key={t} className="flex items-center gap-1 font-inter text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(245,193,36,0.18)", color: "#2D3A28" }}>
            {t}<button type="button" onClick={() => remove(t)} className="opacity-50 hover:opacity-100 leading-none">×</button>
          </span>
        ))}
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
          placeholder={tags.length ? "" : "Type a tag and press Enter…"}
          className="font-inter text-sm outline-none flex-1 min-w-[120px] bg-transparent" style={{ color: "#2D3A28" }} />
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {suggestions.slice(0, 10).map(t => (
            <button key={t} type="button" onClick={() => add(t)}
              className="font-inter text-xs font-semibold px-2.5 py-1 rounded-full border hover:border-[#F5C124] transition-colors"
              style={{ borderColor: "rgba(45,58,40,0.15)", color: "rgba(45,58,40,0.6)" }}>+ {t}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Category selector ────────────────────────────────────────────────────────
export function CategorySelector({ value, onChange, categories, onAddCategory }:
  { value: string; onChange: (v: string) => void; categories: string[]; onAddCategory: (c: string) => void }) {
  const [adding, setAdding] = useState(false);
  const [newCat, setNewCat] = useState("");
  function confirm() { const c = newCat.trim(); if (c) { onAddCategory(c); onChange(c); } setAdding(false); setNewCat(""); }
  return adding ? (
    <div className="flex gap-2">
      <input autoFocus value={newCat} onChange={e => setNewCat(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") confirm(); if (e.key === "Escape") setAdding(false); }}
        placeholder="New category name…"
        className="flex-1 font-inter text-sm px-3 py-2.5 rounded-xl border-2 outline-none focus:border-[#F5C124]"
        style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }} />
      <button type="button" onClick={confirm} className="font-barlow text-xs font-bold px-3 py-2 rounded-xl" style={{ backgroundColor: "#2D3A28", color: "#F5C124" }}>Add</button>
      <button type="button" onClick={() => setAdding(false)} className="font-barlow text-xs font-bold px-3 py-2 rounded-xl border-2" style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>Cancel</button>
    </div>
  ) : (
    <div className="flex gap-2">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="flex-1 font-inter text-sm px-3 py-2.5 rounded-xl border-2 outline-none focus:border-[#F5C124]"
        style={{ borderColor: "rgba(45,58,40,0.15)", color: "#2D3A28" }}>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>
      <button type="button" onClick={() => setAdding(true)}
        className="font-barlow text-xs font-bold px-3 py-2.5 rounded-xl border-2 hover:border-[#F5C124] transition-colors whitespace-nowrap"
        style={{ borderColor: "rgba(45,58,40,0.2)", color: "#2D3A28" }}>+ New</button>
    </div>
  );
}

// ── Robots toggles ───────────────────────────────────────────────────────────
export function RobotsToggle({ indexVal, followVal, onIndexChange, onFollowChange }:
  { indexVal: boolean; followVal: boolean; onIndexChange: (v: boolean) => void; onFollowChange: (v: boolean) => void }) {
  const Btn = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button type="button" onClick={onClick}
      className="font-barlow text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
      style={{ backgroundColor: active ? "#2D3A28" : "transparent", color: active ? "#F5C124" : "rgba(45,58,40,0.5)", border: "1px solid rgba(45,58,40,0.15)" }}>
      {label}
    </button>
  );
  return (
    <div className="flex gap-6">
      <div>
        <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(45,58,40,0.5)" }}>Indexing</p>
        <div className="flex gap-1.5"><Btn active={indexVal} label="Index" onClick={() => onIndexChange(true)} /><Btn active={!indexVal} label="NoIndex" onClick={() => onIndexChange(false)} /></div>
      </div>
      <div>
        <p className="font-barlow text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(45,58,40,0.5)" }}>Crawling</p>
        <div className="flex gap-1.5"><Btn active={followVal} label="Follow" onClick={() => onFollowChange(true)} /><Btn active={!followVal} label="NoFollow" onClick={() => onFollowChange(false)} /></div>
      </div>
    </div>
  );
}
