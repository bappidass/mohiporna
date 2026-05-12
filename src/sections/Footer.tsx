import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.webp";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div>
            <img src={logo} alt="Mohioparna" className="h-14 w-auto mb-4" />
            <p className="font-body text-white/70 text-sm leading-relaxed">
              A Place for Multi Functional Event. Crafting unforgettable celebrations
              with luxury, tradition, and care.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg uppercase text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 font-body text-sm text-white/70">
              {["Home", "About", "Services", "Gallery", "Testimonial", "Contact"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase()}`}
                      className="hover:text-gold transition"
                    >
                      {l}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg uppercase text-gold mb-4">Services</h4>
            <ul className="space-y-2 font-body text-sm text-white/70">
              <li>Wedding Planning</li>
              <li>Catering</li>
              <li>Decoration</li>
              <li>Photography</li>
              <li>Entertainment</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg uppercase text-gold mb-4">Contact</h4>
            <div className="space-y-3 font-body text-sm text-white/70">
              <div className="flex gap-2">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span>{SITE.address}</span>
              </div>
              <div className="flex gap-2">
                <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
                <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}>{SITE.phones[0]}</a>
              </div>
              <div className="flex gap-3 pt-3">
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-black flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-black flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center font-poppins text-xs text-white/50">
          © {new Date().getFullYear()} Mohioparna. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
