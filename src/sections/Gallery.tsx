import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ImageIcon } from "lucide-react";
import { useGalleryStore } from "@/stores/useGalleryStore";

export function Gallery() {
  const { items, subscribe } = useGalleryStore();
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => subscribe(), [subscribe]);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-poppins text-xs uppercase tracking-[0.4em] text-gold mb-3">
            Our Gallery
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase font-bold mb-4">
            A Glimpse Of Our <span className="text-gold">Magic</span>
          </h2>
          <p className="font-body text-muted-foreground">
            Real moments from real celebrations we have crafted.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <ImageIcon size={48} className="mb-4 text-gold/40" />
            <p className="font-body">
              Gallery images will appear here once uploaded from the admin panel.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {items.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 8) * 0.05 }}
                onClick={() => setOpen(item.url)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-luxury transition-shadow"
              >
                <img
                  src={item.url}
                  alt={item.title || "Gallery"}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" size={36} />
                </div>
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-sm font-body">{item.title}</p>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 text-white hover:text-gold"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={open}
              alt=""
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
