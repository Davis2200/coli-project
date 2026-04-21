"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import { useAuthStore } from "@/lib/store";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Settings, LogOut, ChevronDown } from "lucide-react";

export default function Header() {
  const { userType, isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted]);

  // Section name logic
  const getSectionName = () => {
    if (pathname === '/') return 'Inicio';
    if (pathname.includes('/explorar')) return 'Explorar';
    if (pathname.includes('/lugares')) return 'Detalles';
    if (pathname.includes('/reservas')) return 'Reservas';
    if (pathname.includes('/afiliado')) return 'Afiliados';
    if (pathname.includes('/admin')) return 'Admin';
    if (pathname.includes('/business')) return 'Mi Negocio';
    if (pathname.includes('/perfil')) return 'Mi Perfil';
    if (pathname.includes('/chat')) return 'Mensajes';
    if (pathname.includes('/promociones')) return 'Promos';
    return 'Coli';
  };

  return (
    <header className="sticky top-0 z-[1000] glass-panel bg-white/70 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Side: Hamburger + Search */}
        <div className="flex items-center gap-2 flex-1">
          {isMounted && isAuthenticated && (
            <>
              <HamburgerMenu role={userType || 'turista'} />
              <button className="text-slate-400 hover:text-indigo-600 p-2 transition-colors">
                <Search size={22} />
              </button>
            </>
          )}
          {(!isMounted || !isAuthenticated) && (
             <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-xl shadow-indigo-600/10 border border-slate-200 group-hover:scale-105 transition-transform">
                  <Image src="/coli-logo.jpeg" alt="Coli Logo" fill priority sizes="48px" className="object-cover"/>
                </div>
              </Link>
          )}
        </div>

        {/* Center: Section Name */}
        <div className="flex-1 flex justify-center text-center">
          <motion.span 
            key={pathname}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 bg-indigo-50 px-6 py-2.5 rounded-full border border-indigo-100 whitespace-nowrap"
          >
            {getSectionName()}
          </motion.span>
        </div>

        {/* Right Side: Profile Dropdown / Login */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {isMounted && isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 group p-1 pr-2 rounded-2xl hover:bg-slate-100 transition-all border border-transparent"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-indigo-100 group-hover:border-indigo-500 transition-all shadow-md">
                  <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userType}`} alt="Profile" fill className="object-cover" />
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-4 w-60 bg-white border border-slate-200 rounded-[28px] shadow-2xl py-3 overflow-hidden ring-1 ring-black/5"
                  >
                    <div className="px-4 py-3 mb-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rol activo</p>
                      <p className="text-sm font-black text-slate-800 capitalize">{userType || 'Turista'}</p>
                    </div>
                    
                    <Link 
                      href="/perfil" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                    >
                      <User size={18} className="text-indigo-500" />
                      Mi Perfil
                    </Link>
                    
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        alert("Configuración próximamente");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    >
                      <Settings size={18} className="text-rose-500" />
                      Configuración
                    </button>
                    
                    <div className="mx-2 my-2 border-t border-slate-100 pt-2">
                       <button 
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                      >
                        <LogOut size={18} />
                        Cerrar Sesión
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-colors bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md active:scale-95"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
