import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@/assets/hero-1.webp";


const slides = [hero1];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[640px] overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[i]}
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1088}
          />
          <div className="absolute inset-0 gradient-dark-overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-poppins text-gold uppercase tracking-[0.4em] text-xs sm:text-sm mb-4"
        >
          A Place for Multi Functional Event
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold uppercase text-white leading-[0.95] mb-4"
        >
          Crafting <span className="text-shimmer">Moments</span>
          <br />
          That Last Forever
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-body text-white/80 max-w-2xl text-base sm:text-lg mb-10"
        >
          Premium Wedding & Event Management in Guwahati. From traditional Assamese
          ceremonies to grand receptions — we design unforgettable experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#contact"
            className="bg-gold text-black font-heading uppercase tracking-wider px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-gold transition-all duration-300"
          >
            Book Event
          </a>
          <a
            href="#services"
            className="border-2 border-white text-white font-heading uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            View Services
          </a>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-10 bg-gold" : "w-4 bg-white/40"
              }`}
              aria-label={`slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
