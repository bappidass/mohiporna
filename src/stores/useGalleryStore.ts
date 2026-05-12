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
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteStorageFile, uploadFiles } from "@/utils/upload";

export interface GalleryItem {
  id: string;
  url: string;
  path: string;
  title?: string;
  createdAt?: number;
}

interface GalleryState {
  items: GalleryItem[];
  loading: boolean;
  subscribe: () => () => void;
  upload: (files: File[], title?: string) => Promise<void>;
  remove: (item: GalleryItem) => Promise<void>;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  items: [],
  loading: true,
  subscribe: () => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: GalleryItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<GalleryItem, "id">),
        }));
        set({ items, loading: false });
      },
      () => set({ loading: false }),
    );
    return unsub;
  },
  upload: async (files, title) => {
    const uploaded = await uploadFiles(files, "gallery");
    for (const u of uploaded) {
      await addDoc(collection(db, "gallery"), {
        url: u.url,
        path: u.path,
        title: title ?? "",
        createdAt: serverTimestamp(),
      });
    }
  },
  remove: async (item) => {
    await deleteDoc(doc(db, "gallery", item.id));
    if (item.path) await deleteStorageFile(item.path);
    set({ items: get().items.filter((i) => i.id !== item.id) });
  },
}));
