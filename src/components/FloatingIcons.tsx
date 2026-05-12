import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import whatsappicon from "@/assets/whatsapp-icon.png";
import { SITE } from "@/lib/site";

export function FloatingIcons() {
  return (
    <>
      <motion.a
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-luxury hover:scale-110 transition-transform animate-float"
      >
        <img src={whatsappicon} alt="WhatsApp" className="w-full h-full" />
      </motion.a>


    </>
  );
}
