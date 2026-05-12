import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Upload,
  Trash2,
  Plus,
  Menu,
  X,
  Loader2,
  Pencil,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import  useAuthStore  from "@/stores/useAuthStore";
import { useGalleryStore } from "@/stores/useGalleryStore";
import { useTestimonialStore, type Testimonial } from "@/stores/useTestimonialStore";
import logo from "@/assets/logo.webp";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

type Tab = "overview" | "gallery" | "testimonials";

function AdminDashboard() {
  const { user, loading, logout, init } = useAuthStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebar, setSidebar] = useState(false);

  const gallery = useGalleryStore();
  const testimonials = useTestimonialStore();

  useEffect(() => init(), [init]);
  useEffect(() => {
    if (!loading && !user) navigate({ to: "/admin/login" });
  }, [user, loading, navigate]);

  useEffect(() => gallery.subscribe(), [gallery]);
  useEffect(() => testimonials.subscribe(), [testimonials]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink text-white">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate({ to: "/admin/login" });
  };

  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-ink text-white transition-transform duration-300 ${
          sidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <img src={logo} alt="Mohioparna" className="h-10" />
          <button onClick={() => setSidebar(false)} className="lg:hidden text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((n) => {
            const Icon = n.icon;
            const active = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setTab(n.id);
                  setSidebar(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition ${
                  active
                    ? "bg-gold text-black font-medium"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {n.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-gold text-xs font-poppins px-2 py-2"
          >
            <ExternalLink size={14} /> View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-white/70 hover:text-white text-sm font-body px-2 py-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebar(true)} className="lg:hidden">
            <Menu size={22} />
          </button>
          <h1 className="font-heading uppercase text-xl sm:text-2xl font-bold capitalize">
            {tab}
          </h1>
          <div className="text-xs text-muted-foreground font-poppins hidden sm:block">
            {user.email}
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {tab === "overview" && <Overview gallery={gallery} testimonials={testimonials} />}
          {tab === "gallery" && <GalleryManager />}
          {tab === "testimonials" && <TestimonialsManager />}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof ImageIcon;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 border border-border shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-poppins">
            {label}
          </p>
          <p className="font-heading text-4xl font-bold mt-2">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-gold/20 text-black flex items-center justify-center">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}

function Overview({
  gallery,
  testimonials,
}: {
  gallery: ReturnType<typeof useGalleryStore.getState>;
  testimonials: ReturnType<typeof useTestimonialStore.getState>;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
      <StatCard label="Gallery Images" value={gallery.items.length} icon={ImageIcon} />
      <StatCard
        label="Testimonials"
        value={testimonials.items.length}
        icon={MessageSquare}
      />
    </div>
  );
}

function GalleryManager() {
  const { items, upload, remove } = useGalleryStore();
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const onUpload = async () => {
    if (!files.length) return toast.error("Pick at least one image");
    setUploading(true);
    try {
      await upload(files, title);
      toast.success(`${files.length} image(s) uploaded`);
      setFiles([]);
      setTitle("");
    } catch (e: any) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h2 className="font-heading uppercase text-lg font-bold mb-4">Upload Images</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="bg-background border border-border rounded-lg px-4 py-2.5 font-body file:mr-3 file:rounded file:border-0 file:bg-gold file:px-3 file:py-1 file:text-sm file:font-medium"
          />
        </div>
        <button
          onClick={onUpload}
          disabled={uploading || !files.length}
          className="mt-4 inline-flex items-center gap-2 bg-gold text-black font-heading uppercase tracking-wider px-6 py-2.5 rounded-lg hover:scale-[1.02] transition disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Upload size={18} />
          )}
          {uploading ? "Uploading..." : `Upload ${files.length || ""}`}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-heading uppercase text-lg font-bold">
            Gallery ({items.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4">Preview</th>
                <th className="p-4">Title</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-muted-foreground">
                    No images yet.
                  </td>
                </tr>
              )}
              {items.map((it) => (
                <tr key={it.id} className="border-t border-border">
                  <td className="p-4">
                    <img
                      src={it.url}
                      alt=""
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-4 font-body text-sm">{it.title || "—"}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        if (confirm("Delete this image?")) {
                          remove(it).then(() => toast.success("Deleted"));
                        }
                      }}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TestimonialsManager() {
  const { items, add, update, remove } = useTestimonialStore();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", role: "", message: "", rating: 5 });
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setForm({ name: "", role: "", message: "", rating: 5 });
    setEditing(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return toast.error("Name and message required");
    setBusy(true);
    try {
      if (editing) {
        await update(editing.id, form);
        toast.success("Updated");
      } else {
        await add(form);
        toast.success("Added");
      }
      reset();
    } catch (e: any) {
      toast.error(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h2 className="font-heading uppercase text-lg font-bold mb-4">
          {editing ? "Edit Testimonial" : "Add Testimonial"}
        </h2>
        <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold"
            maxLength={100}
          />
          <input
            placeholder="Role / Event (optional)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold"
            maxLength={100}
          />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            maxLength={500}
            className="sm:col-span-2 bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold resize-none"
          />
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            className="bg-background border border-border rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} stars
              </option>
            ))}
          </select>
          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 bg-gold text-black font-heading uppercase tracking-wider px-6 py-2.5 rounded-lg hover:scale-[1.02] transition disabled:opacity-50"
            >
              {busy ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Plus size={18} />
              )}
              {editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={reset}
                className="px-6 py-2.5 rounded-lg border border-border font-body"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-heading uppercase text-lg font-bold">
            All Testimonials ({items.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Message</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No testimonials yet.
                  </td>
                </tr>
              )}
              {items.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="p-4 font-body text-sm font-medium">{t.name}</td>
                  <td className="p-4 font-body text-sm">{t.role || "—"}</td>
                  <td className="p-4 font-body text-sm max-w-xs truncate">
                    {t.message}
                  </td>
                  <td className="p-4 font-body text-sm">{t.rating ?? 5}★</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setEditing(t);
                        setForm({
                          name: t.name,
                          role: t.role || "",
                          message: t.message,
                          rating: t.rating ?? 5,
                        });
                      }}
                      className="text-foreground hover:bg-muted p-2 rounded-lg mr-1"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this testimonial?")) {
                          remove(t.id).then(() => toast.success("Deleted"));
                        }
                      }}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
