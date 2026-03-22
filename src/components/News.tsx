import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Trophy, Users, Megaphone, Newspaper } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import newsLagunaCard from "@/assets/news-laguna-card.jpg";
import newsMostarAction from "@/assets/news-mostar-action.png";
import tomislavCard from "@/assets/tomislav/tomislav-7.png";
import newsWeltplastCard from "@/assets/news-weltplast-card.jpg";
import najavaTomislav from "@/assets/news-najava-tomislav.jpg";
import najavaKupSiroki from "@/assets/news-najava-kup-siroki.jpg";
import najavaLjubuskiGameday from "@/assets/news-najava-ljubuski-gameday.jpg";
import cardNajavaLjubuskiGameday from "@/assets/card-najava-ljubuski-gameday.png";
import najavaLjubuski from "@/assets/news-najava-ljubuski.jpg";
import najavaMostar from "@/assets/news-najava-mostar.jpg";
import sponzorKtmBrina from "@/assets/news-sponzor-ktm-brina.jpg";
import junioriSarajevo from "@/assets/news-juniori-sarajevo.jpg";
import sponzorVokel from "@/assets/news-sponzor-vokel.jpg";
import sponzorMrvelji from "@/assets/news-sponzor-mrvelji.jpg";
import cardNajavaMostar from "@/assets/card-najava-mostar.png";
import cardNajavaTomislav from "@/assets/card-najava-tomislav.png";
import cardNajavaKupSiroki from "@/assets/card-najava-kup-siroki.png";
import cardJunioriSarajevo from "@/assets/card-juniori-sarajevo.png";
import cardNajavaLjubuski from "@/assets/card-najava-ljubuski.png";
import newsPorazLjubuski from "@/assets/news-poraz-ljubuski.png";
import newsPorazLjubuskiCard from "@/assets/news-poraz-ljubuski-card.jpg";
import xmasCard from "@/assets/xmas/xmas-card.png";
import sponzorMiviko from "@/assets/news-sponzor-miviko.jpg";
import sponzorPlanet from "@/assets/news-sponzor-planet.jpg";
import najavasirokiAway from "@/assets/news-najava-siroki-away.jpg";
import porazSirokiAway from "@/assets/news-poraz-siroki-away.jpg";
import porazSirokiCard from "@/assets/news-poraz-siroki-card.jpg";
import berlinCardNew from "@/assets/berlin/berlin-card-new.jpg";
import deFlag from "@/assets/flags/de-flag.png";
import croFlag from "@/assets/flags/cro-flag.png";
import pobjeda_RamaCard from "@/assets/news-pobjeda-rama-card.jpg";
import priznanjeCard from "@/assets/news-priznanje-card.jpg";
import najavaGrude from "@/assets/news-najava-grude.jpg";
import najavaGrudeGameday from "@/assets/news-najava-grude-gameday.jpg";
import pobjeda_GrudeCard from "@/assets/news-pobjeda-grude-card.jpg";
import sponzorCalipso from "@/assets/news-sponzor-calipso.jpg";
import najavaCapljina from "@/assets/news-najava-capljina-gameday.jpg";
import pobjedaCapljina from "@/assets/news/capljina-result-march2026.jpg";
import pobjedaLjubuski from "@/assets/news/ljubuski-result-march2026.jpg";
import josipMamicHks from "@/assets/news/josip-mamic-hks.jpg";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: "utakmica" | "najava" | "klub";
  image: string;
  imagePosition?: string;
  imageScale?: number;
  flagImage?: string;
}

const categoryConfig: Record<string, { label: string; icon: typeof Trophy }> = {
  utakmica: { label: "Utakmice", icon: Trophy },
  najava: { label: "Najave", icon: Megaphone },
  klub: { label: "Klub", icon: Newspaper },
};

const allNews: NewsItem[] = [
  { id: 47, title: "Josip Mamić na radaru HKS-a!", excerpt: "S velikim ponosom objavljujemo vijest da je naš talentirani predkadet Josip Mamić dobio službeni poziv Hrvatskog košarkaškog saveza!", date: "22. 03. 2026.", category: "klub", image: josipMamicHks, imagePosition: "top", flagImage: croFlag },
  { id: 46, title: "Pobjeda Žutih u posljednjoj utakmici sezone! 🌕⚫", excerpt: "Košarkaši Posušja pobjedili su ekipu Ljubuškog rezultatom 88:78 u posljednjem kolu regularnog dijela sezone.", date: "20. 03. 2026.", category: "utakmica", image: pobjedaLjubuski, imagePosition: "bottom" },
  { id: 45, title: "Pobjeda nad Čapljinom! 🌕⚫", excerpt: "Košarkaši Posušja jučer su na domaćem terenu ostvarili pobjedu nad ekipom Čapljine rezultatom 83:61.", date: "18. 03. 2026.", category: "utakmica", image: pobjedaCapljina, imagePosition: "bottom" },
  { id: 44, title: "Žuti sutra protiv Čapljine na domaćem terenu! 🌕⚫", excerpt: "Košarkaši Posušja sutra igraju predzadnju utakmicu ove sezone. Na domaćem terenu igramo protiv ekipe Čapljine.", date: "16. 03. 2026.", category: "najava", image: najavaCapljina, imagePosition: "bottom" },
  { id: 43, title: "Sponzorska suradnja sa Caffe Bar Calipso! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo suradnju sa Caffe Bar Calipso! Hvala na ukazanom povjerenju i podršci!", date: "10. 03. 2026.", category: "klub", image: sponzorCalipso, imagePosition: "center" },
  { id: 42, title: "Pobjeda!!! 🏀🔥", excerpt: "Košarkaši Posušja rezultatom 80:67 upisali su važnu pobjedu na domaćem terenu protiv ekipe Gruda!", date: "08. 03. 2026.", category: "utakmica", image: pobjeda_GrudeCard, imagePosition: "bottom" },
  { id: 41, title: "Veliki susjedski derbi: Borba za PlayOff! 🔥", excerpt: "Košarkaši Posušja ove nedjelje igraju važnu utakmicu u kojoj nam u goste stiže ekipa Gruda!", date: "05. 03. 2026.", category: "najava", image: najavaGrudeGameday, imagePosition: "bottom" },
  { id: 40, title: "Susjedski derbi i nagradna igra! 🔥🏀", excerpt: "U nedjelju 8. ožujka u 19:00 sati GSD Posušje postaje poprište borbe za PlayOff! Uz utakmicu i bogata nagradna igra!", date: "04. 03. 2026.", category: "najava", image: najavaGrude, imagePosition: "center" },
  { id: 39, title: "Veliko priznanje za naš klub! 🏆", excerpt: "Na svečanoj dodjeli priznanja Športskog saveza općine Posušje, naš KK Posušje pokupio je važne nagrade!", date: "04. 03. 2026.", category: "klub", image: priznanjeCard, imagePosition: "center" },
  { id: 38, title: "Pobjeda Žutih u Rami! 🏀🔥", excerpt: "Košarkaši Posušja ostvarili su uvjerljivu pobjedu rezultatom 60:94 na gostovanju u Rami u 11. kolu Prvenstva.", date: "01. 03. 2026.", category: "utakmica", image: pobjeda_RamaCard, imagePosition: "bottom" },
  { id: 36, title: "Poraz na gostovanju u Širokom! 🏀", excerpt: "Košarkaši Posušja upisali su poraz rezultatom 70:62 na gostovanju kod ekipe Širokog u 10. kolu Prvenstva.", date: "23. 02. 2026.", category: "utakmica", image: porazSirokiCard, imagePosition: "center" },
  { id: 35, title: "Žuti sutra protiv Širokog II na Pecari! 📢", excerpt: "Pred našim košarkašima je novi prvenstveni izazov. Sutra momčad putuje na gostovanje kod ekipe Širokog II.", date: "21. 02. 2026.", category: "najava", image: najavasirokiAway, imagePosition: "bottom", imageScale: 1.1 },
  { id: 17, title: "Sponzorska suradnja sa Agencijom Laguna! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba!", date: "18. 02. 2026.", category: "klub", image: newsLagunaCard },
  { id: 18, title: "Pobjeda Posušja nakon produžetaka protiv Mostara! 🔥", excerpt: "Rezultatom 90:84 košarkaši Posušja ostvarili su važnu pobjedu na domaćem terenu protiv ekipe Mostara.", date: "15. 02. 2026.", category: "utakmica", image: newsMostarAction },
  { id: 26, title: "Žuti u nedjelju protiv Mostara! 📢", excerpt: "KK Posušje u nedjelju igra važnu domaću utakmicu protiv ekipe HKK Mostar u GSD Posušje!", date: "13. 02. 2026.", category: "najava", image: cardNajavaMostar, imagePosition: "center" },
  { id: 19, title: "Poraz Posušja na gostovanju u Tomislavgradu! 🏀", excerpt: "Košarkaši Posušja poraženi su rezultatom 60:55 na gostovanju kod HKK Tomislav u tijesnoj i borbenoj utakmici.", date: "11. 02. 2026.", category: "utakmica", image: tomislavCard },
  { id: 20, title: "Sponzorska suradnja s Weltplastom! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Weltplast novi brončani sponzor našeg kluba!", date: "08. 02. 2026.", category: "klub", image: newsWeltplastCard },
  { id: 22, title: "Nastavlja se prvenstvo KS Herceg-Bosne! 📢", excerpt: "Nakon zimske pauze, košarkaši KK Posušje vraćaju se prvenstvenim obvezama gostovanjem u Tomislavgradu!", date: "04. 02. 2026.", category: "najava", image: cardNajavaTomislav, imagePosition: "center" },
  { id: 27, title: "Sponzorska suradnja s KTM Brinom! 🤝", excerpt: "S velikim ponosom objavljujemo da je poduzeće KTM Brina novi srebreni sponzor našeg kluba!", date: "22. 01. 2026.", category: "klub", image: sponzorKtmBrina },
  { id: 23, title: "Polufinale Kupa KS Herceg-Bosne! 🏆", excerpt: "Košarkaši KK Posušje sutra izlaze na parket u borbi za finale protiv HKK Široki!", date: "19. 01. 2026.", category: "najava", image: cardNajavaKupSiroki, imagePosition: "center" },
  { id: 37, title: "ALBA Berlin Winterturnier 2026!", excerpt: "Škola košarke KK Posušje sretno se vratila kući nakon 4 dana boravka u Berlinu, gdje su selekcije U-14 i U-16 sudjelovale na prestižnom ALBA Berlin Winterturnieru 2026!", date: "05. 01. 2026.", category: "klub", image: berlinCardNew, flagImage: deFlag },
  { id: 28, title: "Juniori KK Posušje turnir u Sarajevu otvorili pobjedom! ⛹️", excerpt: "Juniori KK Posušje započeli nastup na međunarodnom košarkaškom turniru u Sarajevu pobjedom nad Šentvidom!", date: "03. 01. 2026.", category: "utakmica", image: cardJunioriSarajevo },
  { id: 29, title: "Vokel zlatni sponzor našeg kluba! 🤝", excerpt: "S velikim ponosom objavljujemo da je Vokel postao zlatni sponzor našeg kluba!", date: "18. 12. 2025.", category: "klub", image: sponzorVokel },
  { id: 30, title: "Sponzorska suradnja s Mrvelji! 🤝", excerpt: "S ponosom objavljujemo da je tvrtka Mrvelji postala brončani sponzor našeg kluba!", date: "15. 12. 2025.", category: "klub", image: sponzorMrvelji },
  { id: 31, title: "Poraz Posušja u Ljubuškom! 🏀", excerpt: "Košarkaši Posušja nakon infarktne završnice poraženi su od Ljubuškog rezultatom 85:81 u vjerojatno najboljoj utakmici sezone.", date: "14. 12. 2025.", category: "utakmica", image: newsPorazLjubuskiCard, imagePosition: "center" },
  { id: 24, title: "Danas igra Posušje! 📢", excerpt: "Žuti večeras od 19 sati protiv Ljubuškog u SD Ljubuški! 📺 Prijenos na YouTube kanalu Sport Hercegovina!", date: "14. 12. 2025.", category: "najava", image: cardNajavaLjubuskiGameday, imagePosition: "lower" },
  { id: 25, title: "Žuti u nedjelju protiv Ljubuškog! 📢", excerpt: "Košarkaši Posušja u nedjelju igraju 7. utakmicu Prvenstva KS Herceg-Bosne protiv ekipe Ljubuškog!", date: "11. 12. 2025.", category: "najava", image: cardNajavaLjubuski, imagePosition: "center" },
  { id: 32, title: "Službena oprema – Božićno darivanje HKK Posušje! 🎄", excerpt: "Naruči svoj ili pokloni dragoj osobi pravi klupski Božićni dar! Košarkaški klub Posušje pripremio je nagradnu igru i naručivanje službene opreme!", date: "12. 12. 2025.", category: "klub", image: xmasCard },
  { id: 33, title: "Sponzorska suradnja s Mivikom! 🤝", excerpt: "S velikim ponosom objavljujemo da je Miviko novi srebreni sponzor našeg kluba!", date: "06. 12. 2025.", category: "klub", image: sponzorMiviko },
  { id: 34, title: "Sponzorska suradnja s Planetom! 🤝", excerpt: "S ponosom objavljujemo da je Planet novi srebreni sponzor našeg kluba!", date: "29. 11. 2025.", category: "klub", image: sponzorPlanet },
];

const News = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { elementRef, isVisible } = useScrollReveal();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentLeft = container.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft - currentLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, allNews.length - 1));
    const targetCard = cardRefs.current[boundedIndex];
    const container = scrollRef.current;

    if (targetCard && container) {
      container.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });
    }

    setActiveIndex(boundedIndex);
  };

  const scroll = (direction: "left" | "right") => {
    if (isMobile) {
      scrollToIndex(direction === "left" ? activeIndex - 1 : activeIndex + 1);
      return;
    }
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -380 : 380,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="vijesti" className="py-20">
      <div 
        ref={elementRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="section-title text-center mb-4">
          <span className="section-title-white">NAJNOVIJE </span>
          <span className="section-title-gold">VIJESTI</span>
        </h2>

        <p className="text-muted-foreground text-center mb-12">
          Prati sve aktualnosti i novosti iz kluba
        </p>

        {/* News Slider */}
        <div className="relative max-w-[1100px] mx-auto px-12 md:px-16">
          <button
            onClick={() => scroll("left")}
            disabled={isMobile && activeIndex === 0}
            className={`flex absolute -left-2 md:left-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground transition-all duration-300 shadow-lg ${
              isMobile && activeIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary/90 hover:scale-110"
            }`}
          >
            <ChevronLeft size={16} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={isMobile && activeIndex === allNews.length - 1}
            className={`flex absolute -right-2 md:right-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground transition-all duration-300 shadow-lg ${
              isMobile && activeIndex === allNews.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary/90 hover:scale-110"
            }`}
          >
            <ChevronRight size={16} className="md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>

          <div ref={scrollRef} className="flex gap-0 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:justify-start" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {allNews.map((item, index) => (
              <Link
                to={`/vijesti/${item.id}`}
                key={item.id}
                ref={(el) => { cardRefs.current[index] = el as unknown as HTMLAnchorElement; }}
                className="group flex-shrink-0 bg-background rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover-lift border border-transparent hover:border-primary/30 snap-start flex flex-col"
                style={{
                  width: isMobile ? '100%' : 'calc((100% - 3rem) / 3)',
                  minWidth: isMobile ? '100%' : '260px',
                  maxWidth: isMobile ? '100%' : 'none',
                  flexShrink: 0,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  transition: `all 0.5s ease ${index * 0.1}s`
                }}
              >
                <div className="relative h-36 md:h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className={`w-full h-full object-cover transition-transform duration-500 ${item.imageScale ? 'scale-[1.1] group-hover:scale-[1.2]' : 'group-hover:scale-110'} ${item.imagePosition === 'center' ? 'object-center' : item.imagePosition === 'upper' ? 'object-[center_5%]' : item.imagePosition === 'top' ? 'object-top' : item.imagePosition === 'lower' ? 'object-[center_35%]' : item.imagePosition === 'bottom' ? 'object-bottom' : 'object-[center_25%]'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-[10px] md:text-xs rounded flex items-center gap-1 font-bold">
                    {(() => { const cfg = categoryConfig[item.category]; const Icon = cfg.icon; return <><Icon size={12} strokeWidth={3} />{cfg.label}</>; })()}
                  </span>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">
                    <Calendar size={12} className="md:hidden" />
                    <Calendar size={14} className="hidden md:block" />
                    {item.date}
                  </div>
                  <h3 className="text-lg md:text-xl font-display text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}{item.flagImage && <img src={item.flagImage} alt="flag" className="inline-block h-4 md:h-5 ml-1.5 align-middle object-contain" />}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">{item.excerpt}</p>
                  <div className="mt-auto inline-flex items-center gap-2 text-primary text-xs md:text-sm font-medium group-hover:gap-3 transition-all">
                    Pročitaj više
                    <ArrowRight size={14} className="md:hidden" />
                    <ArrowRight size={16} className="hidden md:block" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sve vijesti button */}
        <div id="home-return-news-btn" className="flex justify-center mt-10">
          <Link 
            to="/vijesti"
            onClick={() => {
              sessionStorage.setItem("homeScrollY", String(window.scrollY));
              sessionStorage.setItem("homeReturnTarget", "home-return-news-btn");
            }}
            className="px-8 py-3 rounded-xl bg-primary/20 border border-primary text-primary font-display text-lg tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            Sve vijesti
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
