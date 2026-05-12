import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";


interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;

  init: () => () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,
  initialized: false,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      await signInWithEmailAndPassword(auth, email, password);

      set({
        loading: false,
        error: null,
      });

      return true;
    } catch (err: any) {
      let errorMessage = "Login failed. Please try again.";

      if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials.";
      }

      set({
        error: errorMessage,
        loading: false,
      });

      return false;
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await signOut(auth);

      set({
        user: null,
        loading: false,
      });
    } catch (err) {
      console.error(err);

      set({
        loading: false,
      });
    }
  },

  init: () => {
    set({ loading: true });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({
        user,
        initialized: true,
        loading: false,
      });
    });

    return unsubscribe;
  },
}));

export default useAuthStore;

