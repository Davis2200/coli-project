"use client";

import { QrCode, TrendingUp, Wallet, ArrowRightLeft, Star, Download, MapPin } from "lucide-react";
import { useState } from "react";
import { MOCK_BUSINESSES } from "@/lib/mock-data";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Mock Data para el Afiliado
const MOCK_AFILIADO_METRICS = {
  inTransit: 2150,
  available: 8400,
  conversionRate: "12.4%",
};

const MOCK_RANKING = [
  { id: 1, name: "Sabor a Maguey Roma", conversions: 45, profit: 1350 },
  { id: 2, name: "Vuelo en Globo Teotihuacán", conversions: 28, profit: 2240 },
  { id: 3, name: "Coyoacán Hidden Gems", conversions: 19, profit: 570 },
];

export default function AfiliadoDashboardPage() {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = () => {
    setIsGeneratingQR(true);
    setTimeout(() => {
      setIsGeneratingQR(false);
      setShowQR(true);
      console.log("[Telemetry] Event fired: qr_generado_afiliado");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        
        {/* Cabecera */}
        <header>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-4">
            Portal de Afiliados
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Tu Impacto</h1>
          <p className="text-slate-500 font-medium mt-2">Monitorea tus ingresos por referidos y genera códigos únicos de promoción para la comunidad.</p>
        </header>

        {/* Generador de QR */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-10 relative overflow-hidden text-center group shadow-2xl shadow-indigo-600/5">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-rose-50/50 pointer-events-none"></div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-4 relative z-10 tracking-tight">Crea tu Enlace de Atribución (QR)</h2>
          <p className="text-slate-500 mb-10 max-w-lg mx-auto relative z-10 font-medium leading-relaxed">
            Genera un QR único vinculado a tu cuenta. Cuando un turista reserva con este enlace, aseguras tus comisiones automáticamente.
          </p>
          
          {showQR ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center relative z-10"
            >
              <div className="bg-white p-6 rounded-[32px] shadow-2xl shadow-indigo-600/10 border-4 border-slate-50 inline-block">
                <svg viewBox="0 0 100 100" className="w-48 h-48 sm:w-56 sm:h-56">
                  <rect width="100" height="100" fill="#fff" />
                  <path d="M10,10 h20 v20 h-20 z M15,15 h10 v10 h-10 z M70,10 h20 v20 h-20 z M75,15 h10 v10 h-10 z M10,70 h20 v20 h-20 z M15,75 h10 v10 h-10 z M40,20 h20 v10 h-20 z M40,40 h10 v30 h-10 z M60,40 h30 v10 h-30 z M70,60 h10 v10 h-10 z M80,80 h10 v10 h-10 z M10,40 h10 v20 h-10 z M30,80 h20 v10 h-20 z" fill="#0f172a" />
                  <rect x="42" y="42" width="16" height="16" fill="url(#grad)" rx="4" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#E11D48" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setShowQR(false)} 
                  className="bg-slate-100 text-slate-600 font-bold py-4 px-8 rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  Nuevo QR
                </button>
                <button className="bg-indigo-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center gap-2 hover:bg-indigo-700 hover:scale-105 transition-all">
                  <Download size={20} /> Descargar
                </button>
              </div>
            </motion.div>
          ) : (
            <button 
              onClick={handleGenerateQR}
              disabled={isGeneratingQR}
              className="bg-indigo-600 text-white font-black py-5 px-10 rounded-[28px] text-lg inline-flex items-center gap-3 shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all relative z-10 disabled:opacity-50"
            >
              {isGeneratingQR ? (
                <span className="flex items-center gap-2 italic">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Generando Código...
                </span>
              ) : (
                <>
                  <QrCode size={24} /> Generar QR de Promoción
                </>
              )}
            </button>
          )}
        </div>

        {/* Métricas de Recompensa */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-2 text-slate-900">
            <Wallet className="text-rose-500" /> Tus Recompensas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 relative overflow-hidden group shadow-xl shadow-indigo-900/[0.02]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>
              <h3 className="text-slate-400 text-xs font-black mb-1 uppercase tracking-widest flex items-center gap-2">
                <ArrowRightLeft size={16} className="text-amber-500" /> En Tránsito
              </h3>
              <div className="text-4xl font-black text-slate-800 mt-4">
                ${MOCK_AFILIADO_METRICS.inTransit.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-3 font-medium">Reservas pendientes de ser validadas por el turista.</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-[32px] shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full bg-rose-500/30"></div>
              <h3 className="text-indigo-100 text-xs font-black mb-1 uppercase tracking-widest">
                Ingresos Disponibles
              </h3>
              <div className="text-4xl font-black text-white mt-4">
                ${MOCK_AFILIADO_METRICS.available.toLocaleString()}
              </div>
              <p className="text-xs text-indigo-100/70 mt-3 font-bold">Liquidados en tu Wallet. Listos para retirar.</p>
            </div>
          </div>
        </section>

        {/* Ranking de Rentabilidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 md:col-span-1 flex flex-col justify-center shadow-xl shadow-indigo-900/[0.02]">
            <div className="flex items-center gap-2 text-slate-400 mb-2 font-bold text-xs uppercase tracking-widest">
              <TrendingUp size={18} className="text-rose-500" /> Conversión
            </div>
            <div className="text-5xl font-black text-slate-900 tracking-tighter">{MOCK_AFILIADO_METRICS.conversionRate}</div>
            <p className="text-[10px] text-emerald-600 font-black mt-4 bg-emerald-50 inline-block px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
              Alto Rendimiento
            </p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 md:col-span-2 shadow-xl shadow-indigo-900/[0.02]">
             <header className="flex items-center gap-2 text-slate-400 mb-6 font-bold text-xs uppercase tracking-widest">
              <Star size={18} className="text-amber-500" /> Ranking de Lugares
            </header>
            
            <div className="space-y-4">
              {MOCK_RANKING.map((item, index) => (
                <div key={item.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border ${index === 0 ? "bg-amber-100 text-amber-600 border-amber-200 shadow-lg shadow-amber-500/10" : "bg-white text-slate-300 border-slate-100"}`}>
                      #{index + 1}
                    </span>
                    <span className="text-slate-800 font-black text-base truncate max-w-[200px] tracking-tight group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-600 font-black text-lg tracking-tighter">+${item.profit}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">{item.conversions} coversiones</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección: Negocios para Referir */}
        <section id="negocios" className="pt-8 space-y-8">
          <header className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                <MapPin className="text-indigo-600" /> Oportunidades
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-bold">Desliza para ver más lugares con altas comisiones</p>
            </div>
          </header>
          
          <div className="flex gap-8 overflow-x-auto pb-10 hide-scrollbar snap-x -mx-2 px-2">
            {MOCK_BUSINESSES.map((b) => (
              <div 
                key={b.id} 
                className="min-w-[320px] group snap-start bg-white border border-slate-100 rounded-[40px] overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-900/[0.05] transition-all"
              >
                <div className="relative h-56 w-full">
                  <Image 
                    src={b.image_url} 
                    alt={b.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded-2xl border border-indigo-400/30 shadow-xl shadow-indigo-900/20">
                    <span className="font-black text-xs">15% Comisión</span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{b.name}</h4>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                      <Star size={14} className="text-amber-500" fill="currentColor" />
                      <span className="text-xs font-black text-amber-700">{b.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{b.category}</span>
                  </div>
                  <button className="w-full bg-slate-50 hover:bg-indigo-600 text-slate-500 hover:text-white font-black py-4 rounded-2xl border border-slate-200 hover:border-transparent transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                    <QrCode size={18} />
                    Generar Enlace
                  </button>
                </div>
              </div>
            ))}
            
            <div className="min-w-[200px] flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4 opacity-20">
                 <div className="w-12 h-12 border-4 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cargando...</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
