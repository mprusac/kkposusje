import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = [
  { label: "O klubu", href: "#o-klubu" },
  { label: "Vijesti", href: "#vijesti" },
  { label: "Galerija", href: "#galerija" },
  { label: "Kontakt", href: "#kontakt" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="bg-card py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Logo & Description */}
          <div>
            <img src={logo} alt="KK Posušje" className="h-20 w-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Košarkaški klub koji dominira ne samo na terenu, već u srcima svojih
              navijača.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4 uppercase tracking-wider">
              Kontakt
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Posušje, Bosna i Hercegovina</p>
              <a
                href="mailto:kkposusje@gmail.com"
                className="block hover:text-primary transition-colors"
              >
                kkposusje@gmail.com
              </a>
              <p>IBAN: BA39 0000 0000 0000 0000</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4 uppercase tracking-wider">
              Brzi linkovi
            </h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KK Posušje. Sva prava pridržana.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
