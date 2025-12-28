import { useState } from "react";
import { ChevronUp, ChevronDown, Crown, Medal, Award, Heart } from "lucide-react";

interface SponsorTier {
  name: string;
  price: string;
  benefits: string[];
  icon: React.ReactNode;
  color: string;
}

const sponsorTiers: SponsorTier[] = [
  {
    name: "GENERALNO",
    price: "20.000 EUR",
    benefits: [
      "Prefiks imena u svim oblicima oglašavanja",
      "Mjesto u upravi kluba",
      "Snimanje reklame",
    ],
    icon: <Crown size={20} />,
    color: "text-primary",
  },
  {
    name: "GOLD",
    price: "10.000 EUR",
    benefits: ["Natpis na prednjem dijelu dresa", "Objava na svim kanalima"],
    icon: <Medal size={20} />,
    color: "text-primary",
  },
  {
    name: "SILVER",
    price: "5.000 EUR",
    benefits: ["Natpis na donjem dijelu dresa", "Objava na svim kanalima"],
    icon: <Award size={20} />,
    color: "text-muted-foreground",
  },
  {
    name: "DONACIJA",
    price: "Bilo koji iznos",
    benefits: ["Objava na svim kanalima"],
    icon: <Heart size={20} />,
    color: "text-primary",
  },
];

const sponsors = [
  { name: "Vokel d.o.o.", tier: "Gold" },
  { name: "Planet", tier: "Silver" },
  { name: "Miviko", tier: "Silver" },
  { name: "Mrvelji d.o.o.", tier: "Bronze" },
];

const Sponsors = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          <span className="section-title-white">NAŠI </span>
          <span className="section-title-gold">SPONZORI</span>
        </h2>

        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Naši partneri koji podržavaju razvoj kluba i omogućavaju ostvarivanje naših ciljeva
        </p>

        {/* Sponsor Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.name}
              className="bg-secondary/50 border border-border rounded-lg p-8 flex items-center justify-center hover:border-primary transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-foreground font-semibold text-center">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>

        {/* Become a Sponsor */}
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full bg-secondary/50 border border-border rounded-lg p-6 flex items-center justify-between hover:border-primary transition-colors"
          >
            <div>
              <h3 className="text-xl font-display text-left">
                <span className="text-foreground">POSTANI </span>
                <span className="text-primary">SPONZOR</span>
              </h3>
              <p className="text-muted-foreground text-sm text-left">
                Pogledaj sponzorske pakete i podrži klub
              </p>
            </div>
            {isExpanded ? (
              <ChevronUp className="text-primary" size={24} />
            ) : (
              <ChevronDown className="text-primary" size={24} />
            )}
          </button>

          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isExpanded ? "max-h-[600px] mt-6" : "max-h-0"
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sponsorTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className="bg-secondary/30 border border-border rounded-lg p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${tier.color} mb-3`}>{tier.icon}</div>
                  <h4 className={`font-semibold ${tier.color}`}>{tier.name}</h4>
                  <p className="text-primary text-lg font-display mt-1">{tier.price}</p>
                  <ul className="mt-4 space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="text-muted-foreground text-sm flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-secondary/30 border border-border rounded-lg p-6">
            <h4 className="font-display text-lg mb-4">
              <span className="text-foreground">PODACI ZA </span>
              <span className="text-primary">PLAĆANJE</span>
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-muted-foreground block mb-1">PRIMATELJ</span>
                <span className="text-foreground">Košarkaški Klub Posušje</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">BANKA</span>
                <span className="text-foreground">UniCredit Bank d.d. Mostar</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">IBAN</span>
                <span className="text-foreground">BA39 0000 0000 0000 0000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
