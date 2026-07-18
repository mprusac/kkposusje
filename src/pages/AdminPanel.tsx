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
  ImagePlus, Newspaper, Loader2, Tag,
} from "lucide-react";

const NEWS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-news`;
const GALLERY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-galleries`;
const DEFAULT_CATEGORIES = ["2026", "2025", "Najava"];
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
        const { error } = await supabase.storage.from(bucket).upload(path, file);
        if (error) throw error;
        const url = await signedUrl(bucket, path);
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

export default function AdminPanel() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("admin_token"));
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loggingIn, setLoggingIn] = useState(false);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<"main" | "news-form" | "gallery-form">("main");
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<{ kind: "news" | "gallery"; id: string } | null>(null);
  const [categoryModal, setCategoryModal] = useState(false);

  const logout = useCallback(() => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setNews([]);
    setGalleries([]);
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

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([fetchNews(), fetchGalleries()])
      .catch((e) => toast.error("Greška pri učitavanju", { description: e.message }))
      .finally(() => setLoading(false));
  }, [token, fetchNews, fetchGalleries]);

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

  // ---------- MAIN VIEW ----------
  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const url = confirmDelete.kind === "news" ? `${NEWS_URL}/delete` : `${GALLERY_URL}/delete`;
      await apiFetch(url, { method: "POST", body: JSON.stringify({ id: confirmDelete.id }) });
      toast.success("Obrisano");
      if (confirmDelete.kind === "news") await fetchNews();
      else await fetchGalleries();
    } catch (e) {
      toast.error("Greška", { description: (e as Error).message });
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-3 items-center px-4 py-3">
          <div />
          <h1 className="font-semibold text-xl text-primary text-center">Admin Panel</h1>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Odjava
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground py-4">
            <Loader2 className="w-4 h-4 animate-spin" /> Učitavanje...
          </div>
        )}

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="news"><Newspaper className="w-4 h-4 mr-2" /> Vijesti</TabsTrigger>
            <TabsTrigger value="galleries"><ImagePlus className="w-4 h-4 mr-2" /> Galerije</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Button onClick={() => { setEditing(null); setView("news-form"); }}>
                <Plus className="w-4 h-4 mr-2" /> Dodaj novu vijest
              </Button>
              <Button variant="outline" onClick={() => setCategoryModal(true)}>
                <Tag className="w-4 h-4 mr-2" /> Upravljaj kategorijama
              </Button>
            </div>

            {news.length === 0 && !loading && (
              <p className="text-muted-foreground py-8 text-center">Nema vijesti.</p>
            )}

            <div className="space-y-2">
              {news.map((n) => (
                <Card key={n.id} className="p-3 bg-card border-border flex items-center gap-3">
                  {n.image_url ? (
                    <img src={n.image_url} className="aspect-square w-16 rounded object-cover border border-border" />
                  ) : (
                    <div className="aspect-square w-16 rounded bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium truncate">{n.title}</span>
                      {n.pinned && <Pin className="w-4 h-4 fill-current text-primary" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{n.date}</span>
                      <Badge variant="secondary">{n.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditing(n); setView("news-form"); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setConfirmDelete({ kind: "news", id: n.id })}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="galleries" className="space-y-3">
            <Button onClick={() => { setEditingGallery(null); setView("gallery-form"); }}>
              <Plus className="w-4 h-4 mr-2" /> Dodaj novu galeriju
            </Button>

            {galleries.length === 0 && !loading && (
              <p className="text-muted-foreground py-8 text-center">Nema galerija.</p>
            )}

            <div className="space-y-2">
              {galleries.map((g) => (
                <Card key={g.id} className="p-3 bg-card border-border flex items-center gap-3">
                  {g.cover_image ? (
                    <img src={g.cover_image} className="aspect-square w-16 rounded object-cover border border-border" />
                  ) : (
                    <div className="aspect-square w-16 rounded bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{g.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {g.date} · {g.images.length} slika
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingGallery(g); setView("gallery-form"); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setConfirmDelete({ kind: "gallery", id: g.id })}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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

  const handleCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const path = `cover/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("news-images").upload(path, file);
      if (error) throw error;
      const url = await signedUrl("news-images", path);
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Slika prenesena");
    } catch (err) {
      toast.error("Greška uploada", { description: (err as Error).message });
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
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
      e.target.value = "";
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
          <h2 className="font-semibold">{initial ? "Uredi vijest" : "Nova vijest"}</h2>
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
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {existingCategories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Kratki opis</Label>
          <Textarea rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
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
          <FileInputButton accept="image/*" onChange={handleCover} disabled={uploadingCover}>Odaberi sliku</FileInputButton>
          {uploadingCover && <p className="text-sm text-muted-foreground">Uploading...</p>}
        </div>

        <div className="space-y-2">
          <Label>Pozicija slike</Label>
          <div className="flex gap-4">
            {(["top", "center", "bottom"] as const).map((p) => (
              <label key={p} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pos"
                  checked={form.image_position === p}
                  onChange={() => setForm({ ...form, image_position: p })}
                />
                <span className="text-sm capitalize">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Galerija u vijesti</Label>
          <FileInputButton accept="image/*" multiple onChange={handleGalleryUpload} disabled={!!galleryProgress}>Odaberi datoteke</FileInputButton>
          {galleryProgress && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading {galleryProgress}
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

  const handleCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const path = `cover-${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("gallery-images").upload(path, file);
      if (error) throw error;
      const url = await signedUrl("gallery-images", path);
      setForm((f) => ({ ...f, cover_image: url }));
      toast.success("Naslovna slika prenesena");
    } catch (err) {
      toast.error("Greška", { description: (err as Error).message });
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleImagesUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
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
      e.target.value = "";
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
          <h2 className="font-semibold">{initial ? "Uredi galeriju" : "Nova galerija"}</h2>
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
          <FileInputButton accept="image/*" onChange={handleCover} disabled={uploadingCover}>Odaberi sliku</FileInputButton>
        </div>

        <div className="space-y-2">
          <Label>Slike galerije</Label>
          <FileInputButton accept="image/*" multiple onChange={handleImagesUpload} disabled={!!progress}>Odaberi datoteke</FileInputButton>
          {progress && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading {progress}
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
