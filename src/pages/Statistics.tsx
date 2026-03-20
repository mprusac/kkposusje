import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Download, FileSpreadsheet, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import team logos
import logoGrude from "@/assets/logos/hkk_grude.png";
import logoLjubuski from "@/assets/logos/hkk_ljubuski.png";
import logoMostar from "@/assets/logos/hkk_mostar.png";
import logoRama from "@/assets/logos/hkk_rama.png";
import logoSiroki from "@/assets/logos/hkk_siroki.png";
import logoTomislav from "@/assets/logos/hkk_tomislav.png";
import logoPosusje from "@/assets/logos/kk_posusje.png";
import logoCapljina from "@/assets/logos/hkk_capljina.png";
import logoKSHB from "@/assets/logos/kshb_logo.png";

// Import ŽKK logos
import logoZkkPosusje from "@/assets/logos/zkk_posusje.png";
import logoZkkTomislav from "@/assets/logos/zkk_tomislav.png";
import logoZkkZrinjski from "@/assets/logos/zkk_zrinjski.png";
import logoZkkLivno from "@/assets/logos/zkk_livno.png";

// Import player images
import playerRamljak from "@/assets/player-ramljak.png";
import playerKovac from "@/assets/player-kovac-new.png";
import playerDerek from "@/assets/player-derek.png";
import playerProtrka from "@/assets/player-protrka.png";
import playerBegic from "@/assets/player-begic.png";
import playerPavkovic from "@/assets/player-pavkovic-new.png";
import playerBasicLuka from "@/assets/player-basic-luka.png";

// Import flag images
import flagBih from "@/assets/flags/bih-flag.png";
import flagCro from "@/assets/flags/cro-flag.png";

// Logo mapping
const teamLogos: Record<string, string> = {
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
  "HŽKK Posušje": logoZkkPosusje,
  "Čapljina": logoCapljina,
  "HKK Čapljina": logoCapljina,
  "ŽKK Zrinjski 2010": logoZkkZrinjski,
  "ŽKK Livno": logoZkkLivno,
  "HŽKK Tomislav": logoZkkTomislav,
};

interface Match {
  id: number;
  date: string;
  time?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  isUpcoming: boolean;
  sofascoreLink?: string;
  competition?: string;
}

interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  diff: number;
  last5: ("W" | "L")[];
  points: number;
}

interface WomenStanding {
  position: number;
  team: string;
  points: number;
}

interface Player {
  number: string;
  name: string;
  position: string;
  nationality: string;
  height?: string;
  dateOfBirth?: string;
  age?: number;
  image?: string;
  sofascoreLink?: string;
}

interface TopPlayer {
  rank: number;
  name: string;
  position: string;
  value: number | string;
  image?: string;
}

// Form data - based on actual results with scores
const formData = [
  { opponent: "HKK Ljubuški", logo: logoLjubuski, result: "L" as const, homeTeam: "HKK Ljubuški", awayTeam: "HKK Posušje", homeScore: 85, awayScore: 81 },
  { opponent: "HKK Široki II", logo: logoSiroki, result: "L" as const, homeTeam: "HKK Posušje", awayTeam: "HKK Široki II", homeScore: 54, awayScore: 69, competition: "Kup KSHB 🏆" },
  { opponent: "HKK Tomislav", logo: logoTomislav, result: "L" as const, homeTeam: "HKK Tomislav", awayTeam: "HKK Posušje", homeScore: 60, awayScore: 55 },
  { opponent: "HKK Mostar", logo: logoMostar, result: "W" as const, homeTeam: "HKK Posušje", awayTeam: "HKK Mostar", homeScore: 90, awayScore: 84 },
  { opponent: "HKK Široki II", logo: logoSiroki, result: "L" as const, homeTeam: "HKK Široki II", awayTeam: "HKK Posušje", homeScore: 70, awayScore: 62 },
  { opponent: "HKK Rama", logo: logoRama, result: "W" as const, homeTeam: "HKK Rama", awayTeam: "HKK Posušje", homeScore: 60, awayScore: 94 },
  { opponent: "HKK Grude", logo: logoGrude, result: "W" as const, homeTeam: "HKK Posušje", awayTeam: "HKK Grude", homeScore: 80, awayScore: 67 },
];

// All matches - upcoming first, then played from newest to oldest
const matches: Match[] = [
  // Played matches (newest first)
  { id: 22, date: "20.03.2026", homeTeam: "HKK Posušje", awayTeam: "HKK Ljubuški", homeScore: 88, awayScore: 78, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-ljubuski-kk-posusje/TEidsOiOi#id:15014542", competition: "Liga KSHB" },
  { id: 21, date: "17.03.2026", homeTeam: "HKK Čapljina", awayTeam: "HKK Posušje", homeScore: 61, awayScore: 83, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/kk-posusje-hkk-capljina/nOHcsTEid#id:15717259", competition: "Liga KSHB" },
  { id: 20, date: "08.03.2026", homeTeam: "HKK Posušje", awayTeam: "HKK Grude", homeScore: 80, awayScore: 67, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014517", competition: "Liga KSHB" },
  { id: 19, date: "01.03.2026", homeTeam: "HKK Rama", awayTeam: "HKK Posušje", homeScore: 60, awayScore: 94, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014515", competition: "Liga KSHB" },
  { id: 18, date: "22.02.2026", homeTeam: "HKK Široki II", awayTeam: "HKK Posušje", homeScore: 70, awayScore: 62, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014507", competition: "Liga KSHB" },
  { id: 16, date: "15.02.2026", homeTeam: "HKK Posušje", awayTeam: "HKK Mostar", homeScore: 90, awayScore: 84, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014506", competition: "Liga KSHB" },
  { id: 17, date: "08.02.2026", homeTeam: "HKK Tomislav", awayTeam: "HKK Posušje", homeScore: 60, awayScore: 55, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:15014499", competition: "Liga KSHB" },
  { id: 15, date: "20.01.2026", homeTeam: "HKK Posušje", awayTeam: "HKK Široki II", homeScore: 54, awayScore: 69, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hr/basketball/match/kk-posusje-hkk-siroki/lIcsTEid#id:15400673", competition: "Kup KSHB 🏆" },
  { id: 1, date: "14.12.2025", homeTeam: "HKK Ljubuški", awayTeam: "HKK Posušje", homeScore: 85, awayScore: 81, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-ljubuski-kk-posusje/TEidsOiOi#id:15014496" },
  { id: 2, date: "07.12.2025", homeTeam: "Čapljina", awayTeam: "HKK Posušje", homeScore: 33, awayScore: 107, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/kk-posusje-hkk-capljina/nOHcsTEid#id:15185580" },
  { id: 3, date: "30.11.2025", homeTeam: "HKK Grude", awayTeam: "HKK Posušje", homeScore: 60, awayScore: 56, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014486" },
  { id: 4, date: "23.11.2025", homeTeam: "HKK Posušje", awayTeam: "HKK Rama", homeScore: 90, awayScore: 77, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014481" },
  { id: 5, date: "15.11.2025", homeTeam: "HKK Posušje", awayTeam: "HKK Široki II", homeScore: 79, awayScore: 72, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014461" },
  { id: 6, date: "09.11.2025", homeTeam: "HKK Mostar", awayTeam: "HKK Posušje", homeScore: 92, awayScore: 78, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014458" },
  { id: 7, date: "02.11.2025", homeTeam: "HKK Posušje", awayTeam: "HKK Tomislav", homeScore: 81, awayScore: 85, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:14973017" },
];

// Standings data
const standings: Standing[] = [
  { position: 1, team: "HKK Ljubuški", played: 14, won: 10, lost: 4, diff: 113, last5: ["W", "L", "L", "W", "L"], points: 24 },
  { position: 2, team: "HKK Grude", played: 14, won: 9, lost: 5, diff: 53, last5: ["W", "L", "L", "W", "L"], points: 23 },
  { position: 3, team: "HKK Mostar", played: 13, won: 9, lost: 4, diff: 196, last5: ["L", "W", "W", "W", "L"], points: 22 },
  { position: 4, team: "HKK Posušje", played: 14, won: 8, lost: 6, diff: 140, last5: ["L", "W", "W", "W", "W"], points: 22 },
  { position: 5, team: "HKK Široki II", played: 14, won: 7, lost: 7, diff: 89, last5: ["W", "W", "L", "W", "L"], points: 21 },
  { position: 6, team: "HKK Tomislav", played: 13, won: 8, lost: 5, diff: 22, last5: ["W", "L", "W", "W", "W"], points: 21 },
  { position: 7, team: "HKK Rama", played: 13, won: 3, lost: 10, diff: -92, last5: ["L", "L", "L", "L", "L"], points: 16 },
  { position: 8, team: "Čapljina", played: 13, won: 0, lost: 13, diff: -521, last5: ["L", "L", "L", "L", "L"], points: 13 },
];

// Women standings data
const womenStandings: WomenStanding[] = [
  { position: 1, team: "HŽKK Posušje", points: 3 },
  { position: 2, team: "ŽKK Zrinjski 2010", points: 3 },
  { position: 3, team: "ŽKK Livno", points: 2 },
  { position: 4, team: "HŽKK Tomislav", points: 1 },
];

// Players roster - based on Team.tsx players
const players: Player[] = [
  { number: "09", name: "Ante Kovač", position: "Krilo", nationality: "BIH", height: "190 cm", dateOfBirth: "30/05/2001", age: 24, image: playerKovac, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-kovac/1578849" },
  { number: "13", name: "Ante Begić", position: "Krilo", nationality: "BIH", height: "197 cm", dateOfBirth: "08/09/1995", age: 30, image: playerBegic, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-begic/2046150" },
  { number: "04", name: "Josip Ramljak", position: "Bek", nationality: "BIH", height: "190 cm", dateOfBirth: "18/08/2000", age: 25, image: playerRamljak, sofascoreLink: "https://www.sofascore.com/basketball/player/josip-ramljak/1578845" },
  { number: "13", name: "Mirko Đerek", position: "Centar", nationality: "HRV", height: "201 cm", dateOfBirth: "25/06/1990", age: 35, image: playerDerek, sofascoreLink: "https://www.sofascore.com/basketball/player/mirko-derek/1578853" },
  { number: "18", name: "Marko Protrka", position: "Centar", nationality: "BIH", height: "200 cm", dateOfBirth: "21/01/2007", age: 18, image: playerProtrka, sofascoreLink: "https://www.sofascore.com/basketball/player/marko-protrka/1578855" },
  { number: "08", name: "Luka Bašić", position: "Bek", nationality: "BIH", height: "193 cm", dateOfBirth: "15/07/2007", age: 18, image: playerBasicLuka, sofascoreLink: "https://www.sofascore.com/basketball/player/luka-basic/1965464" },
  { number: "12", name: "Josip Pavković", position: "Bek", nationality: "BIH", height: "196 cm", dateOfBirth: "29/05/2008", age: 17, image: playerPavkovic, sofascoreLink: "https://www.sofascore.com/basketball/player/josip-pavkovic/1845527" },
  { number: "06", name: "David Dragoja", position: "Bek", nationality: "BIH", height: "-", dateOfBirth: "05/09/2007", age: 18, sofascoreLink: "https://www.sofascore.com/basketball/player/david-dragoja/2078664" },
  { number: "05", name: "Stipe Bešlić", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/stipe-beslic/2339336" },
  { number: "10", name: "Luka Ramljak", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/luka-ramljak/2364289" },
  { number: "07", name: "Jakov Ramljak", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/jakov-ramljak/1578854" },
  { number: "15", name: "Ivan Ramljak", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/ivan-ramljak/2339345" },
  { number: "14", name: "Marko Petrović", position: "Krilo", nationality: "-", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/marko-petrovic/2358568" },
  { number: "15", name: "Ante Pišković", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-piskovic/2364287" },
  { number: "14", name: "Ante Ramljak", position: "Bek", nationality: "HRV", height: "189 cm", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-ramljak/2339280" },
  { number: "-", name: "Marko Ramljak", position: "Bek", nationality: "BIH", height: "-", dateOfBirth: "19/10/2009", age: 16, sofascoreLink: "" },
];

// Top players data
const topScorers: TopPlayer[] = [
  { rank: 1, name: "Ante Kovač", position: "Krilo", value: 15.5, image: playerKovac },
  { rank: 2, name: "Josip Ramljak", position: "Bek", value: 15.3, image: playerRamljak },
  { rank: 3, name: "Ante Begić", position: "Krilo", value: 13.0, image: playerBegic },
];

const topRebounders: TopPlayer[] = [
  { rank: 1, name: "Ante Begić", position: "Krilo", value: 6.9, image: playerBegic },
  { rank: 2, name: "Marko Protrka", position: "Centar", value: 6.5, image: playerProtrka },
  { rank: 3, name: "Ante Kovač", position: "Krilo", value: 5.6, image: playerKovac },
];

const topAssisters: TopPlayer[] = [
  { rank: 1, name: "Josip Ramljak", position: "Bek", value: 5.2, image: playerRamljak },
  { rank: 2, name: "Ante Begić", position: "Krilo", value: 2.8, image: playerBegic },
  { rank: 3, name: "Mirko Đerek", position: "Centar", value: 2.4, image: playerDerek },
];

const topMinutes: TopPlayer[] = [
  { rank: 1, name: "Ante Begić", position: "Krilo", value: "29:34", image: playerBegic },
  { rank: 2, name: "Josip Ramljak", position: "Bek", value: "27:29", image: playerRamljak },
  { rank: 3, name: "Ante Kovač", position: "Krilo", value: "27:25", image: playerKovac },
];

const topSteals: TopPlayer[] = [
  { rank: 1, name: "Ante Kovač", position: "Krilo", value: 1.7, image: playerKovac },
  { rank: 2, name: "Ante Begić", position: "Krilo", value: 1.5, image: playerBegic },
  { rank: 3, name: "Josip Ramljak", position: "Bek", value: 1.2, image: playerRamljak },
];

const topBlocks: TopPlayer[] = [
  { rank: 1, name: "Marko Protrka", position: "Centar", value: 1.2, image: playerProtrka },
  { rank: 2, name: "Ante Kovač", position: "Krilo", value: 0.4, image: playerKovac },
  { rank: 3, name: "Josip Pavković", position: "Bek", value: 0.4, image: playerPavkovic },
];

const top2PPercentage: TopPlayer[] = [
  { rank: 1, name: "Marko Protrka", position: "Centar", value: "62.1%", image: playerProtrka },
  { rank: 2, name: "Ante Kovač", position: "Krilo", value: "56.1%", image: playerKovac },
  { rank: 3, name: "Josip Ramljak", position: "Bek", value: "52.4%", image: playerRamljak },
];

const top3PPercentage: TopPlayer[] = [
  { rank: 1, name: "Ante Begić", position: "Krilo", value: "40.2%", image: playerBegic },
  { rank: 2, name: "Ante Kovač", position: "Krilo", value: "35.5%", image: playerKovac },
  { rank: 3, name: "Josip Ramljak", position: "Bek", value: "30.7%", image: playerRamljak },
];

const topThrees: TopPlayer[] = [
  { rank: 1, name: "Ante Begić", position: "Krilo", value: 47, image: playerBegic },
  { rank: 2, name: "Ante Kovač", position: "Krilo", value: 38, image: playerKovac },
  { rank: 3, name: "Josip Ramljak", position: "Bek", value: 23, image: playerRamljak },
];

const topDefRebounds: TopPlayer[] = [
  { rank: 1, name: "Ante Begić", position: "Krilo", value: 5.7, image: playerBegic },
  { rank: 2, name: "Marko Protrka", position: "Centar", value: 5.2, image: playerProtrka },
  { rank: 3, name: "Josip Ramljak", position: "Bek", value: 4.4, image: playerRamljak },
];

const topOffRebounds: TopPlayer[] = [
  { rank: 1, name: "Luka Bašić", position: "Bek", value: 1.8, image: playerBasicLuka },
  { rank: 2, name: "Mirko Đerek", position: "Centar", value: 1.7, image: playerDerek },
  { rank: 3, name: "Ante Kovač", position: "Krilo", value: 1.4, image: playerKovac },
];

const topDoubleDoubles: TopPlayer[] = [
  { rank: 1, name: "Marko Protrka", position: "Centar", value: 2, image: playerProtrka },
  { rank: 2, name: "Josip Ramljak", position: "Bek", value: 1, image: playerRamljak },
  { rank: 3, name: "Ante Kovač", position: "Krilo", value: 0, image: playerKovac },
];

// All top player categories
const allTopCategories = [
  { title: "Poeni", data: topScorers },
  { title: "Skokovi", data: topRebounders },
  { title: "Asistencije", data: topAssisters },
  { title: "Ukradene lopte", data: topSteals },
  { title: "Blokade", data: topBlocks },
  { title: "Minute", data: topMinutes },
  { title: "Šut za 2p %", data: top2PPercentage },
  { title: "Šut za 3p %", data: top3PPercentage },
  { title: "Trojke", data: topThrees },
  { title: "Obrambeni skokovi", data: topDefRebounds },
  { title: "Skokovi u napadu", data: topOffRebounds },
  { title: "Double-double", data: topDoubleDoubles },
];

const Statistics = () => {
  const [activeMainTab, setActiveMainTab] = useState("standings");
  const [activePlayersTab, setActivePlayersTab] = useState("top");
  const [matchPage, setMatchPage] = useState(0);
  const [hoveredFormIndex, setHoveredFormIndex] = useState<number | null>(null);
  const [leagueCategory, setLeagueCategory] = useState<"seniori" | "seniorke">("seniori");
  const [topPlayersPage, setTopPlayersPage] = useState(0);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDownloadDialog(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();

  const handleDownloadStats = () => {
    const link = document.createElement("a");
    link.href = "/data/KK_Posusje_statistika_25-26.xlsx";
    link.download = "KK_Posusje_statistika_25-26.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadDialog(false);
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Calculate extra matches based on active tab
  const getExtraMatches = () => {
    if (activeMainTab === "statistics") return 1;
    if (activeMainTab === "players" && activePlayersTab === "squad") return 9;
    if (activeMainTab === "players" && activePlayersTab === "top") return 3;
    return 0;
  };
  const extraMatchesCount = getExtraMatches();
  
  // Sort matches: Page 0 = 1 upcoming + 5 past, Page 1+ = remaining past then remaining upcoming
  const upcomingMatches = matches.filter(m => m.isUpcoming);
  const playedMatches = matches.filter(m => !m.isUpcoming);
  
  const baseFirstPageMatches = [...upcomingMatches.slice(0, 1), ...playedMatches.slice(0, 5)];
  const remainingMatchesPool = [...playedMatches.slice(5), ...upcomingMatches.slice(1)];
  
  // On page 0, append extra matches from the remaining pool
  const firstPageMatches = [...baseFirstPageMatches, ...remainingMatchesPool.slice(0, extraMatchesCount)];
  
  // Remaining matches for pages 1+ (always skip those shown on page 0)
  const remainingAfterPage0 = remainingMatchesPool.slice(extraMatchesCount);
  const matchesPerPage = 6;
  const totalMatchPages = remainingAfterPage0.length > 0 ? 1 + Math.ceil(remainingAfterPage0.length / matchesPerPage) : 1;
  
  const displayedMatches = matchPage === 0 
    ? firstPageMatches 
    : remainingAfterPage0.slice((matchPage - 1) * matchesPerPage, matchPage * matchesPerPage);

  const getTeamLogo = (teamName: string) => teamLogos[teamName] || null;

  const getMatchResult = (match: Match) => {
    if (match.isUpcoming) return null;
    const isPosusjeHome = match.homeTeam.includes("Posušje");
    const posusjeScore = isPosusjeHome ? match.homeScore : match.awayScore;
    const opponentScore = isPosusjeHome ? match.awayScore : match.homeScore;
    return posusjeScore! > opponentScore! ? "W" : "L";
  };

  const getFlagImage = (nationality: string) => {
    if (nationality === "BIH") return flagBih;
    if (nationality === "HRV" || nationality === "CRO") return flagCro;
    return null;
  };

  const getFlagEmoji = (nationality: string) => {
    const flags: Record<string, string> = {
      "BIH": "🇧🇦",
      "HRV": "🇭🇷",
      "SRB": "🇷🇸",
      "USA": "🇺🇸",
      "CAN": "🇨🇦",
    };
    return flags[nationality] || "🏳️";
  };

  return (
    <div className="min-h-screen bg-background" style={{ zoom: 0.9 }}>
      {/* Header */}
      <header className="bg-secondary/50 border-b border-border/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => {
                sessionStorage.setItem("restoreHomeScroll", "true");
                navigate("/");
              }} 
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mr-auto text-lg"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad</span>
            </button>
            <div className="flex items-end gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:ml-4">
              <img src={logoPosusje} alt="HKK Posušje" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="font-display text-lg text-foreground leading-none">HKK Posušje</h1>
                <div className="flex items-end gap-1 pb-0.5">
                  <a href="https://www.kshb.ba/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <img src={logoKSHB} alt="KSHB" className="w-3 h-3 object-contain" />
                  </a>
                  <p className="text-[10px] text-muted-foreground leading-none">Liga KSHB</p>
                </div>
              </div>
            </div>
            <h2 className="font-display text-4xl text-primary hidden md:block absolute left-1/2 -translate-x-1/2">STATISTIKA</h2>
            <div className="w-20 hidden md:block"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Mobile Title */}
        <h2 className="font-display text-3xl text-primary text-center mb-6 md:hidden">STATISTIKA</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Left Column - Form & Games */}
          <div className="lg:col-span-3 flex flex-col gap-3 order-2 lg:order-1">
            {/* Recent Form */}
            <div className="bg-secondary/30 rounded-xl p-2 border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <h3 className="font-display text-lg text-foreground mb-1 text-center">Nedavna forma</h3>
              
              {/* Dynamic text - changes on hover */}
              <p className="text-[10px] text-muted-foreground text-center mb-1 h-4 transition-all duration-200">
                {hoveredFormIndex !== null 
                  ? `${formData[hoveredFormIndex].homeTeam} ${formData[hoveredFormIndex].homeScore} - ${formData[hoveredFormIndex].awayScore} ${formData[hoveredFormIndex].awayTeam}`
                  : "Pređite mišem iznad stupca za detalje"
                }
              </p>
              
              {/* Team logos */}
              <div className="flex gap-1 mb-1 justify-center">
                {formData.map((game, index) => (
                  <div 
                    key={index} 
                    className="w-7 h-7 rounded-full bg-background/50 flex items-center justify-center p-0.5 hover:scale-110 transition-transform cursor-pointer" 
                    title={game.opponent}
                    onMouseEnter={() => setHoveredFormIndex(index)}
                    onMouseLeave={() => setHoveredFormIndex(null)}
                  >
                    <img src={game.logo} alt={game.opponent} className={`object-contain w-full h-full ${
                      game.opponent.includes("Široki") || game.opponent.includes("Grude")
                        ? "scale-[1.6]" 
                        : game.opponent.includes("Rama") || game.opponent.includes("Ljubuš")
                          ? "scale-[1.3]"
                        : game.opponent.includes("Čapljina") || game.opponent === "Čapljina"
                          ? "scale-[1.15]"
                        : game.opponent.includes("Mostar") || game.opponent.includes("Tomislav")
                          ? "scale-[1.1]"
                          : "scale-[0.85]"
                    }`} />
                  </div>
                ))}
              </div>
              
              {/* Win/Loss bars */}
              <div className="flex gap-1 justify-center">
                {formData.map((game, index) => (
                  <div
                    key={index}
                    className={`w-7 h-5 rounded cursor-pointer transition-all duration-200 hover:scale-110 ${
                      game.result === "W" ? "bg-green-500 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/30" : "bg-red-500 hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/30"
                    }`}
                    onMouseEnter={() => setHoveredFormIndex(index)}
                    onMouseLeave={() => setHoveredFormIndex(null)}
                  />
                ))}
              </div>
            </div>

            {/* Games */}
            <div className="bg-secondary/30 rounded-xl border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col flex-1">
              <div className="p-2 border-b border-border/30 flex items-center justify-between">
                <button 
                  onClick={() => setMatchPage(p => Math.max(0, p - 1))}
                  disabled={matchPage === 0}
                  className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center hover:bg-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} className="text-primary" />
                </button>
                <h3 className="font-display text-lg text-foreground text-center">Utakmice</h3>
                <button 
                  onClick={() => setMatchPage(p => Math.min(totalMatchPages - 1, p + 1))}
                  disabled={matchPage >= totalMatchPages - 1}
                  className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center hover:bg-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={14} className="text-primary" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={matchPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="divide-y divide-border/20 flex-1 flex flex-col justify-center"
                >
                  {displayedMatches.map((match) => {
                    const result = getMatchResult(match);
                    const homeLogo = getTeamLogo(match.homeTeam);
                    const awayLogo = getTeamLogo(match.awayTeam);
                    
                    const matchContent = (
                      <div className={`px-2 py-[7px] hover:bg-secondary/50 transition-all duration-200 ${!match.isUpcoming ? 'cursor-pointer hover:shadow-md' : ''}`}>
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span>{match.date}</span>
                            {match.time && <span>{match.time}</span>}
                            {match.competition?.includes("Kup") ? (
                              <span className="text-xs font-bold text-foreground bg-primary/10 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                                {match.competition}
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-foreground bg-primary/10 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                                {match.competition || "Liga KSHB"}
                                <img src={logoKSHB} alt="KSHB" className="w-3.5 h-3.5 object-contain -mt-0.5" />
                              </span>
                            )}
                            
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex-1">
                              {/* Home Team */}
                              <div className="flex items-center justify-between mb-0.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    {homeLogo && <img src={homeLogo} alt="" className={`object-contain ${match.homeTeam.includes("Široki") ? "w-6 h-6" : match.homeTeam.includes("Tomislav") ? "w-4 h-4" : "w-5 h-5"}`} />}
                                  </div>
                                  <span className={`text-sm font-medium ${match.homeTeam.includes("Posušje") ? "text-primary" : "text-foreground"}`}>
                                    {match.homeTeam}
                                  </span>
                                </div>
                                {!match.isUpcoming && (
                                  <span className={`text-sm font-bold ${match.homeScore! > match.awayScore! ? "text-foreground" : "text-muted-foreground"}`}>
                                    {match.homeScore}
                                  </span>
                                )}
                              </div>
                              
                              {/* Away Team */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    {awayLogo && <img src={awayLogo} alt="" className={`object-contain ${match.awayTeam.includes("Široki") ? "w-6 h-6" : match.awayTeam.includes("Tomislav") ? "w-4 h-4" : "w-5 h-5"}`} />}
                                  </div>
                                  <span className={`text-sm font-medium ${match.awayTeam.includes("Posušje") ? "text-primary" : "text-foreground"}`}>
                                    {match.awayTeam}
                                  </span>
                                </div>
                                {!match.isUpcoming && (
                                  <span className={`text-sm font-bold ${match.awayScore! > match.homeScore! ? "text-foreground" : "text-muted-foreground"}`}>
                                    {match.awayScore}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {result && (
                              <div className="ml-2 flex items-center">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                                  result === "W" ? "bg-green-500" : "bg-red-500"
                                }`}>
                                  {result}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                    
                    return match.sofascoreLink ? (
                      <a 
                        key={match.id} 
                        href={match.sofascoreLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {matchContent}
                      </a>
                    ) : (
                      <div key={match.id}>{matchContent}</div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
              <TabsList className="w-full bg-secondary/30 border border-border/30 rounded-xl p-1 mb-5 hover:shadow-lg transition-shadow duration-300">
                <TabsTrigger value="standings" className="flex-1 font-display text-xl md:text-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
                  Poredak
                </TabsTrigger>
                <TabsTrigger value="players" className="flex-1 font-display text-xl md:text-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
                  Igrači
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex-1 font-display text-xl md:text-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
                  Tim
                </TabsTrigger>
              </TabsList>

              {/* Standings Tab */}
              <TabsContent value="standings" className="mt-0">
                <div className="bg-secondary/30 rounded-xl border border-border/30 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="p-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <a href="https://www.kshb.ba/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        <img src={logoKSHB} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                      </a>
                      <span className="text-xs md:text-sm text-foreground">Liga Košarkaškog saveza Herceg Bosne</span>
                      <span className="text-xs md:text-sm text-muted-foreground bg-background/50 px-2 py-0.5 rounded">25/26</span>
                      <Select value={leagueCategory} onValueChange={(v) => setLeagueCategory(v as "seniori" | "seniorke")}>
                        <SelectTrigger className="w-[108px] md:w-28 h-7 md:h-8 text-[11px] md:text-base bg-background/50 border-border/30 ml-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary border-border/50">
                          <SelectItem value="seniori" className="text-sm md:text-base">Seniori</SelectItem>
                          <SelectItem value="seniorke" className="text-sm md:text-base">Seniorke</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {leagueCategory === "seniori" ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-border/30">
                            <TableHead className="w-6 md:w-10 text-center text-[10px] md:text-sm font-bold px-0.5 md:px-4 py-1 md:py-3">#</TableHead>
                            <TableHead className="text-[10px] md:text-sm font-bold px-0.5 md:px-4 py-1 md:py-3">Ekipa</TableHead>
                            <TableHead className="text-center w-5 md:w-10 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">UT</TableHead>
                            <TableHead className="text-center w-5 md:w-10 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">W</TableHead>
                            <TableHead className="text-center w-5 md:w-10 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">L</TableHead>
                            <TableHead className="text-center w-7 md:w-14 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">+/-</TableHead>
                            <TableHead className="text-center w-28 text-sm font-bold hidden sm:table-cell py-1 md:py-3">Zadnjih 5</TableHead>
                            <TableHead className="text-center w-7 md:w-14 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">BOD</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {standings.map((team) => (
                            <TableRow 
                              key={team.position} 
                              className={`border-border/20 transition-all duration-200 hover:bg-secondary/50 hover:shadow-md ${team.team === "HKK Posušje" ? "bg-primary/10 hover:bg-primary/20" : ""}`}
                            >
                              <TableCell className="text-center font-bold text-[10px] md:text-sm px-0.5 md:px-4 py-0.5 md:py-4">{team.position}</TableCell>
                              <TableCell className="px-0.5 md:px-4 py-0.5 md:py-4">
                                <div className="flex items-center gap-1 md:gap-2">
                                {getTeamLogo(team.team) && (
                                    <div className="w-5 h-5 md:w-8 md:h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                                      <img 
                                        src={getTeamLogo(team.team)!} 
                                        alt="" 
                                        className={`object-contain ${
                                          team.team === "HKK Široki" || team.team === "HKK Široki II"
                                            ? "w-[250%] h-[250%]"
                                            : team.team === "HKK Grude"
                                            ? "w-[300%] h-[300%]"
                                            : team.team === "HKK Ljubuški"
                                            ? "w-[130%] h-[130%]"
                                            : team.team === "HKK Rama"
                                            ? "w-[120%] h-[120%]"
                                            : team.team === "HKK Posušje" || team.team === "HKK Tomislav" || team.team === "HKK Mostar"
                                            ? "w-[85%] h-[85%]"
                                            : team.team === "HKK Čapljina" || team.team === "Čapljina"
                                            ? "w-[90%] h-[90%]"
                                            : "w-full h-full"
                                        }`}
                                      />
                                    </div>
                                  )}
                                  <span className={`text-[10px] md:text-sm font-bold ${team.team === "HKK Posušje" ? "text-primary" : ""}`}>
                                    {team.team}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4">{team.played}</TableCell>
                              <TableCell className="text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4">{team.won}</TableCell>
                              <TableCell className="text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4">{team.lost}</TableCell>
                              <TableCell className={`text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4 ${team.diff > 0 ? "text-green-400" : team.diff < 0 ? "text-red-400" : ""}`}>
                                {team.diff > 0 ? `+${team.diff}` : team.diff}
                              </TableCell>
                              <TableCell className="text-center hidden sm:table-cell">
                                <div className="flex gap-0.5 justify-center items-center">
                                  {team.last5.map((result, i) => (
                                    <span 
                                      key={i} 
                                      className={`w-5 h-5 text-[10px] font-bold rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 ${
                                        result === "W" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                      }`}
                                    >
                                      {result}
                                    </span>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="text-center font-bold text-[10px] md:text-sm px-0 md:px-4 py-0.5 md:py-4">{team.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/30">
                          <TableHead className="w-10 text-center text-sm font-bold">#</TableHead>
                          <TableHead className="text-sm font-bold">Ekipa</TableHead>
                          <TableHead className="text-center w-14 text-sm font-bold">BOD</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {womenStandings.map((team) => (
                          <TableRow 
                            key={team.position} 
                            className={`border-border/20 transition-all duration-200 hover:bg-secondary/50 hover:shadow-md ${team.team.includes("Posušje") ? "bg-primary/10 hover:bg-primary/20" : ""}`}
                          >
                            <TableCell className="text-center font-bold text-sm">{team.position}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTeamLogo(team.team) && (
                                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                                    <img src={getTeamLogo(team.team)!} alt="" className={`object-contain ${team.team === "ŽKK Livno" ? "w-9 h-9" : "w-7 h-7"}`} />
                                  </div>
                                )}
                                <span className={`text-sm font-bold ${team.team.includes("Posušje") ? "text-primary" : ""}`}>
                                  {team.team}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-bold text-sm">{team.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </TabsContent>

              {/* Statistics Tab */}
              <TabsContent value="statistics" className="mt-0">
                <div className="bg-secondary/30 rounded-xl border border-border/30 p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 min-h-[700px]">
                  <h3 className="font-display text-2xl md:text-3xl text-center mb-5">PREGLED</h3>

                  {/* Summary cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-xs md:text-sm text-muted-foreground uppercase mb-0.5">Poeni</p>
                      <p className="text-2xl md:text-3xl font-display text-primary">1007</p>
                      <p className="text-xs text-muted-foreground">77.5 / utk.</p>
                    </div>
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-xs md:text-sm text-muted-foreground uppercase mb-0.5">Skokovi</p>
                      <p className="text-2xl md:text-3xl font-display text-foreground">491</p>
                      <p className="text-xs text-muted-foreground">37.8 / utk.</p>
                    </div>
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-xs md:text-sm text-muted-foreground uppercase mb-0.5">Asistencije</p>
                      <p className="text-2xl md:text-3xl font-display text-foreground">210</p>
                      <p className="text-xs text-muted-foreground">16.2 / utk.</p>
                    </div>
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-xs md:text-sm text-muted-foreground uppercase mb-0.5">AST / TO</p>
                      <p className="text-2xl md:text-3xl font-display text-foreground">1.30</p>
                      <p className="text-xs text-muted-foreground">210 / 162</p>
                    </div>
                  </div>

                  {/* Download button */}
                  <div className="flex justify-center mb-6">
                    <button
                      onClick={() => setShowDownloadDialog(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300 font-display text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Preuzmi statistiku
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {/* Shooting */}
                    <div className="hover:scale-[1.02] transition-transform duration-300">
                      <h4 className="font-display text-lg md:text-2xl text-center mb-3">Šut</h4>
                      <div className="space-y-1.5">
                        {[
                          { label: "Iz igre (FG)", value: "386 / 851", avg: "29.7 / 65.5", pct: "45.4%" },
                          { label: "Za 2 poena", value: "242 / 436", avg: "18.6 / 33.5", pct: "55.5%" },
                          { label: "Za 3 poena", value: "124 / 383", avg: "9.5 / 29.5", pct: "32.4%" },
                          { label: "Slobodna bacanja", value: "114 / 197", avg: "8.8 / 15.2", pct: "57.9%" },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/10 hover:bg-background/20 hover:px-1.5 transition-all duration-200 rounded">
                            <span className="text-sm md:text-base text-muted-foreground">{stat.label}</span>
                            <div className="flex items-center gap-2 text-right">
                              <div className="flex flex-col items-end">
                                <span className="text-sm md:text-base font-medium">{stat.value}</span>
                                <span className="text-[10px] md:text-xs text-muted-foreground">{stat.avg} /utk.</span>
                              </div>
                              <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-xs md:text-sm font-bold min-w-[48px] text-center">
                                {stat.pct}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rebounds only */}
                    <div className="hover:scale-[1.02] transition-transform duration-300">
                      <h4 className="font-display text-lg md:text-2xl text-center mb-3">Skokovi</h4>
                      <div className="space-y-1.5">
                        {[
                          { label: "Obrambeni (DR)", total: "365", avg: "28.1" },
                          { label: "Napadački (OR)", total: "126", avg: "9.7" },
                          { label: "Ukupno", total: "491", avg: "37.8" },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/10 hover:bg-background/20 hover:px-1.5 transition-all duration-200 rounded">
                            <span className="text-sm md:text-base text-muted-foreground">{stat.label}</span>
                            <div className="flex flex-col items-end">
                              <span className="text-sm md:text-base font-medium">{stat.total}</span>
                              <span className="text-[10px] md:text-xs text-muted-foreground">{stat.avg} /utk.</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ostalo */}
                    <div className="hover:scale-[1.02] transition-transform duration-300">
                      <h4 className="font-display text-lg md:text-2xl text-center mb-3">Ostalo</h4>
                      <div className="space-y-1.5">
                        {[
                          { label: "Ukradene lopte", total: "95", avg: "7.3" },
                          { label: "Blokade", total: "30", avg: "2.3" },
                          { label: "Izgubljene lopte", total: "162", avg: "12.5" },
                          { label: "Osobne pogreške", total: "265", avg: "20.4" },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/10 hover:bg-background/20 hover:px-1.5 transition-all duration-200 rounded">
                            <span className="text-sm md:text-base text-muted-foreground">{stat.label}</span>
                            <div className="flex flex-col items-end">
                              <span className="text-sm md:text-base font-medium">{stat.total}</span>
                              <span className="text-[10px] md:text-xs text-muted-foreground">{stat.avg} /utk.</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* eFG% and TS% centered below */}
                  <div className="mt-5 mb-4 flex gap-3 justify-center">
                    <div className="bg-background/30 rounded-lg px-5 py-2.5 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-[10px] md:text-xs text-muted-foreground uppercase">eFG%</p>
                       <p className="text-xl md:text-2xl font-display text-primary">52.6%</p>
                    </div>
                    <div className="bg-background/30 rounded-lg px-5 py-2.5 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-[10px] md:text-xs text-muted-foreground uppercase">TS%</p>
                       <p className="text-xl md:text-2xl font-display text-primary">53.7%</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Players Tab */}
              <TabsContent value="players" className="mt-0">
                <div className="bg-secondary/30 rounded-xl border border-border/30 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  {/* Sub-tabs */}
                  <div className="p-3 border-b border-border/30">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setActivePlayersTab("top")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          activePlayersTab === "top" 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "bg-background/30 text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                      >
                        Top igrači
                      </button>
                      <button
                        onClick={() => setActivePlayersTab("squad")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          activePlayersTab === "squad" 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "bg-background/30 text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                      >
                        Roster
                      </button>
                    </div>
                  </div>

                  {activePlayersTab === "squad" ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-border/30">
                            <TableHead className="w-10 md:w-14 text-center text-xs md:text-base font-bold">Broj</TableHead>
                            <TableHead className="w-8 md:w-14 text-xs md:text-base font-bold"></TableHead>
                            <TableHead className="text-xs md:text-base font-bold">Igrač</TableHead>
                            <TableHead className="text-center text-xs md:text-base font-bold">Nac.</TableHead>
                            <TableHead className="text-center text-sm md:text-base font-bold hidden md:table-cell">Visina</TableHead>
                            <TableHead className="text-center text-sm md:text-base font-bold hidden lg:table-cell">Datum rođenja</TableHead>
                            <TableHead className="text-center text-sm md:text-base font-bold hidden md:table-cell">Dob</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {players.map((player, index) => (
                            <TableRow key={index} className="hover:bg-secondary/50 border-border/20 transition-all duration-200 hover:shadow-md group">
                              <TableCell className="font-bold text-primary text-center text-sm md:text-base">{player.number}</TableCell>
                              <TableCell>
                                {player.sofascoreLink ? (
                                  <a 
                                    href={player.sofascoreLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                                    title="Pogledaj na SofaScore"
                                  >
                                    <ExternalLink size={12} className="md:hidden" />
                                    <ExternalLink size={14} className="hidden md:block" />
                                  </a>
                                ) : (
                                  <div className="w-6 h-6 md:w-7 md:h-7" />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 md:gap-3">
                                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary overflow-hidden group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-200 flex-shrink-0">
                                    {player.image ? (
                                      <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                                    ) : (
                                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                                        {player.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-bold text-sm md:text-base">{player.name}</p>
                                    <p className="text-xs md:text-sm text-primary font-medium">{player.position}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center px-1 md:px-4">
                                <div className="flex items-center justify-center gap-0.5 md:gap-1">
                                  {getFlagImage(player.nationality) ? (
                                    <img src={getFlagImage(player.nationality)!} alt={player.nationality} className="w-4 h-4 md:w-6 md:h-6 rounded-full object-cover flex-shrink-0" />
                                  ) : player.nationality !== "-" ? (
                                    <span className="text-xs md:text-base">{getFlagEmoji(player.nationality)}</span>
                                  ) : null}
                                  <span className="text-[10px] md:text-base font-bold hidden sm:inline">{player.nationality}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center text-muted-foreground text-sm md:text-base font-bold hidden md:table-cell">{player.height || "-"}</TableCell>
                              <TableCell className="text-center text-muted-foreground text-sm md:text-base font-bold hidden lg:table-cell">{player.dateOfBirth || "-"}</TableCell>
                              <TableCell className="text-center text-muted-foreground text-sm md:text-base font-bold hidden md:table-cell">{player.age ? `${player.age} god.` : "-"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="p-5">
                      {/* Pagination controls */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <button 
                          onClick={() => setTopPlayersPage(0)}
                          disabled={topPlayersPage === 0}
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <span className="text-sm text-muted-foreground">
                          {topPlayersPage === 0 ? "1 - 6" : "7 - 12"} od 12
                        </span>
                        <button 
                          onClick={() => setTopPlayersPage(1)}
                          disabled={topPlayersPage === 1}
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:gap-4">
                        {allTopCategories.slice(topPlayersPage * 6, (topPlayersPage + 1) * 6).map((category, catIndex) => (
                          <div key={catIndex} className="bg-background/20 rounded-lg p-2 md:p-3 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                            <h4 className="font-display text-xs md:text-base text-center mb-2 md:mb-3 uppercase tracking-wider">{category.title}</h4>
                            <div className="space-y-1 md:space-y-2">
                              {category.data.map((player) => (
                                <div key={player.rank} className="flex items-start md:items-center gap-1 md:gap-2 hover:bg-background/30 p-1 md:p-1.5 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                                  <span className="text-primary font-bold w-3 md:w-4 text-xs md:text-sm mb-0.5 md:mb-0">{player.rank}</span>
                                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-secondary overflow-hidden flex-shrink-0 mb-0.5 md:mb-0">
                                    {player.image ? (
                                      <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                                    ) : (
                                      <div className="w-full h-full bg-muted" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[9px] md:text-sm md:truncate leading-tight whitespace-nowrap">{player.name}</p>
                                    <p className="text-[9px] md:text-xs text-primary">{player.position}</p>
                                  </div>
                                  <span className="self-end text-sm md:text-lg font-display text-primary leading-none pb-0.5 md:pb-0">{player.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Download popup - fixed bottom right */}
      <AnimatePresence>
        {showDownloadDialog && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-3 right-3 md:bottom-5 md:right-5 z-50 w-[243px] md:w-[324px] bg-secondary border border-border/30 rounded-lg shadow-2xl shadow-black/40 overflow-hidden cursor-default"
          >
            <div className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 md:gap-2 flex-1 min-w-0">
                  <FileSpreadsheet className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <h3 className="font-display text-[11px] md:text-[15px] uppercase tracking-wider leading-none">Preuzmi kompletnu statistiku</h3>
                </div>
                <button
                  onClick={() => setShowDownloadDialog(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-2 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[9px] md:text-[11px] text-muted-foreground leading-relaxed mb-2 md:mb-3">
                Kompletna statistika sezone 2025/26 dostupna za preuzimanje — individualni i timski podaci.
              </p>
              <div className="space-y-1 md:space-y-1.5 mb-3 md:mb-4">
                <div className="flex items-center gap-2 p-1.5 md:p-2.5 rounded-md bg-background/40 hover:bg-background/60 hover:shadow-[0_0_18px_rgba(234,179,8,0.12)] border border-transparent hover:border-primary/15 transition-all duration-300">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs font-bold leading-tight">Individualna statistika igrača</p>
                    <p className="text-[8px] md:text-[10px] text-muted-foreground">PPG, RPG, APG, % šuta, minute, blokade...</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1.5 md:p-2.5 rounded-md bg-background/40 hover:bg-background/60 hover:shadow-[0_0_18px_rgba(234,179,8,0.12)] border border-transparent hover:border-primary/15 transition-all duration-300">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs font-bold leading-tight">Timski prosjeci</p>
                    <p className="text-[8px] md:text-[10px] text-muted-foreground">eFG%, TS%, poeni, skokovi, asistencije...</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1.5 md:p-2.5 rounded-md bg-background/40 hover:bg-background/60 hover:shadow-[0_0_18px_rgba(234,179,8,0.12)] border border-transparent hover:border-primary/15 transition-all duration-300">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs font-bold leading-tight">Rezultati utakmica</p>
                    <p className="text-[8px] md:text-[10px] text-muted-foreground">Svih {playedMatches.length} utakmica s datumima i rezultatima</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDownloadStats}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-3.5 md:py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/80 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 transition-all duration-300 font-display text-xs md:text-sm uppercase tracking-wider cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Preuzmi datoteku
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Statistics;
