import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import playerIan from "@/assets/player-ian.png";
import playerRados from "@/assets/player-rados.png";
import playerRamljak from "@/assets/player-ramljak.png";
import player4 from "@/assets/player-4.jpg";
import player5 from "@/assets/player-5.jpg";
import playerKovac from "@/assets/player-kovac-new.png";
import playerDerek from "@/assets/player-derek.png";
import playerBegic from "@/assets/player-begic.png";
import playerProtrka from "@/assets/player-protrka.png";
import playerBasic from "@/assets/player-basic-new.png";
import playerPavkovic from "@/assets/player-pavkovic-new.png";
import playerBasicLuka from "@/assets/player-basic-luka.png";

interface Player {
  id: number;
  name: string;
  position: string;
  number: string;
  image: string;
  sofascoreLink?: string;
  description?: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    bpg?: number;
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
    description: "Klupsko dijete i najbolji strijelac tima koji svojim iskustvom i eksplozivnošću predvodi ekipu.",
    stats: { ppg: 18, rpg: 6, apg: 2, mpg: "" },
  },
  {
    id: 2,
    name: "Josip Ramljak",
    position: "Guard",
    number: "04",
    image: playerRamljak,
    sofascoreLink: "https://www.sofascore.com/basketball/player/josip-ramljak/1578845",
    description: "Energični krilni igrač i jedan od nositelja igre, svestran i često najefikasniji na terenu.",
    stats: { ppg: 15, rpg: 5, apg: 5, mpg: "" },
  },
  {
    id: 3,
    name: "Ante Begić",
    position: "Forward",
    number: "13",
    image: playerBegic,
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-begic/2046150",
    description: "Iskusni Posušanin i pouzdano krilo koji preuzima odgovornost i zabija kad je najpotrebnije.",
    stats: { ppg: 13, rpg: 7, apg: 3, mpg: "" },
  },
  {
    id: 4,
    name: "Mirko Đerek",
    position: "Center",
    number: "13",
    image: playerDerek,
    sofascoreLink: "https://www.sofascore.com/basketball/player/mirko-derek/1578853",
    description: "Veteran i vođa na terenu koji pouzdano pokriva poziciju centra te donosi sigurnost pod košem.",
    stats: { ppg: 8, rpg: 4, apg: 2, mpg: "" },
  },
  {
    id: 5,
    name: "Marko Protrka",
    position: "Center",
    number: "18",
    image: playerProtrka,
    sofascoreLink: "https://www.sofascore.com/basketball/player/marko-protrka/1578855",
    description: "Mladi centar svijetle budućnosti koji već prikazuje zrelost na parketu, veliki klupski talent.",
    stats: { ppg: 8, rpg: 7, apg: 0, bpg: 1, mpg: "" },
  },
  {
    id: 6,
    name: "Josip Pavković",
    position: "Guard",
    number: "12",
    image: playerPavkovic,
    sofascoreLink: "https://www.sofascore.com/basketball/player/josip-pavkovic/1845527",
    description: "Perspektivan i nadaren mladi igrač koji se svojim doprinosom timu razvija u prvoligaškog košarkaša.",
    stats: { ppg: 5, rpg: 3, apg: 0, mpg: "" },
  },
  {
    id: 7,
    name: "Luka Bašić",
    position: "Guard",
    number: "08",
    image: playerBasicLuka,
    sofascoreLink: "https://www.sofascore.com/basketball/player/luka-basic/1965464",
    description: "Talentirani 18-godišnjak posuškog omladinskog pogona koji vrijedno gradi svoj košarkaški put.",
    stats: { ppg: 4, rpg: 4, apg: 1, mpg: "" },
  },
  {
    id: 8,
    name: "David Dragoja",
    position: "Guard",
    number: "06",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/david-dragoja/2078664",
    description: "18-godišnji krilni igrač koji stječe seniorsko iskustvo, ističe se trudom i potencijalom za prvi tim.",
    stats: { ppg: 4, rpg: 1, apg: 1, mpg: "" },
  },
  {
    id: 9,
    name: "Jakov Ramljak",
    position: "Guard",
    number: "07",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/jakov-ramljak/1578854",
    description: "Mladi bek koji marljivo gradi svoju ulogu u ekipi, borben na parketu i sve zapaženiji u rotaciji.",
    stats: { ppg: 2, rpg: 1, apg: 0, mpg: "" },
  },
  {
    id: 10,
    name: "Luka Ramljak",
    position: "Guard",
    number: "10",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/luka-ramljak/2364289",
    description: "16-godišnji bek šuter i posuški talent s pozivom u kadetsku reprezentaciju BiH.",
    stats: { ppg: 4, rpg: 3, apg: 1, mpg: "" },
  },
  {
    id: 11,
    name: "Stipe Bešlić",
    position: "Guard",
    number: "05",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/stipe-beslic/2339336",
    description: "Mladi igrač iz juniorskog pogona, odlikuje ga velika želja za napretkom i požrtvovnost za tim.",
    stats: { ppg: 5, rpg: 1, apg: 0, mpg: "" },
  },
  {
    id: 12,
    name: "Ivan Ramljak",
    position: "Guard",
    number: "15",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/ivan-ramljak/2339345",
    description: "Najiskusnije ime u sastavu, povratnik iz europskih liga koji pridonosi znanjem i autoritetom.",
    stats: { ppg: 6, rpg: 3, apg: 1, mpg: "" },
  },
  {
    id: 13,
    name: "Marko Petrović",
    position: "Forward",
    number: "14",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/marko-petrovic/2358568",
    description: "Kadetski reprezentativac BiH i brzi bek koji pokazuje zrelost i snalažljivost na terenu.",
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 14,
    name: "Ante Pišković",
    position: "Guard",
    number: "15",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-piskovic/2364287",
    description: "Produkt Posušja, mladi razigravač koji unosi energiju s klupe te sazrijeva u seniorskoj konkurenciji.",
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
  {
    id: 15,
    name: "Ante Ramljak",
    position: "Guard",
    number: "14",
    image: "",
    sofascoreLink: "https://www.sofascore.com/basketball/player/ante-ramljak/2339280",
    description: "Vjerni igrač poznat po preciznom šutu izvana i preuzimanju napadačke odgovornosti.",
    stats: { ppg: 0, rpg: 0, apg: 0, mpg: "" },
  },
];

const Team = () => {
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
      const scrollAmount = isMobile ? 280 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="tim" className="py-20">
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
          Prvotimci koji daju sve za boje HKK Posušja
        </p>

        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-secondary rounded-full text-sm font-medium">
          <span className="text-muted-foreground">TRENER:</span>{" "}
            <span className="text-foreground">MATE BAKOVIĆ</span>
          </span>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-14 md:px-16">
          {/* Scroll Buttons - Visible on all devices */}
          <button
            onClick={() => scroll("left")}
            className="flex absolute left-0 md:left-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft size={16} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex absolute right-0 md:right-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronRight size={16} className="md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>

          {/* Scrollable Container - Responsive grid */}
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:justify-start"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`group flex-shrink-0 relative bg-gradient-card rounded-lg overflow-hidden transition-all duration-300 md:hover:scale-[1.03] hover-lift border border-transparent hover:border-primary/30 snap-center md:snap-start ${isMobile ? 'w-[calc(100vw-7rem)] max-w-[280px]' : 'w-[calc((100%-5rem)/5)] min-w-[220px]'}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  transition: `all 0.5s ease ${index * 0.05}s`,
                }}
              >
              {/* Player Number Watermark - Behind image for players with photos, visible for silhouettes */}
                <span className={`player-number font-display ${player.image ? 'opacity-10 -z-10' : 'opacity-30 z-10'}`}>{player.number}</span>

                {/* SofaScore Link */}
                {player.sofascoreLink && (
                  <a
                    href={player.sofascoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 md:top-3 md:right-3 z-20 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 hover:scale-110 transition-all duration-300 shadow-lg"
                    title="Pogledaj na SofaScore"
                  >
                    <ExternalLink size={14} className="md:hidden" />
                    <ExternalLink size={16} className="hidden md:block" />
                  </a>
                )}

                {/* Player Image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        player.image === playerDerek ? "object-[center_15%]" : 
                        player.image === playerBegic ? "object-[center_8%]" : 
                        player.image === playerProtrka ? "object-[center_8%]" : 
                        player.image === playerBasic ? "object-[center_12%]" : 
                        player.image === playerPavkovic ? "object-[center_10%]" : 
                        player.image === playerKovac ? "object-[center_5%]" : 
                        player.image === playerBasicLuka ? "object-[center_5%]" : 
                        player.name === "Josip Ramljak" ? "object-top scale-115" : "object-top"
                      } ${
                        player.image === playerRados ? "sepia-[0.15] saturate-[1.1] brightness-105" : 
                        player.image === playerRamljak ? "sepia-[0.15] saturate-[1.1] brightness-105" :
                        ""
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-secondary/80 to-secondary flex items-center justify-center relative">
                      {/* Silhouette */}
                      <svg 
                        viewBox="0 0 100 120" 
                        className="w-32 h-40 text-muted-foreground/40"
                        fill="currentColor"
                      >
                        {/* Head */}
                        <circle cx="50" cy="25" r="18" />
                        {/* Body */}
                        <ellipse cx="50" cy="75" rx="28" ry="35" />
                        {/* Shoulders */}
                        <ellipse cx="50" cy="50" rx="35" ry="12" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Player Info */}
                <div className="p-3 md:p-4 relative z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-primary">
                    {player.position}
                  </span>
                  <h3 className="text-base md:text-xl font-display text-foreground mt-1">
                    {player.name}
                  </h3>

                  {/* Description - Hidden on mobile */}
                  {player.description && (
                    <p className="hidden md:block mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {player.description}
                    </p>
                  )}

                  {/* Stats */}
                  {(player.stats.ppg >= 1 || player.stats.rpg >= 1 || player.stats.apg >= 1 || (player.stats.bpg && player.stats.bpg >= 1)) && (
                    <div className={`flex flex-wrap gap-1 md:gap-2 ${player.description ? 'md:mt-2' : 'md:mt-4'} mt-2`}>
                      {player.stats.ppg >= 1 && (
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-primary/20 text-primary text-[10px] md:text-xs rounded whitespace-nowrap">
                          {player.stats.ppg} PPG
                        </span>
                      )}
                      {player.stats.rpg >= 1 && (
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-primary/20 text-primary text-[10px] md:text-xs rounded whitespace-nowrap">
                          {player.stats.rpg} RPG
                        </span>
                      )}
                      {player.stats.apg >= 1 && (
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-primary/20 text-primary text-[10px] md:text-xs rounded whitespace-nowrap">
                          {player.stats.apg} APG
                        </span>
                      )}
                      {player.stats.bpg && player.stats.bpg >= 1 && (
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-primary/20 text-primary text-[10px] md:text-xs rounded whitespace-nowrap">
                          {player.stats.bpg} BPG
                        </span>
                      )}
                    </div>
                  )}

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
