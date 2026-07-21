import { supabase } from "@/integrations/supabase/client";

// Team logos (kept in sync with Results.tsx / Statistics.tsx)
import logoGrude from "@/assets/logos/hkk_grude.png";
import logoLjubuski from "@/assets/logos/hkk_ljubuski.png";
import logoMostar from "@/assets/logos/hkk_mostar.png";
import logoRama from "@/assets/logos/hkk_rama.png";
import logoSiroki from "@/assets/logos/hkk_siroki.png";
import logoTomislav from "@/assets/logos/hkk_tomislav.png";
import logoPosusje from "@/assets/logos/kk_posusje.png";
import logoCapljina from "@/assets/logos/hkk_capljina.png";

export const POSUSJE_NAME = "HKK Posušje";

export const OPPONENT_OPTIONS = [
  "HKK Grude",
  "HKK Ljubuški",
  "HKK Mostar",
  "HKK Rama",
  "HKK Široki II",
  "HKK Tomislav",
  "HKK Čapljina",
];

export const staticTeamLogos: Record<string, string> = {
  "HKK Grude": logoGrude,
  "HKK Ljubuški": logoLjubuski,
  "HKK Mostar": logoMostar,
  "HKK Rama": logoRama,
  "HKK Široki": logoSiroki,
  "HKK Široki II": logoSiroki,
  "KK Široki": logoSiroki,
  "HKK Tomislav": logoTomislav,
  "KK Tomislavgrad": logoTomislav,
  "HKK Posušje": logoPosusje,
  "KK Posušje": logoPosusje,
  "HKK Čapljina": logoCapljina,
  "KK Čapljina": logoCapljina,
  "Čapljina": logoCapljina,
};

export interface MatchRow {
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

export function formatDMY(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function competitionLabel(c: MatchRow["competition"]): string {
  return c === "kup" ? "Kup KSHB 🏆" : "Liga KSHB";
}

export interface DisplayMatch {
  id: string;
  date: string; // DD.MM.YYYY
  isoDate: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  isUpcoming: boolean;
  sofascoreLink?: string;
  youtubeLink?: string;
  competition: string;
  opponent: string;
  opponentLogoUrl: string | null;
}

export function toDisplay(row: MatchRow): DisplayMatch {
  const homeTeam = row.is_home ? POSUSJE_NAME : row.opponent;
  const awayTeam = row.is_home ? row.opponent : POSUSJE_NAME;
  const homeScore = row.is_home ? row.posusje_score ?? 0 : row.opponent_score ?? 0;
  const awayScore = row.is_home ? row.opponent_score ?? 0 : row.posusje_score ?? 0;
  const isUpcoming = row.posusje_score === null || row.opponent_score === null;
  return {
    id: row.id,
    date: formatDMY(row.match_date),
    isoDate: row.match_date,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isHome: row.is_home,
    isUpcoming,
    sofascoreLink: row.sofascore_link ?? undefined,
    youtubeLink: row.youtube_link ?? undefined,
    competition: competitionLabel(row.competition),
    opponent: row.opponent,
    opponentLogoUrl: row.opponent_logo_url,
  };
}

export async function fetchMatches(): Promise<DisplayMatch[]> {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("match_date", { ascending: false });
  if (error) throw error;
  return (data as MatchRow[]).map(toDisplay);
}

// W/L for last N played (from Posušje's POV), newest first
export interface FormEntry {
  id: string;
  opponent: string;
  result: "W" | "L";
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  opponentLogoUrl: string | null;
}

export function buildForm(matches: DisplayMatch[], count = 7): FormEntry[] {
  const played = matches.filter((m) => !m.isUpcoming);
  // matches already sorted DESC by isoDate
  const last = played.slice(0, count);
  return last.map((m) => {
    const posusjeScore = m.isHome ? m.homeScore : m.awayScore;
    const oppScore = m.isHome ? m.awayScore : m.homeScore;
    return {
      id: m.id,
      opponent: m.opponent,
      result: posusjeScore > oppScore ? "W" : "L",
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      opponentLogoUrl: m.opponentLogoUrl,
    };
  });
}

export function getTeamLogoFor(match: DisplayMatch, team: string): string | null {
  // If the team is the opponent and we have a custom logo URL, use it
  if (team === match.opponent && match.opponentLogoUrl) return match.opponentLogoUrl;
  return staticTeamLogos[team] ?? null;
}
