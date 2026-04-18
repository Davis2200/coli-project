"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import { useAuthStore } from "@/lib/store";

export default function Header() {
  const { userType, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  
  // Condición exigida de Mostrar Menú Hamburguesa
  const shouldShowMenu = 
    isAuthenticated || 
    userType === 'invitado' || 
    pathname.startsWith('/turista') || 
    pathname.startsWith('/afiliado') || 
    pathname.startsWith('/partner') ||
    pathname.startsWith('/negocio');

  return (
    <header className="sticky top-0 z-50 glass-panel px-4 py-3 flex justify-between items-center bg-background/80 shadow-md border-b border-white/5">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-coli flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(228,0,124,0.4)]">
          C
        </div>
        <span className="text-xl font-bold text-white tracking-widest">Coli</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {!isAuthenticated && userType !== 'invitado' && (
          <Link 
            href="/login" 
            className="text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors border border-pink-500/30 px-4 py-1.5 rounded-full glass-panel"
          >
            Iniciar Sesión
          </Link>
        )}

        {shouldShowMenu && <HamburgerMenu role={userType || 'turista'} />}
      </div>
    </header>
  );
}
