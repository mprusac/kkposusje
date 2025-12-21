import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-rados.png";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import player5 from "@/assets/player-5.jpg";

interface Player {
  id: number;
  name: string;
  position: string;
  number: string;
  image: string;
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
    name: "Ian Krishnan",
    position: "Guard-Forward",
    number: "07",
    image: player1,
    stats: { ppg: 11.4, rpg: 2.9, apg: 1.3, mpg: "28:03" },
  },
  {
    id: 2,
    name: "Radoš Vuković",
    position: "Guard-Forward",
    number: "11",
    image: player2,
    stats: { ppg: 8.5, rpg: 3.1, apg: 2.1, mpg: "29:40" },
  },
  {
    id: 3,
    name: "Josip Ramljak",
    position: "Guard",
    number: "23",
    image: player3,
    stats: { ppg: 5.9, rpg: 1.7, apg: 1.8, mpg: "20:45" },
  },
  {
    id: 4,
    name: "Ante Kovač",
    position: "Forward",
    number: "08",
    image: player4,
    stats: { ppg: 4.8, rpg: 2.4, apg: 1.0, mpg: "20:38" },
  },
  {
    id: 5,
    name: "Mirko Đerek",
    position: "Center",
    number: "15",
    image: player5,
    stats: { ppg: 4.8, rpg: 3.1, apg: 0.7, mpg: "20:25" },
  },
  {
    id: 6,
    name: "Luka Marić",
    position: "Point Guard",
    number: "03",
    image: player1,
    stats: { ppg: 7.2, rpg: 1.5, apg: 4.8, mpg: "25:12" },
  },
  {
    id: 7,
    name: "Petar Babić",
    position: "Shooting Guard",
    number: "21",
    image: player2,
    stats: { ppg: 9.1, rpg: 2.3, apg: 1.9, mpg: "26:30" },
  },
  {
    id: 8,
    name: "Marko Jurić",
    position: "Power Forward",
    number: "32",
    image: player3,
    stats: { ppg: 6.4, rpg: 5.2, apg: 0.9, mpg: "22:15" },
  },
  {
    id: 9,
    name: "Ivan Tomić",
    position: "Center",
    number: "44",
    image: player4,
    stats: { ppg: 5.5, rpg: 6.8, apg: 0.5, mpg: "19:45" },
  },
  {
    id: 10,
    name: "Nikola Perić",
    position: "Small Forward",
    number: "17",
    image: player5,
    stats: { ppg: 8.8, rpg: 3.4, apg: 2.2, mpg: "27:00" },
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
            <span className="text-foreground">IVAN MARTINOVIĆ</span>
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

                {/* Player Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
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
