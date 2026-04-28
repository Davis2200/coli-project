"use client";
import {
  X,
  ChevronRight,
  LayoutDashboard,
  Search,
  Users,
  Ticket,
  CalendarCheck,
  MessageSquare,
  Heart,
  HelpCircle,
  Building2,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_LINKS } from "@/src/lib/navigation";

const ICON_MAP: Record<string, any> = {
  // Rutas Turista
  "Explorar Destinos": <Search size={20} />,
  "Mis Reservas": <CalendarCheck size={20} />,
  "Cupones y Promos": <Ticket size={20} />,
  "Favoritos": <Heart size={20} />,
  "Mis referidos": <Users size={20} />,

  // Rutas Afiliado
  "Panel de Control": <LayoutDashboard size={20} />,
  "Explorar Negocios": <Search size={20} />,
  "Mis Referidos": <Users size={20} />,
  "Promociones a Ofrecer": <Ticket size={20} />,
  "Reservas Referidas": <CalendarCheck size={20} />,
  "Chat": <MessageSquare size={20} />,

  // Rutas Business
  "Mi Establecimiento": <Building2 size={20} />,
  "Gestión de Reservas": <CalendarCheck size={20} />,
  "Estadísticas": <TrendingUp size={20} />,
  "Publicar Oferta": <Ticket size={20} />,
  "Mis Servicios": <Building2 size={20} />,
  "Explorar Afiliados": <Users size={20} />,
  "Promociones": <Ticket size={20} />,
};

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'turista' | 'afiliado' | 'business';
}

export function HamburgerMenu({ isOpen, onClose, role }: HamburgerMenuProps) {
  const pathname = usePathname();

  // 1. Normalización de rol para evitar errores de casing
  const normalizedRole = (role?.toLowerCase() || "turista") as keyof typeof MENU_LINKS;

  // 2. Selección segura de links con doble fallback
  const links = MENU_LINKS[normalizedRole] || MENU_LINKS.turista || [];

  // 3. Prueba de Consola Estratégica (Activa solo al abrir)
  if (isOpen) {
    console.group("🛠️ HamburgerMenu Architecture Debug");
    console.log("Rol recibido de Props:", role);
    console.log("Rol normalizado:", normalizedRole);
    console.log("Configuración en navigation.ts:", MENU_LINKS);
    console.log("Links finales a renderizar:", links);
    console.groupEnd();
  }

  const isAfiliado = normalizedRole === 'afiliado';
  const isBusiness = normalizedRole === 'business';

  // Obtener el ID del negocio desde el pathname si existe
  const businessIdMatch = pathname.match(/\/business\/([^/]+)/);
  const currentBusinessId = businessIdMatch ? businessIdMatch[1] : null;

  const activeColor = isBusiness ? "text-rose-600" : isAfiliado ? "text-emerald-600" : "text-indigo-600";
  const activeBg = isBusiness ? "bg-rose-50 text-rose-700" : isAfiliado ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700";
  const iconStyle = isBusiness ? "bg-rose-100 text-rose-600" : isAfiliado ? "bg-emerald-100 text-emerald-600" : "bg-indigo-100 text-indigo-600";
  const headerBg = isBusiness ? "bg-rose-50/30" : isAfiliado ? "bg-emerald-50/30" : "bg-indigo-50/30";
  const indicatorBg = isBusiness ? "bg-rose-50 border-rose-100" : isAfiliado ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100";
  const dotColor = isBusiness ? "bg-rose-500" : isAfiliado ? "bg-emerald-500" : "bg-indigo-500";
  const iconActiveBg = isBusiness ? "bg-rose-500 text-white" : isAfiliado ? "bg-emerald-500 text-white" : "bg-indigo-500 text-white";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[300px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header del Menú */}
            <div className={`p-6 border-b border-slate-50 flex justify-between items-center ${headerBg}`}>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeColor}`}>
                {isBusiness ? "Portal Negocio" : isAfiliado ? "Portal Afiliado" : "Menú Coli"}
              </span>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-slate-400 transition-colors shadow-sm">
                <X size={20} />
              </button>
            </div>

            {/* Navegación Dinámica */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {links.map((link) => {
                // Resolver el placeholder [id] si estamos en modo business
                const resolvedHref = link.href.includes("[id]")
                  ? (currentBusinessId ? link.href.replace("[id]", currentBusinessId) : "/business/servicios")
                  : link.href;

                const isActive = pathname === resolvedHref;

                return (
                  <Link
                    key={link.name}
                    href={resolvedHref}
                    onClick={onClose}
                    className={`flex items-center gap-4 p-4 rounded-[24px] transition-all group ${isActive ? activeBg : "text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive ? iconActiveBg : iconStyle
                      }`}>
                      {ICON_MAP[link.name] || <HelpCircle size={20} />}
                    </div>

                    <span className="flex-1 font-bold text-sm">
                      {link.name}
                    </span>

                    <ChevronRight size={14} className={`${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                  </Link>
                );
              })}
            </nav>

            {/* Indicador de Rol en el Footer */}
            <div className="p-6 border-t border-slate-50">
              <div className={`rounded-2xl p-3 flex items-center justify-center gap-2 border ${indicatorBg}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${dotColor}`} />
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{role}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}