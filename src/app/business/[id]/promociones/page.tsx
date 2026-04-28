"use client";

import { use, useState } from "react";
import {
  Gift,
  Plus,
  Trash2,
  Edit3,
  Eye,
  MousePointer2,
  Target,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  Copy,
  Tag,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_BUSINESSES } from "@/src/lib/mock-data";

const MOCK_OFFERS = [
  { id: 1, title: "Descuento Verano 15%", code: "VERANO15", clicks: 1240, conv: 145, status: "Activa", type: "Cupón", expires: "2024-08-30" },
  { id: 2, title: "Noche Gratis (3x2)", code: "LUNAYSOL", clicks: 850, conv: 12, status: "Activa", type: "Oferta", expires: "2024-06-15" },
  { id: 3, title: "Coctel de Bienvenida", code: "COCKTAIL", clicks: 2100, conv: 310, status: "Pausada", type: "Regalo", expires: "2024-04-10" },
];

export default function BusinessPromocionesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const business = MOCK_BUSINESSES.find(b => b.id === id) || MOCK_BUSINESSES[0];
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-32">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">
            <Tag size={14} /> Marketing y Lealtad
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
            Mis <span className="text-rose-600">Promociones</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">{business.name}</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-rose-600 text-white rounded-[24px] text-xs font-black hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20 uppercase tracking-widest">
          <Plus size={20} strokeWidth={3} /> Crear Nueva Oferta
        </button>
      </header>

      {/* Grid de Métricas de Campaña */}
      <section className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
              <MousePointer2 size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clicks en Cupones</p>
          </div>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">4,190</p>
          <div className="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-xs">
            <TrendingUp size={14} /> +15.2% este mes
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Target size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversiones Reales</p>
          </div>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">467</p>
          <div className="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-xs">
            <CheckCircle2 size={14} /> 11.2% Ratio de éxito
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600 opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Zap size={24} className="text-rose-500" />
            </div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Ahorro para Clientes</p>
          </div>
          <p className="text-4xl font-black text-white tracking-tighter relative z-10">$12,450.00</p>
          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-4 relative z-10">Valor generado por la marca</p>
        </div>
      </section>

      {/* Lista de Promociones */}
      <section className="w-full max-w-6xl mx-auto px-6 space-y-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic mb-8">Administrar Inventario de Ofertas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_OFFERS.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[48px] border border-slate-100 p-10 shadow-sm hover:shadow-2xl hover:shadow-rose-900/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${offer.status === "Activa" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                    }`}>
                    {offer.status}
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic pt-2 group-hover:text-rose-600 transition-colors">
                    {offer.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Gift size={14} className="text-rose-500" /> {offer.type}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-4 bg-slate-50 text-slate-300 rounded-[24px] hover:text-rose-600 hover:bg-rose-50 transition-all border border-slate-100">
                    <Edit3 size={20} />
                  </button>
                  <button className="p-4 bg-slate-50 text-slate-300 rounded-[24px] hover:text-rose-600 hover:bg-rose-50 transition-all border border-slate-100">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-8 border-y border-slate-50">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Rendimiento</p>
                  <p className="text-2xl font-black text-slate-900">{offer.clicks} <span className="text-[10px] text-slate-300">CLICKS</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Éxito</p>
                  <p className="text-2xl font-black text-emerald-600">{offer.conv} <span className="text-[10px] opacity-40">CANJES</span></p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full flex-1 bg-slate-50 px-8 py-5 rounded-[32px] border-2 border-dashed border-slate-200 flex items-center justify-between group/code relative overflow-hidden">
                  <div className="font-mono font-black text-slate-900 text-xl tracking-[0.2em]">
                    {offer.code}
                  </div>
                  <button
                    onClick={() => handleCopy(offer.id, offer.code)}
                    className="p-2 text-slate-300 hover:text-rose-600 transition-colors relative z-10"
                  >
                    {copiedId === offer.id ? <CheckCircle2 size={24} className="text-emerald-500" /> : <Copy size={24} />}
                  </button>
                  {copiedId === offer.id && (
                    <motion.div layoutId="copy-progress" className="absolute inset-x-0 bottom-0 h-1.5 bg-emerald-500" />
                  )}
                </div>
                <div className="w-full sm:w-auto px-6 py-5 bg-white border border-slate-100 rounded-[32px] flex items-center gap-3 shadow-sm">
                  <Calendar size={18} className="text-slate-300" />
                  <div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Vence el</p>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{offer.expires}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
