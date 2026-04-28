"use client";

import { useState } from "react";
import { Menu, Bell, Search, Users, User, Settings, LogOut, ChevronDown, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/src/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { NotificationsDropdown } from "@/src/components/features/NotificationsDropdown";

export function NavbarBusiness({ onOpenMenu }: { onOpenMenu: () => void }) {
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
        <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 text-white shadow-2xl">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">

                {/* IZQUIERDA: Menú y Exploración Rápida */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenMenu}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group"
                    >
                        <Menu size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>

                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400">
                        <Search size={14} /> Explorar Red
                    </div>
                </div>

                {/* CENTRO: Logo Business */}
                <Link href="/business/servicios" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-rose-500/30 group-hover:scale-110 transition-transform">
                        <Image
                            src="/coli-logo.jpeg"
                            alt="Logo Business"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 leading-none">Coli</p>
                        <p className="text-sm font-black uppercase italic tracking-tighter text-white leading-none">Business</p>
                    </div>
                </Link>

                {/* DERECHA: Centro de Notificaciones y Perfil */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10 group relative"
                        >
                            <Bell size={20} className="text-slate-300 group-hover:text-white" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full" />
                        </button>
                        <NotificationsDropdown
                            isOpen={isNotificationsOpen}
                            onClose={() => setIsNotificationsOpen(false)}
                            role="business"
                        />
                    </div>

                    <div className="h-10 w-px bg-white/10 mx-1 hidden sm:block" />

                    {/* PERFIL CIRCULAR CON DROPDOWN */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg border border-rose-400/30 overflow-hidden">
                                <Store size={20} className="text-white" />
                            </div>
                            <ChevronDown size={14} className={`text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute right-0 mt-4 w-60 bg-slate-900 border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-4 z-20 overflow-hidden backdrop-blur-2xl"
                                    >
                                        <div className="px-6 py-3 border-b border-white/5 mb-2">
                                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-none mb-1">Administrador</p>
                                            <p className="text-sm font-bold text-white truncate">{user?.name || "Dueño de Negocio"}</p>
                                        </div>

                                        <Link
                                            href="/perfil"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            <User size={18} className="text-rose-500" /> Ver Perfil
                                        </Link>

                                        <Link
                                            href="/business/configuracion"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            <Settings size={18} className="text-slate-400" /> Configuración
                                        </Link>

                                        <div className="h-px bg-white/5 my-2"></div>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-6 py-4 text-sm font-black text-rose-500 hover:bg-rose-500/10 transition-colors"
                                        >
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
