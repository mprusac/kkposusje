import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, Users, Megaphone, Newspaper, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import newsLaguna from "@/assets/news-laguna.jpg";
import newsLagunaCard from "@/assets/news-laguna-card.jpg";
import newsMostarCard from "@/assets/news-mostar-card.jpg";
import newsMostarAction from "@/assets/news-mostar-action.png";
import tomislavCard from "@/assets/tomislav/tomislav-7.png";
import tomislavDetail from "@/assets/tomislav/tomislav-detail.jpg";
import newsWeltplastCard from "@/assets/news-weltplast-card.jpg";
import najavaTomislavGameday from "@/assets/news-najava-tomislav-gameday.jpg";
import najavaTomislav from "@/assets/news-najava-tomislav.jpg";
import najavaKupSiroki from "@/assets/news-najava-kup-siroki.jpg";
import najavaLjubuskiGameday from "@/assets/news-najava-ljubuski-gameday.jpg";
import najavaLjubuski from "@/assets/news-najava-ljubuski.jpg";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "utakmica" | "transfer" | "najava" | "klub";
  image: string;
  cardImage?: string;
  cardImagePosition?: string;
}

const allNews: NewsItem[] = [
  { id: 17, title: "Sponzorska suradnja sa Agencijom Laguna! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. Vaša podrška dodatni je vjetar u leđa našim igračima i motivacija za nove pobjede!\n\nRadujemo se zajedničkim projektima, napretku i svim uspjesima koje ćemo zajedno ostvariti.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "18. 02. 2026.", category: "klub", image: newsLaguna, cardImage: newsLagunaCard },
  { id: 18, title: "Pobjeda Posušja nakon produžetaka protiv Mostara! 🔥", excerpt: "Rezultatom 90:84 košarkaši Posušja ostvarili su važnu pobjedu na domaćem terenu protiv ekipe Mostara.", content: "Pobjeda Posušja nakon produžetaka protiv Mostara! 🏀🔥\n\nRezultatom 90:84 košarkaši Posušja ostvarili su jako važnu pobjedu na domaćem terenu protiv ekipe Mostara. 🟡🏆\n\nU redovima Posušja istaknuo se Ante Begić koji je ubacio 18 poena uz 7 skokova. Odličnu partiju pružio je i Marko Protrka s 17 poena i 14 skokova, dok je Josip Ramljak dodao 16 poena i 6 asistencija. Ante Kovač je također odigrao zapaženu utakmicu s 11 poena, 7 skokova i 6 asistencija, a doprinos su dali i Mirko Đerek (11 poena, 4 asistencije) te Josip Pavković s 8 poena.\n\nHvala svima koji su došli podržati naše momke i vidimo se na sljedećoj utakmici! 👏🔥\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "15. 02. 2026.", category: "utakmica", image: newsMostarCard, cardImage: newsMostarAction },
  { id: 19, title: "Poraz Posušja na gostovanju u Tomislavgradu! 🏀", excerpt: "Košarkaši Posušja poraženi su rezultatom 60:55 na gostovanju kod HKK Tomislav u tijesnoj i borbenoj utakmici.", content: "Poraz Posušja na gostovanju u Tomislavgradu! 🏀\n\nKošarkaši Posušja poraženi su rezultatom 60:55 na gostovanju kod HKK Tomislav u tijesnoj i borbenoj utakmici. Unatoč velikom angažmanu i borbenosti, žuti nisu uspjeli prevagnuti na svoju stranu u ključnim trenucima susreta. Rezultat je bio izuzetno blizak tijekom cijele utakmice, što pokazuje koliko su ekipe bile ujednačene.\n\nU redovima Posušja najbolji pojedinac bio je Marko Protrka s 15 poena, 7 skokova i 5 asistencija u samo 26 minuta na terenu. Mirko Đerek dodao je 13 poena uz 4 skoka i 4 asistencije, dok je Josip Pavković ubacio 8 poena s 5 skokova u 19 minuta. Luka Ramljak odigrao je svestranu utakmicu sa 7 poena, 4 skoka i 4 asistencije, a Ante Kovač je upisao 6 poena i 7 skokova. Ante Begić je dominirao pod obručima s čak 14 skokova uz 4 poena i 4 asistencije u 38 minuta.\n\nNa strani domaćina, HKK Tomislav predvodio je Boze Lučić s dominantnih 21 poen i 11 skokova. Kristijan Zrno dodao je 12 poena uz 3 asistencije, dok su Jure Jurić (11 poena, 3 skoka, 3 asistencije) i Gabrijel Bisko (10 poena, 5 skokova, 5 asistencija) također odigrali zapažene partije.\n\n🏀🔥 Žuti u nedjelju 15.2. igraju važnu domaću utakmicu protiv Mostara na domaćem terenu u 19h! Ovo je jedna od ključnih utakmica u borbi za poziciju koja vodi u playoff i svaki bod je važan! 💪🔥\n\nPozivamo sve navijače, prijatelje kluba i ljubitelje košarke da dođu i budu naš šesti igrač! Vidimo se u nedjelju – zajedno po pobjedu! 👏🏀\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "11. 02. 2026.", category: "utakmica", image: tomislavDetail, cardImage: tomislavCard },
  { id: 20, title: "Sponzorska suradnja s Weltplastom! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Weltplast novi brončani sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim zadovoljstvom objavljujemo da je poduzeće Weltplast novi brončani sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. Vaša podrška dodatni je vjetar u leđa našim igračima i motivacija za nove pobjede!\n\nRadujemo se zajedničkim projektima, napretku i svim uspjesima koje ćemo zajedno ostvariti.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "08. 02. 2026.", category: "klub", image: newsWeltplastCard },
  { id: 21, title: "Danas igra Posušje! 📣", excerpt: "Žuti danas od 16 sati protiv Tomislava u SD Tomislavgrad! Ajmo Žuti! 💪🟡", content: "Danas igra Posušje! 🏀🔥\n\nŽuti danas od 16 sati protiv Tomislava! ⏰\n\nUtakmica se igra u SD Tomislavgrad. 📍\n\nAjmo Žuti! 💪🟡\n\n#ajmozuti #kkposusje #kshercegbosne", date: "08. 02. 2026.", category: "najava", image: najavaTomislavGameday, cardImagePosition: "lower" },
  { id: 22, title: "Nastavlja se prvenstvo KS Herceg-Bosne! 📣", excerpt: "Nakon zimske pauze, košarkaši KK Posušje vraćaju se prvenstvenim obvezama gostovanjem u Tomislavgradu!", content: "NASTAVLJA SE PRVENSTVO KS HERCEG-BOSNE! 🏀📢\n\nNakon zimske pauze, košarkaši KK Posušje vraćaju se prvenstvenim obvezama. 💪\n\nU sklopu nastavka natjecanja, našu momčad očekuje gostovanje u Tomislavgradu. 🚌\n\nUtakmica se igra u nedjelju (08.02) s početkom u 16h! ⏰\n\n🗓️ Nedjelja | 08.02.\n⏰ 16:00\n📍 SD Tomislavgrad\n\nOčekuje nas čvrsta i borbena utakmica! 🔥\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "04. 02. 2026.", category: "najava", image: najavaTomislav, cardImagePosition: "lower" },
  { id: 23, title: "Polufinale Kupa KS Herceg-Bosne! 🏆", excerpt: "Košarkaši KK Posušje sutra izlaze na parket u borbi za finale protiv HKK Široki!", content: "POLUFINALE KUPA SAVEZA HERCEG-BOSNE! 🏆🔥\n\nKošarkaši KK Posušje sutra izlaze na parket u borbi za finale! 💪🏀\n\nU polufinalu KS Herceg-Bosne našu momčad očekuje izuzetno zahtjevan susret protiv HKK Široki, prve ekipe Širokog. 🔥\n\n⏰ Utorak, 20.01. u 20:00 sati\n📍 GSD Posušje\n\nU drugom polufinalnom susretu snage će odmjeriti drugoligaš HKK Mostar i prvoligaš HKK Zrinski. 🏀\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "19. 01. 2026.", category: "najava", image: najavaKupSiroki, cardImagePosition: "lower" },
  { id: 24, title: "Danas igra Posušje! 📣", excerpt: "Žuti večeras od 19 sati protiv Ljubuškog u SD Ljubuški! 📺 Prijenos na YouTube kanalu Sport Hercegovina!", content: "Danas igra Posušje! 🏀🔥\n\nŽuti večeras od 19 sati protiv Ljubuškog! ⏰\n\n📍 SD Ljubuški\n📺 Prijenos utakmice na YouTube kanalu Sport Hercegovina\n\nAjmo Žuti! 💪🟡\n\n#ajmozuti #kkposusje #kshercegbosne #ljubuski", date: "14. 12. 2025.", category: "najava", image: najavaLjubuskiGameday, cardImagePosition: "lower" },
  { id: 25, title: "Žuti u nedjelju protiv Ljubuškog! 📣", excerpt: "Košarkaši Posušja u nedjelju igraju 7. utakmicu Prvenstva KS Herceg-Bosne protiv ekipe Ljubuškog!", content: "Žuti u nedjelju protiv Ljubuškog! 🏀📢\n\nKošarkaši Posušja u nedjelju igraju 7. utakmicu Prvenstva Košarkaškog saveza Herceg-Bosne protiv ekipe Ljubuškog! 🔥\n\nŽuti do sada u odigranih 6 kola imaju 3 pobjede i 3 poraza, dok ekipa Ljubuškog ima 5 pobjeda i 1 poraz. 📊\n\n📍 SD Ljubuški\n⏰ 19h\n📺 YouTube: SportHercegovina\n\nAjmo žuti! 🟡💪\n\n#kkposusje #kkljubuski #kshercegbosne #ajmozuti", date: "11. 12. 2025.", category: "najava", image: najavaLjubuski, cardImagePosition: "lower" },
];

const categories = [
  { id: "sve", label: "Sve", icon: Newspaper },
  { id: "utakmica", label: "Utakmice", icon: Trophy },
  { id: "najava", label: "Najave", icon: Megaphone },
  { id: "klub", label: "Klub", icon: Newspaper },
] as const;

const getCategoryLabel = (cat: string) => {
  const found = categories.find(c => c.id === cat);
  return found?.label || cat;
};

const ArticleDetail = ({ article }: { article: NewsItem }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background" style={{ zoom: 0.9 }}>
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <button onClick={() => navigate("/vijesti")} className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad na vijesti</span>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded mb-4">{getCategoryLabel(article.category)}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary mb-4">{article.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <Calendar size={16} />
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{getCategoryLabel(article.category)}</span>
            </div>
            
            <div className="relative overflow-hidden rounded-lg mb-8">
              <img src={article.image} alt={article.title} className="w-full rounded-lg" />
            </div>

            <div className="prose prose-invert max-w-none">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-foreground/90 text-lg leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const NewsPage = () => {
  const { articleId } = useParams();
  const [activeCategory, setActiveCategory] = useState<string>("sve");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (articleId) {
    const article = allNews.find(n => n.id === parseInt(articleId));
    if (article) return <ArticleDetail article={article} />;
  }

  const filteredNews = activeCategory === "sve" ? allNews : allNews.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background" style={{ zoom: 0.9 }}>
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link to="/" className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad</span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              <span className="text-white">NAJNOVIJE </span>
              <span className="text-primary">VIJESTI</span>
            </h1>
            <p className="text-muted-foreground text-lg">Ostani u toku sa svim događanjima iz kluba</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === category.id ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-foreground hover:bg-secondary hover:text-primary"}`}>
                  <IconComponent size={18} />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredNews.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Link to={`/vijesti/${item.id}`} className="group block bg-background rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover-lift border border-transparent hover:border-primary/30">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.cardImage || item.image} alt={item.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.cardImagePosition === 'lower' ? 'object-[center_35%]' : item.cardImagePosition === 'bottom' ? 'object-bottom' : 'object-[center_25%]'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded flex items-center gap-1 font-bold">
                      {(() => { const cat = item.category; const icons: Record<string, typeof Trophy> = { utakmica: Trophy, transfer: Users, najava: Megaphone, klub: Newspaper }; const labels: Record<string, string> = { utakmica: "Utakmice", transfer: "Transferi", najava: "Najave", klub: "Klub" }; const Icon = icons[cat]; return <><Icon size={12} strokeWidth={3} />{labels[cat]}</>; })()}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-display text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                    <div className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      Pročitaj više <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;