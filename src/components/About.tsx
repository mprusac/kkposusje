import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Trophy, Medal, Users, Star } from "lucide-react";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 1975, label: "GODINA OSNUTKA" },
  { value: 150, suffix: "+", label: "AKTIVNIH ČLANOVA" },
  { value: 6, label: "UZRASNE KATEGORIJE" },
  { value: 50, label: "GODINA POSTOJANJA" },
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
    title: "Višestruki prvaci Lige Herceg-Bosne",
    subtitle: "Tri osvojena naslova prvaka (2012, 2016, 2021)",
    description: "Promocija u Premijer ligu BiH",
    icon: Trophy,
    emoji: "🏆",
  },
  {
    title: "Dugogodišnji prvoligaš Bosne i Hercegovine",
    subtitle: "Dug niz sezona u najvišem rangu BiH košarke",
    description: "Iznova dokazana kvaliteta među najboljim ekipama",
    icon: Trophy,
    emoji: "🏀",
  },
  {
    title: "Nastup na FIBA Kupu Radivoja Koraća (1998./99.)",
    subtitle: "Sudjelovanje na velikoj europskoj košarkaškoj pozornici",
    description: "Upisani kao međunarodni predstavnik BiH košarke",
    icon: Star,
    emoji: "🌍",
  },
  {
    title: "Juniorski prvaci BiH 2009./10.",
    subtitle: "Kruna rada s mladima kroz osvajanje državnog naslova",
    description: "Zlatna generacija omladinskog pogona HKK Posušje",
    icon: Medal,
    emoji: "🥇",
  },
  {
    title: "Finalisti Kupa Herceg-Bosne / Polufinale Kupa BiH",
    subtitle: "Zapaženi rezultati u državnim kup natjecanjima",
    description: "Česti sudionik nacionalnih završnih turnira",
    icon: Medal,
    emoji: "🥈",
  },
  {
    title: "Mladi reprezentativci",
    subtitle: "Talenti iz Posušja redovito nose dresove državnih selekcija",
    description: "Više desetaka igrača u reprezentacijama BiH i Hrvatske",
    icon: Users,
    emoji: "🇧🇦 🇭🇷",
  },
  {
    title: "Osnivanje ženskog omladinskog pogona (2002.)",
    subtitle: "Klub koji jednako ulaže u razvoj djevojčica i dječaka",
    description: "Ženska selekcija se uspješno natječe u Ligi Herceg-Bosne",
    icon: Users,
    emoji: "⛹🏼‍♀️",
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
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              <span className="text-primary font-bold">HKK Posušje</span> je hrvatski košarkaški klub iz grada Posušja, osnovan{" "}
              <span className="text-primary font-semibold">1975. godine</span>.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Klub njeguje više od <span className="text-primary font-semibold">pet desetljeća tradicije</span> rada s mladima i okuplja igrače iz cijele regije.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Kroz sustavan rad u omladinskim kategorijama i disciplinirane treninge razvijamo temelje za seniorski tim.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Intenzivnim trudom gradimo <span className="text-primary font-semibold">zajedništvo, odgovornost i timski duh</span> kroz svaki trening. Zajedno težimo stvaranju novih sportskih uspjeha i pozitivnih vrijednosti u lokalnoj zajednici.
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
                      <span className="text-lg">{achievement.emoji}</span>
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
          <div 
            className="relative group rounded-3xl p-10 transition-all duration-300 text-center overflow-hidden border-2 border-primary"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(45 100% 51% / 0.1) 50%, hsl(0 0% 8%) 100%)',
            }}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            
            <h3 className="text-3xl md:text-4xl font-display mb-6 tracking-wide relative z-10">
              <span className="text-foreground">NAŠA </span>
              <span className="text-primary">VIZIJA</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-base md:text-lg relative z-10">
              Temeljna ideja osnivača kluba je kvalitetan rad s djecom i mladima, doprinos afirmaciji vrijednosti kao što su odgovornost, asertivnost, disciplina i timski rad.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-base md:text-lg mt-4 relative z-10">
              Kroz kontinuirano ulaganje u razvoj djece, stručan trenerski kadar i akvizicije mladih igrača iz Hercegovine i regije želimo stvoriti bazen talenata te postati{" "}
              <span className="text-primary font-bold">
                košarkaški centar cijelog južnog Balkana
              </span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
