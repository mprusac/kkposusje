import { Button } from "@/components/ui/button";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { id: 1, src: gallery1, alt: "Akcija na utakmici" },
  { id: 2, src: gallery2, alt: "Zakucavanje" },
  { id: 3, src: gallery3, alt: "Ekipni sastanak" },
  { id: 4, src: gallery4, alt: "Šut za tri" },
  { id: 5, src: gallery5, alt: "Obrana" },
  { id: 6, src: gallery6, alt: "Slavlje pobjede" },
];

const Gallery = () => {
  return (
    <section id="galerija" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-16">
          <span className="section-title-white">U </span>
          <span className="section-title-gold">AKCIJI</span>
        </h2>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-lg animate-fade-in-up ${
                index === 0 || index === 4 ? "row-span-2" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ minHeight: index === 0 || index === 4 ? "400px" : "200px" }}
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300" />
            </div>
          ))}
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
