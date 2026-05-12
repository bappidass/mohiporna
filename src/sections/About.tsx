import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import about from "@/assets/about.webp";

const stats = [
  { value: 1500, label: "Events Completed", suffix: "+" },
  { value: 1200, label: "Happy Clients", suffix: "+" },
  { value: 800, label: "Decorations", suffix: "+" },
  { value: 600, label: "Catering Events", suffix: "+" },
];

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1800;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold rounded-2xl -z-10" />
            <img
              src={about}
              alt="Luxury Assamese wedding"
              loading="lazy"
              width={1280}
              height={1280}
              className="rounded-2xl shadow-luxury w-full aspect-square object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-black text-white px-6 py-4 rounded-xl shadow-luxury">
              <div className="font-heading text-3xl text-gold">15+</div>
              <div className="font-poppins text-xs uppercase tracking-wider">
                Years of Excellence
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-poppins text-xs uppercase tracking-[0.4em] text-gold mb-3">
              About Mohioparna
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase font-bold leading-tight mb-6">
              Where Tradition Meets <span className="text-gold">Luxury</span>
            </h2>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              Mohioparna is Guwahati's premier multi-functional event destination — a
              dedicated space where every celebration finds its perfect setting. From
              grand Assamese weddings and receptions to corporate gatherings,
              birthdays, and cultural events, we orchestrate every detail with
              uncompromising elegance.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
              Our team blends rich Assamese heritage with modern luxury — delivering
              decor, catering, and experiences that turn moments into memories.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-gold hover:border-gold transition-all duration-500"
                >
                  <div className="font-heading text-3xl sm:text-4xl text-black font-bold">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="font-poppins text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
