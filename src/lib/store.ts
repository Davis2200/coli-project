import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: { name: string; role: 'turista' | 'afiliado' | 'business' } | null;
  login: (userData: { name: string; role: 'turista' | 'afiliado' | 'business' }) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem('user-storage');
        window.location.href = "/";
      },
    }),
    { name: 'user-storage' }
  )
);