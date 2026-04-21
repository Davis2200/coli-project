"use client";
import { useState } from "react";
import { Menu, Search, MessageSquare, User, Settings, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/lib/store";

export function NavbarTurista({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-6 py-3">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Lado Izquierdo: Menú y Buscador */}
        <div className="flex items-center gap-1">
          <button onClick={onOpenMenu} className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
            <Menu size={24} />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
            <Search size={22} />
          </button>
          <Link href="/turista/chat" className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
            <MessageSquare size={22} />
          </Link>
        </div>

        {/* Centro: Logo */}
        <Link href="/turista/explorar" className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 shadow-sm">
          <Image src="/coli-logo.jpeg" alt="Logo" fill className="object-cover" />
        </Link>

        {/* Lado Derecho: Avatar con Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 p-1 pr-2 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center overflow-hidden">
              <User size={20} className="text-indigo-600" />
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Menú Desplegable (Dropdown) */}
          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-slate-100 py-3 z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-5 py-3 border-b border-slate-50 mb-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Cuenta</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{user?.name || "Turista Coli"}</p>
                </div>

                <Link href="/perfil" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  <User size={18} /> Ver Perfil
                </Link>

                <Link href="/configuracion" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  <Settings size={18} /> Configuración
                </Link>

                <div className="h-px bg-slate-50 my-2"></div>

                <button
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-4 text-sm font-black text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <LogOut size={18} /> Cerrar Sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}