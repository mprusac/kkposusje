import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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
  { opponent: "HKK Tomislav", logo: logoTomislav, result: "L" as const, homeTeam: "KK Posušje", awayTeam: "HKK Tomislav", homeScore: 81, awayScore: 85 },
  { opponent: "HKK Mostar", logo: logoMostar, result: "L" as const, homeTeam: "HKK Mostar", awayTeam: "KK Posušje", homeScore: 92, awayScore: 78 },
  { opponent: "HKK Široki II", logo: logoSiroki, result: "W" as const, homeTeam: "KK Posušje", awayTeam: "HKK Široki II", homeScore: 79, awayScore: 72 },
  { opponent: "HKK Rama", logo: logoRama, result: "W" as const, homeTeam: "KK Posušje", awayTeam: "HKK Rama", homeScore: 90, awayScore: 77 },
  { opponent: "HKK Grude", logo: logoGrude, result: "L" as const, homeTeam: "HKK Grude", awayTeam: "KK Posušje", homeScore: 60, awayScore: 56 },
  { opponent: "Čapljina", logo: logoCapljina, result: "W" as const, homeTeam: "Čapljina", awayTeam: "KK Posušje", homeScore: 33, awayScore: 107 },
  { opponent: "HKK Ljubuški", logo: logoLjubuski, result: "L" as const, homeTeam: "HKK Ljubuški", awayTeam: "KK Posušje", homeScore: 85, awayScore: 81 },
];

// All matches - upcoming first, then played from newest to oldest
const matches: Match[] = [
  // Upcoming matches
  { id: 8, date: "08.02.2026", time: "19:00", homeTeam: "HKK Tomislav", awayTeam: "KK Posušje", isUpcoming: true, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:15014499" },
  { id: 9, date: "15.02.2026", time: "19:00", homeTeam: "KK Posušje", awayTeam: "HKK Mostar", isUpcoming: true, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014506" },
  { id: 10, date: "22.02.2026", time: "19:00", homeTeam: "HKK Široki II", awayTeam: "KK Posušje", isUpcoming: true, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014507" },
  { id: 11, date: "01.03.2026", time: "19:00", homeTeam: "HKK Rama", awayTeam: "KK Posušje", isUpcoming: true, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014515" },
  { id: 12, date: "08.03.2026", time: "19:00", homeTeam: "KK Posušje", awayTeam: "HKK Grude", isUpcoming: true, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014517" },
  { id: 13, date: "15.03.2026", time: "19:00", homeTeam: "Čapljina", awayTeam: "KK Posušje", isUpcoming: true, sofascoreLink: "https://www.sofascore.com/basketball/match/kk-posusje-hkk-capljina/nOHcsTEid#id:15014535" },
  { id: 14, date: "22.03.2026", time: "19:00", homeTeam: "KK Posušje", awayTeam: "HKK Ljubuški", isUpcoming: true, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-ljubuski-kk-posusje/TEidsOiOi#id:15014542" },
  // Played matches (newest first)
  { id: 1, date: "14.12.2025", homeTeam: "HKK Ljubuški", awayTeam: "KK Posušje", homeScore: 85, awayScore: 81, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-ljubuski-kk-posusje/TEidsOiOi#id:15014496" },
  { id: 2, date: "07.12.2025", homeTeam: "Čapljina", awayTeam: "KK Posušje", homeScore: 33, awayScore: 107, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/kk-posusje-hkk-capljina/nOHcsTEid#id:15185580" },
  { id: 3, date: "30.11.2025", homeTeam: "HKK Grude", awayTeam: "KK Posušje", homeScore: 60, awayScore: 56, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014486" },
  { id: 4, date: "23.11.2025", homeTeam: "KK Posušje", awayTeam: "HKK Rama", homeScore: 90, awayScore: 77, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014481" },
  { id: 5, date: "15.11.2025", homeTeam: "KK Posušje", awayTeam: "HKK Široki II", homeScore: 79, awayScore: 72, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014461" },
  { id: 6, date: "09.11.2025", homeTeam: "HKK Mostar", awayTeam: "KK Posušje", homeScore: 92, awayScore: 78, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014458" },
  { id: 7, date: "02.11.2025", homeTeam: "KK Posušje", awayTeam: "HKK Tomislav", homeScore: 81, awayScore: 85, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:14973017" },
];

// Standings data
const standings: Standing[] = [
  { position: 1, team: "HKK Ljubuški", played: 7, won: 6, lost: 1, diff: 89, last5: ["W", "W", "W", "L", "W"], points: 13 },
  { position: 2, team: "HKK Grude", played: 7, won: 6, lost: 1, diff: 71, last5: ["W", "W", "W", "W", "W"], points: 13 },
  { position: 3, team: "HKK Mostar", played: 7, won: 5, lost: 2, diff: 95, last5: ["L", "L", "W", "W", "W"], points: 12 },
  { position: 4, team: "HKK Tomislav", played: 7, won: 3, lost: 4, diff: -6, last5: ["L", "W", "L", "L", "L"], points: 10 },
  { position: 5, team: "KK Posušje", played: 7, won: 3, lost: 4, diff: 68, last5: ["W", "W", "L", "W", "L"], points: 10 },
  { position: 6, team: "HKK Rama", played: 7, won: 3, lost: 4, diff: 15, last5: ["W", "L", "W", "L", "W"], points: 10 },
  { position: 7, team: "HKK Široki II", played: 6, won: 1, lost: 5, diff: -16, last5: ["L", "L", "L", "L", "W"], points: 7 },
  { position: 8, team: "Čapljina", played: 6, won: 0, lost: 6, diff: -316, last5: ["L", "L", "L", "L", "L"], points: 6 },
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
  { number: "09", name: "Ante Kovač", position: "Krilo", nationality: "BIH", height: "-", dateOfBirth: "-", age: undefined, image: playerKovac, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-kovac/1578849" },
  { number: "13", name: "Ante Begić", position: "Krilo", nationality: "BIH", height: "-", dateOfBirth: "-", age: undefined, image: playerBegic, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-begic/2046150" },
  { number: "04", name: "Josip Ramljak", position: "Bek", nationality: "BIH", height: "-", dateOfBirth: "-", age: undefined, image: playerRamljak, sofascoreLink: "https://www.sofascore.com/basketball/player/josip-ramljak/1578845" },
  { number: "13", name: "Mirko Đerek", position: "Centar", nationality: "HRV", height: "-", dateOfBirth: "25/06/1990", age: 34, image: playerDerek, sofascoreLink: "https://www.sofascore.com/basketball/player/mirko-derek/1578853" },
  { number: "18", name: "Marko Protrka", position: "Centar", nationality: "BIH", height: "-", dateOfBirth: "21/01/2007", age: 17, image: playerProtrka, sofascoreLink: "https://www.sofascore.com/basketball/player/marko-protrka/1578855" },
  { number: "08", name: "Luka Bašić", position: "Bek", nationality: "BIH", height: "-", dateOfBirth: "15/07/2007", age: 17, image: playerBasicLuka, sofascoreLink: "https://www.sofascore.com/basketball/player/luka-basic/1965464" },
  { number: "12", name: "Josip Pavković", position: "Bek", nationality: "BIH", height: "-", dateOfBirth: "-", age: undefined, image: playerPavkovic, sofascoreLink: "https://www.sofascore.com/basketball/player/josip-pavkovic/1845527" },
  { number: "06", name: "David Dragoja", position: "Bek", nationality: "BIH", height: "-", dateOfBirth: "05/09/2007", age: 17, sofascoreLink: "https://www.sofascore.com/basketball/player/david-dragoja/2078664" },
  { number: "05", name: "Stipe Bešlić", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/stipe-beslic/2339336" },
  { number: "10", name: "Luka Ramljak", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/luka-ramljak/2364289" },
  { number: "07", name: "Jakov Ramljak", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/jakov-ramljak/1578854" },
  { number: "15", name: "Ivan Ramljak", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/ivan-ramljak/2339345" },
  { number: "14", name: "Marko Petrović", position: "Krilo", nationality: "-", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/marko-petrovic/2358568" },
  { number: "15", name: "Ante Pišković", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-piskovic/2364287" },
  { number: "14", name: "Ante Ramljak", position: "Bek", nationality: "HRV", height: "-", dateOfBirth: "-", age: undefined, sofascoreLink: "https://www.sofascore.com/basketball/player/ante-ramljak/2339280" },
];

// Top players data
const topScorers: TopPlayer[] = [
  { rank: 1, name: "Ante Kovač", position: "Krilo", value: 21, image: playerKovac },
  { rank: 2, name: "Ante Begić", position: "Krilo", value: 16, image: playerBegic },
  { rank: 3, name: "Josip Ramljak", position: "Bek", value: 14, image: playerRamljak },
];

const topRebounders: TopPlayer[] = [
  { rank: 1, name: "Ante Begić", position: "Krilo", value: 7, image: playerBegic },
  { rank: 2, name: "Marko Protrka", position: "Centar", value: 6, image: playerProtrka },
  { rank: 3, name: "Ante Kovač", position: "Krilo", value: 6, image: playerKovac },
];

const topAssisters: TopPlayer[] = [
  { rank: 1, name: "Josip Ramljak", position: "Bek", value: 5, image: playerRamljak },
  { rank: 2, name: "Ante Begić", position: "Krilo", value: 4, image: playerBegic },
  { rank: 3, name: "Mirko Đerek", position: "Centar", value: 2, image: playerDerek },
];

const topMinutes: TopPlayer[] = [
  { rank: 1, name: "Ante Kovač", position: "Krilo", value: "32:00", image: playerKovac },
  { rank: 2, name: "Josip Ramljak", position: "Bek", value: "28:00", image: playerRamljak },
  { rank: 3, name: "Ante Begić", position: "Krilo", value: "26:00", image: playerBegic },
];

const Statistics = () => {
  const [activeMainTab, setActiveMainTab] = useState("standings");
  const [activePlayersTab, setActivePlayersTab] = useState("squad");
  const [matchPage, setMatchPage] = useState(0);
  const [hoveredFormIndex, setHoveredFormIndex] = useState<number | null>(null);
  const [leagueCategory, setLeagueCategory] = useState<"seniori" | "seniorke">("seniori");
  
  // Sort matches: 1 upcoming first, then played from newest to oldest
  const upcomingMatches = matches.filter(m => m.isUpcoming);
  const playedMatches = matches.filter(m => !m.isUpcoming);
  
  // Combine all matches: 1 upcoming first, then played
  const allMatchesOrdered = [...upcomingMatches.slice(0, 1), ...playedMatches, ...upcomingMatches.slice(1)];
  
  // Paginate: 5 matches per page
  const matchesPerPage = 5;
  const totalPages = Math.ceil(allMatchesOrdered.length / matchesPerPage);
  const displayedMatches = allMatchesOrdered.slice(matchPage * matchesPerPage, (matchPage + 1) * matchesPerPage);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary/50 border-b border-border/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mr-auto"
            >
              <ArrowLeft size={18} />
              <span className="font-medium text-sm">Natrag</span>
            </Link>
            <div className="flex items-end gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:ml-4">
              <img src={logoPosusje} alt="KK Posušje" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="font-display text-lg text-foreground leading-none">KK Posušje</h1>
                <div className="flex items-end gap-1 pb-0.5">
                  <img src={logoKSHB} alt="KSHB" className="w-3 h-3 object-contain" />
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column - Form & Games */}
          <div className="lg:col-span-3 space-y-5">
            {/* Recent Form */}
            <div className="bg-secondary/30 rounded-xl p-3 border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <h3 className="font-display text-base text-foreground mb-3 text-center">Nedavna forma</h3>
              
              {/* Dynamic text - changes on hover */}
              <p className="text-[10px] text-muted-foreground text-center mb-2 h-4 transition-all duration-200">
                {hoveredFormIndex !== null 
                  ? `${formData[hoveredFormIndex].homeTeam} ${formData[hoveredFormIndex].homeScore} - ${formData[hoveredFormIndex].awayScore} ${formData[hoveredFormIndex].awayTeam}`
                  : "Prelazite iznad stupca za detalje"
                }
              </p>
              
              {/* Team logos */}
              <div className="flex gap-1 mb-2 justify-center">
                {formData.map((game, index) => (
                  <div 
                    key={index} 
                    className="w-7 h-7 rounded-full bg-background/50 flex items-center justify-center p-0.5 hover:scale-110 transition-transform cursor-pointer" 
                    title={game.opponent}
                    onMouseEnter={() => setHoveredFormIndex(index)}
                    onMouseLeave={() => setHoveredFormIndex(null)}
                  >
                    <img src={game.logo} alt={game.opponent} className="w-5 h-5 object-contain" />
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
            <div className="bg-secondary/30 rounded-xl border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="p-2 border-b border-border/30">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setMatchPage(p => Math.max(0, p - 1))}
                    disabled={matchPage === 0}
                    className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <h3 className="font-display text-base text-foreground">Utakmice</h3>
                  <button 
                    onClick={() => setMatchPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={matchPage >= totalPages - 1}
                    className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-border/20">
                {displayedMatches.map((match) => {
                  const result = getMatchResult(match);
                  const homeLogo = getTeamLogo(match.homeTeam);
                  const awayLogo = getTeamLogo(match.awayTeam);
                  
                  const matchContent = (
                    <div className={`px-2 py-[7px] hover:bg-secondary/50 transition-all duration-200 ${!match.isUpcoming ? 'cursor-pointer hover:shadow-md' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span>{match.date}</span>
                            {match.time && <span>{match.time}</span>}
                            {!match.isUpcoming && <span className="text-muted-foreground/60">FT</span>}
                          </div>
                          
                          {/* Home Team */}
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="flex items-center gap-1.5">
                              {homeLogo && <img src={homeLogo} alt="" className="w-4 h-4 object-contain" />}
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
                              {awayLogo && <img src={awayLogo} alt="" className="w-4 h-4 object-contain" />}
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
                          <div className="ml-2 flex items-center self-center">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                              result === "W" ? "bg-green-500" : "bg-red-500"
                            }`}>
                              {result}
                            </span>
                          </div>
                        )}
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
              </div>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-9">
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
              <TabsList className="w-full bg-secondary/30 border border-border/30 rounded-xl p-1 mb-5 hover:shadow-lg transition-shadow duration-300">
                <TabsTrigger value="standings" className="flex-1 font-display text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
                  Poredak
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex-1 font-display text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
                  Statistika
                </TabsTrigger>
                <TabsTrigger value="players" className="flex-1 font-display text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
                  Igrači
                </TabsTrigger>
              </TabsList>

              {/* Standings Tab */}
              <TabsContent value="standings" className="mt-0">
                <div className="bg-secondary/30 rounded-xl border border-border/30 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="p-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <img src={logoKSHB} alt="" className="w-5 h-5 object-contain" />
                      <span className="text-xs text-foreground">Liga Košarkaškog saveza Herceg Bosne</span>
                      <span className="text-[10px] text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded">25/26</span>
                      <Select value={leagueCategory} onValueChange={(v) => setLeagueCategory(v as "seniori" | "seniorke")}>
                        <SelectTrigger className="w-24 h-7 text-xs bg-background/50 border-border/30 ml-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary border-border/50">
                          <SelectItem value="seniori">Seniori</SelectItem>
                          <SelectItem value="seniorke">Seniorke</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {leagueCategory === "seniori" ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/30">
                          <TableHead className="w-10 text-center text-sm font-bold">#</TableHead>
                          <TableHead className="text-sm font-bold">Ekipa</TableHead>
                          <TableHead className="text-center w-10 text-sm font-bold">UT</TableHead>
                          <TableHead className="text-center w-10 text-sm font-bold">W</TableHead>
                          <TableHead className="text-center w-10 text-sm font-bold">L</TableHead>
                          <TableHead className="text-center w-14 text-sm font-bold">+/-</TableHead>
                          <TableHead className="text-center w-28 text-sm font-bold">Zadnjih 5</TableHead>
                          <TableHead className="text-center w-14 text-sm font-bold">BOD</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {standings.map((team) => (
                          <TableRow 
                            key={team.position} 
                            className={`border-border/20 transition-all duration-200 hover:bg-secondary/50 hover:shadow-md ${team.team === "KK Posušje" ? "bg-primary/10 hover:bg-primary/20" : ""}`}
                          >
                            <TableCell className="text-center font-bold text-sm">{team.position}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTeamLogo(team.team) && (
                                  <img src={getTeamLogo(team.team)!} alt="" className="w-7 h-7 object-contain" />
                                )}
                                <span className={`text-sm font-bold ${team.team === "KK Posušje" ? "text-primary" : ""}`}>
                                  {team.team}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center text-sm font-bold">{team.played}</TableCell>
                            <TableCell className="text-center text-sm font-bold">{team.won}</TableCell>
                            <TableCell className="text-center text-sm font-bold">{team.lost}</TableCell>
                            <TableCell className={`text-center text-sm font-bold ${team.diff > 0 ? "text-green-400" : team.diff < 0 ? "text-red-400" : ""}`}>
                              {team.diff > 0 ? `+${team.diff}` : team.diff}
                            </TableCell>
                            <TableCell className="text-center">
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
                            <TableCell className="text-center font-bold text-sm">{team.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
                                  <img src={getTeamLogo(team.team)!} alt="" className="w-7 h-7 object-contain" />
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
                <div className="bg-secondary/30 rounded-xl border border-border/30 p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  {/* Summary */}
                  <h3 className="font-display text-base text-center mb-5">Pregled</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-[10px] text-muted-foreground uppercase mb-0.5">Poeni</p>
                      <p className="text-xl font-display text-primary">572</p>
                      <p className="text-[10px] text-muted-foreground">#5</p>
                    </div>
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-[10px] text-muted-foreground uppercase mb-0.5">Primljeno</p>
                      <p className="text-xl font-display text-foreground">504</p>
                      <p className="text-[10px] text-muted-foreground">#4</p>
                    </div>
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-[10px] text-muted-foreground uppercase mb-0.5">Asistencije</p>
                      <p className="text-xl font-display text-foreground">87</p>
                      <p className="text-[10px] text-muted-foreground">#5</p>
                    </div>
                    <div className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                      <p className="text-[10px] text-muted-foreground uppercase mb-0.5">Asist./Izgublj.</p>
                      <p className="text-xl font-display text-foreground">1.2</p>
                      <p className="text-[10px] text-muted-foreground">#3</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Offense */}
                    <div className="hover:scale-[1.02] transition-transform duration-300">
                      <h4 className="font-display text-sm text-center mb-3">Napad</h4>
                      <div className="space-y-1.5">
                        {[
                          { label: "Pogođeni šutevi", value: "203", rank: 5 },
                          { label: "Pokušaji šuta", value: "478", rank: 6 },
                          { label: "Postotak šuta", value: "42.5%", rank: 4 },
                          { label: "Pogođene trice", value: "67", rank: 4 },
                          { label: "Pokušaji za 3", value: "189", rank: 5 },
                          { label: "Postotak za 3", value: "35.4%", rank: 3 },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/10 hover:bg-background/20 hover:px-1.5 transition-all duration-200 rounded">
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium">{stat.value}</span>
                              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">
                                {stat.rank}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Defense & Rebounds */}
                    <div className="hover:scale-[1.02] transition-transform duration-300">
                      <h4 className="font-display text-sm text-center mb-3">Skokovi (po utakmici)</h4>
                      <div className="space-y-1.5 mb-5">
                        {[
                          { label: "Napadački", value: "28", rank: 4 },
                          { label: "Obrambeni", value: "79", rank: 3 },
                          { label: "Ukupno", value: "107", rank: 4 },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/10 hover:bg-background/20 hover:px-1.5 transition-all duration-200 rounded">
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium">{stat.value}</span>
                              <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-[10px] flex items-center justify-center font-bold">
                                {stat.rank}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="font-display text-sm text-center mb-3">Obrana</h4>
                      <div className="space-y-1.5">
                        {[
                          { label: "Blokade", value: "14", rank: 5 },
                          { label: "Ukradene lopte", value: "52", rank: 3 },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/10 hover:bg-background/20 hover:px-1.5 transition-all duration-200 rounded">
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium">{stat.value}</span>
                              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center font-bold">
                                {stat.rank}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
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
                        onClick={() => setActivePlayersTab("squad")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          activePlayersTab === "squad" 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "bg-background/30 text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                      >
                        Roster
                      </button>
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
                    </div>
                  </div>

                  {activePlayersTab === "squad" ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/30">
                          <TableHead className="w-14 text-center text-base font-bold">Broj</TableHead>
                          <TableHead className="w-14 text-base font-bold"></TableHead>
                          <TableHead className="text-base font-bold">Igrač</TableHead>
                          <TableHead className="text-center text-base font-bold">Nacionalnost</TableHead>
                          <TableHead className="text-center text-base font-bold">Visina</TableHead>
                          <TableHead className="text-center text-base font-bold">Datum rođenja</TableHead>
                          <TableHead className="text-center text-base font-bold">Dob</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {players.map((player, index) => (
                          <TableRow key={index} className="hover:bg-secondary/50 border-border/20 transition-all duration-200 hover:shadow-md group">
                            <TableCell className="font-bold text-primary text-center text-base">{player.number}</TableCell>
                            <TableCell>
                              {player.sofascoreLink ? (
                                <a 
                                  href={player.sofascoreLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                                  title="Pogledaj na SofaScore"
                                >
                                  <ExternalLink size={14} />
                                </a>
                              ) : (
                                <div className="w-7 h-7" />
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-200">
                                  {player.image ? (
                                    <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                                  ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                                      {player.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-bold text-base">{player.name}</p>
                                  <p className="text-sm text-primary font-medium">{player.position}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {getFlagImage(player.nationality) ? (
                                  <img src={getFlagImage(player.nationality)!} alt={player.nationality} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                                ) : player.nationality !== "-" ? (
                                  <span className="text-base">{getFlagEmoji(player.nationality)}</span>
                                ) : null}
                                <span className="text-base font-bold">{player.nationality}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center text-muted-foreground text-base font-bold">{player.height || "-"}</TableCell>
                            <TableCell className="text-center text-muted-foreground text-base font-bold">{player.dateOfBirth || "-"}</TableCell>
                            <TableCell className="text-center text-muted-foreground text-base font-bold">{player.age ? `${player.age} god.` : "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-5 grid md:grid-cols-2 gap-5">
                      {/* Points */}
                      <div className="bg-background/20 rounded-lg p-3 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                        <h4 className="font-display text-sm text-center mb-3">Poeni</h4>
                        <div className="space-y-2">
                          {topScorers.map((player) => (
                            <div key={player.rank} className="flex items-center gap-2 hover:bg-background/30 p-1.5 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                              <span className="text-primary font-bold w-3 text-xs">{player.rank}</span>
                              <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
                                {player.image ? (
                                  <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                                ) : (
                                  <div className="w-full h-full bg-muted" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-xs">{player.name}</p>
                                <p className="text-[10px] text-primary">{player.position}</p>
                              </div>
                              <span className="text-base font-display text-primary">{player.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rebounds */}
                      <div className="bg-background/20 rounded-lg p-3 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                        <h4 className="font-display text-sm text-center mb-3">Skokovi</h4>
                        <div className="space-y-2">
                          {topRebounders.map((player) => (
                            <div key={player.rank} className="flex items-center gap-2 hover:bg-background/30 p-1.5 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                              <span className="text-primary font-bold w-3 text-xs">{player.rank}</span>
                              <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
                                {player.image ? (
                                  <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                                ) : (
                                  <div className="w-full h-full bg-muted" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-xs">{player.name}</p>
                                <p className="text-[10px] text-primary">{player.position}</p>
                              </div>
                              <span className="text-base font-display text-primary">{player.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assists */}
                      <div className="bg-background/20 rounded-lg p-3 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                        <h4 className="font-display text-sm text-center mb-3">Asistencije</h4>
                        <div className="space-y-2">
                          {topAssisters.map((player) => (
                            <div key={player.rank} className="flex items-center gap-2 hover:bg-background/30 p-1.5 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                              <span className="text-primary font-bold w-3 text-xs">{player.rank}</span>
                              <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
                                {player.image ? (
                                  <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                                ) : (
                                  <div className="w-full h-full bg-muted" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-xs">{player.name}</p>
                                <p className="text-[10px] text-primary">{player.position}</p>
                              </div>
                              <span className="text-base font-display text-primary">{player.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Minutes */}
                      <div className="bg-background/20 rounded-lg p-3 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                        <h4 className="font-display text-sm text-center mb-3">Minute</h4>
                        <div className="space-y-2">
                          {topMinutes.map((player) => (
                            <div key={player.rank} className="flex items-center gap-2 hover:bg-background/30 p-1.5 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                              <span className="text-primary font-bold w-3 text-xs">{player.rank}</span>
                              <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
                                {player.image ? (
                                  <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                                ) : (
                                  <div className="w-full h-full bg-muted" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-xs">{player.name}</p>
                                <p className="text-[10px] text-primary">{player.position}</p>
                              </div>
                              <span className="text-base font-display text-primary">{player.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Statistics;
