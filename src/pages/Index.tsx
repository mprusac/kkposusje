import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import News from "@/components/News";
import Results from "@/components/Results";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Save scroll position continuously on homepage
    const handleScroll = () => {
      sessionStorage.setItem("homeScrollY", String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Restore scroll position if coming back from a sub-page
    const restoreScroll = sessionStorage.getItem("restoreHomeScroll");
    if (restoreScroll === "true") {
      sessionStorage.removeItem("restoreHomeScroll");
      const savedY = sessionStorage.getItem("homeScrollY");
      if (savedY) {
        // Small delay to let the page render
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedY, 10));
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Results />
        <News />
        <Team />
        <Gallery />
        <About />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
