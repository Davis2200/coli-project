"use client";

import { use, useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  Award, 
  Zap, 
  MapPin,
  ArrowRight,
  UserCheck,
  Globe,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MOCK_AFILIADOS = [
  { id: 1, name: "David Explorador", reach: "15.4k", conv: "12%", score: 4.9, tags: ["Eco-Turismo", "Fotografía"], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", status: "Premium", sales: 145 },
  { id: 2, name: "Sofia Viajes", reach: "42.1k", conv: "8.5%", score: 4.7, tags: ["Gastronomía", "Lujo"], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", status: "Top Partner", sales: 312 },
  { id: 3, name: "Carlos Aventuras", reach: "8.2k", conv: "15%", score: 4.8, tags: ["Deportes", "Aventura"], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", status: "Expert", sales: 89 },
  { id: 4, name: "Ana Travel Blog", reach: "120k", conv: "4.2%", score: 4.5, tags: ["Cultura", "Historia"], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", status: "Global", sales: 520 },
];

export default function ExplorarAfiliadosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAfiliados = MOCK_AFILIADOS.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-32">
      {/* Header Premium */}
      <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-200">
            <UserCheck size={12} fill="currentColor" /> Red de Captación
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">
            Explorar <span className="text-rose-600">Afiliados</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            Descubre a los mejores creadores y promotores locales. Conecta con ellos para expandir el alcance de tu negocio.
          </p>
        </motion.div>

        {/* Buscador */}
        <div className="w-full max-w-2xl mt-12 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o categoría (ej. Gastronomía)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[32px] text-sm font-bold focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500/30 transition-all shadow-xl shadow-slate-900/[0.03]"
            />
          </div>
          <button className="p-5 bg-white border border-slate-100 rounded-[28px] text-slate-400 hover:text-rose-600 transition-colors shadow-lg">
            <Filter size={24} />
          </button>
        </div>
      </section>

      {/* Rejilla de Afiliados */}
      <section className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <AnimatePresence mode='popLayout'>
          {filteredAfiliados.map((afiliado, index) => (
            <motion.div
              key={afiliado.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[48px] border border-slate-100 p-10 shadow-sm hover:shadow-2xl hover:shadow-rose-900/5 transition-all group relative overflow-hidden"
            >
              {/* Badge de Estatus */}
              <div className="absolute top-8 right-8">
                <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-rose-100">
                  {afiliado.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                {/* Avatar con Efecto */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-[32px] bg-slate-50 border-4 border-white shadow-xl overflow-hidden relative">
                    <Image src={afiliado.avatar} alt={afiliado.name} fill />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg">
                    <ShieldCheck size={16} />
                  </div>
                </div>

                {/* Info Principal */}
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-rose-600 transition-colors">
                      {afiliado.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                        <Star size={14} fill="currentColor" /> {afiliado.score}
                      </div>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1 text-slate-400 font-bold text-xs">
                        <MapPin size={14} /> Mazatlán, MX
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {afiliado.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estadísticas de Rendimiento */}
              <div className="mt-10 grid grid-cols-3 gap-6 py-8 border-y border-slate-50">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Alcance</p>
                  <p className="text-xl font-black text-slate-900 tracking-tighter">{afiliado.reach}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Conversión</p>
                  <p className="text-xl font-black text-rose-600 tracking-tighter">{afiliado.conv}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Ventas</p>
                  <p className="text-xl font-black text-slate-900 tracking-tighter">{afiliado.sales}</p>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="mt-8 flex gap-4">
                <button className="flex-1 py-4 bg-rose-600 text-white font-black rounded-3xl shadow-xl shadow-rose-600/20 hover:bg-rose-700 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> Contactar Afiliado
                </button>
                <button className="p-4 bg-slate-50 text-slate-400 rounded-3xl border border-slate-100 hover:bg-slate-100 transition-all">
                  <Globe size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Empty State */}
      {filteredAfiliados.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-300 space-y-4">
          <Users size={64} strokeWidth={1} />
          <p className="font-black uppercase tracking-[0.3em]">No se encontraron afiliados</p>
        </div>
      )}
    </div>
  );
}
