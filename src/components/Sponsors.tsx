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
          <div 
            className="rounded-xl overflow-hidden border-2 border-primary shadow-[0_0_30px_hsl(48,96%,53%,0.2)]"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(48 96% 53% / 0.1) 50%, hsl(0 0% 8%) 100%)',
            }}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-6 flex items-center justify-between transition-all duration-300"
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
              <div className={`p-2 rounded-full bg-primary/20 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="text-primary" size={24} />
              </div>
            </button>

            {/* Expandable Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-[800px]" : "max-h-0"
              }`}
            >
              <div className="p-6 pt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {sponsorTiers.map((tier, index) => {
                    const shadowColor = tier.name === "GENERALNO" 
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(48,96%,53%,0.35)]" 
                      : tier.name === "GOLD" 
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(48,96%,53%,0.3)]" 
                      : tier.name === "SILVER" 
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(0,0%,70%,0.25)]" 
                      : "hover:[box-shadow:0_0_25px_8px_hsl(0,80%,60%,0.25)]";
                    
                    return (
                      <div
                        key={tier.name}
                        className={`group bg-secondary/40 border border-border rounded-lg p-6 animate-fade-in-up transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 ${shadowColor}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`${tier.color} mb-3 transition-transform duration-300 group-hover:scale-110`}>{tier.icon}</div>
                        <h4 className={`font-semibold ${tier.color} transition-colors duration-300`}>{tier.name}</h4>
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
                    );
                  })}
                </div>

                {/* Payment Info - Inside expandable */}
                <div className="bg-background/50 border border-border rounded-lg p-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
