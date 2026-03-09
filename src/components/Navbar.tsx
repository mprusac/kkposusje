import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "#pocetna", label: "Početna" },
  { href: "/statistika", label: "Statistika", isRoute: true },
  { href: "#vijesti", label: "Vijesti" },
  { href: "#tim", label: "Tim" },
  { href: "/galerija", label: "Galerija", isRoute: true },
  { href: "#kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("pocetna");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.filter(l => !l.isRoute).map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with yellow glow on hover */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="HKK Posušje" 
              className="h-14 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_20px_hsl(48,96%,53%)] group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isRoute = link.isRoute;
              const isActive = isRoute 
                ? location.pathname === link.href 
                : activeSection === link.href.slice(1);
              
              if (isRoute) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`group relative font-display text-xl tracking-widest transition-all duration-300 py-2 ${
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <span 
                      className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              }
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative font-display text-xl tracking-widest transition-all duration-300 py-2 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[400px] pb-2" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-0 pt-1">
            {navLinks.map((link) => {
              const isRoute = link.isRoute;
              const isActive = isRoute 
                ? location.pathname === link.href 
                : activeSection === link.href.slice(1);
              
              if (isRoute) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-display text-lg tracking-widest transition-all duration-300 px-3 py-1 rounded-md ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-lg tracking-widest transition-all duration-300 px-3 py-1 rounded-md ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
