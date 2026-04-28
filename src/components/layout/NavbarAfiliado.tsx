"use client";
import { useState } from "react";
import { Menu, Search, User, Settings, LogOut, ChevronDown, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationsDropdown } from "@/src/components/features/NotificationsDropdown";

export function NavbarAfiliado({ onOpenMenu }: { onOpenMenu: () => void }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { user, logout } = useUserStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        router.push("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-6 py-3">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">

                {/* Lado Izquierdo: Solo Menu y Buscar */}
                <div className="flex items-center gap-1">
                    <button onClick={onOpenMenu} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                        <Menu size={24} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                        <Search size={22} />
                    </button>
                </div>

                {/* Centro: Logo */}
                <Link href="/afiliado/panel_control" className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm">
                    <Image src="/coli-logo.jpeg" alt="Logo" fill priority sizes="48px" className="object-cover" />
                </Link>

                {/* Lado Derecho: Notificaciones + Perfil */}
                <div className="flex items-center gap-3">

                    {/* Contenedor de Notificaciones */}
                    <div className="relative">
                        <button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors relative"
                        >
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>

                        {/* El Dropdown ahora se alinea a la derecha del icono para que no se salga de la pantalla */}
                        <div className="absolute right-0 mt-2 z-[60]">
                            <NotificationsDropdown
                                isOpen={isNotificationsOpen}
                                onClose={() => setIsNotificationsOpen(false)}
                                role="afiliado"
                            />
                        </div>
                    </div>

                    {/* Dropdown de Cuenta */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1 p-1 pr-2 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center overflow-hidden">
                                <User size={20} className="text-emerald-600" />
                            </div>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-slate-100 py-3 z-20 overflow-hidden"
                                    >
                                        <div className="px-5 py-2 border-b border-slate-50 mb-2">
                                            <p className="text-sm font-bold text-slate-900 truncate">{user?.name || "Afiliado"}</p>
                                        </div>

                                        <Link href="/perfil" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
                                            <User size={18} /> Ver Perfil
                                        </Link>

                                        <Link href="/afiliado/configuracion" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
                                            <Settings size={18} /> Configuración
                                        </Link>

                                        <div className="h-px bg-slate-50 my-2"></div>

                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 text-sm font-black text-rose-500 hover:bg-rose-50">
                                            <LogOut size={18} /> Cerrar Sesión
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
}