import { Calendar, ArrowRight, Trophy, Users, Megaphone, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: "utakmica" | "transfer" | "najava" | "klub";
  image: string;
}

const allNews: NewsItem[] = [
  // Utakmica category
  {
    id: 1,
    title: "HKK Posušje pobijedio HKK Grude na domaćem terenu",
    excerpt: "HKK Posušje ostvario je uvjerljivu pobjedu protiv HKK Grude rezultatom 85:72. Ian Krishnan predvodio je ekipu s 24 poena...",
    date: "14. 12. 2024.",
    category: "utakmica",
    image: news1,
  },
  {
    id: 2,
    title: "Pobjeda protiv KK Čapljina u gostima",
    excerpt: "Naši igrači ostvarili su važnu pobjedu na gostovanju kod KK Čapljina rezultatom 82:78...",
    date: "07. 12. 2024.",
    category: "utakmica",
    image: news2,
  },
  {
    id: 3,
    title: "Poraz od HKK Mostar u napetoj utakmici",
    excerpt: "Unatoč velikom trudu, HKK Posušje izgubio je od HKK Mostar rezultatom 68:75...",
    date: "30. 11. 2024.",
    category: "utakmica",
    image: news3,
  },
  {
    id: 4,
    title: "Uvjerljiva pobjeda nad KK Livno",
    excerpt: "Dominantna igra naše ekipe donijela je pobjedu 88:65 protiv KK Livno...",
    date: "16. 11. 2024.",
    category: "utakmica",
    image: news1,
  },
  // Transfer category
  {
    id: 5,
    title: "Novo pojačanje stiglo u HKK Posušje",
    excerpt: "HKK Posušje s ponosom objavljuje dolazak novog igrača koji će pojačati našu seniorsku ekipu za ostatak sezone...",
    date: "10. 12. 2024.",
    category: "transfer",
    image: news2,
  },
  {
    id: 6,
    title: "Marko Perić potpisao ugovor",
    excerpt: "Talentirani mladi igrač Marko Perić potpisao je profesionalni ugovor s našim klubom...",
    date: "05. 12. 2024.",
    category: "transfer",
    image: news3,
  },
  {
    id: 7,
    title: "Povratak Ante Kovača nakon ozljede",
    excerpt: "S veseljem objavljujemo povratak Ante Kovača koji je uspješno završio rehabilitaciju...",
    date: "28. 11. 2024.",
    category: "transfer",
    image: news1,
  },
  {
    id: 8,
    title: "Novi pomoćni trener u stručnom stožeru",
    excerpt: "Ivan Petrović priključio se našem stručnom stožeru kao pomoćni trener...",
    date: "20. 11. 2024.",
    category: "transfer",
    image: news2,
  },
  // Najava category
  {
    id: 9,
    title: "Posušje dočekuje Čapljinu u sljedećem kolu",
    excerpt: "Nakon pobjede na gostovanju, naši momci dočekuju ekipu Čapljine u važnoj utakmici za plasman...",
    date: "08. 12. 2024.",
    category: "najava",
    image: news3,
  },
  {
    id: 10,
    title: "Derbi protiv HKK Mostar u subotu",
    excerpt: "Očekuje nas uzbudljiv derbi protiv HKK Mostar u Gradskoj sportskoj dvorani...",
    date: "01. 12. 2024.",
    category: "najava",
    image: news1,
  },
  {
    id: 11,
    title: "Božićni turnir mladih kategorija",
    excerpt: "Najavljujemo tradicionalni božićni turnir za mlade kategorije koji će se održati...",
    date: "15. 12. 2024.",
    category: "najava",
    image: news2,
  },
  {
    id: 12,
    title: "Gostovanje kod KK Široki",
    excerpt: "Naša ekipa putuje na gostovanje kod KK Široki u susret 12. kola lige...",
    date: "22. 11. 2024.",
    category: "najava",
    image: news3,
  },
  // Klub category
  {
    id: 13,
    title: "Završeni radovi na dvorani",
    excerpt: "S ponosom objavljujemo završetak renovacije Gradske sportske dvorane Posušje...",
    date: "12. 12. 2024.",
    category: "klub",
    image: news1,
  },
  {
    id: 14,
    title: "Novi sponzorski ugovor s Vokel d.o.o.",
    excerpt: "HKK Posušje potpisao je novi višegodišnji sponzorski ugovor s tvrtkom Vokel d.o.o...",
    date: "03. 12. 2024.",
    category: "klub",
    image: news2,
  },
  {
    id: 15,
    title: "Upisi u školu košarke",
    excerpt: "Otvoreni su upisi u školu košarke za dječake rođene 2014-2018. godine...",
    date: "25. 11. 2024.",
    category: "klub",
    image: news3,
  },
  {
    id: 16,
    title: "Godišnja skupština kluba",
    excerpt: "Održana je godišnja skupština HKK Posušje na kojoj je usvojen plan za sljedeću sezonu...",
    date: "18. 11. 2024.",
    category: "klub",
    image: news1,
  },
];

const categories = [
  { id: "utakmica", label: "Utakmice", icon: Trophy },
  { id: "transfer", label: "Transferi", icon: Users },
  { id: "najava", label: "Najave", icon: Megaphone },
  { id: "klub", label: "Klub", icon: Newspaper },
] as const;

const News = () => {
  const [activeCategory, setActiveCategory] = useState<string>("utakmica");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { elementRef, isVisible } = useScrollReveal();

  const filteredNews = allNews.filter((item) => item.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="vijesti" className="py-20 bg-card">
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

        <p className="text-muted-foreground text-center mb-8">
          Ostani u toku sa svim događanjima
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                <IconComponent size={18} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* News Slider */}
        <div className="relative max-w-[1100px] mx-auto px-16">
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

          {/* Scrollable Container - Shows exactly 3 */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
          >
            {filteredNews.map((item, index) => (
              <article
                key={item.id}
                className="group flex-shrink-0 bg-background rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover-lift border border-transparent hover:border-primary/30"
                style={{
                  width: 'calc((100% - 3rem) / 3)',
                  minWidth: '320px',
                  scrollSnapAlign: 'start',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  transition: `all 0.5s ease ${index * 0.1}s`,
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar size={14} />
                    {item.date}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
                  >
                    Pročitaj više
                    <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
