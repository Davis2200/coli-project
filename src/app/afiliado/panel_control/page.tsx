"use client";

import {
  QrCode, TrendingUp, Wallet, ArrowRightLeft, Star,
  Download, MapPin, ArrowUpRight, Zap, Clock, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { MOCK_BUSINESSES } from "@/src/lib/mock-data";
import Image from "next/image";
import { motion } from "framer-motion";

// --- Sub-componente para las Filas de Negocios ---
const BusinessRow = ({ title, icon, data, accentColor }: { title: string, icon: React.ReactNode, data: typeof MOCK_BUSINESSES, accentColor: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="space-y-6 w-full"
  >
    <div className="flex items-center justify-between px-2">
      <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
        <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100 ${accentColor}`}>
          {icon}
        </div>
        {title}
      </h2>
      <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors flex items-center gap-1 group">
        Ver todo <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>

    <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory -mx-4 px-4">
      {data.map((b) => (
        <motion.div
          key={b.id}
          whileHover={{ y: -5 }}
          className="min-w-[300px] md:min-w-[340px] snap-start bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/10 transition-all group flex flex-col"
        >
          <div className="relative h-48 w-full">
            <Image src={b.image_url} alt={b.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-5 right-5 bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-2xl border border-emerald-400/30 shadow-xl backdrop-blur-md">
              15% COMISIÓN
            </div>
          </div>

          <div className="p-8 flex flex-col flex-1 justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  {b.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star size={12} fill="currentColor" /> {b.rating}
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-emerald-600 transition-colors uppercase">
                {b.name}
              </h4>
            </div>

            <button className="w-full py-4 bg-slate-50 hover:bg-emerald-600 text-slate-500 hover:text-white font-black rounded-2xl border border-slate-200 hover:border-transparent transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
              <QrCode size={16} /> Generar Enlace
            </button>
          </div>
        </motion.div>
      ))}

      <div className="min-w-[200px] flex items-center justify-center">
        <button className="flex flex-col items-center gap-3 group">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <ArrowUpRight size={24} />
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explorar más</span>
        </button>
      </div>
    </div>
  </motion.section>
);

export default function AfiliadoDashboardPage() {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = () => {
    setIsGeneratingQR(true);
    setTimeout(() => {
      setIsGeneratingQR(false);
      setShowQR(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24 flex flex-col items-center">
      {/* Hero Header Centrado */}
      <div className="w-full bg-gradient-to-b from-emerald-50/50 to-transparent pt-16 pb-12 flex flex-col items-center">
        <div className="max-w-6xl w-full px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200"
          >
            <Zap size={12} fill="currentColor" /> Partner Nivel Pro
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
          >
            Tu Impacto <span className="text-emerald-600">Financiero</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium max-w-2xl mx-auto text-lg"
          >
            Monitorea tus ganancias en tiempo real y expande tu red de referidos con herramientas de alto impacto.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl w-full px-6 space-y-16 flex flex-col items-center">

        {/* Sección de Dinero Centrada */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-slate-900 rounded-[48px] p-10 relative overflow-hidden shadow-2xl shadow-emerald-900/20"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-3">Balance Disponible</h3>
                  <div className="flex items-baseline gap-2 text-white">
                    <span className="text-3xl font-bold opacity-30">$</span>
                    <span className="text-7xl font-black tracking-tighter">8,400</span>
                    <span className="text-xl font-bold opacity-30 text-emerald-400">.00</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-[28px] border border-white/10">
                  <Wallet className="text-emerald-400" size={36} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-black py-5 rounded-[20px] transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                  Retirar a mi Cuenta <ArrowUpRight size={18} />
                </button>
                <div className="px-8 py-4 bg-white/5 rounded-[20px] border border-white/5">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total histórico</p>
                  <p className="text-white font-bold text-xl">$12,550.00</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-slate-100 rounded-[48px] p-10 flex flex-col justify-between shadow-sm relative group overflow-hidden"
          >
            <div className="bg-amber-50 w-16 h-16 rounded-[24px] flex items-center justify-center text-amber-600 mb-8 group-hover:scale-110 transition-transform">
              <ArrowRightLeft size={32} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Comisiones en Tránsito</p>
              <p className="text-5xl font-black text-slate-900 tracking-tighter">$2,150</p>
              <p className="text-xs text-slate-400 mt-6 leading-relaxed font-medium">
                Pendientes de validación por estancias activas.
              </p>
            </div>
          </motion.div>
        </section>

        {/* QR Tools Centrado */}
        <section className="w-full bg-white rounded-[48px] border border-slate-100 p-2 shadow-sm">
          <div className="bg-[#F9FBF9] rounded-[44px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                Tu Motor de <br /> <span className="text-emerald-600">Ventas</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
                Genera códigos QR personalizados. Cada escaneo queda vinculado a tu ID de afiliado automáticamente.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Atribución Directa
                </span>
                <span className="px-4 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Multi-plataforma
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="w-full max-w-[320px]">
                {showQR ? (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="p-6 bg-white rounded-[40px] shadow-2xl shadow-emerald-900/10 border-4 border-slate-50 w-full aspect-square flex items-center justify-center">
                      <QrCode size={180} className="text-slate-900 w-full h-full p-2" strokeWidth={1.5} />
                    </div>
                    <div className="flex gap-3 w-full">
                      <button className="p-4 bg-slate-100 rounded-2xl text-slate-600 hover:bg-slate-200 transition-colors">
                        <Download size={20} />
                      </button>
                      <button
                        onClick={() => setShowQR(false)}
                        className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest"
                      >
                        Nuevo Código
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <button
                    onClick={handleGenerateQR}
                    disabled={isGeneratingQR}
                    className="w-full aspect-square bg-emerald-600 rounded-[40px] flex flex-col items-center justify-center gap-6 text-white shadow-2xl shadow-emerald-600/40 hover:bg-emerald-700 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 group"
                  >
                    {isGeneratingQR ? (
                      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <div className="bg-white/20 p-5 rounded-3xl group-hover:rotate-12 transition-transform">
                          <QrCode size={40} />
                        </div>
                        <span className="font-black text-[10px] uppercase tracking-[0.2em]">Generar QR Maestro</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- FILAS DE NEGOCIOS --- */}
        <div className="w-full space-y-16">
          <BusinessRow
            title="Máximas Comisiones"
            icon={<TrendingUp size={20} />}
            data={MOCK_BUSINESSES.slice(0, 6)}
            accentColor="text-emerald-500"
          />

          <BusinessRow
            title="Nuevas Oportunidades"
            icon={<Zap size={20} />}
            data={MOCK_BUSINESSES.slice(2, 8)}
            accentColor="text-amber-500"
          />
        </div>
      </div>
    </div>
  );
}