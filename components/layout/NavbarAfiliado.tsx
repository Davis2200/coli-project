"use client";
import { Menu, MessageSquare, DollarSign, User, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function NavbarAfiliado() {
    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-orange-100 px-6 py-3">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-orange-50 rounded-full text-slate-600"><Menu size={24} /></button>
                    <Link href="/afiliado/chat" className="p-2 hover:bg-orange-50 rounded-full text-slate-600 relative">
                        <MessageSquare size={22} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></span>
                    </Link>
                </div>

                <Link href="/afiliado" className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 shadow-sm">
                    <Image src="/coli-logo.jpeg" alt="Logo" fill className="object-cover" />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col items-end mr-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Balance</span>
                        <span className="text-sm font-black text-green-600">$0.00</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                        <User size={20} className="text-orange-600" />
                    </div>
                </div>
            </div>
        </nav>
    );
}