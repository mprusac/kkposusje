import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

// Import player images
import playerRamljak from "@/assets/player-ramljak.png";
import playerKovac from "@/assets/player-kovac-new.png";
import playerDerek from "@/assets/player-derek.png";
import playerProtrka from "@/assets/player-protrka.png";
import playerBegic from "@/assets/player-begic.png";
import playerPavkovic from "@/assets/player-pavkovic-new.png";
import playerBasicLuka from "@/assets/player-basic-luka.png";

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
  "HŽKK Posušje": logoPosusje,
  "Čapljina": logoCapljina,
  "HKK Čapljina": logoCapljina,
  "ŽKK Zrinjski 2010": logoMostar,
  "ŽKK Livno": logoSiroki,
  "HŽKK Tomislav": logoTomislav,
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
  { id: 8, date: "08.02.2026", time: "19:00", homeTeam: "HKK Tomislav", awayTeam: "KK Posušje", isUpcoming: true },
  { id: 9, date: "15.02.2026", time: "19:00", homeTeam: "KK Posušje", awayTeam: "HKK Mostar", isUpcoming: true },
  { id: 10, date: "22.02.2026", time: "19:00", homeTeam: "HKK Široki II", awayTeam: "KK Posušje", isUpcoming: true },
  { id: 11, date: "01.03.2026", time: "19:00", homeTeam: "HKK Rama", awayTeam: "KK Posušje", isUpcoming: true },
  { id: 12, date: "08.03.2026", time: "19:00", homeTeam: "KK Posušje", awayTeam: "HKK Grude", isUpcoming: true },
  { id: 13, date: "15.03.2026", time: "19:00", homeTeam: "Čapljina", awayTeam: "KK Posušje", isUpcoming: true },
  { id: 14, date: "22.03.2026", time: "19:00", homeTeam: "KK Posušje", awayTeam: "HKK Ljubuški", isUpcoming: true },
  // Played matches (newest first)
  { id: 1, date: "14.12.2025", homeTeam: "HKK Ljubuški", awayTeam: "KK Posušje", homeScore: 85, awayScore: 81, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hkk-ljubuski-kk-posusje/LdbsLdb#id:12927623" },
  { id: 2, date: "07.12.2025", homeTeam: "Čapljina", awayTeam: "KK Posušje", homeScore: 33, awayScore: 107, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hkk-capljina-lasta-kk-posusje/EdbsEdb#id:12927578" },
  { id: 3, date: "30.11.2025", homeTeam: "HKK Grude", awayTeam: "KK Posušje", homeScore: 60, awayScore: 56, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hkk-grude-kk-posusje/VdbsKdb#id:12927554" },
  { id: 4, date: "23.11.2025", homeTeam: "KK Posušje", awayTeam: "HKK Rama", homeScore: 90, awayScore: 77, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/kk-posusje-hkk-rama/KdbsWdb#id:12927530" },
  { id: 5, date: "15.11.2025", homeTeam: "KK Posušje", awayTeam: "HKK Široki II", homeScore: 79, awayScore: 72, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/kk-posusje-hkk-siroki-brijeg-ii/KdbsSdb#id:12925929" },
  { id: 6, date: "09.11.2025", homeTeam: "HKK Mostar", awayTeam: "KK Posušje", homeScore: 92, awayScore: 78, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/hkk-mostar-kk-posusje/UdbsKdb#id:12925870" },
  { id: 7, date: "02.11.2025", homeTeam: "KK Posušje", awayTeam: "HKK Tomislav", homeScore: 81, awayScore: 85, isUpcoming: false, sofascoreLink: "https://www.sofascore.com/kk-posusje-hkk-tomislav/KdbsTdb#id:12925845" },
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

// Players roster - from Team.tsx
const players: Player[] = [
  { number: "09", name: "Ante Kovač", position: "Krilo", nationality: "BIH", height: "190 cm", dateOfBirth: "30.05.2001", age: 24, image: playerKovac, sofascoreLink: "https://www.sofascore.com/player/ante-kovac/1112283" },
  { number: "13", name: "Ante Begić", position: "Krilo", nationality: "BIH", height: "205 cm", image: playerBegic, sofascoreLink: "https://www.sofascore.com/player/ante-begic/1230556" },
  { number: "04", name: "Josip Ramljak", position: "Bek", nationality: "BIH", height: "190 cm", dateOfBirth: "18.08.2000", age: 25, image: playerRamljak, sofascoreLink: "https://www.sofascore.com/player/josip-ramljak/1112282" },
  { number: "13", name: "Mirko Đerek", position: "Centar", nationality: "HRV", dateOfBirth: "25.06.1990", age: 35, image: playerDerek, sofascoreLink: "https://www.sofascore.com/player/mirko-derek/242918" },
  { number: "18", name: "Marko Protrka", position: "Centar", nationality: "BIH", dateOfBirth: "21.01.2007", age: 18, image: playerProtrka, sofascoreLink: "https://www.sofascore.com/player/marko-protrka/1278282" },
  { number: "08", name: "Luka Bašić", position: "Bek", nationality: "BIH", height: "198 cm", image: playerBasicLuka, sofascoreLink: "https://www.sofascore.com/player/luka-basic/1230554" },
  { number: "12", name: "Josip Pavković", position: "Krilo", nationality: "BIH", height: "201 cm", image: playerPavkovic, sofascoreLink: "https://www.sofascore.com/player/josip-pavkovic/1175655" },
  { number: "06", name: "David Dragoja", position: "Bek", nationality: "BIH", dateOfBirth: "05.09.2007", age: 18, sofascoreLink: "https://www.sofascore.com/player/david-dragoja/1278284" },
  { number: "05", name: "Stipe Bešlić", position: "Bek", nationality: "BIH", sofascoreLink: "https://www.sofascore.com/player/stipe-beslic/1278286" },
  { number: "10", name: "Luka Ramljak", position: "Bek", nationality: "BIH", sofascoreLink: "https://www.sofascore.com/player/luka-ramljak/1278285" },
  { number: "07", name: "Jakov Ramljak", position: "Bek", nationality: "BIH", sofascoreLink: "https://www.sofascore.com/player/jakov-ramljak/1230558" },
  { number: "15", name: "Ivan Ramljak", position: "Bek", nationality: "BIH", sofascoreLink: "https://www.sofascore.com/player/ivan-ramljak/1278287" },
  { number: "14", name: "Marko Petrović", position: "Krilo", nationality: "BIH", sofascoreLink: "https://www.sofascore.com/player/marko-petrovic/1278283" },
  { number: "15", name: "Ante Pišković", position: "Bek", nationality: "BIH", sofascoreLink: "https://www.sofascore.com/player/ante-piskovic/1278288" },
  { number: "14", name: "Ante Ramljak", position: "Bek", nationality: "BIH", height: "189 cm", sofascoreLink: "https://www.sofascore.com/player/ante-ramljak/1278281" },
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
  const [showFormInfo, setShowFormInfo] = useState(false);
  
  // Sort matches: 1 upcoming first, then played from newest to oldest
  const upcomingMatches = matches.filter(m => m.isUpcoming);
  const playedMatches = matches.filter(m => !m.isUpcoming);
  
  // First page: 1 upcoming + all played, second page: rest of upcoming
  const firstPageMatches = [...upcomingMatches.slice(0, 1), ...playedMatches];
  const secondPageMatches = upcomingMatches.slice(1);
  
  const displayedMatches = matchPage === 0 ? firstPageMatches : secondPageMatches;
  const totalPages = secondPageMatches.length > 0 ? 2 : 1;

  const getTeamLogo = (teamName: string) => teamLogos[teamName] || null;

  const getMatchResult = (match: Match) => {
    if (match.isUpcoming) return null;
    const isPosusjeHome = match.homeTeam.includes("Posušje");
    const posusjeScore = isPosusjeHome ? match.homeScore : match.awayScore;
    const opponentScore = isPosusjeHome ? match.awayScore : match.homeScore;
    return posusjeScore! > opponentScore! ? "W" : "L";
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
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary/50 border-b border-border/50 sticky top-0 z-50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Natrag</span>
              </Link>
              <div className="flex items-center gap-3">
                <img src={logoPosusje} alt="KK Posušje" className="w-10 h-10" />
                <div>
                  <h1 className="font-display text-xl text-foreground">KK Posušje</h1>
                  <div className="flex items-center gap-2">
                    <img src={logoKSHB} alt="KSHB" className="w-4 h-4 object-contain" />
                    <p className="text-xs text-muted-foreground">Liga Košarkaškog saveza Herceg Bosne</p>
                  </div>
                </div>
              </div>
              <h2 className="font-display text-2xl text-primary hidden md:block ml-auto">STATISTIKA</h2>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Mobile Title */}
          <h2 className="font-display text-2xl text-primary text-center mb-6 md:hidden">STATISTIKA</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Form & Games */}
            <div className="lg:col-span-3 space-y-6">
              {/* Recent Form */}
              <div className="bg-secondary/30 rounded-xl p-4 border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg text-foreground">Nedavna forma</h3>
                  <Tooltip open={showFormInfo} onOpenChange={setShowFormInfo}>
                    <TooltipTrigger asChild>
                      <button 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onMouseEnter={() => setShowFormInfo(true)}
                        onMouseLeave={() => setShowFormInfo(false)}
                      >
                        <Info size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs bg-secondary border border-border/50 p-3">
                      <p className="text-sm text-foreground">
                        Visina stupca predstavlja učinak ekipe u odnosu na vjerojatnost pobjede. 
                        Što je stupac viši, to je ishod neočekivaniji. Zelena boja označava pobjede, a crvena poraze.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                {/* Result display on hover */}
                <div className="h-6 mb-2 text-center">
                  {hoveredFormIndex !== null ? (
                    <p className="text-sm text-foreground animate-fade-in">
                      {formData[hoveredFormIndex].homeTeam} {formData[hoveredFormIndex].homeScore} - {formData[hoveredFormIndex].awayScore} {formData[hoveredFormIndex].awayTeam}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Prijeđi mišem preko stupaca za rezultate</p>
                  )}
                </div>
                
                {/* Team logos */}
                <div className="flex gap-1 mb-2 justify-center">
                  {formData.map((game, index) => (
                    <div 
                      key={index} 
                      className="w-8 h-8 rounded-full bg-background/50 flex items-center justify-center p-1 hover:scale-110 transition-transform cursor-pointer" 
                      title={game.opponent}
                      onMouseEnter={() => setHoveredFormIndex(index)}
                      onMouseLeave={() => setHoveredFormIndex(null)}
                    >
                      <img src={game.logo} alt={game.opponent} className="w-6 h-6 object-contain" />
                    </div>
                  ))}
                </div>
                
                {/* Win/Loss bars */}
                <div className="flex gap-1 justify-center">
                  {formData.map((game, index) => (
                    <div
                      key={index}
                      className={`w-8 h-6 rounded cursor-pointer transition-all duration-200 hover:scale-110 ${
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
                <div className="p-4 border-b border-border/30">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setMatchPage(p => Math.max(0, p - 1))}
                      disabled={matchPage === 0}
                      className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <h3 className="font-display text-lg text-foreground">Utakmice</h3>
                    <button 
                      onClick={() => setMatchPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={matchPage >= totalPages - 1}
                      className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-4 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <img src={logoKSHB} alt="Liga" className="w-6 h-6 object-contain" />
                    <span className="text-sm text-foreground">Liga Košarkaškog saveza Herceg Bosne</span>
                  </div>
                </div>

                <div className="divide-y divide-border/20">
                  {displayedMatches.map((match) => {
                    const result = getMatchResult(match);
                    const homeLogo = getTeamLogo(match.homeTeam);
                    const awayLogo = getTeamLogo(match.awayTeam);
                    
                    const matchContent = (
                      <div className={`p-3 hover:bg-secondary/50 transition-all duration-200 ${!match.isUpcoming ? 'cursor-pointer hover:shadow-md' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                              <span>{match.date}</span>
                              {match.time && <span>{match.time}</span>}
                              {!match.isUpcoming && <span className="text-muted-foreground/60">FT</span>}
                            </div>
                            
                            {/* Home Team */}
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                {homeLogo && <img src={homeLogo} alt="" className="w-5 h-5 object-contain" />}
                                <span className={`text-sm ${match.homeTeam.includes("Posušje") ? "text-primary font-medium" : "text-foreground"}`}>
                                  {match.homeTeam}
                                </span>
                              </div>
                              {!match.isUpcoming && (
                                <span className={`text-sm font-medium ${match.homeScore! > match.awayScore! ? "text-foreground" : "text-muted-foreground"}`}>
                                  {match.homeScore}
                                </span>
                              )}
                            </div>
                            
                            {/* Away Team */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {awayLogo && <img src={awayLogo} alt="" className="w-5 h-5 object-contain" />}
                                <span className={`text-sm ${match.awayTeam.includes("Posušje") ? "text-primary font-medium" : "text-foreground"}`}>
                                  {match.awayTeam}
                                </span>
                              </div>
                              {!match.isUpcoming && (
                                <span className={`text-sm font-medium ${match.awayScore! > match.homeScore! ? "text-foreground" : "text-muted-foreground"}`}>
                                  {match.awayScore}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-3 flex items-center">
                            {result && (
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                result === "W" ? "bg-green-500" : "bg-red-500"
                              }`}>
                                {result}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                    
                    return match.isUpcoming ? (
                      <div key={match.id}>{matchContent}</div>
                    ) : (
                      <a 
                        key={match.id} 
                        href={match.sofascoreLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {matchContent}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Tabs */}
            <div className="lg:col-span-9">
              <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
                <TabsList className="w-full bg-secondary/30 border border-border/30 rounded-xl p-1 mb-6 hover:shadow-lg transition-shadow duration-300">
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
                    <div className="p-4 border-b border-border/30">
                      <div className="flex items-center gap-3">
                        <img src={logoKSHB} alt="" className="w-6 h-6 object-contain" />
                        <span className="text-sm text-foreground">Liga Košarkaškog saveza Herceg Bosne</span>
                        <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">25/26</span>
                        <div className="ml-auto">
                          <Select value={leagueCategory} onValueChange={(v) => setLeagueCategory(v as "seniori" | "seniorke")}>
                            <SelectTrigger className="w-32 h-8 text-sm bg-background/50 border-border/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-secondary border-border/50">
                              <SelectItem value="seniori">Seniori</SelectItem>
                              <SelectItem value="seniorke">Seniorke</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {leagueCategory === "seniori" ? (
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-border/30">
                            <TableHead className="w-12 text-center">#</TableHead>
                            <TableHead>Ekipa</TableHead>
                            <TableHead className="text-center w-12">UT</TableHead>
                            <TableHead className="text-center w-12">W</TableHead>
                            <TableHead className="text-center w-12">L</TableHead>
                            <TableHead className="text-center w-16">+/-</TableHead>
                            <TableHead className="text-center w-32">Zadnjih 5</TableHead>
                            <TableHead className="text-center w-16">BOD</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {standings.map((team) => (
                            <TableRow 
                              key={team.position} 
                              className={`border-border/20 transition-all duration-200 hover:bg-secondary/50 hover:shadow-md ${team.team === "KK Posušje" ? "bg-primary/10 hover:bg-primary/20" : ""}`}
                            >
                              <TableCell className="text-center font-medium">{team.position}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getTeamLogo(team.team) && (
                                    <img src={getTeamLogo(team.team)!} alt="" className="w-6 h-6 object-contain" />
                                  )}
                                  <span className={team.team === "KK Posušje" ? "text-primary font-medium" : ""}>
                                    {team.team}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">{team.played}</TableCell>
                              <TableCell className="text-center">{team.won}</TableCell>
                              <TableCell className="text-center">{team.lost}</TableCell>
                              <TableCell className={`text-center ${team.diff > 0 ? "text-green-400" : team.diff < 0 ? "text-red-400" : ""}`}>
                                {team.diff > 0 ? `+${team.diff}` : team.diff}
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex gap-0.5 justify-center">
                                  {team.last5.map((result, i) => (
                                    <span 
                                      key={i} 
                                      className={`text-xs font-bold px-1.5 py-0.5 rounded transition-transform duration-200 hover:scale-110 ${
                                        result === "W" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                      }`}
                                    >
                                      {result}
                                    </span>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="text-center font-bold">{team.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-border/30">
                            <TableHead className="w-12 text-center">#</TableHead>
                            <TableHead>Ekipa</TableHead>
                            <TableHead className="text-center w-16">BOD</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {womenStandings.map((team) => (
                            <TableRow 
                              key={team.position} 
                              className={`border-border/20 transition-all duration-200 hover:bg-secondary/50 hover:shadow-md ${team.team.includes("Posušje") ? "bg-primary/10 hover:bg-primary/20" : ""}`}
                            >
                              <TableCell className="text-center font-medium">{team.position}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getTeamLogo(team.team) && (
                                    <img src={getTeamLogo(team.team)!} alt="" className="w-6 h-6 object-contain" />
                                  )}
                                  <span className={team.team.includes("Posušje") ? "text-primary font-medium" : ""}>
                                    {team.team}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center font-bold">{team.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </TabsContent>

                {/* Statistics Tab */}
                <TabsContent value="statistics" className="mt-0">
                  <div className="bg-secondary/30 rounded-xl border border-border/30 p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    {/* Summary */}
                    <h3 className="font-display text-lg text-center mb-6">Pregled</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-background/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Poeni</p>
                        <p className="text-2xl font-display text-primary">572</p>
                        <p className="text-xs text-muted-foreground">#5</p>
                      </div>
                      <div className="bg-background/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Primljeno</p>
                        <p className="text-2xl font-display text-foreground">504</p>
                        <p className="text-xs text-muted-foreground">#4</p>
                      </div>
                      <div className="bg-background/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Asistencije</p>
                        <p className="text-2xl font-display text-foreground">87</p>
                        <p className="text-xs text-muted-foreground">#5</p>
                      </div>
                      <div className="bg-background/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Asist./Izgublj.</p>
                        <p className="text-2xl font-display text-foreground">1.2</p>
                        <p className="text-xs text-muted-foreground">#3</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Offense */}
                      <div className="hover:scale-[1.02] transition-transform duration-300">
                        <h4 className="font-display text-center mb-4">Napad</h4>
                        <div className="space-y-2">
                          {[
                            { label: "Pogođeni šutevi", value: "203", rank: 5 },
                            { label: "Pokušaji šuta", value: "478", rank: 6 },
                            { label: "Postotak šuta", value: "42.5%", rank: 4 },
                            { label: "Pogođene trice", value: "67", rank: 4 },
                            { label: "Pokušaji za 3", value: "189", rank: 5 },
                            { label: "Postotak za 3", value: "35.4%", rank: 3 },
                          ].map((stat, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 hover:bg-background/20 hover:px-2 transition-all duration-200 rounded">
                              <span className="text-sm text-muted-foreground">{stat.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{stat.value}</span>
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                  {stat.rank}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Defense & Rebounds */}
                      <div className="hover:scale-[1.02] transition-transform duration-300">
                        <h4 className="font-display text-center mb-4">Skokovi (po utakmici)</h4>
                        <div className="space-y-2 mb-6">
                          {[
                            { label: "Napadački", value: "28", rank: 4 },
                            { label: "Obrambeni", value: "79", rank: 3 },
                            { label: "Ukupno", value: "107", rank: 4 },
                          ].map((stat, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 hover:bg-background/20 hover:px-2 transition-all duration-200 rounded">
                              <span className="text-sm text-muted-foreground">{stat.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{stat.value}</span>
                                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center font-bold">
                                  {stat.rank}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <h4 className="font-display text-center mb-4">Obrana</h4>
                        <div className="space-y-2">
                          {[
                            { label: "Blokade", value: "14", rank: 5 },
                            { label: "Ukradene lopte", value: "52", rank: 3 },
                          ].map((stat, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 hover:bg-background/20 hover:px-2 transition-all duration-200 rounded">
                              <span className="text-sm text-muted-foreground">{stat.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{stat.value}</span>
                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">
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
                    <div className="p-4 border-b border-border/30">
                      <div className="flex gap-2">
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
                            <TableHead className="w-16 text-center">Broj</TableHead>
                            <TableHead className="w-16"></TableHead>
                            <TableHead>Igrač</TableHead>
                            <TableHead className="text-center">Nacionalnost</TableHead>
                            <TableHead className="text-center">Visina</TableHead>
                            <TableHead className="text-center">Datum rođenja</TableHead>
                            <TableHead className="text-center">Dob</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {players.map((player, index) => (
                            <TableRow key={index} className="hover:bg-secondary/50 border-border/20 transition-all duration-200 hover:shadow-md group">
                              <TableCell className="font-bold text-primary text-center">{player.number}</TableCell>
                              <TableCell>
                                {player.sofascoreLink ? (
                                  <a 
                                    href={player.sofascoreLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                                    title="Pogledaj na SofaScore"
                                  >
                                    <ExternalLink size={14} />
                                  </a>
                                ) : (
                                  <div className="w-8 h-8" />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-200">
                                    {player.image ? (
                                      <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                                        {player.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium">{player.name}</p>
                                    <p className="text-xs text-primary">{player.position}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-lg mr-1">{getFlagEmoji(player.nationality)}</span>
                                <span className="text-sm">{player.nationality}</span>
                              </TableCell>
                              <TableCell className="text-center text-muted-foreground">{player.height || "-"}</TableCell>
                              <TableCell className="text-center text-muted-foreground">{player.dateOfBirth || "-"}</TableCell>
                              <TableCell className="text-center text-muted-foreground">{player.age ? `${player.age} god.` : "-"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="p-6 grid md:grid-cols-2 gap-6">
                        {/* Points */}
                        <div className="bg-background/20 rounded-lg p-4 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                          <h4 className="font-display text-center mb-4">Poeni</h4>
                          <div className="space-y-3">
                            {topScorers.map((player) => (
                              <div key={player.rank} className="flex items-center gap-3 hover:bg-background/30 p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                                <span className="text-primary font-bold w-4">{player.rank}</span>
                                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
                                  {player.image ? (
                                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full bg-muted" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{player.name}</p>
                                  <p className="text-xs text-primary">{player.position}</p>
                                </div>
                                <span className="text-lg font-display text-primary">{player.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rebounds */}
                        <div className="bg-background/20 rounded-lg p-4 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                          <h4 className="font-display text-center mb-4">Skokovi</h4>
                          <div className="space-y-3">
                            {topRebounders.map((player) => (
                              <div key={player.rank} className="flex items-center gap-3 hover:bg-background/30 p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                                <span className="text-primary font-bold w-4">{player.rank}</span>
                                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
                                  {player.image ? (
                                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full bg-muted" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{player.name}</p>
                                  <p className="text-xs text-primary">{player.position}</p>
                                </div>
                                <span className="text-lg font-display text-primary">{player.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Assists */}
                        <div className="bg-background/20 rounded-lg p-4 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                          <h4 className="font-display text-center mb-4">Asistencije</h4>
                          <div className="space-y-3">
                            {topAssisters.map((player) => (
                              <div key={player.rank} className="flex items-center gap-3 hover:bg-background/30 p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                                <span className="text-primary font-bold w-4">{player.rank}</span>
                                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
                                  {player.image ? (
                                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full bg-muted" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{player.name}</p>
                                  <p className="text-xs text-primary">{player.position}</p>
                                </div>
                                <span className="text-lg font-display text-primary">{player.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Minutes */}
                        <div className="bg-background/20 rounded-lg p-4 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                          <h4 className="font-display text-center mb-4">Minute</h4>
                          <div className="space-y-3">
                            {topMinutes.map((player) => (
                              <div key={player.rank} className="flex items-center gap-3 hover:bg-background/30 p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                                <span className="text-primary font-bold w-4">{player.rank}</span>
                                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
                                  {player.image ? (
                                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full bg-muted" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{player.name}</p>
                                  <p className="text-xs text-primary">{player.position}</p>
                                </div>
                                <span className="text-lg font-display text-primary">{player.value}</span>
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
      </div>
    </TooltipProvider>
  );
};

export default Statistics;
