"use client";

import { Building2, Utensils, Map, Ticket, ArrowRight, Plus, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MOCK_BUSINESSES } from "@/src/lib/mock-data";

// Simulamos que el dueño tiene estos dos negocios (IDs 1 y 2 de mock-data)
const MY_BUSINESSES = [
  MOCK_BUSINESSES[0], // Sabor a Maguey (Restaurante)
  MOCK_BUSINESSES[1], // Vuelo en Globo (Tour)
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Restaurante": return <Utensils size={24} />;
    case "Tour": return <Map size={24} />;
    case "Hotel": return <Building2 size={24} />;
    case "Evento": return <Ticket size={24} />;
    default: return <Building2 size={24} />;
  }
};

export default function MisServiciosPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24 flex flex-col items-center">
      {/* Header Centrado */}
      <section className="w-full max-w-6xl px-6 pt-16 pb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-200">
            <Building2 size={12} fill="currentColor" /> Gestión Multi-Empresa
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Mis <span className="text-rose-600">Servicios</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            Selecciona el establecimiento que deseas gestionar hoy. Puedes administrar múltiples unidades de negocio desde un solo perfil.
          </p>
        </motion.div>
      </section>

      {/* Grid de Selección de Negocio */}
      <section className="w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {MY_BUSINESSES.map((business, index) => (
          <motion.div
            key={business.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <Link href={`/business/${business.id}/panel_control`}>
              <div className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-rose-900/10 transition-all duration-500 flex flex-col h-full ring-1 ring-slate-100 hover:ring-rose-200">
                <div className="relative h-64 w-full">
                  <Image
                    src={business.image_url}
                    alt={business.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-8 flex items-center gap-3">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white shadow-xl">
                      {getCategoryIcon(business.category)}
                    </div>
                    <span className="text-white font-black uppercase tracking-widest text-xs">{business.category}</span>
                  </div>
                </div>

                <div className="p-10 flex flex-col justify-between flex-1">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-rose-600 transition-colors uppercase italic">
                        {business.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-100 italic">
                        <Star size={14} fill="currentColor" /> {business.rating}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed">
                      {business.description}
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-50 pt-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Users size={12} /> Clientes
                      </p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">1,240</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Zap size={12} className="text-rose-500" /> Vistas
                      </p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">15.8k</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl flex items-center justify-center gap-3 group-hover:bg-rose-600 transition-all shadow-xl shadow-slate-900/10 group-hover:shadow-rose-600/20 uppercase tracking-widest text-xs italic">
                      Gestionar este negocio <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Card de Exploración Rápida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-emerald-50 border-4 border-dashed border-emerald-100 rounded-[48px] p-12 flex flex-col items-center justify-center gap-6 group hover:bg-emerald-100/50 hover:border-emerald-200 transition-all min-h-[500px]"
        >
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-emerald-300 group-hover:text-emerald-600 shadow-sm border border-slate-100 group-hover:-rotate-12 transition-all">
            <Users size={40} strokeWidth={3} />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-emerald-800 tracking-tight uppercase">Explorar Red</h3>
            <p className="text-emerald-600/60 text-xs font-bold uppercase tracking-widest mt-1">Busca afiliados y otros servicios</p>
          </div>
          <Link href="/afiliado/explorar" className="mt-4 px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
            Ver Directorio
          </Link>
        </motion.div>

        {/* Card de Añadir Nuevo Negocio */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-50 border-4 border-dashed border-slate-100 rounded-[48px] p-12 flex flex-col items-center justify-center gap-6 group hover:bg-rose-50 hover:border-rose-200 transition-all min-h-[500px]"
        >
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-rose-600 shadow-sm border border-slate-100 group-hover:rotate-12 transition-all">
            <Plus size={40} strokeWidth={3} />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-400 group-hover:text-rose-900 tracking-tight uppercase">Registrar Nuevo</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Expande tu imperio en Colibrí</p>
          </div>
        </motion.button>
      </section>

      {/* Footer Info */}
      <div className="mt-20 flex flex-wrap justify-center gap-8">
        <div className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all pointer-events-none">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Certificado por Coli Audit</span>
        </div>
        <div className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all pointer-events-none">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Escrow Enabled</span>
        </div>
      </div>
    </div>
  );
}
