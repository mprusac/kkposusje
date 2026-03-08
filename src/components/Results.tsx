import { ExternalLink, ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

interface MatchResult {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  sofaScoreLink: string;
  youtubeLink?: string;
  competition?: string;
}

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
  "HKK Čapljina": logoCapljina,
  "KK Čapljina": logoCapljina,
};

const results: MatchResult[] = [
  {
    id: 20,
    date: "08.03.2026",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Grude",
    homeScore: 80,
    awayScore: 67,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014517",
    youtubeLink: "https://www.youtube.com/watch?v=xKw2LGbjTXo",
    competition: "Liga KSHB",
  },
  {
    id: 19,
    date: "01.03.2026",
    homeTeam: "HKK Rama",
    awayTeam: "HKK Posušje",
    homeScore: 60,
    awayScore: 94,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014515",
    youtubeLink: "https://www.youtube.com/watch?v=TCng7GXf2uU",
    competition: "Liga KSHB",
  },
  {
    id: 18,
    date: "22.02.2026",
    homeTeam: "HKK Široki II",
    awayTeam: "HKK Posušje",
    homeScore: 70,
    awayScore: 62,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014507",
    youtubeLink: "https://www.youtube.com/watch?v=xdO6qF1POOc",
    competition: "Liga KSHB",
  },
  {
    id: 16,
    date: "15.02.2026",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Mostar",
    homeScore: 90,
    awayScore: 84,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014506",
    youtubeLink: "https://www.youtube.com/watch?v=ncFUEOKNpCo",
    competition: "Liga KSHB",
  },
  {
    id: 17,
    date: "08.02.2026",
    homeTeam: "HKK Tomislav",
    awayTeam: "HKK Posušje",
    homeScore: 60,
    awayScore: 55,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/hr/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:15014499",
    competition: "Liga KSHB",
  },
  {
    id: 0,
    date: "20.01.2026",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Široki II",
    homeScore: 54,
    awayScore: 69,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/hr/basketball/match/kk-posusje-hkk-siroki/lIcsTEid#id:15400673",
    competition: "Kup KSHB 🏆",
  },
  {
    id: 1,
    date: "14.12.2025",
    homeTeam: "HKK Ljubuški",
    awayTeam: "HKK Posušje",
    homeScore: 85,
    awayScore: 81,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/basketball/match/hkk-ljubuski-kk-posusje/TEidsOiOi#id:15014496",
    youtubeLink: "https://www.youtube.com/live/X2TcwA2sgH0?si=qE7iKg4f61kOe0Ap",
    competition: "Liga KSHB",
  },
  {
    id: 2,
    date: "07.12.2025",
    homeTeam: "HKK Čapljina",
    awayTeam: "HKK Posušje",
    homeScore: 33,
    awayScore: 107,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/basketball/match/kk-posusje-hkk-capljina/nOHcsTEid#id:15185580",
    competition: "Liga KSHB",
  },
  {
    id: 3,
    date: "30.11.2025",
    homeTeam: "HKK Grude",
    awayTeam: "HKK Posušje",
    homeScore: 60,
    awayScore: 56,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014486",
    youtubeLink: "https://www.youtube.com/live/1PvUKvtkBkQ?si=he8SIzhogLNQcjw3",
    competition: "Liga KSHB",
  },
  {
    id: 4,
    date: "23.11.2025",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Rama",
    homeScore: 90,
    awayScore: 77,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014481",
    youtubeLink: "https://www.youtube.com/live/7k5R_SHgrEE?si=GGB5YTpvDl_TG0Bt",
    competition: "Liga KSHB",
  },
  {
    id: 5,
    date: "15.11.2025",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Široki II",
    homeScore: 79,
    awayScore: 72,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014461",
    youtubeLink: "https://www.youtube.com/live/M4P4ciZs5Cw?si=jP7sKatpeSwoIt46",
    competition: "Liga KSHB",
  },
  {
    id: 6,
    date: "09.11.2025",
    homeTeam: "HKK Mostar",
    awayTeam: "HKK Posušje",
    homeScore: 92,
    awayScore: 78,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014458",
    competition: "Liga KSHB",
  },
  {
    id: 7,
    date: "02.11.2025",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Tomislav",
    homeScore: 81,
    awayScore: 85,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:14973017",
    competition: "Liga KSHB",
  },
];

const Results = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { elementRef, isVisible } = useScrollReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 300 : 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getTeamLogo = (teamName: string) => {
    return teamLogos[teamName] || null;
  };

  const getLogoScale = (teamName: string) => {
    if (teamName.includes("Posušje")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.0] translate-y-[2px]";
    if (teamName.includes("Široki")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.6]";
    if (teamName.includes("Ljubuš")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.3]";
    if (teamName.includes("Mostar")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.1] translate-y-[2px]";
    if (teamName.includes("Rama")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.6]";
    if (teamName.includes("Grude")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.6]";
    if (teamName.includes("Tomislav")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.1]";
    if (teamName.includes("Čapljina")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.0]";
    return "w-7 h-7 md:w-10 md:h-10";
  };

  return (
    <section id="rezultati" className="py-20">
      <div 
        ref={elementRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="section-title text-center mb-16">
          <span className="section-title-white">ZADNJE </span>
          <span className="section-title-gold">UTAKMICE</span>
        </h2>

        <div className="relative max-w-[1200px] mx-auto px-14 md:px-20">
          {/* Scroll Buttons - Visible on all devices */}
          <button
            onClick={() => scroll("left")}
            className="flex absolute left-0 top-[35%] -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft size={18} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex absolute right-0 top-[35%] -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronRight size={18} className="md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:justify-start"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {results.map((match, index) => {
              const isWin = (match.isHome && match.homeScore > match.awayScore) ||
                (!match.isHome && match.awayScore > match.homeScore);
              const homeLogo = getTeamLogo(match.homeTeam);
              const awayLogo = getTeamLogo(match.awayTeam);
              
              return (
                <a
                  key={match.id}
                  href={match.sofaScoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex-shrink-0 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border backdrop-blur-sm shadow-lg hover:shadow-xl snap-center md:snap-start ${
                    isWin 
                      ? "bg-gradient-to-br from-secondary/80 via-secondary/60 to-primary/10 border-primary/30 hover:border-primary/60" 
                      : "bg-gradient-to-br from-secondary/80 via-secondary/60 to-red-500/10 border-red-500/20 hover:border-red-500/40"
                  }`}
                  style={{ 
                    width: isMobile ? 'calc(100vw - 7rem)' : 'calc((100% - 2.5rem) / 3)',
                    minWidth: isMobile ? '240px' : '260px',
                    maxWidth: isMobile ? '320px' : 'none',
                    flexShrink: 0,
                    animationDelay: `${index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(30px)",
                    transition: `all 0.5s ease ${index * 0.1}s`
                  }}
                >
                  {/* Header with date and link */}
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div className="flex-1 flex justify-center items-center -translate-x-1 md:-translate-x-2">
                      {match.youtubeLink ? (
                        <a
                          href={match.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                          title="YouTube"
                        >
                          <Youtube size={16} className="md:hidden" />
                          <Youtube size={18} className="hidden md:block" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground/40">
                          <Youtube size={16} className="md:hidden" />
                          <Youtube size={18} className="hidden md:block" />
                        </span>
                      )}
                    </div>
                    <div className="flex-shrink-0 px-2 md:px-4">
                      <span className="text-[10px] md:text-xs font-medium text-muted-foreground bg-background/50 px-2 md:px-3 py-1 rounded-full">
                        {match.date}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-center items-center translate-x-1 md:translate-x-2">
                      <span title="SofaScore">
                        <ExternalLink
                          size={14}
                          className="md:hidden text-muted-foreground group-hover:text-primary transition-colors"
                        />
                        <ExternalLink
                          size={16}
                          className="hidden md:block text-muted-foreground group-hover:text-primary transition-colors"
                        />
                      </span>
                    </div>
                  </div>

                  {/* Match content - Teams with logos */}
                  <div>
                    <div className="flex items-start justify-between gap-2 md:gap-4">
                      {/* Home Team */}
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-background/60 flex items-center justify-center p-1.5 md:p-2 border-none overflow-hidden">
                          {homeLogo ? (
                            <img 
                              src={homeLogo} 
                              alt={match.homeTeam}
                              className={`object-contain flex-shrink-0 ${getLogoScale(match.homeTeam)}`}
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                              <span className="text-[10px] md:text-xs font-bold text-muted-foreground">
                                {match.homeTeam.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[10px] md:text-xs font-semibold text-center leading-tight mt-1.5 md:mt-2 ${
                            match.isHome ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {match.homeTeam}
                        </span>
                      </div>

                      {/* Score */}
                      <div className="flex items-center gap-1.5 md:gap-3 bg-background/40 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-border/30 h-10 md:h-14">
                        <span
                          className={`text-xl md:text-3xl font-display font-bold ${
                            match.homeScore > match.awayScore
                              ? "text-primary"
                              : "text-foreground/70"
                          }`}
                        >
                          {match.homeScore}
                        </span>
                        <span className="text-muted-foreground text-base md:text-xl font-light">:</span>
                        <span
                          className={`text-xl md:text-3xl font-display font-bold ${
                            match.awayScore > match.homeScore
                              ? "text-primary"
                              : "text-foreground/70"
                          }`}
                        >
                          {match.awayScore}
                        </span>
                      </div>

                      {/* Away Team */}
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-background/60 flex items-center justify-center p-1.5 md:p-2 border-none overflow-hidden">
                          {awayLogo ? (
                            <img 
                              src={awayLogo} 
                              alt={match.awayTeam}
                              className={`object-contain flex-shrink-0 ${getLogoScale(match.awayTeam)}`}
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                              <span className="text-[10px] md:text-xs font-bold text-muted-foreground">
                                {match.awayTeam.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[10px] md:text-xs font-semibold text-center leading-tight mt-1.5 md:mt-2 ${
                            !match.isHome ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {match.awayTeam}
                        </span>
                      </div>
                    </div>

                    {/* Competition label below teams/score */}
                    {match.competition && (
                      <div className="flex justify-center -mt-1">
                        <span className="text-[8px] md:text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          {match.competition}
                          {match.competition === "Liga KSHB" && (
                            <img src={logoKSHB} alt="KSHB" className="w-3.5 h-3.5 object-contain -translate-y-[1px]" />
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Detaljnije button */}
          <div id="home-return-statistics-btn" className="flex justify-center mt-8">
            <Link 
              to="/statistika"
              onClick={() => {
                sessionStorage.setItem("homeScrollY", String(window.scrollY));
                sessionStorage.setItem("homeReturnTarget", "home-return-statistics-btn");
              }}
              className="px-8 py-3 rounded-xl bg-primary/20 border border-primary text-primary font-display text-lg tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              Detaljnije
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
