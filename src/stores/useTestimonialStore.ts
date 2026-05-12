import { create } from "zustand";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  message: string;
  rating?: number;
  createdAt?: number;
}

interface TestimonialState {
  items: Testimonial[];
  loading: boolean;
  subscribe: () => () => void;
  add: (data: Omit<Testimonial, "id">) => Promise<void>;
  update: (id: string, data: Partial<Testimonial>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set) => ({
  items: [],
  loading: true,
  subscribe: () => {
    const q = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: Testimonial[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Testimonial, "id">),
        }));
        set({ items, loading: false });
      },
      () => set({ loading: false }),
    );
    return unsub;
  },
  add: async (data) => {
    await addDoc(collection(db, "testimonials"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  },
  update: async (id, data) => {
    await updateDoc(doc(db, "testimonials", id), data);
  },
  remove: async (id) => {
    await deleteDoc(doc(db, "testimonials", id));
  },
}));
