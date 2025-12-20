import { useCountUp } from "@/hooks/useCountUp";

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
    title: "PRVACI",
    description: "Osvojen naslov prvaka Prve lige 2021. godine i promocija u Premier ligu BiH.",
  },
  {
    title: "DRŽAVNI NIVO",
    description: "Višestruko sudjelovanje u turnirima i natjecanjima na razini BiH i Hrvatske.",
  },
  {
    title: "REPREZENTACIJA",
    description: "Više igrača pozvano za reprezentacije U16 i U18 Bosne i Hercegovine.",
  },
  {
    title: "ZAJEDNICA",
    description: "Klub koji gradi pozitivne sportske vrijednosti u lokalnoj zajednici.",
  },
];

const StatCounter = ({ stat, index }: { stat: StatItem; index: number }) => {
  const { count, elementRef } = useCountUp({ end: stat.value });

  return (
    <div
      ref={elementRef}
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="stat-number">
        {count}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

const About = () => {
  return (
    <section id="o-klubu" className="py-20 bg-background">
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
        <h2 className="section-title mb-12">
          <span className="section-title-white">O </span>
          <span className="section-title-gold">NAMA</span>
        </h2>

        <div className="max-w-4xl gold-border-left mb-16">
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

        {/* Categories */}
        <div className="mb-20">
          <h3 className="text-2xl font-display text-foreground mb-8 uppercase tracking-wider">
            Kategorije
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
            {categories.map((category, index) => (
              <div
                key={category}
                className="bg-secondary/50 border border-border rounded-lg px-6 py-4 text-center text-sm font-medium text-foreground hover:border-primary transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h3 className="text-2xl font-display text-foreground mb-8 uppercase tracking-wider">
            Postignuća
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="text-primary font-semibold mb-2">{achievement.title}</h4>
                <p className="text-muted-foreground text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-secondary/30 border-l-4 border-primary rounded-r-lg p-8 max-w-4xl">
          <h3 className="text-2xl font-display mb-4">
            <span className="text-foreground">NAŠA </span>
            <span className="text-primary">VIZIJA</span>
          </h3>
          <p className="text-muted-foreground">
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
    </section>
  );
};

export default About;
