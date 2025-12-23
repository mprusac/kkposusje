import { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import playerIan from "@/assets/player-ian.png";
import playerRados from "@/assets/player-rados.png";
import playerRamljak from "@/assets/player-ramljak.png";
import player4 from "@/assets/player-4.jpg";
import player5 from "@/assets/player-5.jpg";

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
  // Prvih 5 igrača - ostaju isti
  {
    id: 1,
    name: "Ian Krishnan",
    position: "Guard-Forward",
    number: "03",
    image: playerIan,
    sofascoreLink: "https://www.sofascore.com/basketball/player/krishnan-ian/1182874",
    stats: { ppg: 11.4, rpg: 2.9, apg: 1.3, mpg: "28:03" },
  },
  {
    id: 2,
    name: "Radoš Vuković",
    position: "Guard-Forward",
    number: "11",
    image: playerRados,
    stats: { ppg: 8.5, rpg: 3.1, apg: 2.1, mpg: "29:40" },
  },
  {
    id: 3,
    name: "Josip Ramljak",
    position: "Guard",
    number: "04",
    image: playerRamljak,
    sofascoreLink: "https://www.sofascore.com/basketball/player/josip-ramljak/1578845",
    stats: { ppg: 5.9, rpg: 1.7, apg: 1.8, mpg: "20:45" },
  },
  {
    id: 4,
    name: "Ante Kovač",
    position: "Forward",
    number: "09",
    image: player4,
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-kovac/1578849",
    stats: { ppg: 4.8, rpg: 2.4, apg: 1.0, mpg: "20:38" },
  },
  {
    id: 5,
    name: "Mirko Đerek",
    position: "Center",
    number: "13",
    image: player5,
    sofascoreLink: "https://www.sofascore.com/basketball/player/mirko-derek/1578853",
    stats: { ppg: 4.8, rpg: 3.1, apg: 0.7, mpg: "20:25" },
  },
  // Igrači sa slikama
  {
    id: 6,
    name: "Gabrijel Biško",
    position: "Guard",
    number: "05",
    image: playerRamljak,
    sofascoreLink: "https://www.sofascore.com/basketball/player/gabrijel-bisko/1578846",
    stats: { ppg: 6.2, rpg: 2.0, apg: 2.5, mpg: "22:30" },
  },
  {
    id: 7,
    name: "Triston Matthews",
    position: "Guard",
    number: "11",
    image: playerIan,
    sofascoreLink: "https://www.sofascore.com/basketball/player/matthews-tristan-connor/1971827",
    stats: { ppg: 9.5, rpg: 2.8, apg: 3.2, mpg: "26:15" },
  },
  {
    id: 8,
    name: "Marko Protrka",
    position: "Center",
    number: "17",
    image: player5,
    sofascoreLink: "https://www.sofascore.com/basketball/player/marko-protrka/1578855",
    stats: { ppg: 5.2, rpg: 4.5, apg: 0.8, mpg: "18:45" },
  },
  {
    id: 9,
    name: "Toni Cutuk",
    position: "Forward",
    number: "62",
    image: player4,
    sofascoreLink: "https://www.sofascore.com/basketball/player/toni-cutuk/1651129",
    stats: { ppg: 7.1, rpg: 3.8, apg: 1.2, mpg: "21:20" },
  },
  {
    id: 10,
    name: "Darryl Anthony Owens II",
    position: "Forward",
    number: "06",
    image: playerRados,
    sofascoreLink: "https://www.sofascore.com/basketball/player/darryl-anthony-owens-ii/2046151",
    stats: { ppg: 10.2, rpg: 4.1, apg: 1.5, mpg: "25:00" },
  },
  // Igrači s pozicijama (bez slika)
  {
    id: 11,
    name: "Ante Ramljak",
    position: "Guard",
    number: "14",
    image: playerRamljak,
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-ramljak/2339280",
    stats: { ppg: 4.5, rpg: 1.8, apg: 2.0, mpg: "17:30" },
  },
  {
    id: 12,
    name: "Dominik Jukić",
    position: "Guard",
    number: "06",
    image: playerIan,
    sofascoreLink: "https://www.sofascore.com/basketball/player/dominik-jukic/1578847",
    stats: { ppg: 5.8, rpg: 1.5, apg: 2.8, mpg: "19:15" },
  },
  {
    id: 13,
    name: "Nemanja Simovic",
    position: "Guard",
    number: "13",
    image: playerRados,
    sofascoreLink: "https://www.sofascore.com/basketball/player/simovic-nemanja/1970677",
    stats: { ppg: 7.0, rpg: 2.2, apg: 3.0, mpg: "23:40" },
  },
  {
    id: 14,
    name: "Ante Begić",
    position: "Forward",
    number: "14",
    image: player4,
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-begic/2046150",
    stats: { ppg: 6.5, rpg: 3.5, apg: 0.9, mpg: "20:00" },
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
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 object-top ${
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
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                      {player.stats.ppg} PPG
                    </span>
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                      {player.stats.rpg} RPG
                    </span>
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
