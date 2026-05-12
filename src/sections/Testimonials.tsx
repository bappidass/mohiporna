import { useEffect } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Quote, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useTestimonialStore } from "@/stores/useTestimonialStore";
import { SITE } from "@/lib/site";

const FALLBACK = [
  {
    id: "f1",
    name: "Priya & Rahul",
    role: "Wedding Reception",
    message:
      "Mohioparna transformed our wedding into a fairytale. From the floral mandap to the catering, every detail was perfect.",
    rating: 5,
  },
  {
    id: "f2",
    name: "Anjana Devi",
    role: "Anniversary Celebration",
    message:
      "The team's attention to traditional Assamese touches alongside modern luxury was breathtaking. Highly recommended!",
    rating: 5,
  },
  {
    id: "f3",
    name: "Corporate Client",
    role: "Annual Gala",
    message:
      "Professional, punctual and creative. Our annual event was a huge success thanks to their flawless execution.",
    rating: 5,
  },
];

export function Testimonials() {
  const { items, subscribe } = useTestimonialStore();
  useEffect(() => subscribe(), [subscribe]);

  const list = items.length ? items : FALLBACK;

  return (
    <section id="testimonial" className="py-24 sm:py-32 bg-muted/40 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-poppins text-xs uppercase tracking-[0.4em] text-gold mb-3">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase font-bold mb-4">
            Words From Our <span className="text-gold">Happy Clients</span>
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          speed={800}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.1 },
            768: { slidesPerView: 2 },
          }}
          className="max-w-4xl mx-auto"
        >
          {list.map((t) => (
            <SwiperSlide key={t.id}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-border h-full relative"
              >
                <Quote className="absolute top-6 right-6 text-gold/20" size={48} />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-body text-foreground/80 leading-relaxed mb-6 relative">
                  "{t.message}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-heading uppercase tracking-wider text-foreground font-bold">
                    {t.name}
                  </p>
                  {t.role && (
                    <p className="font-poppins text-xs text-muted-foreground mt-0.5">
                      {t.role}
                    </p>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <a
            href={SITE.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white font-heading uppercase tracking-wider px-7 py-3 rounded-full hover:bg-gold hover:text-black transition-all duration-300"
          >
            View More Reviews
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
