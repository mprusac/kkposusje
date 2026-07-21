import "./shim";
import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { allNews } from "../src/pages/NewsPage.tsx";
import { events } from "../src/pages/GalleryPage.tsx";

const BASE_URL = "https://kkposusje.ba";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY environment variables");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

async function fetchNewsIds(): Promise<string[]> {
  const { data, error } = await supabase.from("news").select("id, created_at").order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to fetch news:", error.message);
    return [];
  }
  return (data ?? []).map((n) => n.id as string);
}

async function fetchGalleryIds(): Promise<string[]> {
  const { data, error } = await supabase.from("galleries").select("id, created_at").order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to fetch galleries:", error.message);
    return [];
  }
  return (data ?? []).map((g) => g.id as string);
}

function formatDate(date: string | null | undefined): string | undefined {
  if (!date) return undefined;
  try {
    return new Date(date).toISOString().split("T")[0];
  } catch {
    return undefined;
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

async function main() {
  const [dbNewsIds, dbGalleryIds] = await Promise.all([fetchNewsIds(), fetchGalleryIds()]);

  const localNewsIds = allNews.map((n) => n.id);
  const localGalleryIds = events.map((e) => e.id);

  const allNewsIds = Array.from(new Set([...localNewsIds, ...dbNewsIds]));
  const allGalleryIds = Array.from(new Set([...localGalleryIds, ...dbGalleryIds]));

  const now = new Date().toISOString().split("T")[0];

  const entries: SitemapEntry[] = [
    { path: "/", lastmod: now, changefreq: "weekly", priority: "1.0" },
    { path: "/vijesti", lastmod: now, changefreq: "weekly", priority: "0.9" },
    { path: "/statistika", lastmod: now, changefreq: "weekly", priority: "0.8" },
    { path: "/galerija", lastmod: now, changefreq: "monthly", priority: "0.7" },
    ...allNewsIds.map((id) => ({ path: `/vijesti/${id}`, changefreq: "monthly" as const, priority: "0.6" })),
    ...allGalleryIds.map((id) => ({ path: `/galerija/${id}`, changefreq: "monthly" as const, priority: "0.6" })),
  ];

  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
  console.log(`sitemap.xml written with ${entries.length} entries (${allNewsIds.length} news, ${allGalleryIds.length} galleries)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
