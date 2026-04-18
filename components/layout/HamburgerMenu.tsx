"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "turista" | "afiliado" | "negocio" | "invitado" | null;

export default function HamburgerMenu({ role }: { role: Role }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lógica de menús según Growth Hacking y permisos mencionados
  const menuItems = {
    turista: [
      { name: "Explorar Negocios", path: "/turista/explorar" },
      { name: "Mis Reservas", path: "/turista/reservas" },
      { name: "Mis Promociones", path: "/turista/promociones" },
      { name: "Mis Lugares", path: "/turista/lugares" },
      { name: "Chat", path: "/turista/chat" },
      { name: "Referidos", path: "/turista/referidos" },
    ],
    afiliado: [
      { name: "Explorar Negocios", path: "/afiliado/explorar" },
      { name: "Recomendaciones", path: "/afiliado/recomendaciones" },
      { name: "Mis Promociones", path: "/afiliado/promociones" },
      { name: "Lugares Pactados", path: "/afiliado/lugares" },
      { name: "Chat", path: "/afiliado/chat" },
    ],
    negocio: [
      { name: "Dashboard", path: "/partner" },
      { name: "Gestión de Reservas", path: "/partner/reservas" },
      { name: "Mis Servicios", path: "/partner/servicios" },
      { name: "Promociones", path: "/partner/promociones" },
      { name: "Mapa de Competencia", path: "/partner/lugares" },
      { name: "Mensajes", path: "/partner/chat" },
    ],
    invitado: [
      { name: "Explorar Negocios", path: "/" },
      { name: "Mi Reserva (Pendiente)", path: "/invitado/reserva" },
      { name: "Regístrate", path: "/register" },
    ],
  };

  const links = role && role !== "invitado" ? menuItems[role] : menuItems.turista; // Default fallback to turista for styling context

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-white p-2 relative z-[60] hover:text-pink-400 transition-colors"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-[60px] right-0 w-64 glass-panel bg-black/90 shadow-[0_0_40px_rgba(228,0,124,0.15)] rounded-bl-3xl border-l border-b border-pink-500/20 overflow-hidden z-50 backdrop-blur-xl"
          >
            <nav className="flex flex-col py-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-4 font-medium text-white/80 hover:text-pink-400 hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
