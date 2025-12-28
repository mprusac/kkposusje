import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import News from "@/components/News";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
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
