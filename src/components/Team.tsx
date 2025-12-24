import { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import playerIan from "@/assets/player-ian.png";
import playerRados from "@/assets/player-rados.png";
import playerRamljak from "@/assets/player-ramljak.png";
import player4 from "@/assets/player-4.jpg";
import player5 from "@/assets/player-5.jpg";
import playerKovac from "@/assets/player-kovac.png";
import playerDerek from "@/assets/player-derek.png";
import playerBegic from "@/assets/player-begic.png";
import playerProtrka from "@/assets/player-protrka.png";
import playerBasic from "@/assets/player-basic.png";

interface Player {
  id: number;
  name: string;
  position: string;
  number: string;
  image: string;
  sofascoreLink?: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    mpg: string;
  };
}

const players: Player[] = [
  {
    id: 1,
    name: "Ante Kovač",
    position: "Forward",
    number: "09",
    image: playerKovac,
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-kovac/1578849",
    stats: { ppg: 22.2, rpg: 5.5, apg: 2.0, mpg: "" },
  },
  {
    id: 2,
    name: "Ante Begić",
    position: "Forward",
    number: "14",
    image: playerBegic,
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-begic/2046150",
    stats: { ppg: 16.7, rpg: 7.0, apg: 3.8, mpg: "" },
  },
  {
    id: 3,
    name: "Josip Ramljak",
    position: "Guard",
    number: "04",
    image: playerRamljak,
    sofascoreLink: "https://www.sofascore.com/basketball/player/josip-ramljak/1578845",
    stats: { ppg: 16.0, rpg: 6.2, apg: 6.3, mpg: "" },
  },
  {
    id: 4,
    name: "Mirko Đerek",
    position: "Center",
    number: "13",
    image: playerDerek,
    sofascoreLink: "https://www.sofascore.com/basketball/player/mirko-derek/1578853",
    stats: { ppg: 8.3, rpg: 4.5, apg: 2.0, mpg: "" },
  },
  {
    id: 5,
    name: "Marko Protrka",
    position: "Center",
    number: "17",
    image: playerProtrka,
    sofascoreLink: "https://www.sofascore.com/basketball/player/marko-protrka/1578855",
    stats: { ppg: 6.3, rpg: 5.7, apg: 0, mpg: "" },
  },
  {
    id: 6,
    name: "Luka Bašić",
    position: "Guard",
    number: "08",
    image: playerBasic,
    stats: { ppg: 3.8, rpg: 2.8, apg: 0, mpg: "" },
  },
  {
    id: 7,
    name: "Josip Pavković",
    position: "Guard",
    number: "08",
    image: playerRados,
    stats: { ppg: 3.7, rpg: 3.0, apg: 0, mpg: "" },
  },
  {
    id: 8,
    name: "David Dragoja",
    position: "Guard",
    number: "10",
    image: playerIan,
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 9,
    name: "Stipe Beslić",
    position: "Guard",
    number: "12",
    image: player4,
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 10,
    name: "Luka Ramljak",
    position: "Guard",
    number: "15",
    image: playerRamljak,
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 11,
    name: "Jakov Ramljak",
    position: "Guard",
    number: "16",
    image: playerRados,
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  // Dodatni igrači koje je korisnik naveo
  {
    id: 12,
    name: "Ivan Ramljak",
    position: "Guard",
    number: "01",
    image: playerRamljak,
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 13,
    name: "Marko Petrović",
    position: "Forward",
    number: "02",
    image: playerRados,
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 14,
    name: "Ante Pišković",
    position: "Guard",
    number: "03",
    image: playerIan,
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 15,
    name: "Ante Ramljak",
    position: "Guard",
    number: "14",
    image: playerRamljak,
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-ramljak/2339280",
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
];

const Team = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { elementRef, isVisible } = useScrollReveal();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="tim" className="py-20 bg-background">
      <div 
        ref={elementRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="section-title text-center mb-4">
          <span className="section-title-white">NAŠ </span>
          <span className="section-title-gold">TIM</span>
        </h2>

        <p className="text-muted-foreground text-center mb-8">
          Igrači koji predstavljaju srce i dušu HKK Posušje
        </p>

        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-secondary rounded-full text-sm font-medium">
          <span className="text-muted-foreground">TRENER:</span>{" "}
            <span className="text-foreground">MATE BAKOVIĆ</span>
          </span>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-16">
          {/* Scroll Buttons - Outside boxes with yellow background */}
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

          {/* Scrollable Container - Shows exactly 5 */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
          >
            {players.map((player, index) => (
              <div
                key={player.id}
                className="group flex-shrink-0 relative bg-gradient-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover-lift border border-transparent hover:border-primary/30"
                style={{
                  width: 'calc((100% - 5rem) / 5)',
                  minWidth: '220px',
                  scrollSnapAlign: 'start',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  transition: `all 0.5s ease ${index * 0.05}s`,
                }}
              >
                {/* Player Number Watermark */}
                <span className="player-number font-display">{player.number}</span>

                {/* SofaScore Link */}
                {player.sofascoreLink && (
                  <a
                    href={player.sofascoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 hover:scale-110 transition-all duration-300 shadow-lg"
                    title="Pogledaj na SofaScore"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}

                {/* Player Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      player.image === playerDerek ? "object-[center_15%]" : 
                      player.image === playerBegic ? "object-[center_8%]" : 
                      player.image === playerProtrka ? "object-[center_8%]" : 
                      player.image === playerBasic ? "object-[center_12%]" : "object-top"
                    } ${
                      player.image === playerRados ? "sepia-[0.15] saturate-[1.1] brightness-105" : 
                      player.image === playerRamljak ? "sepia-[0.15] saturate-[1.1] brightness-105" :
                      ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Player Info */}
                <div className="p-4 relative z-10">
                  <span className="text-xs uppercase tracking-wider text-primary">
                    {player.position}
                  </span>
                  <h3 className="text-xl font-display text-foreground mt-1">
                    {player.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    Ključni igrač naše ekipe koji doprinosi svakoj utakmici.
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {player.stats.ppg >= 1 && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                        {player.stats.ppg} PPG
                      </span>
                    )}
                    {player.stats.rpg >= 1 && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                        {player.stats.rpg} RPG
                      </span>
                    )}
                    {player.stats.apg >= 1 && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                        {player.stats.apg} APG
                      </span>
                    )}
                  </div>

                  {/* Hover yellow line animation */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
