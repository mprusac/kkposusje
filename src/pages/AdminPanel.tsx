import { useCallback, useEffect, useMemo, useState, memo, ChangeEvent, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Plus, Edit, Trash2, Save, X, Upload, Pin, ArrowLeft, LogOut,
  ImagePlus, Newspaper, Loader2, Tag, Calendar, Users, Trophy,
} from "lucide-react";
import logoGrude from "@/assets/logos/hkk_grude.png";
import logoLjubuski from "@/assets/logos/hkk_ljubuski.png";
import logoMostar from "@/assets/logos/hkk_mostar.png";
import logoRama from "@/assets/logos/hkk_rama.png";
import logoSiroki from "@/assets/logos/hkk_siroki.png";
import logoTomislav from "@/assets/logos/hkk_tomislav.png";
import logoCapljina from "@/assets/logos/hkk_capljina.png";
import logoKSHB from "@/assets/logos/kshb_logo.png";

const NEWS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-news`;
const GALLERY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-galleries`;
const MATCHES_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-matches`;
const PLAYERS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-players`;
const DEFAULT_CATEGORIES = ["2026", "2025", "Najava"];
const OPPONENT_OPTIONS = [
  "HKK Grude", "HKK Ljubuški", "HKK Mostar", "HKK Rama",
  "HKK Široki II", "HKK Tomislav", "HKK Čapljina",
];
const OPPONENT_LOGOS: Record<string, string> = {
  "HKK Grude": logoGrude,
  "HKK Ljubuški": logoLjubuski,
  "HKK Mostar": logoMostar,
  "HKK Rama": logoRama,
  "HKK Široki II": logoSiroki,
  "HKK Tomislav": logoTomislav,
  "HKK Čapljina": logoCapljina,
};
const PAGE_SIZE = 30;
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10; // 10 years

interface NewsItem {
  id: string;
  title: string;
  excerpt: string | null;
  date: string;
  category: string;
  image_url: string | null;
  image_position: string | null;
  pinned: boolean;
  gallery_images: string[];
  created_at: string;
}
interface GalleryItem {
  id: string;
  title: string;
  date: string;
  images: string[];
  cover_image: string | null;
  created_at: string;
}
interface MatchItem {
  id: string;
  match_date: string; // YYYY-MM-DD
  opponent: string;
  is_home: boolean;
  posusje_score: number | null;
  opponent_score: number | null;
  competition: "liga" | "kup";
  youtube_link: string | null;
  sofascore_link: string | null;
  opponent_logo_url: string | null;
}
interface PlayerStat { label: string; value: string }
interface PlayerItem {
  id: string;
  name: string;
  position: string | null;
  description: string | null;
  image_url: string | null;
  jersey_number: number | null;
  statistics: PlayerStat[];
  sort_order: number;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function isoToDMY(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
function todayDMY() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}
function maskDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  let out = "";
  for (let i = 0; i < digits.length; i++) {
    out += digits[i];
    if (i === 1 || i === 3) out += ".";
  }
  return out;
}
async function signedUrl(bucket: string, path: string) {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, SIGNED_URL_TTL);
  if (error) throw error;
  return data.signedUrl;
}
async function adminUploadFile(bucket: string, path: string, file: File): Promise<string> {
  const token = sessionStorage.getItem("admin_token");
  if (!token) throw new Error("Niste prijavljeni");
  const endpointBase =
    bucket === "gallery-images" ? GALLERY_URL :
    bucket === "team-logos" ? MATCHES_URL :
    bucket === "player-images" ? PLAYERS_URL : NEWS_URL;
  const res = await fetch(`${endpointBase}/signed-upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ path, bucket }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error ?? `HTTP ${res.status}`);
  const { token: uploadToken, path: safePath } = body;
  const { error } = await supabase.storage.from(bucket).uploadToSignedUrl(safePath, uploadToken, file);
  if (error) throw error;
  return await signedUrl(bucket, safePath);
}
async function uploadFilesBatch(
  files: File[],
  bucket: string,
  pathPrefix: string,
  onProgress: (done: number, total: number) => void,
): Promise<string[]> {
  const CONCURRENCY = 5;
  const urls: string[] = new Array(files.length);
  let done = 0;
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (file, idx) => {
        const path = `${pathPrefix}${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${file.name}`;
        const url = await adminUploadFile(bucket, path, file);
        done++;
        onProgress(done, files.length);
        return { url, at: i + idx };
      }),
    );
    for (const r of results) urls[r.at] = r.url;
  }
  return urls;
}

const ImageThumb = memo(function ImageThumb({
  src, onRemove,
}: { src: string; onRemove: () => void }) {
  return (
    <div className="relative group">
      <img
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-16 rounded-lg object-cover border border-border"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
        aria-label="Ukloni sliku"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
});

function PaginatedImageGrid({
  images, onRemove,
}: { images: string[]; onRemove: (index: number) => void }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  if (!images.length) return null;
  const shown = images.slice(0, visible);
  const remaining = images.length - visible;
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {shown.map((src, i) => (
          <ImageThumb key={`${src}-${i}`} src={src} onRemove={() => onRemove(i)} />
        ))}
      </div>
      {remaining > 0 && (
        <Button type="button" variant="outline" size="sm" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
          Prikaži još ({remaining} preostalo)
        </Button>
      )}
    </div>
  );
}

function FileInputButton({
  accept,
  multiple,
  onChange,
  disabled,
  children,
}: {
  accept?: string;
  multiple?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
      <Button type="button" onClick={() => inputRef.current?.click()} disabled={disabled}>
        <Upload className="w-4 h-4 mr-2" />
        {children}
      </Button>
    </div>
  );
}

function DropZone({
  accept = "image/*",
  multiple,
  onFiles,
  disabled,
  icon,
  hint,
}: {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  icon: ReactNode;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    const arr = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (arr.length) onFiles(multiple ? arr : [arr[0]]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click();
      }}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (disabled) return;
        handleFiles(e.dataTransfer.files);
      }}
      className={`w-full rounded-lg border-2 border-dashed transition-colors cursor-pointer
        flex flex-col items-center justify-center gap-2 py-8 px-4 text-center
        ${dragOver ? "border-primary bg-primary/10" : "border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/60"}
        ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
        disabled={disabled}
        className="hidden"
      />
      <div className="text-muted-foreground">{icon}</div>
      <p className="text-sm text-muted-foreground">
        {hint ?? (multiple ? "Klikni ili povuci slike ovdje" : "Klikni ili povuci sliku ovdje")}
      </p>
    </div>
  );
}

function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    resize();
  }, [value, resize]);

  return (
    <Textarea
      ref={ref}
      rows={6}
      value={value}
      onChange={(e) => {
        onChange(e);
        resize();
      }}
      placeholder={placeholder}
      className="min-h-[168px] overflow-hidden resize-none"
    />
  );
}


function CategorySelect({
  value, onChange, categories,
}: { value: string; onChange: (v: string) => void; categories: string[] }) {
  const [adding, setAdding] = useState(false);
  const [newValue, setNewValue] = useState("");
  const merged = useMemo(
    () => Array.from(new Set([...(value ? [value] : []), ...categories])),
    [value, categories],
  );

  if (adding) {
    return (
      <div className="flex gap-2">
        <Input
          autoFocus
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Nova kategorija"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => {
            const v = newValue.trim();
            if (!v) return;
            onChange(v);
            setAdding(false);
            setNewValue("");
          }}
        >
          Dodaj
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => { setAdding(false); setNewValue(""); }}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (v === "__new__") { setAdding(true); return; }
        onChange(v);
      }}
    >
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent>
        {merged.map((c) => (
          <SelectItem key={c} value={c}>{c}</SelectItem>
        ))}
        <SelectItem value="__new__" className="text-primary">
          + Dodaj novu kategoriju
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

function YouTubeLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#ff0000"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8Z"
      />
      <path fill="currentColor" d="M9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("admin_token"));
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loggingIn, setLoggingIn] = useState(false);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<"main" | "news-form" | "gallery-form" | "match-form">("main");
  const [editing, setEditing] = useState<NewsItem | null>(null);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { meta.remove(); };
  }, []);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [editingMatch, setEditingMatch] = useState<MatchItem | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<{ kind: "news" | "gallery" | "match"; id: string } | null>(null);
  const [categoryModal, setCategoryModal] = useState(false);

  const logout = useCallback(() => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setNews([]);
    setGalleries([]);
    setMatches([]);
    setView("main");
  }, []);

  const apiFetch = useCallback(
    async (url: string, init: RequestInit = {}) => {
      const res = await fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(init.headers ?? {}),
        },
      });
      if (res.status === 401) {
        logout();
        throw new Error("Sesija je istekla, prijavite se ponovno.");
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error ?? `HTTP ${res.status}`);
      return body;
    },
    [token, logout],
  );

  const fetchNews = useCallback(async () => {
    const data = await apiFetch(`${NEWS_URL}/list`);
    setNews(data);
  }, [apiFetch]);
  const fetchGalleries = useCallback(async () => {
    const data = await apiFetch(`${GALLERY_URL}/list`);
    setGalleries(data);
  }, [apiFetch]);
  const fetchMatches = useCallback(async () => {
    const data = await apiFetch(`${MATCHES_URL}/list`);
    setMatches(data);
  }, [apiFetch]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([fetchNews(), fetchGalleries(), fetchMatches()])
      .catch((e) => toast.error("Greška pri učitavanju", { description: e.message }))
      .finally(() => setLoading(false));
  }, [token, fetchNews, fetchGalleries, fetchMatches]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const res = await fetch(`${NEWS_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Neispravni podaci");
      sessionStorage.setItem("admin_token", body.token);
      setToken(body.token);
      toast.success("Prijava uspješna");
    } catch (e) {
      toast.error("Neispravni podaci", { description: (e as Error).message });
    } finally {
      setLoggingIn(false);
    }
  };

  // ---------- LOGIN VIEW ----------
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm p-6 space-y-4 bg-card border border-border shadow-lg">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Prijavite se za nastavak</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="username">Korisničko ime</Label>
              <Input
                id="username"
                autoComplete="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Lozinka</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loggingIn}>
              {loggingIn && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Prijava
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // ---------- FORM VIEWS ----------
  if (view === "news-form") {
    return (
      <NewsForm
        initial={editing}
        onCancel={() => { setView("main"); setEditing(null); }}
        onSaved={async () => {
          await fetchNews();
          setView("main");
          setEditing(null);
        }}
        apiFetch={apiFetch}
        existingCategories={Array.from(new Set([...DEFAULT_CATEGORIES, ...news.map((n) => n.category)]))}
      />
    );
  }
  if (view === "gallery-form") {
    return (
      <GalleryForm
        initial={editingGallery}
        onCancel={() => { setView("main"); setEditingGallery(null); }}
        onSaved={async () => {
          await fetchGalleries();
          setView("main");
          setEditingGallery(null);
        }}
        apiFetch={apiFetch}
      />
    );
  }

  if (view === "match-form") {
    return (
      <MatchForm
        initial={editingMatch}
        onCancel={() => { setView("main"); setEditingMatch(null); }}
        onSaved={async () => {
          await fetchMatches();
          setView("main");
          setEditingMatch(null);
        }}
        apiFetch={apiFetch}
      />
    );
  }

  // ---------- MAIN VIEW ----------
  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const url =
        confirmDelete.kind === "news" ? `${NEWS_URL}/delete`
        : confirmDelete.kind === "gallery" ? `${GALLERY_URL}/delete`
        : `${MATCHES_URL}/delete`;
      await apiFetch(url, { method: "POST", body: JSON.stringify({ id: confirmDelete.id }) });
      toast.success("Obrisano");
      if (confirmDelete.kind === "news") await fetchNews();
      else if (confirmDelete.kind === "gallery") await fetchGalleries();
      else await fetchMatches();
    } catch (e) {
      toast.error("Greška", { description: (e as Error).message });
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-3 items-center px-4 py-3">
          <div className="flex justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                sessionStorage.setItem("restoreHomeScroll", "true");
                navigate("/");
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Natrag
            </Button>
          </div>
          <h1 className="font-semibold text-2xl text-primary text-center">Admin Panel</h1>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Odjava
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground py-4">
            <Loader2 className="w-4 h-4 animate-spin" /> Učitavanje...
          </div>
        )}

        {/* Top action buttons */}
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          <Button variant="outline" onClick={() => { setEditing(null); setView("news-form"); }}>
            <Newspaper className="w-4 h-4 mr-2" /> Nova vijest
          </Button>
          <Button variant="outline" onClick={() => { setEditingGallery(null); setView("gallery-form"); }}>
            <ImagePlus className="w-4 h-4 mr-2" /> Nova galerija
          </Button>
          <Button variant="outline" onClick={() => { setEditingMatch(null); setView("match-form"); }}>
            <Newspaper className="w-4 h-4 mr-2" /> Nova utakmica
          </Button>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vijesti */}
          <section className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-display text-xl text-primary uppercase tracking-wider text-center">
                Vijesti
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setCategoryModal(true)}
                title="Upravljaj kategorijama"
              >
                <Tag className="w-4 h-4" />
              </Button>
            </div>

            {news.length === 0 && !loading && (
              <p className="text-muted-foreground py-8 text-center">Nema vijesti.</p>
            )}

            <div className="space-y-2">
              {news.map((n) => (
                <Card key={n.id} className="p-3 bg-card border-border flex items-center gap-3">
                  {n.image_url ? (
                    <img src={n.image_url} className="aspect-square w-14 rounded object-cover border border-border" />
                  ) : (
                    <div className="aspect-square w-14 rounded bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium truncate text-sm">{n.title}</span>
                      {n.pinned && <Pin className="w-3.5 h-3.5 fill-current text-primary" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{n.date}</span>
                      <Badge variant="secondary" className="text-xs">{n.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => { setEditing(n); setView("news-form"); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setConfirmDelete({ kind: "news", id: n.id })}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Galerije */}
          <section className="space-y-3">
            <h2 className="font-display text-xl text-primary uppercase tracking-wider text-center">
              Galerije
            </h2>

            {galleries.length === 0 && !loading && (
              <p className="text-muted-foreground py-8 text-center">Nema galerija.</p>
            )}

            <div className="space-y-2">
              {galleries.map((g) => (
                <Card key={g.id} className="p-3 bg-card border-border flex items-center gap-3">
                  {g.cover_image ? (
                    <img src={g.cover_image} className="aspect-square w-14 rounded object-cover border border-border" />
                  ) : (
                    <div className="aspect-square w-14 rounded bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-sm">{g.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      {g.date} <ImagePlus className="w-3 h-3 inline text-primary" /> {g.images.length}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => { setEditingGallery(g); setView("gallery-form"); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setConfirmDelete({ kind: "gallery", id: g.id })}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Utakmice */}
        <section className="space-y-3 mt-8">
          <h2 className="font-display text-xl text-primary uppercase tracking-wider text-center">
            Utakmice
          </h2>
          {matches.length === 0 && !loading && (
            <p className="text-muted-foreground py-8 text-center">Nema utakmica.</p>
          )}
          <div className="space-y-2 max-w-3xl mx-auto">
            {matches.map((m) => {
              const scoreText = m.posusje_score != null && m.opponent_score != null
                ? `${m.posusje_score}:${m.opponent_score}`
                : "—";
              const home = m.is_home ? "HKK Posušje" : m.opponent;
              const away = m.is_home ? m.opponent : "HKK Posušje";
              return (
                <Card key={m.id} className="p-3 bg-card border-border flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-sm">
                      {home} vs {away} — {scoreText}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <span>{isoToDMY(m.match_date)}</span>
                      <span className="text-[10px] font-bold text-foreground bg-gold-dark px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        {m.competition === "kup" ? (
                          <>Kup KSHB <span aria-hidden>🏆</span></>
                        ) : (
                          <>Liga KSHB <img src={logoKSHB} alt="KSHB" className="w-3.5 h-3.5 object-contain" /></>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => { setEditingMatch(m); setView("match-form"); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setConfirmDelete({ kind: "match", id: m.id })}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>


      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potvrda brisanja</AlertDialogTitle>
            <AlertDialogDescription>Ova radnja se ne može poništiti.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Odustani</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Obriši</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CategoriesModal
        open={categoryModal}
        onOpenChange={setCategoryModal}
        news={news}
        apiFetch={apiFetch}
        onChanged={fetchNews}
      />
    </div>
  );
}

/* ============================ NEWS FORM ============================ */
function NewsForm({
  initial, onCancel, onSaved, apiFetch, existingCategories,
}: {
  initial: NewsItem | null;
  onCancel: () => void;
  onSaved: () => Promise<void>;
  apiFetch: (url: string, init?: RequestInit) => Promise<any>;
  existingCategories: string[];
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    date: initial?.date ?? todayDMY(),
    category: initial?.category ?? "2026",
    image_url: initial?.image_url ?? "",
    image_position: initial?.image_position ?? "center",
    pinned: initial?.pinned ?? false,
    gallery_images: initial?.gallery_images ?? [],
  });
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState("");

  const handleCover = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const path = `cover/${Date.now()}-${file.name}`;
      const url = await adminUploadFile("news-images", path, file);
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Slika prenesena");
    } catch (err) {
      toast.error("Greška uploada", { description: (err as Error).message });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (files: File[]) => {
    if (!files.length) return;
    setGalleryProgress(`0/${files.length}`);
    try {
      const urls = await uploadFilesBatch(files, "news-images", "gallery/", (d, t) =>
        setGalleryProgress(`${d}/${t}`),
      );
      setForm((f) => ({ ...f, gallery_images: [...f.gallery_images, ...urls] }));
      toast.success(`Preneseno ${urls.length} slika`);
    } catch (err) {
      toast.error("Greška uploada", { description: (err as Error).message });
    } finally {
      setGalleryProgress("");
    }
  };

  const removeGalleryImage = useCallback((idx: number) => {
    setForm((f) => ({ ...f, gallery_images: f.gallery_images.filter((_, i) => i !== idx) }));
  }, []);

  const save = async () => {
    if (!form.title.trim() || !form.date.trim()) {
      toast.error("Naslov i datum su obavezni");
      return;
    }
    setSaving(true);
    try {
      if (initial) {
        await apiFetch(`${NEWS_URL}/update`, {
          method: "POST",
          body: JSON.stringify({ id: initial.id, ...form }),
        });
        toast.success("Vijest ažurirana");
      } else {
        await apiFetch(`${NEWS_URL}/create`, { method: "POST", body: JSON.stringify(form) });
        toast.success("Vijest objavljena!");
      }
      await onSaved();
    } catch (e) {
      toast.error("Greška spremanja", { description: (e as Error).message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Natrag
          </Button>
          <h2 className="font-semibold text-2xl">{initial ? "Uredi vijest" : "Nova vijest"}</h2>
          <Button size="sm" onClick={save} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Spremi
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-4">
        <div className="space-y-1.5">
          <Label>Naslov *</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Datum *</Label>
            <Input
              value={form.date}
              onChange={(e) => setForm({ ...form, date: maskDate(e.target.value) })}
              placeholder="DD.MM.YYYY"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Kategorija</Label>
            <CategorySelect
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
              categories={existingCategories}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Kratki opis</Label>
          <AutoResizeTextarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch checked={form.pinned} onCheckedChange={(v) => setForm({ ...form, pinned: v })} id="pin" />
          <Label htmlFor="pin" className="cursor-pointer">Prikvači na vrh</Label>
        </div>

        <div className="space-y-2">
          <Label>Naslovna slika</Label>
          {form.image_url && (
            <div className="relative w-40">
              <img src={form.image_url} className="w-40 h-40 object-cover rounded border border-border" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image_url: "" })}
                className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <DropZone
            onFiles={handleCover}
            disabled={uploadingCover}
            icon={<Upload className="w-8 h-8" />}
            hint="Klikni ili povuci sliku ovdje"
          />
          {uploadingCover && <p className="text-sm text-muted-foreground">Prijenos u tijeku...</p>}
        </div>

        <div className="space-y-2">
          <Label>Pozicija slike</Label>
          <div className="flex gap-4">
            {([
              { v: "top", label: "Vrh" },
              { v: "center", label: "Sredina" },
              { v: "bottom", label: "Dno" },
            ] as const).map((p) => (
              <label key={p.v} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pos"
                  checked={form.image_position === p.v}
                  onChange={() => setForm({ ...form, image_position: p.v })}
                />
                <span className="text-sm">{p.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Slike članka (galerija)</Label>
          <DropZone
            multiple
            onFiles={handleGalleryUpload}
            disabled={!!galleryProgress}
            icon={<ImagePlus className="w-8 h-8" />}
            hint="Klikni ili povuci slike ovdje"
          />
          {galleryProgress && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Prijenos {galleryProgress}
            </p>
          )}
          <PaginatedImageGrid images={form.gallery_images} onRemove={removeGalleryImage} />
        </div>
      </main>
    </div>
  );
}

/* ============================ GALLERY FORM ============================ */
function GalleryForm({
  initial, onCancel, onSaved, apiFetch,
}: {
  initial: GalleryItem | null;
  onCancel: () => void;
  onSaved: () => Promise<void>;
  apiFetch: (url: string, init?: RequestInit) => Promise<any>;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    date: initial?.date ?? todayDMY(),
    cover_image: initial?.cover_image ?? "",
    images: initial?.images ?? [],
  });
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [progress, setProgress] = useState("");

  const handleCover = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const path = `cover-${Date.now()}-${file.name}`;
      const url = await adminUploadFile("gallery-images", path, file);
      setForm((f) => ({ ...f, cover_image: url }));
      toast.success("Naslovna slika prenesena");
    } catch (err) {
      toast.error("Greška", { description: (err as Error).message });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleImagesUpload = async (files: File[]) => {
    if (!files.length) return;
    setProgress(`0/${files.length}`);
    try {
      const urls = await uploadFilesBatch(files, "gallery-images", "galleries/", (d, t) =>
        setProgress(`${d}/${t}`),
      );
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
      toast.success(`Preneseno ${urls.length} slika`);
    } catch (err) {
      toast.error("Greška", { description: (err as Error).message });
    } finally {
      setProgress("");
    }
  };

  const removeImage = useCallback((idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  }, []);

  const save = async () => {
    if (!form.title.trim() || !form.date.trim()) {
      toast.error("Naslov i datum su obavezni");
      return;
    }
    setSaving(true);
    try {
      if (initial) {
        await apiFetch(`${GALLERY_URL}/update`, {
          method: "POST",
          body: JSON.stringify({ id: initial.id, ...form }),
        });
        toast.success("Galerija ažurirana");
      } else {
        await apiFetch(`${GALLERY_URL}/create`, { method: "POST", body: JSON.stringify(form) });
        toast.success("Galerija kreirana!");
      }
      await onSaved();
    } catch (e) {
      toast.error("Greška", { description: (e as Error).message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Natrag
          </Button>
          <h2 className="font-semibold text-2xl">{initial ? "Uredi galeriju" : "Nova galerija"}</h2>
          <Button size="sm" onClick={save} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Spremi
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-4">
        <div className="space-y-1.5">
          <Label>Naslov *</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="space-y-1.5">
          <Label>Datum *</Label>
          <Input
            value={form.date}
            onChange={(e) => setForm({ ...form, date: maskDate(e.target.value) })}
            placeholder="DD.MM.YYYY"
          />
        </div>

        <div className="space-y-2">
          <Label>Naslovna slika</Label>
          {form.cover_image && (
            <div className="relative w-40">
              <img src={form.cover_image} className="w-40 h-40 object-cover rounded border border-border" />
              <button
                type="button"
                onClick={() => setForm({ ...form, cover_image: "" })}
                className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <DropZone
            onFiles={handleCover}
            disabled={uploadingCover}
            icon={<Upload className="w-8 h-8" />}
            hint="Klikni ili povuci sliku ovdje"
          />
        </div>

        <div className="space-y-2">
          <Label>Slike galerije</Label>
          <DropZone
            multiple
            onFiles={handleImagesUpload}
            disabled={!!progress}
            icon={<ImagePlus className="w-8 h-8" />}
            hint="Klikni ili povuci slike ovdje"
          />
          {progress && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Prijenos {progress}
            </p>
          )}
          <PaginatedImageGrid images={form.images} onRemove={removeImage} />
        </div>
      </main>
    </div>
  );
}

/* ============================ CATEGORIES MODAL ============================ */
function CategoriesModal({
  open, onOpenChange, news, apiFetch, onChanged,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  news: NewsItem[];
  apiFetch: (url: string, init?: RequestInit) => Promise<any>;
  onChanged: () => Promise<void>;
}) {
  const [local, setLocal] = useState<string[]>([]);
  const [newCat, setNewCat] = useState("");
  const [renamingFrom, setRenamingFrom] = useState<string | null>(null);
  const [renameTo, setRenameTo] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [reassignTo, setReassignTo] = useState("");

  const all = useMemo(
    () => Array.from(new Set([...DEFAULT_CATEGORIES, ...news.map((n) => n.category), ...local])),
    [news, local],
  );

  const rename = async () => {
    if (!renamingFrom || !renameTo.trim()) return;
    try {
      await apiFetch(`${NEWS_URL}/update-category`, {
        method: "PUT",
        body: JSON.stringify({ category: renamingFrom, newCategory: renameTo.trim() }),
      });
      toast.success("Kategorija preimenovana");
      setRenamingFrom(null);
      setRenameTo("");
      await onChanged();
    } catch (e) {
      toast.error("Greška", { description: (e as Error).message });
    }
  };

  const confirmDelete = async () => {
    if (!deleting || !reassignTo) return;
    try {
      await apiFetch(`${NEWS_URL}/update-category`, {
        method: "PUT",
        body: JSON.stringify({ category: deleting, newCategory: reassignTo }),
      });
      toast.success("Kategorija obrisana");
      setDeleting(null);
      setReassignTo("");
      setLocal((l) => l.filter((c) => c !== deleting));
      await onChanged();
    } catch (e) {
      toast.error("Greška", { description: (e as Error).message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Kategorije</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {all.map((c) => (
            <div key={c} className="flex items-center gap-2 border border-border rounded-md p-2">
              {renamingFrom === c ? (
                <>
                  <Input value={renameTo} onChange={(e) => setRenameTo(e.target.value)} placeholder="Novi naziv" />
                  <Button size="sm" onClick={rename}>OK</Button>
                  <Button size="sm" variant="ghost" onClick={() => setRenamingFrom(null)}>×</Button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm">{c}</span>
                  <Button size="sm" variant="ghost" onClick={() => { setRenamingFrom(c); setRenameTo(c); }}>
                    Preimenuj
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleting(c)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2 border-t border-border">
          <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Nova kategorija" />
          <Button
            onClick={() => {
              if (!newCat.trim()) return;
              setLocal((l) => [...l, newCat.trim()]);
              setNewCat("");
            }}
          >
            Dodaj
          </Button>
        </div>

        {deleting && (
          <div className="border border-destructive/50 rounded-md p-3 space-y-2">
            <p className="text-sm">
              Premjesti vijesti iz <b>{deleting}</b> u:
            </p>
            <Select value={reassignTo} onValueChange={setReassignTo}>
              <SelectTrigger><SelectValue placeholder="Odaberite kategoriju" /></SelectTrigger>
              <SelectContent>
                {all.filter((c) => c !== deleting).map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setDeleting(null)}>Odustani</Button>
              <Button variant="destructive" size="sm" onClick={confirmDelete} disabled={!reassignTo}>
                Obriši
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Zatvori</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==================== MATCH FORM ====================
function MatchForm({
  initial,
  onCancel,
  onSaved,
  apiFetch,
}: {
  initial: MatchItem | null;
  onCancel: () => void;
  onSaved: () => Promise<void>;
  apiFetch: (u: string, i?: RequestInit) => Promise<any>;
}) {
  const [saving, setSaving] = useState(false);
  const [opponent, setOpponent] = useState(initial?.opponent ?? OPPONENT_OPTIONS[0]);
  const [customOpponent, setCustomOpponent] = useState(
    initial && !OPPONENT_OPTIONS.includes(initial.opponent) ? initial.opponent : "",
  );
  const [useCustom, setUseCustom] = useState(
    !!(initial && !OPPONENT_OPTIONS.includes(initial.opponent)),
  );
  const [isHome, setIsHome] = useState(initial?.is_home ?? true);
  const [posusjeScore, setPosusjeScore] = useState<string>(
    initial?.posusje_score != null ? String(initial.posusje_score) : "",
  );
  const [opponentScore, setOpponentScore] = useState<string>(
    initial?.opponent_score != null ? String(initial.opponent_score) : "",
  );
  const [matchDate, setMatchDate] = useState(initial?.match_date ?? todayISO());
  const [competition, setCompetition] = useState<"liga" | "kup">(initial?.competition ?? "liga");
  const [youtubeLink, setYoutubeLink] = useState(initial?.youtube_link ?? "");
  const [sofascoreLink, setSofascoreLink] = useState(initial?.sofascore_link ?? "");
  const [opponentLogoUrl, setOpponentLogoUrl] = useState<string | null>(initial?.opponent_logo_url ?? null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const el = dateInputRef.current;
    if (!el) return;
    el.focus();
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
      } catch {
        // Native picker can reject outside direct user activation; focus keeps manual entry working.
      }
    }
  };

  const handleLogoUpload = async (file: File) => {
    setUploadingLogo(true);
    try {
      const path = `logos/${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${file.name}`;
      const url = await adminUploadFile("team-logos", path, file);
      setOpponentLogoUrl(url);
      toast.success("Logo prenesen");
    } catch (e) {
      toast.error("Greška uploada", { description: (e as Error).message });
    } finally {
      setUploadingLogo(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOpponent = useCustom ? customOpponent.trim() : opponent;
    if (!finalOpponent) {
      toast.error("Unesite ime protivnika");
      return;
    }
    setSaving(true);
    try {
      const body = {
        id: initial?.id,
        opponent: finalOpponent,
        is_home: isHome,
        posusje_score: posusjeScore === "" ? null : Number(posusjeScore),
        opponent_score: opponentScore === "" ? null : Number(opponentScore),
        match_date: matchDate,
        competition,
        youtube_link: youtubeLink.trim() || null,
        sofascore_link: sofascoreLink.trim() || null,
        opponent_logo_url: useCustom ? opponentLogoUrl : null,
      };
      const endpoint = initial ? "update" : "create";
      await apiFetch(`${MATCHES_URL}/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      toast.success(initial ? "Utakmica ažurirana" : "Utakmica dodana");
      await onSaved();
    } catch (e) {
      toast.error("Greška", { description: (e as Error).message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <Button variant="outline" size="sm" onClick={onCancel}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Natrag
          </Button>
          <h1 className="font-semibold text-2xl text-primary">
            {initial ? "Uredi utakmicu" : "Nova utakmica"}
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label>Protivnik</Label>
            {!useCustom ? (
              <div className="flex gap-2">
                <Select value={opponent} onValueChange={setOpponent}>
                  <SelectTrigger className="flex-1">
                    <SelectValue>
                      <span className="flex items-center gap-2">
                        {OPPONENT_LOGOS[opponent] && (
                          <img src={OPPONENT_LOGOS[opponent]} alt="" className="w-6 h-6 object-contain" />
                        )}
                        {opponent}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {OPPONENT_OPTIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        <span className="flex items-center gap-2">
                          {OPPONENT_LOGOS[o] && (
                            <img src={OPPONENT_LOGOS[o]} alt="" className="w-6 h-6 object-contain" />
                          )}
                          {o}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" onClick={() => setUseCustom(true)}>
                  Drugi...
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={customOpponent}
                  onChange={(e) => setCustomOpponent(e.target.value)}
                  placeholder="Naziv ekipe"
                />
                <Button type="button" variant="outline" onClick={() => setUseCustom(false)}>
                  Iz liste
                </Button>
              </div>
            )}
          </div>

          {useCustom && (
            <div className="space-y-2">
              <Label>Logo ekipe (kvadratna slika, PNG s prozirnom pozadinom preporučeno)</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-background/60 border border-border flex items-center justify-center overflow-hidden p-2 flex-shrink-0">
                  {opponentLogoUrl ? (
                    <img src={opponentLogoUrl} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xs text-muted-foreground text-center">bez loga</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={uploadingLogo}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleLogoUpload(f);
                    }}
                  />
                  {opponentLogoUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setOpponentLogoUrl(null)}
                    >
                      Ukloni logo
                    </Button>
                  )}
                  {uploadingLogo && <p className="text-sm text-muted-foreground">Prijenos u tijeku...</p>}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Logo će biti prikazan u okrugloj ikoni na kartici utakmice (~56 px). Preporučujemo kvadratnu sliku ≥ 200×200.
              </p>
            </div>
          )}


          <div className="space-y-2">
            <Label>Domaćin / gost</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={isHome ? "default" : "outline"}
                onClick={() => setIsHome(true)}
              >
                HKK Posušje domaćin
              </Button>
              <Button
                type="button"
                variant={!isHome ? "default" : "outline"}
                onClick={() => setIsHome(false)}
              >
                HKK Posušje gost
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Posušje rezultat</Label>
              <Input
                type="number"
                min={0}
                value={posusjeScore}
                onChange={(e) => setPosusjeScore(e.target.value)}
                placeholder="prazno = najavljena"
              />
            </div>
            <div className="space-y-2">
              <Label>Protivnik rezultat</Label>
              <Input
                type="number"
                min={0}
                value={opponentScore}
                onChange={(e) => setOpponentScore(e.target.value)}
                placeholder="prazno = najavljena"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Datum</Label>
            <div className="relative">
              <Input
                ref={dateInputRef}
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                required
                className="pl-10 pr-3 date-input-native-picker cursor-pointer"
              />
              <button
                type="button"
                onClick={openDatePicker}
                className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded hover:bg-muted"
                aria-label="Odaberi datum"
              >
                <Calendar className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Natjecanje</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={competition === "liga" ? "default" : "outline"}
                onClick={() => setCompetition("liga")}
                className={competition === "liga" ? "bg-gold-dark text-foreground hover:bg-gold-dark/90" : undefined}
              >
                <span className="flex items-center gap-2">
                  Liga KSHB
                  <img src={logoKSHB} alt="KSHB" className="w-5 h-5 object-contain" />
                </span>
              </Button>
              <Button
                type="button"
                variant={competition === "kup" ? "default" : "outline"}
                onClick={() => setCompetition("kup")}
                className={competition === "kup" ? "bg-gold-dark text-foreground hover:bg-gold-dark/90" : undefined}
              >
                <span className="flex items-center gap-2">
                  Kup KSHB
                  <span aria-hidden>🏆</span>
                </span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <YouTubeLogo className="w-4 h-4 text-foreground" />
              YouTube link
            </Label>
            <Input
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://youtube.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <img
                src="https://www.sofascore.com/favicon.ico"
                alt=""
                className="w-4 h-4 object-contain"
              />
              SofaScore link
            </Label>
            <Input
              value={sofascoreLink}
              onChange={(e) => setSofascoreLink(e.target.value)}
              placeholder="https://sofascore.com/..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>Odustani</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {initial ? "Spremi" : "Dodaj"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
