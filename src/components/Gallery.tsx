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
  { id: 1, src: action1, title: "Juniori na Telemach Sarajevo Cupu" },
  { id: 2, src: action2, title: "Prodor mladog Davida Dragoje" },
  { id: 3, src: action3, title: "Mladi centar Marko Protrka" },
  { id: 4, src: action4, title: "Timeout" },
  { id: 5, src: action5, title: "Iskusni Mirko Đerek" },
  { id: 6, src: action6, title: "Akcija na utakmici" },
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

  return (
    <section id="galerija" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">
          <span className="section-title-white">U </span>
          <span className="section-title-gold">AKCIJI</span>
        </h2>

        {/* Bento Grid Layout - 2 columns */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Prodor - tall */}
            <div 
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in-up hover-lift aspect-[3/4]"
              onClick={() => openLightbox(1)}
            >
              <img
                src={action2}
                alt={images[1].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-bold text-sm uppercase tracking-wider drop-shadow-lg">{images[1].title}</span>
              </div>
            </div>

            {/* Timeout - below Prodor */}
            <div 
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in-up hover-lift aspect-[4/3]"
              style={{ animationDelay: "150ms" }}
              onClick={() => openLightbox(3)}
            >
              <img
                src={action4}
                alt={images[3].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-bold text-sm uppercase tracking-wider drop-shadow-lg">{images[3].title}</span>
              </div>
            </div>

            {/* Iskusni Mirko */}
            <div 
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in-up hover-lift aspect-square"
              style={{ animationDelay: "250ms" }}
              onClick={() => openLightbox(4)}
            >
              <img
                src={action5}
                alt={images[4].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-bold text-sm uppercase tracking-wider drop-shadow-lg">{images[4].title}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Juniori - wide */}
            <div 
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in-up hover-lift aspect-[4/3]"
              style={{ animationDelay: "50ms" }}
              onClick={() => openLightbox(0)}
            >
              <img
                src={action1}
                alt={images[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-bold text-sm uppercase tracking-wider drop-shadow-lg">{images[0].title}</span>
              </div>
            </div>

            {/* Nova slika - below Juniori, tall */}
            <div 
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in-up hover-lift aspect-[3/4]"
              style={{ animationDelay: "100ms" }}
              onClick={() => openLightbox(5)}
            >
              <img
                src={action6}
                alt={images[5].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-bold text-sm uppercase tracking-wider drop-shadow-lg">{images[5].title}</span>
              </div>
            </div>

            {/* Mladi centar Marko */}
            <div 
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in-up hover-lift aspect-square"
              style={{ animationDelay: "200ms" }}
              onClick={() => openLightbox(2)}
            >
              <img
                src={action3}
                alt={images[2].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-bold text-sm uppercase tracking-wider drop-shadow-lg">{images[2].title}</span>
              </div>
            </div>
          </div>
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
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Previous button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            {/* Animated Image */}
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

            {/* Next button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            {/* Image counter & title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-primary font-bold mb-1">{images[currentIndex].title}</p>
              <p className="text-foreground/70 text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;