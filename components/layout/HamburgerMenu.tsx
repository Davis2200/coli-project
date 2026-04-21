"use client";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_LINKS } from "@/lib/navigation";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'turista' | 'afiliado' | 'business';
}

export function HamburgerMenu({ isOpen, onClose, role }: HamburgerMenuProps) {
  // Obtenemos los links según el rol del usuario logueado
  const links = MENU_LINKS[role] || MENU_LINKS.turista;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Panel Lateral */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[300px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header del Menú */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Menú Coli</span>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            {/* Links Dinámicos */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-[20px] hover:bg-indigo-50 group transition-all"
                >
                  <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {link.name}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </nav>

            {/* Footer del Menú */}
            <div className="p-8 border-t border-slate-50">
              <div className="bg-slate-50 rounded-[24px] p-4 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estás en modo</p>
                <p className="text-sm font-black text-slate-900 uppercase">{role}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}