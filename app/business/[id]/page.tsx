"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_BUSINESSES } from "@/lib/mock-data";
import { ArrowLeft, Star, Share2, MapPin, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { BusinessCard } from "@/components/ui/BusinessCard";

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
    <div className="min-h-screen bg-background relative pb-32">
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/10"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <div className="relative w-full h-[55vh]">
        <Image 
          src={business.image_url} 
          alt={business.name} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/20" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 -mt-40 relative z-10 w-full">
        <div className="flex flex-col gap-6 w-full">
          {/* Header Info */}
          <div>
             <span className={`inline-block px-3 py-1 mb-3 rounded-full text-xs font-semibold backdrop-blur-md 
                 ${business.category === 'Hotel' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 
                   business.category === 'Restaurante' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 
                   business.category === 'Tour' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
                   'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>
                {business.category}
              </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              {business.name}
            </h1>
            
            {/* Social Proof */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-purple-900/40 px-3 py-1.5 rounded-xl border border-purple-500/30">
                <Star className="w-5 h-5 text-purple-400 fill-purple-400" />
                <span className="text-lg font-bold text-white">{business.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm font-medium underline decoration-white/20">
                {Math.floor(Math.random() * 500) + 50} reseñas verificadas
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mt-4">
               <MapPin className="w-5 h-5 text-pink-400" />
               <span className="font-medium">Ciudad de México (Centro Histórico)</span>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl mt-2 border-white/5 shadow-xl shadow-pink-900/5">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              Sobre la experiencia
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {business.description}
            </p>
          </div>

          {/* Paquete Incluido */}
          <div className="glass-panel p-6 rounded-3xl border border-pink-500/10 bg-pink-500/5">
            <h3 className="text-lg font-bold text-pink-300 mb-4">¿Qué incluye tu reserva Coli?</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {["Acceso preferencial Express", "Servicio garantizado", "Cancelación gratuita 24h", "Atención prioritaria"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
               ))}
            </ul>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

          {/* Carruseles PWA */}
          <div className="space-y-10 pb-10">
            {antes.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-white mb-4 px-2">Antes de tu actividad</h3>
                <div className="flex overflow-x-auto gap-4 pb-6 px-2 snap-x snap-mandatory hide-scrollbar">
                  {antes.map(b => (
                    <div key={b.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
                      <BusinessCard business={b} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {despues.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-white mb-4 px-2">Después de tu actividad</h3>
                <div className="flex overflow-x-auto gap-4 pb-6 px-2 snap-x snap-mandatory hide-scrollbar">
                  {despues.map(b => (
                    <div key={b.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
                      <BusinessCard business={b} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {similares.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-white mb-4 px-2">Lugares Similares</h3>
                <div className="flex overflow-x-auto gap-4 pb-6 px-2 snap-x snap-mandatory hide-scrollbar">
                  {similares.map(b => (
                    <div key={b.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
                      <BusinessCard business={b} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

        </div>
      </div>

      {/* Floating Action Bar (Bottom Mobile First) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 sm:pb-6 bg-gradient-to-t from-black via-black/90 to-transparent pt-20 pointer-events-none">
        <div className="max-w-4xl mx-auto glass-panel border border-white/10 p-3 sm:px-6 sm:py-4 rounded-3xl flex items-center justify-between pointer-events-auto bg-zinc-950/80 backdrop-blur-2xl shadow-[0_10px_50px_rgba(228,0,124,0.15)] gap-4">
          
          <div className="flex flex-col pl-2 min-w-max">
             <span className="text-xs sm:text-sm text-muted-foreground line-through decoration-red-500/50">
                ${business.base_price} MXN
             </span>
             <div className="flex items-baseline gap-1">
               <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  ${business.discount_price}
               </span>
               <span className="text-xs sm:text-sm font-medium text-white/50">MXN</span>
             </div>
          </div>
          
          <div className="flex gap-2 sm:gap-4 flex-1 justify-end">
             <button className="flex items-center justify-center p-3 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-colors border border-white/10 group">
               <Share2 className="w-5 h-5 sm:mr-2 group-hover:text-pink-400 transition-colors" />
               <span className="hidden sm:inline font-medium">Recomendar</span>
             </button>
             
             {/* Redirigir a login simulando que no está autenticado */}
             <Link 
               href="/login" 
               className="flex-1 sm:flex-none flex items-center justify-center px-4 py-3 sm:px-8 sm:py-3 bg-gradient-coli text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
             >
               Reservar Ahora
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
