"use client";

import { Menu, MessageSquare, Store, Bell, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function NavbarBusiness({ onOpenMenu }: { onOpenMenu: () => void }) {
    return (
        <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 text-white">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">

                {/* IZQUIERDA: Menú y Chat */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onOpenMenu}
                        className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    <Link href="/business/chat" className="p-2 hover:bg-slate-800 rounded-full relative transition-colors">
                        <MessageSquare size={22} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
                    </Link>
                </div>

                {/* CENTRO: Logo */}
                <Link href="/business" className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 transition-transform hover:scale-105">
                    <Image
                        src="/coli-logo.jpeg"
                        alt="Logo Business"
                        fill
                        className="object-cover"
                    />
                </Link>

                {/* DERECHA: Notificaciones y Perfil de Negocio */}
                <div className="flex items-center gap-4">
                    <button className="relative p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <Bell size={22} />
                    </button>

                    <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center shadow-inner">
                        <Store size={20} className="text-orange-400" />
                    </div>
                </div>

            </div>
        </nav>
    );
}