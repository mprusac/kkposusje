import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

const results: MatchResult[] = [
  {
    id: 1,
    date: "14.12.2024",
    homeTeam: "KK Posušje",
    awayTeam: "HKK Grude",
    homeScore: 85,
    awayScore: 72,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 2,
    date: "07.12.2024",
    homeTeam: "KK Čapljina",
    awayTeam: "KK Posušje",
    homeScore: 78,
    awayScore: 82,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 3,
    date: "30.11.2024",
    homeTeam: "KK Posušje",
    awayTeam: "HKK Mostar",
    homeScore: 68,
    awayScore: 75,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 4,
    date: "23.11.2024",
    homeTeam: "KK Široki",
    awayTeam: "KK Posušje",
    homeScore: 70,
    awayScore: 74,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 5,
    date: "16.11.2024",
    homeTeam: "KK Posušje",
    awayTeam: "KK Livno",
    homeScore: 88,
    awayScore: 65,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 6,
    date: "09.11.2024",
    homeTeam: "KK Tomislavgrad",
    awayTeam: "KK Posušje",
    homeScore: 72,
    awayScore: 80,
    isHome: false,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 7,
    date: "02.11.2024",
    homeTeam: "KK Posušje",
    awayTeam: "KK Vitez",
    homeScore: 79,
    awayScore: 71,
    isHome: true,
    sofaScoreLink: "https://www.sofascore.com/",
  },
  {
    id: 8,
    date: "26.10.2024",
    homeTeam: "KK Zrinjski",
    awayTeam: "KK Posušje",
    homeScore: 83,
    awayScore: 77,
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

  return (
    <section id="rezultati" className="py-20 bg-background">
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

        <div className="relative max-w-6xl mx-auto">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {results.map((match, index) => (
              <a
                key={match.id}
                href={match.sofaScoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex-shrink-0 w-80 bg-card hover:bg-secondary/50 rounded-lg p-5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 border border-transparent hover-glow`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  transition: `all 0.5s ease ${index * 0.1}s`
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">{match.date}</span>
                  <ExternalLink
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 text-right pr-3">
                    <span
                      className={`text-sm font-semibold ${
                        match.isHome ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {match.homeTeam}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-display ${
                        match.homeScore > match.awayScore
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {match.homeScore}
                    </span>
                    <span className="text-muted-foreground text-lg">:</span>
                    <span
                      className={`text-2xl font-display ${
                        match.awayScore > match.homeScore
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {match.awayScore}
                    </span>
                  </div>

                  <div className="flex-1 pl-3">
                    <span
                      className={`text-sm font-semibold ${
                        !match.isHome ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {match.awayTeam}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <span
                    className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full ${
                      (match.isHome && match.homeScore > match.awayScore) ||
                      (!match.isHome && match.awayScore > match.homeScore)
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {(match.isHome && match.homeScore > match.awayScore) ||
                    (!match.isHome && match.awayScore > match.homeScore)
                      ? "Pobjeda"
                      : "Poraz"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
