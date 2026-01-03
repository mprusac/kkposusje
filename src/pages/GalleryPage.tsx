import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

import eventTomislav from "@/assets/event-tomislav.png";
import eventSiroki from "@/assets/event-siroki.png";
import eventRama from "@/assets/event-rama.png";

// Import Tomislav images
import tomislav1 from "@/assets/tomislav/tomislav-1.jpg";
import tomislav2 from "@/assets/tomislav/tomislav-2.jpg";
import tomislav3 from "@/assets/tomislav/tomislav-3.png";
import tomislav4 from "@/assets/tomislav/tomislav-4.jpg";
import tomislav5 from "@/assets/tomislav/tomislav-5.jpg";
import tomislav6 from "@/assets/tomislav/tomislav-6.jpg";
import tomislav7 from "@/assets/tomislav/tomislav-7.png";
import tomislav8 from "@/assets/tomislav/tomislav-8.jpg";
import tomislav9 from "@/assets/tomislav/tomislav-9.png";
import tomislav10 from "@/assets/tomislav/tomislav-10.jpg";

// Import Rama images
import rama1 from "@/assets/rama/rama-1.png";
import rama2 from "@/assets/rama/rama-2.jpg";
import rama3 from "@/assets/rama/rama-3.jpg";
import rama4 from "@/assets/rama/rama-4.jpg";
import rama5 from "@/assets/rama/rama-5.jpg";
import rama6 from "@/assets/rama/rama-6.jpg";
import rama7 from "@/assets/rama/rama-7.jpg";
import rama8 from "@/assets/rama/rama-8.png";
import rama9 from "@/assets/rama/rama-9.png";
import rama10 from "@/assets/rama/rama-10.jpg";

// Import Široki images
import siroki1 from "@/assets/siroki/siroki-1.jpg";
import siroki2 from "@/assets/siroki/siroki-2.jpg";
import siroki3 from "@/assets/siroki/siroki-3.jpg";
import siroki4 from "@/assets/siroki/siroki-4.jpg";
import siroki5 from "@/assets/siroki/siroki-5.jpg";
import siroki6 from "@/assets/siroki/siroki-6.jpg";
import siroki7 from "@/assets/siroki/siroki-7.png";
import siroki8 from "@/assets/siroki/siroki-8.png";
import siroki9 from "@/assets/siroki/siroki-9.png";
import siroki10 from "@/assets/siroki/siroki-10.png";

// Image orientation type - vertical or horizontal
type ImageWithOrientation = {
  src: string;
  orientation: "vertical" | "horizontal";
};

const events = [
  {
    id: "tomislav",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Tomislav",
    date: "02.11.2025.",
    description: "Galerija s utakmice Posušje - Tomislav",
    coverImage: eventTomislav,
    images: [] as string[],
    imagesWithOrientation: [
      { src: tomislav3, orientation: "horizontal" },   // high five - horizontal
      { src: tomislav1, orientation: "vertical" },     // dribling - vertical
      { src: tomislav2, orientation: "vertical" },     // lopta u ruci - vertical
      { src: tomislav7, orientation: "horizontal" },   // slavlje - horizontal
      { src: tomislav4, orientation: "vertical" },     // trener - vertical
      { src: tomislav5, orientation: "vertical" },     // duel - vertical
      { src: tomislav9, orientation: "horizontal" },   // igrači hodaju - horizontal
      { src: tomislav6, orientation: "vertical" },     // zakucavanje - vertical
      { src: tomislav8, orientation: "vertical" },     // klupa - vertical
      { src: tomislav10, orientation: "vertical" },    // šut - vertical
    ] as ImageWithOrientation[],
  },
  {
    id: "siroki",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Široki II",
    date: "15.11.2025.",
    description: "Galerija s utakmice Posušje - Široki II",
    coverImage: eventSiroki,
    images: [] as string[],
    imagesWithOrientation: [
      { src: siroki7, orientation: "horizontal" },   // tri igraca - horizontal
      { src: siroki1, orientation: "vertical" },     // duel - vertical
      { src: siroki2, orientation: "vertical" },     // layup - vertical
      { src: siroki8, orientation: "horizontal" },   // igrač s loptom - horizontal
      { src: siroki5, orientation: "vertical" },     // timeout - vertical
      { src: siroki3, orientation: "vertical" },     // dribling - vertical
      { src: siroki9, orientation: "horizontal" },   // obrana - horizontal
      { src: siroki4, orientation: "vertical" },     // šut - vertical
      { src: siroki10, orientation: "horizontal" },  // prodor - horizontal
      { src: siroki6, orientation: "vertical" },     // dribling - vertical
    ] as ImageWithOrientation[],
  },
  {
    id: "rama",
    homeTeam: "HKK Posušje",
    awayTeam: "HKK Rama",
    date: "23.11.2025.",
    description: "Galerija s utakmice Posušje - Rama",
    coverImage: eventRama,
    images: [] as string[],
    imagesWithOrientation: [
      { src: rama9, orientation: "horizontal" },     // horizontal
      { src: rama7, orientation: "vertical" },       // vertical
      { src: rama1, orientation: "vertical" },       // vertical
      { src: rama10, orientation: "horizontal" },    // horizontal
      { src: rama4, orientation: "vertical" },       // vertical
      { src: rama2, orientation: "vertical" },       // vertical
      { src: rama3, orientation: "horizontal" },     // horizontal
      { src: rama8, orientation: "vertical" },       // vertical
      { src: rama5, orientation: "vertical" },       // vertical
      { src: rama6, orientation: "horizontal" },     // horizontal
    ] as ImageWithOrientation[],
  },
];

const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link to={`/galerija/${event.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] transition-shadow duration-300">
          <img
            src={event.coverImage}
            alt={`${event.homeTeam} - ${event.awayTeam}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover overlay - covers entire image */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-white font-display text-lg tracking-wider uppercase mt-3">
                Otvori album
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
            {event.homeTeam} - {event.awayTeam}
          </h3>
          <p className="text-primary font-bold mt-1">{event.date}</p>
          <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const EventAlbum = ({ event }: { event: typeof events[0] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get all images (either from imagesWithOrientation or regular images array)
  const allImages = event.imagesWithOrientation 
    ? event.imagesWithOrientation.map(img => img.src)
    : event.images;

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
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Get span classes based on orientation - simplified for better layout
  const getSpanClasses = (index: number) => {
    if (event.imagesWithOrientation) {
      const img = event.imagesWithOrientation[index];
      // Horizontal images span 2 columns, 2 rows
      // Vertical images span 1 column, 2 rows
      return img.orientation === "horizontal" 
        ? "col-span-2 row-span-2" 
        : "col-span-1 row-span-2";
    }
    
    // Fallback
    return "col-span-1 row-span-2";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/galerija"
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad na galeriju</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-2">
              <span className="text-primary">{event.homeTeam}</span>
              <span className="text-white"> - {event.awayTeam}</span>
            </h1>
            <p className="text-primary font-display text-2xl md:text-3xl mt-2">{event.date}</p>
            <p className="text-muted-foreground mt-4">{event.description}</p>
          </motion.div>

          {/* Bento Grid Album - reduced gap for tighter layout */}
          <div className="grid grid-cols-3 gap-1.5 md:gap-2 max-w-5xl mx-auto" style={{ gridAutoRows: "120px" }}>
            {allImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-lg cursor-pointer ${getSpanClasses(index)}`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img}
                  alt={`Slika ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <img
              src={allImages[currentIndex]}
              alt={`Slika ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/70 text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const GalleryPage = () => {
  const { eventId } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If eventId is provided, show the album
  if (eventId) {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      return <EventAlbum event={event} />;
    }
  }

  // Otherwise show the events list
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              <span className="text-white">FOTO</span>
              <span className="text-primary"> GALERIJA</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Zabilježeni trenuci sa naših utakmica
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
