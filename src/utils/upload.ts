import imageCompression from "browser-image-compression";
import {
  ref as storageRef,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
    return new File([compressed], file.name, { type: compressed.type });
  } catch (e) {
    console.error("compressImage failed", e);
    return file;
  }
}

export async function uploadFiles(
  files: File[],
  folder = "gallery",
): Promise<{ url: string; path: string }[]> {
  const out: { url: string; path: string }[] = [];
  for (const f of files) {
    const compressed = await compressImage(f);
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}-${f.name}`;
    const r = storageRef(storage, path);
    await uploadBytes(r, compressed);
    const url = await getDownloadURL(r);
    out.push({ url, path });
  }
  return out;
}

export async function uploadFilesWithProgress(
  files: File[],
  folder = "gallery",
  onProgress?: (pct: number) => void,
): Promise<{ url: string; path: string }[]> {
  const out: { url: string; path: string }[] = [];
  let done = 0;
  for (const f of files) {
    const compressed = await compressImage(f);
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}-${f.name}`;
    const r = storageRef(storage, path);
    await new Promise<void>((resolve, reject) => {
      const task = uploadBytesResumable(r, compressed);
      task.on(
        "state_changed",
        (snap) => {
          const pct =
            ((done + snap.bytesTransferred / snap.totalBytes) / files.length) *
            100;
          onProgress?.(Math.round(pct));
        },
        reject,
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          out.push({ url, path });
          done += 1;
          resolve();
        },
      );
    });
  }
  return out;
}

export async function deleteStorageFile(path: string) {
  try {
    await deleteObject(storageRef(storage, path));
  } catch (e) {
    console.error("deleteStorageFile failed", e);
  }
}
