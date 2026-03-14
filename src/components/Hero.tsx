import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/team-photo.jpg";
import { useEffect, useState, useRef } from "react";

const TYPEWRITER_TEXT = "Igra koja spaja";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const typewriterStarted = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (typewriterStarted.current) return;
    typewriterStarted.current = true;
    
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayedText(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 100);
    return () => clearInterval(timer);
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
          backgroundSize: isMobile ? 'cover' : '140%',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center -mt-20 md:mt-0">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display tracking-wider mb-4 animate-fade-in-up">
            <span className="text-foreground">HKK </span>
            <span className="text-primary">POSUŠJE</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-8 animate-fade-in-up delay-200">
            {displayedText}
            {showCursor && <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />}
          </p>

          <div className="animate-fade-in-up delay-400">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-transparent border-2 border-primary text-primary hover:text-primary-foreground font-display uppercase tracking-widest px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg transition-all duration-500"
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
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a
          href="#rezultati"
          className="text-primary animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
