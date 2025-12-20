import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
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
];

const Team = () => {
  return (
    <section id="tim" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          <span className="section-title-white">NAŠ </span>
          <span className="section-title-gold">TIM</span>
        </h2>

        <p className="text-muted-foreground text-center mb-8">
          Igrači koji predstavljaju srce i dušu KK Posušje
        </p>

        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-secondary rounded-full text-sm font-medium">
            <span className="text-muted-foreground">TRENER:</span>{" "}
            <span className="text-foreground">IVAN MARTINOVIĆ</span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="group relative bg-gradient-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
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
    </section>
  );
};

export default Team;
