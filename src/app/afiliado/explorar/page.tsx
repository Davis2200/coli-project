"use client";

import { Search, MapPin, Star, QrCode, SlidersHorizontal, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import { MOCK_BUSINESSES } from "@/src/lib/mock-data";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ExplorarNegociosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Restaurante", "Hotel", "Aventura", "Bar", "Cultura"];

  const filteredBusinesses = MOCK_BUSINESSES.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24 flex flex-col items-center">
      {/* Hero Section Centrada */}
      <section className="w-full max-w-6xl px-6 pt-16 pb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
            <Zap size={12} fill="currentColor" /> Catálogo de Alianzas
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Explorar <span className="text-emerald-600">Negocios</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-lg">
            Encuentra los mejores establecimientos para recomendar y gana comisiones por cada reserva confirmada.
          </p>
        </motion.div>

        {/* Buscador y Filtros */}
        <div className="w-full max-w-3xl mt-12 space-y-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o lugar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-6 bg-white border border-slate-100 rounded-[32px] shadow-xl shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-slate-900 font-bold"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedCategory === cat
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25"
                    : "bg-white text-slate-400 border-slate-100 hover:border-emerald-200 hover:text-emerald-600 shadow-sm"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Negocios Centrado */}
      <section className="w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBusinesses.map((b, index) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/10 transition-all group flex flex-col"
              >
                <div className="relative h-56 w-full cursor-pointer" onClick={() => window.location.href = `/lugares/${b.id}`}>
                  <Image src={b.image_url} alt={b.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-5 right-5 bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-2xl border border-emerald-400/30 shadow-xl backdrop-blur-md">
                    15% COMISIÓN
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1 justify-between gap-6">
                  <div className="cursor-pointer" onClick={() => window.location.href = `/lugares/${b.id}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">
                        {b.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star size={12} fill="currentColor" /> {b.rating}
                      </div>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors uppercase">
                      {b.name}
                    </h4>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mt-2 font-medium">
                      <MapPin size={14} /> Mazatlán, Sinaloa
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => window.location.href = `/lugares/${b.id}`}
                      className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                    >
                      Explorar y Reservar <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="w-full py-24 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No encontramos resultados</h3>
            <p className="text-slate-500 max-w-xs">
              Intenta buscar con otros términos o cambia la categoría de filtrado.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("Todos"); }}
              className="text-emerald-600 font-bold text-sm hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
