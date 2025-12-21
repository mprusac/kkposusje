import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/team-photo.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="pocetna"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image - Full Width & Centered */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full will-change-transform"
        style={{ 
          backgroundImage: `url(${teamPhoto})`,
          backgroundPosition: 'center center',
          backgroundSize: '140%',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display tracking-wider mb-4 animate-fade-in-up">
            <span className="text-foreground">KK </span>
            <span className="text-primary">POSUŠJE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-[0.3em] mb-8 animate-fade-in-up delay-200">
            Više od igre
          </p>

          <div className="animate-fade-in-up delay-400">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-transparent border-2 border-primary text-primary hover:text-primary-foreground font-display uppercase tracking-widest px-10 py-7 text-lg transition-all duration-500"
              asChild
            >
              <a href="#kontakt">
                <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Pridruži se</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#rezultati"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default Hero;
