import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-ink text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins text-xs uppercase tracking-[0.4em] text-gold mb-3"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase font-bold mb-4"
          >
            Everything You Need <span className="text-gold">Under One Roof</span>
          </motion.h2>
          <p className="font-body text-white/70">
            From decor to dining, sound to celebration — we handle every detail.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:border-gold transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gold text-black flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Icon size={28} strokeWidth={2.2} />
                  </div>

                  <h3 className="font-heading text-2xl uppercase font-bold mb-4 group-hover:text-gold transition-colors">
                    {cat.title}
                  </h3>

                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm font-body text-white/80"
                      >
                        <Check
                          size={16}
                          className="text-gold flex-shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
