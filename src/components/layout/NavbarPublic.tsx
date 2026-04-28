"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export function NavbarPublic() {
    return (
        <nav className="w-full px-6 py-4 bg-transparent z-50">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">

                {/* LADO IZQUIERDO: Logo e Identidad */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform group-hover:scale-105">
                            <Image
                                src="/coli-logo.jpeg"
                                alt="Coli Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Opcional: Texto de marca si lo deseas, si no, solo el círculo */}
                        <span className="hidden sm:block font-black text-xl tracking-tighter text-slate-900">
                            Coli<span className="text-orange-500">.</span>
                        </span>
                    </Link>
                </div>

                {/* LADO DERECHO: Lupa + Iniciar Sesión + Regístrate */}
                <div className="flex items-center gap-3 md:gap-6">
                    {/* Lupa de búsqueda */}
                    <button className="p-2 text-slate-600 hover:bg-white/50 rounded-full transition-all">
                        <Search size={22} />
                    </button>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-slate-700 font-bold hover:text-orange-500 transition-colors text-sm md:text-base"
                        >
                            Iniciar sesión
                        </Link>

                        <Link
                            href="/register"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-black shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
                        >
                            Regístrate
                        </Link>
                    </div>
                </div>

            </div>
        </nav>
    );
}