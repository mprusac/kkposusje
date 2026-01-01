import { Button } from "@/components/ui/button";
import action1 from "@/assets/action-1.jpg";
import action2 from "@/assets/action-2.jpg";
import action3 from "@/assets/action-3.jpg";
import action4 from "@/assets/action-4.png";
import action5 from "@/assets/action-5.png";
import action6 from "@/assets/action-6.png";

const images = [
  { id: 1, src: action1, alt: "Ekipa na turniru", span: "col-span-2 row-span-1" },
  { id: 2, src: action2, alt: "Taktika", span: "col-span-1 row-span-2" },
  { id: 3, src: action3, alt: "Polaganje", span: "col-span-1 row-span-1" },
  { id: 4, src: action4, alt: "Slavlje", span: "col-span-1 row-span-1" },
  { id: 5, src: action5, alt: "Duel", span: "col-span-1 row-span-1" },
  { id: 6, src: action6, alt: "Prodor", span: "col-span-1 row-span-1" },
];

const Gallery = () => {
  return (
    <section id="galerija" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-16">
          <span className="section-title-white">U </span>
          <span className="section-title-gold">AKCIJI</span>
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-3 md:gap-4 max-w-5xl mx-auto" style={{ gridAutoRows: "180px" }}>
          {/* Row 1: Team photo wide + Coach tall */}
          <div className="col-span-2 row-span-1 group relative overflow-hidden rounded-xl animate-fade-in-up hover-lift">
            <img
              src={action1}
              alt="Ekipa na turniru"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-foreground font-display text-sm tracking-wider bg-background/80 px-3 py-1.5 rounded-lg">
                Ekipa na turniru
              </span>
            </div>
          </div>
          
          <div className="col-span-1 row-span-2 group relative overflow-hidden rounded-xl animate-fade-in-up hover-lift" style={{ animationDelay: "100ms" }}>
            <img
              src={action2}
              alt="Taktika"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-foreground font-display text-sm tracking-wider bg-background/80 px-3 py-1.5 rounded-lg">
                Taktika
              </span>
            </div>
          </div>

          {/* Row 2: Two action shots + coach continues */}
          <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-xl animate-fade-in-up hover-lift" style={{ animationDelay: "200ms" }}>
            <img
              src={action3}
              alt="Polaganje"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-foreground font-display text-sm tracking-wider bg-background/80 px-3 py-1.5 rounded-lg">
                Polaganje
              </span>
            </div>
          </div>

          <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-xl animate-fade-in-up hover-lift" style={{ animationDelay: "300ms" }}>
            <img
              src={action4}
              alt="Slavlje"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-foreground font-display text-sm tracking-wider bg-background/80 px-3 py-1.5 rounded-lg">
                Slavlje
              </span>
            </div>
          </div>

          {/* Row 3: Two more action shots */}
          <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-xl animate-fade-in-up hover-lift" style={{ animationDelay: "400ms" }}>
            <img
              src={action5}
              alt="Duel"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-foreground font-display text-sm tracking-wider bg-background/80 px-3 py-1.5 rounded-lg">
                Duel
              </span>
            </div>
          </div>

          <div className="col-span-2 row-span-1 group relative overflow-hidden rounded-xl animate-fade-in-up hover-lift" style={{ animationDelay: "500ms" }}>
            <img
              src={action6}
              alt="Prodor"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-foreground font-display text-sm tracking-wider bg-background/80 px-3 py-1.5 rounded-lg">
                Prodor
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider"
          >
            Sva galerija
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
