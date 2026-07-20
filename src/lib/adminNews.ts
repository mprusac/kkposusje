import { supabase } from "@/integrations/supabase/client";

export interface AdminNewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string; // formatted "dd. mm. yyyy."
  rawDate: string;
  category: "utakmica" | "najava" | "klub";
  image: string;
  cardImage?: string;
  imagePosition?: string;
  cardImagePosition?: string;
  galleryImages?: string[];
  content: string;
  pinned?: boolean;
}

const KNOWN = new Set(["utakmica", "najava", "klub"]);

function formatDate(d: string): string {
  // Accept "dd.mm.yyyy" or "dd. mm. yyyy." — normalize to "dd. mm. yyyy."
  const m = d?.match(/(\d{1,2})[.\s]+(\d{1,2})[.\s]+(\d{4})/);
  if (!m) return d || "";
  const [_, dd, mm, yy] = m;
  return `${dd.padStart(2, "0")}. ${mm.padStart(2, "0")}. ${yy}.`;
}

export function parseDate(d: string): number {
  const m = d?.match(/(\d{1,2})[.\s]+(\d{1,2})[.\s]+(\d{4})/);
  if (!m) return 0;
  return new Date(+m[3], +m[2] - 1, +m[1]).getTime();
}

export async function fetchAdminNews(): Promise<AdminNewsItem[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((row: any) => ({
    id: row.id,
    title: row.title,
    excerpt: row.excerpt || "",
    content: row.excerpt || "",
    date: formatDate(row.date),
    rawDate: row.date,
    category: (KNOWN.has(row.category) ? row.category : "klub") as AdminNewsItem["category"],
    image: row.image_url || "",
    cardImage: row.image_url || "",
    imagePosition: row.image_position || "center",
    cardImagePosition: row.image_position || "center",
    galleryImages: row.gallery_images || [],
    pinned: row.pinned,
  }));
}
