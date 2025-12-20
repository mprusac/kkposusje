import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="pocetna"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-8 py-6 text-base"
              asChild
            >
              <a href="#kontakt">Pridruži se</a>
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
