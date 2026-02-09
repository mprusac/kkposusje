import { useState } from "react";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Poruka poslana!",
      description: "Hvala vam na poruci. Odgovorit ćemo vam što prije.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="kontakt" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          <span className="text-primary">KONTAKTIRAJTE NAS</span>
        </h2>

        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Želite postati dio naše obitelji ili imate pitanja? Javite nam se!
        </p>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {/* Contact Form */}
          <div className="animate-fade-in-up h-full">
            <div className="bg-secondary/30 border border-border rounded-xl md:rounded-2xl p-5 md:p-8 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 flex-1 flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors"
                    >
                      Ime i prezime
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Vaše ime"
                      className="bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vas@email.com"
                      className="bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors"
                  >
                    Predmet
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tema vaše poruke"
                    className="bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors"
                  >
                    Poruka
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Vaša poruka..."
                    rows={4}
                    className="bg-background/50 border-border focus:border-primary focus:ring-primary/20 resize-none transition-all duration-300 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] uppercase tracking-wider font-display text-lg transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="mr-2 animate-spin" size={18} />
                      Šalje se...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Pošalji poruku
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="flex flex-col gap-3 md:gap-4 animate-fade-in-up delay-200 h-full">
            {/* Contact Details */}
            <div className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/40 transition-all duration-300 cursor-default flex-1">
              <div className="p-2 md:p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <MapPin className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-display text-sm md:text-base text-foreground mb-0.5 tracking-wide">Adresa</h4>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Ulica Fra Grge Martića bb, 88240 Posušje
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/40 transition-all duration-300 flex-1">
              <div className="p-2 md:p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <Mail className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-display text-sm md:text-base text-foreground mb-0.5 tracking-wide">Email</h4>
                <a
                  href="mailto:kkposusje@gmail.com"
                  className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors"
                >
                  kkposusje@gmail.com
                </a>
              </div>
            </div>

            <div className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/40 transition-all duration-300 flex-1">
              <div className="p-2 md:p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <Phone className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-display text-sm md:text-base text-foreground mb-0.5 tracking-wide">Telefon</h4>
                <a
                  href="tel:+38763123456"
                  className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors"
                >
                  +387 63 123 456
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg md:rounded-xl overflow-hidden bg-secondary border border-border hover:border-primary/30 transition-all duration-300 flex-[2]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11604.894831087447!2d17.318!3d43.467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b1c3a0b0b0001%3A0x1000!2sPosušje%2C%20Bosnia%20and%20Herzegovina!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '120px', filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija HKK Posušje"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;