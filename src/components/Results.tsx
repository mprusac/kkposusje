import { ExternalLink } from "lucide-react";

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
];

const Results = () => {
  return (
    <section id="rezultati" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-16">
          <span className="section-title-white">POSLJEDNJI </span>
          <span className="section-title-gold">REZULTATI</span>
        </h2>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.map((match, index) => (
            <a
              key={match.id}
              href={match.sofaScoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-card hover:bg-secondary/50 rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{match.date}</span>
                <ExternalLink
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex-1 text-right">
                  <span
                    className={`text-lg font-semibold ${
                      match.isHome ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {match.homeTeam}
                  </span>
                </div>

                <div className="px-6 flex items-center gap-4">
                  <span
                    className={`text-3xl font-display ${
                      match.homeScore > match.awayScore
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {match.homeScore}
                  </span>
                  <span className="text-muted-foreground">:</span>
                  <span
                    className={`text-3xl font-display ${
                      match.awayScore > match.homeScore
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {match.awayScore}
                  </span>
                </div>

                <div className="flex-1">
                  <span
                    className={`text-lg font-semibold ${
                      !match.isHome ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {match.awayTeam}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
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
    </section>
  );
};

export default Results;
