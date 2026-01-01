import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import action1 from "@/assets/action-1.jpg";
import action2 from "@/assets/action-2.jpg";
import action3 from "@/assets/action-3.jpg";
import action4 from "@/assets/action-4.png";
import action5 from "@/assets/action-5.png";
import action6 from "@/assets/action-6.png";

const images = [
  { id: 1, src: action2, title: "Prodor mladog Davida Dragoje", objectPosition: "center bottom" },
  { id: 2, src: action5, title: "Iskusni Mirko Đerek", objectPosition: "center" },
  { id: 3, src: action1, title: "Juniori na Telemach Sarajevo Cupu", objectPosition: "center" },
  { id: 4, src: action3, title: "Mladi centar Marko Protrka", objectPosition: "center" },
  { id: 5, src: action6, title: "Akcija na utakmici", objectPosition: "center" },
  { id: 6, src: action4, title: "Timeout", objectPosition: "center top" },
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const GalleryItem = ({ index, className, style, objectPosition }: { index: number; className: string; style?: React.CSSProperties; objectPosition?: string }) => (
    <div 
      className={`group relative overflow-hidden rounded-lg cursor-pointer animate-fade-in-up hover-lift ${className}`}
      style={style}
      onClick={() => openLightbox(index)}
    >
      <img
        src={images[index].src}
        alt={images[index].title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition: objectPosition || images[index].objectPosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-primary font-bold text-xs md:text-sm uppercase tracking-wider drop-shadow-lg">{images[index].title}</span>
      </div>
    </div>
  );

  return (
    <section id="galerija" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">
          <span className="section-title-white">U </span>
          <span className="section-title-gold">AKCIJI</span>
        </h2>

        {/* Bento Grid Layout - 3 columns */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-3xl mx-auto" style={{ gridAutoRows: "90px" }}>
          {/* Left column - Prodor (shorter, 2 rows) */}
          <GalleryItem index={0} className="row-span-2" />
          
          {/* Middle top - Iskusni Mirko (1 row) */}
          <GalleryItem index={1} className="row-span-1" style={{ animationDelay: "50ms" }} />
          
          {/* Right top - Juniori */}
          <GalleryItem index={2} className="row-span-1" style={{ animationDelay: "100ms" }} />
          
          {/* Middle bottom - Mladi centar Marko (1 row, equal to Mirko) */}
          <GalleryItem index={3} className="row-span-1" style={{ animationDelay: "150ms" }} />
          
          {/* Right - Akcija (spans 2 rows) */}
          <GalleryItem index={4} className="row-span-2" style={{ animationDelay: "200ms" }} />
          
          {/* Bottom left - Timeout (taller, 2 rows) */}
          <GalleryItem index={5} className="row-span-2 col-span-2" style={{ animationDelay: "250ms" }} />
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider"
          >
            Sva galerija
          </Button>
        </div>
      </div>

      {/* Animated Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/70 text-sm"
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;