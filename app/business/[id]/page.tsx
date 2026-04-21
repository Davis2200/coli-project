"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_BUSINESSES } from "@/lib/mock-data";
import { ArrowLeft, Star, Share2, MapPin, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { motion } from "framer-motion";

export default function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const business = MOCK_BUSINESSES.find(b => b.id === resolvedParams.id);

  if (!business) {
    return notFound();
  }

  // Helper arrays para simular carruseles de cross-selling
  const randomItems = [...MOCK_BUSINESSES].sort(() => 0.5 - Math.random());
  const antes = randomItems.slice(0, 4);
  const despues = randomItems.slice(4, 8);
  const similares = MOCK_BUSINESSES.filter(b => b.category === business.category && b.id !== business.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 relative pb-32">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 border border-slate-200 shadow-xl shadow-indigo-900/5 hover:scale-110 hover:text-indigo-600 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={business.image_url}
          alt={business.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 -mt-48 relative z-10 w-full mb-20">
        <div className="flex flex-col gap-10 w-full">
          {/* Header Info */}
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              {business.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter drop-shadow-sm">
              {business.name}
            </h1>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-xl shadow-indigo-900/[0.03]">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-xl font-black text-slate-900">{business.rating}</span>
              </div>
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest decoration-slate-200 decoration-2">
                {Math.floor(Math.random() * 500) + 50} reseñas verificadas
              </span>
              <div className="flex items-center gap-2 text-slate-500 font-bold bg-white/50 px-4 py-2 rounded-2xl border border-white/50">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span>Oaxaca, México</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 sm:p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-indigo-900/[0.04]"
          >
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
              Sobre la experiencia
            </h2>
            <p className="text-slate-500 leading-relaxed text-xl font-medium italic">
              "{business.description}"
            </p>
          </motion.div>

          {/* Paquete Incluido */}
          <div className="bg-indigo-50/50 p-10 rounded-[40px] border border-indigo-100">
            <h3 className="text-xs font-black text-indigo-600 mb-8 uppercase tracking-[0.3em]">¿Qué incluye tu reserva Coli?</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Acceso preferencial Express",
                "Servicio garantizado por Escrow",
                "Cancelación gratuita 24h",
                "Atención prioritaria del local"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-600 font-bold">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Carruseles PWA */}
          <div className="space-y-16 pt-10">
            {antes.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 px-2 uppercase tracking-[0.3em]">Antes de tu actividad</h3>
                <div className="flex overflow-x-auto gap-8 pb-10 px-2 snap-x snap-mandatory hide-scrollbar">
                  {antes.map(b => (
                    <div key={b.id} className="min-w-[300px] sm:min-w-[340px] snap-center">
                      <BusinessCard business={b} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {despues.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 px-2 uppercase tracking-[0.3em]">Complementa tu visita</h3>
                <div className="flex overflow-x-auto gap-8 pb-10 px-2 snap-x snap-mandatory hide-scrollbar">
                  {despues.map(b => (
                    <div key={b.id} className="min-w-[300px] sm:min-w-[340px] snap-center">
                      <BusinessCard business={b} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 pb-12 pointer-events-none">
        <div className="max-w-screen-md mx-auto bg-white/90 backdrop-blur-2xl border border-slate-200 p-4 rounded-[32px] flex items-center justify-between pointer-events-auto shadow-[0_20px_50px_rgba(30,41,59,0.1)] gap-6 ring-1 ring-slate-100">

          <div className="flex flex-col pl-4 min-w-max">
            <span className="text-xs font-bold text-slate-400 line-through">
              ${business.base_price} MXN
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-indigo-600 tracking-tighter">
                ${business.discount_price}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MXN</span>
            </div>
          </div>

          <div className="flex gap-3 flex-1 justify-end">
            <button className="hidden md:flex items-center justify-center px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl transition-all border border-slate-200 font-bold text-xs uppercase tracking-widest gap-2">
              <Share2 className="w-4 h-4 text-rose-500" />
              Compartir
            </button>

            <Link
              href="/login"
              className="flex-1 md:flex-none flex items-center justify-center px-10 py-4 bg-indigo-600 text-white rounded-[24px] font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest whitespace-nowrap"
            >
              Reservar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
