import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "@/lib/site";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in name, phone and message.");
      return;
    }
    setLoading(true);
    const text = encodeURIComponent(
      `Hi Mohioparna,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`,
    );
    window.open(`https://wa.me/${SITE.whatsapp}?text=${text}`, "_blank");
    setTimeout(() => {
      setLoading(false);
      toast.success("Opening WhatsApp to send your enquiry.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-poppins text-xs uppercase tracking-[0.4em] text-gold mb-3">
            Get In Touch
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase font-bold mb-4">
            Let's Plan Your <span className="text-gold">Dream Event</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-ink text-white rounded-2xl p-8 space-y-6"
          >
            <h3 className="font-heading text-2xl uppercase font-bold">Contact Info</h3>

            <div className="flex gap-4 items-start">
              <MapPin className="text-gold flex-shrink-0 mt-1" size={22} />
              <p className="font-body text-white/80 text-sm">{SITE.address}</p>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="text-gold flex-shrink-0 mt-1" size={22} />
              <div className="font-body text-white/80 text-sm space-y-1">
                {SITE.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="block hover:text-gold"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="text-gold flex-shrink-0 mt-1" size={22} />
              <a href={`mailto:${SITE.email}`} className="font-body text-white/80 text-sm hover:text-gold">
                {SITE.email}
              </a>
            </div>

            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gold text-black font-heading uppercase tracking-wider py-3 rounded-full hover:scale-105 transition-transform"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>

            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
              <iframe
                title="Mohioparna location"
                src="https://www.google.com/maps?q=Ghoramara,+Guwahati&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 space-y-5 shadow-md"
          >
            <h3 className="font-heading text-2xl uppercase font-bold">Send a Message</h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold transition"
                maxLength={100}
              />
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold transition"
                maxLength={20}
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold transition"
              maxLength={150}
            />

            <textarea
              placeholder="Tell us about your event..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              maxLength={1000}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold transition resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-gold text-black font-heading uppercase tracking-wider px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-gold transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Enquiry"} <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
