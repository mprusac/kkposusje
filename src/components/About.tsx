import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Trophy, Medal, Users, Star } from "lucide-react";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 1998, label: "GODINA OSNUTKA" },
  { value: 150, suffix: "+", label: "AKTIVNIH ČLANOVA" },
  { value: 6, label: "UZRASNE KATEGORIJE" },
  { value: 27, label: "GODINA POSTOJANJA" },
];

const categories = [
  "Minibasket U10",
  "Škola košarke U12",
  "Mlađi kadeti U14",
  "Kadeti U16",
  "Juniori U18",
  "Seniorska ekipa",
];

const achievements = [
  {
    title: "Prvaci Prve lige 2021",
    subtitle: "Promocija u Premier ligu BiH",
    description: "Osvojen naslov prvaka Prve lige 2021. godine",
    icon: Trophy,
  },
  {
    title: "Državna natjecanja",
    subtitle: "BiH & Hrvatska",
    description: "Višestruko sudjelovanje u turnirima na razini BiH i Hrvatske",
    icon: Medal,
  },
  {
    title: "Reprezentativci",
    subtitle: "U16 & U18 BiH",
    description: "Više igrača pozvano za reprezentacije BiH",
    icon: Star,
  },
  {
    title: "Zajednica",
    subtitle: "Sportske vrijednosti",
    description: "Klub koji gradi pozitivne vrijednosti u lokalnoj zajednici",
    icon: Users,
  },
];

const StatCounter = ({ stat, index }: { stat: StatItem; index: number }) => {
  const { count, elementRef } = useCountUp({ end: stat.value });

  return (
    <div
      ref={elementRef}
      className="text-center group animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="stat-number group-hover:text-primary/80 transition-colors duration-300">
        {count}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

const About = () => {
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { elementRef: catRef, isVisible: catVisible } = useScrollReveal();
  const { elementRef: achRef, isVisible: achVisible } = useScrollReveal();
  const { elementRef: visRef, isVisible: visVisible } = useScrollReveal();

  return (
    <section id="o-klubu" className="py-20 bg-background overflow-hidden">
      {/* Stats */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatCounter key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4">
        <div 
          ref={aboutRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="section-title mb-12 text-center">
            <span className="section-title-white">O </span>
            <span className="section-title-gold">NAMA</span>
          </h2>

          <div className="gold-border-left mb-16 text-center md:text-left mx-auto" style={{ maxWidth: "800px" }}>
            <p className="text-muted-foreground mb-4">
              <span className="text-primary font-semibold">KK POSUŠJE</span> je ponosni
              košarkaški klub iz srca Zapadne Hercegovine, s tradicijom dugom preko dva
              desetljeća. Osnovan{" "}
              <span className="text-primary font-semibold">1998. godine</span>, klub okuplja
              dječake i mlade muškarce iz cijele regije, razvijajući ih od omladinskih
              kategorija do seniorskog tima koji se natječe u{" "}
              <span className="text-primary font-semibold">Premier ligi BiH</span>.
            </p>
            <p className="text-muted-foreground">
              U <span className="text-primary font-semibold">27 godina postojanja</span>,
              klub je okupio preko{" "}
              <span className="text-primary font-semibold">150 aktivnih članova</span> te se
              posvetio razvoju mladih talenata, promicanju zajedništva i sportskog duha.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div 
          ref={catRef}
          className={`mb-20 max-w-4xl mx-auto transition-all duration-700 ${
            catVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-display text-foreground mb-8 uppercase tracking-wider text-center">
            Kategorije
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div
                key={category}
                className="group bg-secondary/50 border border-border rounded-lg px-6 py-4 text-center text-sm font-medium text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-default"
                style={{ 
                  opacity: catVisible ? 1 : 0,
                  transform: catVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${index * 0.1}s`
                }}
              >
                <span className="group-hover:text-primary transition-colors duration-300">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements - Vertical Timeline Style */}
        <div 
          ref={achRef}
          className={`mb-20 max-w-2xl mx-auto transition-all duration-700 ${
            achVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-display text-foreground mb-8 uppercase tracking-wider text-center">
            Postignuća
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.title}
                  className="group relative flex items-start gap-4 p-5 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300"
                  style={{ 
                    opacity: achVisible ? 1 : 0,
                    transform: achVisible ? "translateX(0)" : "translateX(-30px)",
                    transition: `all 0.5s ease ${index * 0.1}s`
                  }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-display text-xl text-foreground tracking-wide">
                        {achievement.title}
                      </h4>
                      {index === 0 && (
                        <span className="text-lg">🏆</span>
                      )}
                    </div>
                    <p className="text-primary font-medium text-sm mb-1">
                      {achievement.subtitle}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision */}
        <div 
          ref={visRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            visVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="group bg-secondary/30 border border-border hover:border-primary/50 rounded-xl p-8 transition-all duration-300 text-center">
            <h3 className="text-2xl font-display mb-4">
              <span className="text-foreground">NAŠA </span>
              <span className="text-primary">VIZIJA</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Izgraditi snažnu bazu mladih sportaša i promovirati košarku kao pozitivan
              temelj za zajednicu. KK Posušje teži postati prepoznati klub u regiji kroz
              razvoj mladih, sportske vrijednosti i profesionalnost – uz kontinuirano
              ulaganje u infrastrukturu i trenerski kadar te postati{" "}
              <span className="text-primary font-semibold">
                košarkaški centar Zapadne Hercegovine
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
