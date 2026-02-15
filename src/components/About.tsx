import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Trophy, Medal, Users, Star } from "lucide-react";
import bihFlag from "@/assets/flags/bih-flag.png";
import croFlag from "@/assets/flags/cro-flag.png";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 1975, label: "GODINA OSNUTKA" },
  { value: 150, suffix: "+", label: "AKTIVNIH ČLANOVA" },
  { value: 8, label: "UZRASNE SELEKCIJE" },
  { value: 50, label: "GODINA POSTOJANJA" },
];

const maleCategories = [
  "Predkadeti",
  "Kadeti",
  "Juniori",
  "Seniori",
];

const femaleCategories = [
  "Mlađe kadetkinje",
  "Kadetkinje",
  "Juniorke",
  "Seniorke",
];

const achievements = [
  {
    title: "Višestruki seniorski prvaci Lige Herceg-Bosne",
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
    title: "Brojni naslovi prvaka Lige Mladih Herceg-Bosne",
    subtitle: "Redovite titule muških i ženskih omladinskih selekcija u svim uzrastima",
    description: "Rezultat kontinuiranog rada, stručnog kadra i ulaganja u mlade naraštaje",
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
    emoji: "flags",
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
      <div className="stat-number text-3xl md:text-5xl group-hover:text-primary/80 transition-colors duration-300">
        {count}
        {stat.suffix}
      </div>
      <div className="stat-label text-xs md:text-sm">{stat.label}</div>
    </div>
  );
};

const About = () => {
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { elementRef: catRef, isVisible: catVisible } = useScrollReveal();
  const { elementRef: achRef, isVisible: achVisible } = useScrollReveal();
  const { elementRef: visRef, isVisible: visVisible } = useScrollReveal();

  return (
    <section id="o-klubu" className="py-20 overflow-hidden">
      {/* Stats */}
      <div className="container mx-auto px-4 mb-12 md:mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
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
          <h2 className="section-title mb-8 md:mb-12 text-center">
            <span className="section-title-white">O </span>
            <span className="section-title-gold">NAMA</span>
          </h2>

          <div className="gold-border-left mb-10 md:mb-16 text-center md:text-left mx-auto pl-4 md:pl-6 pr-2 md:pr-0" style={{ maxWidth: "800px" }}>
            <p className="text-sm md:text-xl text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <span className="text-primary font-bold">HKK Posušje</span> je hrvatski košarkaški klub iz grada Posušja, osnovan{" "}
              <span className="text-primary font-semibold">1975. godine</span>.
            </p>
            <p className="text-xs md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
              Klub njeguje više od <span className="text-primary font-semibold">pet desetljeća tradicije</span> rada s mladima i okuplja igrače iz cijele regije.
            </p>
            <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
              Kroz sustavan rad u omladinskim kategorijama i disciplinirane treninge razvijamo temelje za seniorski tim. Intenzivnim trudom gradimo <span className="text-primary font-semibold">zajedništvo, odgovornost i timski duh</span> kroz svaki trening. Zajedno težimo stvaranju novih sportskih uspjeha i pozitivnih vrijednosti u lokalnoj zajednici.
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
          <h3 className="text-3xl md:text-4xl font-display text-foreground mb-8 uppercase tracking-wider text-center">
            Selekcije
          </h3>
          
          {/* Muške selekcije */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-widest text-center mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-primary/50"></span>
              Muške
              <span className="w-8 h-px bg-primary/50"></span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {maleCategories.map((category, index) => (
                <div
                  key={category}
                  className="group bg-gradient-to-r from-secondary/60 to-secondary/30 border border-border rounded-lg px-4 py-3 text-center font-medium text-foreground hover:border-primary hover:from-primary/20 hover:to-primary/10 transition-all duration-300 cursor-default"
                  style={{ 
                    opacity: catVisible ? 1 : 0,
                    transform: catVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${index * 0.1}s`
                  }}
                >
                  <span className="group-hover:text-primary transition-colors duration-300 text-sm md:text-base">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Ženske selekcije */}
          <div>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-widest text-center mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-primary/50"></span>
              Ženske
              <span className="w-8 h-px bg-primary/50"></span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {femaleCategories.map((category, index) => (
                <div
                  key={category}
                  className="group bg-gradient-to-r from-secondary/60 to-secondary/30 border border-border rounded-lg px-4 py-3 text-center font-medium text-foreground hover:border-primary hover:from-primary/20 hover:to-primary/10 transition-all duration-300 cursor-default"
                  style={{ 
                    opacity: catVisible ? 1 : 0,
                    transform: catVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${(index + 4) * 0.1}s`
                  }}
                >
                  <span className="group-hover:text-primary transition-colors duration-300 text-sm md:text-base">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements - Vertical Timeline Style */}
        <div 
          ref={achRef}
          className={`mb-12 md:mb-20 w-full flex flex-col items-center transition-all duration-700 ${
            achVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-xl md:text-4xl font-display text-foreground mb-6 md:mb-8 uppercase tracking-wider text-center">
            Postignuća
          </h3>
          <div className="space-y-3 md:space-y-4 max-w-2xl w-full">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.title}
                  className="group relative flex items-start gap-3 md:gap-4 p-3 md:p-5 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300"
                  style={{ 
                    opacity: achVisible ? 1 : 0,
                    transform: achVisible ? "translateX(0)" : "translateX(-30px)",
                    transition: `all 0.5s ease ${index * 0.1}s`
                  }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-display text-base md:text-xl text-foreground tracking-wide leading-tight">
                        {achievement.title}
                      </h4>
                      {achievement.emoji === "flags" ? (
                        <span className="flex items-center gap-1">
                          <img src={bihFlag} alt="BiH" className="h-[18px] w-[18px] object-contain rounded-full" />
                          <img src={croFlag} alt="Hrvatska" className="w-5 h-5 object-contain" />
                        </span>
                      ) : (
                        <span className="text-base md:text-lg">{achievement.emoji}</span>
                      )}
                    </div>
                    <p className="text-primary font-medium text-xs md:text-sm mb-1">
                      {achievement.subtitle}
                    </p>
                    <p className="text-muted-foreground text-xs md:text-sm">
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
            className="relative group rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all duration-300 text-center overflow-hidden border-2 border-primary"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(45 100% 51% / 0.1) 50%, hsl(0 0% 8%) 100%)',
            }}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            
            <h3 className="text-2xl md:text-4xl font-display mb-4 md:mb-6 tracking-wide relative z-10">
              <span className="text-foreground">NAŠA </span>
              <span className="text-primary">VIZIJA</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-sm md:text-lg relative z-10">
              Naša vizija temelji se na kontinuiranom razvoju mladih talenata kroz sustavan i kvalitetan rad. Naglašavamo vrijednosti kao što su <span className="text-primary font-bold">odgovornost, disciplina i timski duh</span> u svakom aspektu klupskih aktivnosti. Cilj nam je stvoriti okruženje u kojem svaki mladi igrač može napredovati u vrhunskog sportaša i odgovornu osobu. Kroz ulaganja u stručni trenažni kadar, infrastrukturu i partnersku suradnju, nastojimo učvrstiti <span className="text-primary font-bold">HKK Posušje kao košarkaški centar BiH</span> i simbol sportskih uspjeha i pozitivnih životnih vrijednosti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
