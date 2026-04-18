import { create } from 'zustand';

type Role = 'turista' | 'afiliado' | 'negocio' | 'invitado' | null;

interface AuthState {
  userType: Role;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userType: null, // by default 'null' simulates a strict anonymous user. Later 'invitado' can be dynamically set
  isAuthenticated: false,
  login: (role) => set({ userType: role, isAuthenticated: true }),
  logout: () => set({ userType: null, isAuthenticated: false }),
}));
