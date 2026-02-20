import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Trophy, Users, Megaphone, Newspaper } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import newsLaguna from "@/assets/news-laguna.jpg";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: "utakmica" | "transfer" | "najava" | "klub";
  image: string;
}

const categoryConfig: Record<string, { label: string; icon: typeof Trophy }> = {
  utakmica: { label: "Utakmice", icon: Trophy },
  transfer: { label: "Transferi", icon: Users },
  najava: { label: "Najave", icon: Megaphone },
  klub: { label: "Klub", icon: Newspaper },
};

const allNews: NewsItem[] = [
  { id: 17, title: "Sponzorska suradnja sa Agencijom Laguna!", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba!", date: "18. 02. 2026.", category: "klub", image: newsLaguna },
  { id: 1, title: "HKK Posušje pobijedio HKK Grude na domaćem terenu", excerpt: "HKK Posušje ostvario je uvjerljivu pobjedu protiv HKK Grude rezultatom 85:72. Ian Krishnan predvodio je ekipu s 24 poena...", date: "14. 12. 2024.", category: "utakmica", image: news1 },
  { id: 2, title: "Pobjeda protiv KK Čapljina u gostima", excerpt: "Naši igrači ostvarili su važnu pobjedu na gostovanju kod KK Čapljina rezultatom 82:78...", date: "07. 12. 2024.", category: "utakmica", image: news2 },
  { id: 3, title: "Poraz od HKK Mostar u napetoj utakmici", excerpt: "Unatoč velikom trudu, HKK Posušje izgubio je od HKK Mostar rezultatom 68:75...", date: "30. 11. 2024.", category: "utakmica", image: news3 },
  { id: 5, title: "Novo pojačanje stiglo u HKK Posušje", excerpt: "HKK Posušje s ponosom objavljuje dolazak novog igrača koji će pojačati našu seniorsku ekipu za ostatak sezone...", date: "10. 12. 2024.", category: "transfer", image: news2 },
  { id: 9, title: "Posušje dočekuje Čapljinu u sljedećem kolu", excerpt: "Nakon pobjede na gostovanju, naši momci dočekuju ekipu Čapljine u važnoj utakmici za plasman...", date: "08. 12. 2024.", category: "najava", image: news3 },
  { id: 13, title: "Završeni radovi na dvorani", excerpt: "S ponosom objavljujemo završetak renovacije Gradske sportske dvorane Posušje...", date: "12. 12. 2024.", category: "klub", image: news1 },
];

const News = () => {
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
      const scrollAmount = isMobile ? 300 : 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
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
        <div className="relative max-w-[1100px] mx-auto px-14 md:px-16">
          <button onClick={() => scroll("left")} className="flex absolute left-0 md:left-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg">
            <ChevronLeft size={16} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>
          <button onClick={() => scroll("right")} className="flex absolute right-0 md:right-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg">
            <ChevronRight size={16} className="md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>

          <div ref={scrollRef} className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:justify-start" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {allNews.map((item, index) => (
              <Link to={`/vijesti/${item.id}`} key={item.id} className="group flex-shrink-0 bg-background rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover-lift border border-transparent hover:border-primary/30 snap-center md:snap-start flex flex-col" style={{ width: isMobile ? 'calc(100vw - 7rem)' : 'calc((100% - 3rem) / 3)', minWidth: isMobile ? '240px' : '260px', maxWidth: isMobile ? '320px' : 'none', opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(30px)", transition: `all 0.5s ease ${index * 0.1}s` }}>
                <div className="relative h-36 md:h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover object-[center_65%] transition-transform duration-500 group-hover:scale-110" />
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
                  <h3 className="text-lg md:text-xl font-display text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
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
        <div className="flex justify-center mt-10">
          <Link 
            to="/vijesti"
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
