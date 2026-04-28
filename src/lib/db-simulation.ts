"use client";

/**
 * db-simulation.ts
 * Simulación de base de datos para persistir usuarios registrados durante la sesión.
 * Permite que el Login "consulte" a los usuarios creados en el front.
 */

export interface VirtualUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'turista' | 'afiliado' | 'business';
  mes_activacion: string;
}

const STORAGE_KEY = 'coli_virtual_db_users';

export const db_simulation = {
  // Guardar un nuevo usuario
  saveUser: (user: VirtualUser) => {
    if (typeof window === 'undefined') return;
    
    const users = db_simulation.getUsers();
    
    // Evitar duplicados por email
    const existing = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (existing) return;

    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  // Obtener todos los usuarios
  getUsers: (): VirtualUser[] => {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // Buscar usuario por email para el Login
  findUserByEmail: (email: string): VirtualUser | undefined => {
    const users = db_simulation.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
};
