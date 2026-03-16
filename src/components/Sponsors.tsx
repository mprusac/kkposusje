import { useState } from "react";
import { ChevronUp, ChevronDown, Crown, Medal, Award, Heart, Star, Trophy } from "lucide-react";

import vokelLogo from "@/assets/sponsors/vokel-logo.png";
import planetLogo from "@/assets/sponsors/planet-logo.png";
import mivikoLogo from "@/assets/sponsors/miviko-logo.png";
import mrveljiLogo from "@/assets/sponsors/mrvelji-logo.png";
import weltplastLogo from "@/assets/sponsors/weltplast-logo.png";
import ktmBrinaLogo from "@/assets/sponsors/ktm-brina-logo.png";
import lagunaLogo from "@/assets/sponsors/laguna-logo.png";
import binvestLogo from "@/assets/sponsors/binvest-logo.png";
import sisovicLogo from "@/assets/sponsors/sisovic.png";
import ledaLogo from "@/assets/sponsors/leda-logo.png";
import croatiaOsiguranjeLogo from "@/assets/sponsors/croatia-osiguranje-logo.png";

import ljekarnaBlanka from "@/assets/sponsors/ljekarna-blanka-logo.png";
import winnersLogo from "@/assets/sponsors/winners-logo.png";
import bosiljnaLogo from "@/assets/sponsors/bosiljna-logo.png";
import wwinLogo from "@/assets/sponsors/wwin-logo.png";
import arduLogo from "@/assets/sponsors/ardu-logo.png";

interface SponsorTier {
  name: string;
  price: string;
  benefits: string[];
  icon: React.ReactNode;
  color: string;
}

const sponsorTiers: SponsorTier[] = [
  {
    name: "ZLATNI",
    price: "10.000 BAM",
    benefits: [
      "Natpis na prednjem dijelu dresa",
      "Objava na svim kanalima",
      "Logo na dresu i parketu",
      "Sezonske ulaznice",
      "Ekskluzivni sadržaj",
    ],
    icon: <Crown className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-primary",
  },
  {
    name: "SREBRENI",
    price: "5.000 BAM",
    benefits: ["Natpis na prednjem dijelu dresa", "Objava na svim kanalima"],
    icon: <Medal className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-[hsl(0,0%,75%)]",
  },
  {
    name: "BRONČANI",
    price: "2.500 BAM",
    benefits: ["Natpis na donjem dijelu dresa", "Objava na svim kanalima"],
    icon: <Award className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-[hsl(30,60%,45%)]",
  },
  {
    name: "DONACIJA",
    price: "Bilo koji iznos",
    benefits: ["Objava na svim kanalima"],
    icon: <Heart className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-primary",
  },
];

const goldBorder = "border-[hsl(48,96%,53%)]";
const goldGlow = "hover:[box-shadow:0_0_25px_8px_hsl(48,96%,53%,0.35)]";

const sponsors = [
  { name: "Vokel d.o.o.", tier: "Gold", image: vokelLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "scale-[1.3]", url: "https://vokel.com/" },
  { name: "Bin Vest", tier: "Gold", image: binvestLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "!object-contain scale-[1.6]", url: "https://binvest-po.com/" },
  { name: "Miviko", tier: "Silver", image: mivikoLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "scale-[1.6]", url: "https://www.miviko-cables.com/" },
  { name: "Planet", tier: "Silver", image: planetLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "scale-[1.6]", url: "https://www.facebook.com/planetbih/" },
  { name: "WWin", tier: "Bronze", image: wwinLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "!object-contain scale-[1.65]", url: "https://wwin.ba/" },
  { name: "Agencija Laguna", tier: "Silver", image: lagunaLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "scale-[1.4]", url: "https://agencija-laguna.com/index.php/about" },
  { name: "Mrvelji d.o.o.", tier: "Bronze", image: mrveljiLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "!object-contain scale-[1.15]", url: "https://www.mrvelji.com/" },
  { name: "Šišović Rakitno", tier: "Gold", image: sisovicLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "!object-contain scale-[2.5]", url: "https://www.sisovic.com/" },
  { name: "Weltplast", tier: "Bronze", image: weltplastLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "scale-[1.2]", url: "https://weltplast.com/hr/" },
  { name: "Leda", tier: "Gold", image: ledaLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "", url: "http://www.leda.ba/" },
  { name: "Croatia Osiguranje", tier: "Gold", image: croatiaOsiguranjeLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "scale-[1.25]", url: "https://crosig.ba/" },
  { name: "Ljekarna Blanka", tier: "Gold", image: ljekarnaBlanka, borderColor: goldBorder, glowColor: goldGlow, imgClass: "", url: "https://www.facebook.com/ljekarna.blanka/" },
  { name: "Winners", tier: "Bronze", image: winnersLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "!object-contain scale-[1.65]", url: "https://www.facebook.com/pages/Caffe%20Winners%20Posusje/235220287284078/" },
  { name: "Restoran Bosiljna", tier: "Bronze", image: bosiljnaLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "!object-contain scale-[1.4]", url: "https://www.facebook.com/p/Restoran-Bosiljna-100088386104760/" },
  { name: "KTM Brina", tier: "Silver", image: ktmBrinaLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "scale-[1.35]", url: "https://ktm-brina.com/" },
  { name: "Ardu", tier: "Bronze", image: arduLogo, borderColor: goldBorder, glowColor: goldGlow, imgClass: "!object-contain scale-[1.3]", url: "https://www.ardusport.com/" },
];

const Sponsors = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-3 md:mb-4">
          <span className="section-title-white">NAŠI </span>
          <span className="section-title-gold">SPONZORI</span>
        </h2>

        <p className="text-muted-foreground text-center mb-8 md:mb-16 max-w-2xl mx-auto text-sm md:text-base">
          Naši partneri koji podržavaju razvoj kluba i omogućavaju ostvarivanje naših ciljeva
        </p>

        {/* Sponsor Logos */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-5 max-w-4xl mx-auto mb-8 md:mb-16">
          {sponsors.map((sponsor, index) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-secondary/50 border-2 ${sponsor.borderColor} rounded-2xl overflow-hidden hover:scale-[1.05] ${sponsor.glowColor} transition-all duration-300 animate-fade-in-up aspect-[2/1]`}
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
              <div className="p-2 rounded-full opacity-0 pointer-events-none">
                <ChevronDown size={24} />
              </div>
              <div className="text-center flex-1">
                <h3 className="text-2xl md:text-3xl font-display">
                  <span className="text-foreground">POSTANI </span>
                  <span className="text-primary">SPONZOR</span>
                </h3>
                <p className="text-muted-foreground text-base mt-1">
                  <span className="md:hidden">Pogledaj sponzorske<br />pakete i podrži klub</span>
                  <span className="hidden md:inline">Pogledaj sponzorske pakete i podrži klub</span>
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
                    const shadowColor = tier.name === "ZLATNI" 
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(48,96%,53%,0.35)]" 
                      : tier.name === "SREBRENI" 
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(0,0%,70%,0.25)]" 
                      : tier.name === "BRONČANI" 
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(30,60%,45%,0.25)]" 
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
