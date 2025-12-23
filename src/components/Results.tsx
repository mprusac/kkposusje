import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
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

interface MatchResult {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  sofaScoreLink: string;
}

// Logo mapping
const teamLogos: Record<string, string> = {
  "HKK Grude": logoGrude,
  "HKK Ljubuški": logoLjubuski,
  "HKK Mostar": logoMostar,
  "HKK Rama": logoRama,
  "HKK Široki": logoSiroki,
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
    id: 1,
    date: "14.12.2024",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Grude",
    homeScore: 85,
    awayScore: 72,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 2,
    date: "07.12.2024",
    homeTeam: "HKK Čapljina",
    awayTeam: "HKK Posušje",
    homeScore: 78,
    awayScore: 82,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 3,
    date: "30.11.2024",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Mostar",
    homeScore: 68,
    awayScore: 75,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 4,
    date: "23.11.2024",
    homeTeam: "HKK Široki",
    awayTeam: "HKK Posušje",
    homeScore: 70,
    awayScore: 74,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 5,
    date: "16.11.2024",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Ljubuški",
    homeScore: 88,
    awayScore: 65,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 6,
    date: "09.11.2024",
    homeTeam: "HKK Tomislav",
    awayTeam: "HKK Posušje",
    homeScore: 72,
    awayScore: 80,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 7,
    date: "02.11.2024",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Rama",
    homeScore: 79,
    awayScore: 71,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 8,
    date: "26.10.2024",
    homeTeam: "HKK Grude",
    awayTeam: "HKK Posušje",
    homeScore: 83,
    awayScore: 77,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 9,
    date: "19.10.2024",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Čapljina",
    homeScore: 91,
    awayScore: 84,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 10,
    date: "12.10.2024",
    homeTeam: "HKK Mostar",
    awayTeam: "HKK Posušje",
    homeScore: 76,
    awayScore: 81,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
];

const Results = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { elementRef, isVisible } = useScrollReveal();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getTeamLogo = (teamName: string) => {
    return teamLogos[teamName] || null;
  };

  return (
    <section id="rezultati" className="py-20 bg-gradient-to-b from-secondary/30 via-background to-background">
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

        <div className="relative max-w-[1100px] mx-auto px-16">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
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
                  className={`group flex-shrink-0 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border backdrop-blur-sm shadow-lg hover:shadow-xl ${
                    isWin 
                      ? "bg-gradient-to-br from-secondary/80 via-secondary/60 to-primary/10 border-primary/30 hover:border-primary/60" 
                      : "bg-gradient-to-br from-secondary/80 via-secondary/60 to-red-500/10 border-red-500/20 hover:border-red-500/40"
                  }`}
                  style={{ 
                    width: 'calc((100% - 2.5rem) / 3)',
                    minWidth: '320px',
                    scrollSnapAlign: 'start',
                    animationDelay: `${index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(30px)",
                    transition: `all 0.5s ease ${index * 0.1}s`
                  }}
                >
                  {/* Header with date and link */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14" /> {/* Spacer for alignment */}
                    <span className="text-xs font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                      {match.date}
                    </span>
                    <div className="w-14 flex justify-center">
                      <ExternalLink
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Match content - Teams with logos */}
                  <div className="flex items-start justify-between gap-4">
                    {/* Home Team */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-background/60 flex items-center justify-center p-2 border border-border/50 overflow-hidden">
                        {homeLogo ? (
                          <img 
                            src={homeLogo} 
                            alt={match.homeTeam}
                            className="w-10 h-10 object-contain flex-shrink-0"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs font-bold text-muted-foreground">
                              {match.homeTeam.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold text-center leading-tight mt-2 ${
                          match.isHome ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {match.homeTeam}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-3 bg-background/40 px-4 py-2 rounded-xl border border-border/30 h-14">
                      <span
                        className={`text-3xl font-display font-bold ${
                          match.homeScore > match.awayScore
                            ? "text-primary"
                            : "text-foreground/70"
                        }`}
                      >
                        {match.homeScore}
                      </span>
                      <span className="text-muted-foreground text-xl font-light">:</span>
                      <span
                        className={`text-3xl font-display font-bold ${
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
                      <div className="w-14 h-14 rounded-full bg-background/60 flex items-center justify-center p-2 border border-border/50 overflow-hidden">
                        {awayLogo ? (
                          <img 
                            src={awayLogo} 
                            alt={match.awayTeam}
                            className="w-10 h-10 object-contain flex-shrink-0"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs font-bold text-muted-foreground">
                              {match.awayTeam.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold text-center leading-tight mt-2 ${
                          !match.isHome ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {match.awayTeam}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
