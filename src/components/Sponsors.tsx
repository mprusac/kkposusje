import { useState } from "react";
import { ChevronUp, ChevronDown, Crown, Medal, Award, Heart } from "lucide-react";

import vokelLogo from "@/assets/sponsors/vokel-logo.png";
import planetLogo from "@/assets/sponsors/planet-logo.png";
import mivikoLogo from "@/assets/sponsors/miviko-logo.png";
import mrveljiLogo from "@/assets/sponsors/mrvelji-logo.png";
import weltplastLogo from "@/assets/sponsors/weltplast-logo.png";
import ktmBrinaLogo from "@/assets/sponsors/ktm-brina-logo.png";
import lagunaLogo from "@/assets/sponsors/laguna-logo.png";

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
  { name: "Vokel d.o.o.", tier: "Gold", image: vokelLogo, borderColor: "border-[hsl(48,96%,53%)]", glowColor: "hover:[box-shadow:0_0_25px_8px_hsl(48,96%,53%,0.35)]", imgClass: "", url: "https://vokel.com/" },
  { name: "Miviko", tier: "Silver", image: mivikoLogo, borderColor: "border-[hsl(0,0%,75%)]", glowColor: "hover:[box-shadow:0_0_25px_8px_hsl(0,0%,75%,0.3)]", imgClass: "", url: "https://www.miviko-cables.com/" },
  { name: "Planet", tier: "Silver", image: planetLogo, borderColor: "border-[hsl(0,0%,75%)]", glowColor: "hover:[box-shadow:0_0_25px_8px_hsl(0,0%,75%,0.3)]", imgClass: "scale-[0.9]", url: "https://www.facebook.com/planetbih/" },
  { name: "KTM Brina", tier: "Silver", image: ktmBrinaLogo, borderColor: "border-[hsl(0,0%,75%)]", glowColor: "hover:[box-shadow:0_0_25px_8px_hsl(0,0%,75%,0.3)]", imgClass: "", url: "https://ktm-brina.com/" },
  { name: "Agencija Laguna", tier: "Silver", image: lagunaLogo, borderColor: "border-[hsl(0,0%,75%)]", glowColor: "hover:[box-shadow:0_0_25px_8px_hsl(0,0%,75%,0.3)]", imgClass: "", url: "https://agencija-laguna.com/index.php/about" },
  { name: "Mrvelji d.o.o.", tier: "Bronze", image: mrveljiLogo, borderColor: "border-[hsl(30,60%,45%)]", glowColor: "hover:[box-shadow:0_0_25px_8px_hsl(30,60%,45%,0.3)]", imgClass: "", url: "https://www.mrvelji.com/" },
  { name: "Weltplast", tier: "Bronze", image: weltplastLogo, borderColor: "border-[hsl(30,60%,45%)]", glowColor: "hover:[box-shadow:0_0_25px_8px_hsl(30,60%,45%,0.3)]", imgClass: "", url: "https://weltplast.com/hr/" },
];

const Sponsors = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-3 md:mb-4">
          <span className="section-title-white text-2xl md:text-4xl">NAŠI </span>
          <span className="section-title-gold text-2xl md:text-4xl">SPONZORI</span>
        </h2>

        <p className="text-muted-foreground text-center mb-8 md:mb-16 max-w-2xl mx-auto text-sm md:text-base">
          Naši partneri koji podržavaju razvoj kluba i omogućavaju ostvarivanje naših ciljeva
        </p>

        {/* Sponsor Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 max-w-4xl mx-auto mb-8 md:mb-16 [&>div]:aspect-video">
          {sponsors.map((sponsor, index) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-secondary/50 border-2 ${sponsor.borderColor} rounded-2xl overflow-hidden hover:scale-[1.05] ${sponsor.glowColor} transition-all duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={sponsor.image} 
                alt={sponsor.name} 
                className={`w-full h-full object-cover ${sponsor.imgClass}`}
              />
            </a>
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
                <h3 className="text-2xl md:text-3xl font-display text-left">
                  <span className="text-foreground">POSTANI </span>
                  <span className="text-primary">SPONZOR</span>
                </h3>
                <p className="text-muted-foreground text-base text-left mt-1">
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
                isExpanded ? "max-h-[1200px]" : "max-h-0"
              }`}
            >
              <div className="p-4 md:p-6 pt-2 md:pt-4">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6 mt-2 md:mt-4">
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
                        className={`group bg-secondary/40 border border-border rounded-lg p-3 md:p-6 animate-fade-in-up transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 ${shadowColor}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`${tier.color} mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110`}>{tier.icon}</div>
                        <h4 className={`font-semibold text-xs md:text-base ${tier.color} transition-colors duration-300`}>{tier.name}</h4>
                        <p className="text-primary text-sm md:text-lg font-display mt-1">{tier.price}</p>
                        <ul className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                          {tier.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="text-muted-foreground text-xs md:text-sm flex items-start gap-1 md:gap-2"
                            >
                              <span className="text-primary mt-0.5 md:mt-1">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Payment Info - Inside expandable */}
                <div className="bg-background/50 border border-border rounded-lg p-4 md:p-6">
                  <h4 className="font-display text-base md:text-lg mb-3 md:mb-4">
                    <span className="text-foreground">PODACI ZA </span>
                    <span className="text-primary">PLAĆANJE</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-xs md:text-sm">
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
