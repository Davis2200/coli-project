"use client";

import { Gift, Zap, TrendingUp, MousePointer2, Target, Plus, Search, Filter, MoreHorizontal, Calendar, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_PROMOS = [
  { id: 1, title: "Descuento Verano 15%", business: "Restaurante El Faro", code: "FARO15V", clicks: 1240, conv: 145, status: "Activa", date: "2024-06-30", type: "Cupón" },
  { id: 2, title: "Noche Gratis (3x2)", business: "Hotel Arena", code: "ARENA3X2", clicks: 850, conv: 12, status: "Activa", date: "2024-05-15", type: "Oferta" },
  { id: 3, title: "Tour Ballenas 2x1", business: "Aventura Extrema", code: "BALLENA2X1", clicks: 2100, conv: 310, status: "Pausada", date: "2024-04-10", type: "Promoción" },
  { id: 4, title: "Cena VIP Maridaje", business: "Vinoteca Mazatlán", code: "VINOTK10", clicks: 450, conv: 28, status: "Activa", date: "2024-08-01", type: "Cupón" },
];

export default function AfiliadoPromocionesPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24 flex flex-col items-center">
      {/* Header Centrado */}
      <section className="w-full max-w-6xl px-6 pt-16 pb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
            <Gift size={12} fill="currentColor" /> Recompensas Dinámicas
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Promociones <span className="text-emerald-600">Activas</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            Gestiona tus cupones exclusivos y monitorea el rendimiento de tus campañas de referidos en tiempo real.
          </p>
        </motion.div>
      </section>

      {/* Métricas Globales */}
      <section className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
          <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-3">
            <MousePointer2 size={20} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Clicks Totales</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">4,640</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
          <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-3">
            <Target size={20} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Conversiones</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">495</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-3">
            <Zap size={20} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">CTR Promedio</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">10.6%</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-[32px] shadow-xl shadow-emerald-900/10 flex flex-col items-center text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-3">
            <TrendingUp size={20} />
          </div>
          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Valor Campaña</p>
          <p className="text-3xl font-black text-white tracking-tighter">$8,450.00</p>
        </div>
      </section>

      {/* Grid de Cupones / Promociones */}
      <section className="w-full max-w-6xl px-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar promoción..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-600 transition-colors">
              <Filter size={18} />
            </button>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all uppercase tracking-widest text-[10px]">
            <Plus size={18} /> Solicitar Nueva Promoción
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_PROMOS.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    promo.status === "Activa" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                  }`}>
                    {promo.status}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none pt-2 group-hover:text-emerald-600 transition-colors uppercase">
                    {promo.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-bold">{promo.business}</p>
                </div>
                <div className="p-3 bg-slate-50 text-slate-300 rounded-2xl hover:text-emerald-600 transition-colors">
                  <MoreHorizontal size={20} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest"> clicks</p>
                  <p className="text-xl font-black text-slate-700">{promo.clicks}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest"> conversiones</p>
                  <p className="text-xl font-black text-emerald-600">{promo.conv}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full flex-1 bg-slate-50 px-6 py-4 rounded-2xl border border-dashed border-slate-200 flex items-center justify-between group/code relative overflow-hidden">
                  <div className="font-mono font-black text-slate-700 tracking-wider">
                    {promo.code}
                  </div>
                  <button 
                    onClick={() => handleCopy(promo.id, promo.code)}
                    className="p-2 text-slate-300 hover:text-emerald-600 transition-colors relative z-10"
                  >
                    {copiedId === promo.id ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </button>
                  {copiedId === promo.id && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500 animate-progress" />
                  )}
                </div>
                <div className="w-full sm:w-auto px-4 py-4 border border-slate-100 rounded-2xl flex items-center gap-2">
                  <Calendar size={14} className="text-slate-300" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{promo.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <button className="text-[10px] font-black text-slate-300 hover:text-emerald-600 transition-colors uppercase tracking-[0.3em]">
            Cargar Promociones Anteriores
          </button>
        </div>
      </section>
    </div>
  );
}
