import { Calendar, ArrowRight, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categoryIcon: "match" | "transfer" | "announcement";
  image: string;
  featured?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "KK Posušje pobijedio HKK Grude na domaćem terenu",
    excerpt:
      "KK Posušje ostvario je uvjerljivu pobjedu protiv HKK Grude rezultatom 85:72. Ian Krishnan predvodio je ekipu s 24 poena...",
    date: "14. 12. 2024.",
    category: "Utakmica",
    categoryIcon: "match",
    image: news1,
    featured: true,
  },
  {
    id: 2,
    title: "Novo pojačanje stiglo u KK Posušje",
    excerpt:
      "KK Posušje s ponosom objavljuje dolazak novog igrača koji će pojačati našu seniorsku ekipu za ostatak sezone...",
    date: "10. 12. 2024.",
    category: "Transfer",
    categoryIcon: "transfer",
    image: news2,
  },
  {
    id: 3,
    title: "Posušje dočekuje Čapljinu u sljedećem kolu",
    excerpt:
      "Nakon pobjede na gostovanju, naši momci dočekuju ekipu Čapljine u važnoj utakmici za plasman...",
    date: "08. 12. 2024.",
    category: "Najava",
    categoryIcon: "announcement",
    image: news3,
  },
];

const getCategoryIcon = (type: string) => {
  switch (type) {
    case "match":
      return <Trophy size={14} />;
    case "transfer":
      return <Users size={14} />;
    default:
      return <Calendar size={14} />;
  }
};

const News = () => {
  return (
    <section id="vijesti" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          <span className="section-title-white">NAJNOVIJE </span>
          <span className="section-title-gold">VIJESTI</span>
        </h2>

        <p className="text-muted-foreground text-center mb-16">
          Ostani u toku sa svim događanjima
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              className={`group bg-background rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-fade-in-up ${
                item.featured ? "lg:row-span-1" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
                    {getCategoryIcon(item.categoryIcon)}
                    {item.category}
                  </span>
                </div>
                {item.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Izdvojeno
                    </span>
                  </div>
                )}
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

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider"
          >
            Sve vijesti
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;
