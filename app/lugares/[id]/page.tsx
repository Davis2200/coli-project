"use client";

import { use, useState, useEffect } from "react";
import { Star, MapPin, Navigation, Lock, ShieldCheck, QrCode, Gift, ArrowRight, CheckCircle, MessageSquare, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MOCK_BUSINESSES, Business } from "@/lib/mock-data";
import { useUserStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function UniversalFichaTecnica({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  const business = MOCK_BUSINESSES.find(b => b.id === id) || MOCK_BUSINESSES[0];
  const allSimilar = MOCK_BUSINESSES.filter(b => b.category === business.category && b.id !== business.id);

  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const similarBusinesses = allSimilar.slice(0, visibleCount);

  // Simulated infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('similar-scroll');
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft + clientWidth >= scrollWidth - 100 && !isLoadingMore && visibleCount < allSimilar.length) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount(prev => prev + 3);
          setIsLoadingMore(false);
        }, 800);
      }
    };

    const container = document.getElementById('similar-scroll');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isLoadingMore, visibleCount, allSimilar.length]);

  const [flowState, setFlowState] = useState<'VIEWING' | 'RESERVED' | 'VALIDATED'>('VIEWING');
  const [opcionPago, setOpcionPago] = useState<'ANTICIPO' | 'TOTAL'>('TOTAL');
  const [showQr, setShowQr] = useState(false);
  const anticipoAmount = Math.round(business.discount_price * 0.2);

  const handleReservaEscrow = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setTimeout(() => {
      console.log(`[VTEL] Event: checkout_iniciado | Modality: ${opcionPago}`);
      setFlowState('RESERVED');
    }, 100);
  };

  const handleValidacionB = () => {
    setTimeout(() => {
      console.log("[VTEL] Event: servicio_validado_por_turista");
      setFlowState('VALIDATED');
    }, 100);
  };

  const handleReferralClick = () => {
    setTimeout(() => {
      console.log("[VTEL] Event: clic_referral_lever");
      router.push("/afiliado");
    }, 30);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-2xl shadow-indigo-600/5 relative overflow-hidden">

        {/* Header Hero */}
        <div className="w-full h-[500px] relative">
          <Image
            src={business.image_url}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
                  {business.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none drop-shadow-sm">{business.name}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-100 shadow-xl shadow-indigo-900/5">
                  <Star className="text-amber-500" size={20} fill="currentColor" />
                  <span className="font-black text-slate-900 text-xl">{business.rating}</span>
                  <span className="text-slate-400 text-sm font-bold ml-1">(124 reseñas)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-bold bg-white/70 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/50">
                  <MapPin size={20} className="text-rose-500" />
                  <span>Oaxaca, México</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="px-10 mt-12 space-y-16">

          {/* Main Content Sections */}
          {flowState === 'VIEWING' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Sobre la experiencia</h2>
                  <p className="text-slate-500 leading-relaxed text-lg font-medium italic">
                    "{business.description}"
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reseñas de la comunidad</h2>
                  <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] text-center">
                    <MessageSquare size={48} className="text-indigo-100 mb-4" />
                    <p className="text-slate-600 font-bold tracking-tight italic text-lg leading-relaxed">"Una experiencia que superó mis expectativas, el servicio de Escrow me dio mucha tranquilidad."</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden relative">
                        <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Explorer" alt="Avatar" fill />
                      </div>
                      <span className="text-sm font-black text-slate-400 uppercase tracking-widest">@turista_explorador</span>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-6">
                <div className="bg-white p-8 rounded-[40px] border border-slate-200 sticky top-28 shadow-2xl shadow-indigo-900/[0.04]">
                  <h3 className="text-xs font-black text-slate-400 mb-8 uppercase tracking-[0.3em] text-center">Reserva Segura</h3>

                  <div className="space-y-4 mb-10">
                    <button
                      onClick={() => setOpcionPago('TOTAL')}
                      className={`w-full p-5 rounded-3xl border-2 text-left transition-all relative ${opcionPago === 'TOTAL'
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-600/5'
                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                        }`}
                    >
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${opcionPago === 'TOTAL' ? 'text-indigo-600' : 'text-slate-400'}`}>Pago Total</div>
                      <div className="text-3xl font-black text-slate-900">${business.discount_price} <span className="text-xs font-bold text-slate-400 ml-1">MXN</span></div>
                    </button>

                    <button
                      onClick={() => setOpcionPago('ANTICIPO')}
                      className={`w-full p-5 rounded-3xl border-2 text-left transition-all relative ${opcionPago === 'ANTICIPO'
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-600/5'
                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                        }`}
                    >
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${opcionPago === 'ANTICIPO' ? 'text-indigo-600' : 'text-slate-400'}`}>Anticipo (20%)</div>
                      <div className="text-3xl font-black text-slate-900">${anticipoAmount} <span className="text-xs font-bold text-slate-400 ml-1">MXN</span></div>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleReservaEscrow}
                      className="w-full bg-indigo-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all text-xl"
                    >
                      RESERVAR AHORA
                    </button>

                    <button
                      onClick={() => setShowQr(true)}
                      className="w-full bg-slate-50 text-slate-600 font-black py-4 rounded-3xl border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest"
                    >
                      <Share2 size={18} className="text-rose-500" />
                      Recomendar y ganar
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-slate-300 mt-6 uppercase tracking-[0.2em] font-black">
                    Protegido por Coli Escrow V1
                  </p>
                </div>
              </aside>

              {/* QR Recommendation Modal */}
              <AnimatePresence>
                {showQr && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
                  >
                    <motion.div
                      className="absolute inset-0"
                      onClick={() => setShowQr(false)}
                    />
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white p-12 rounded-[50px] border border-slate-100 relative z-10 max-w-sm w-full text-center shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
                    >
                      <div className="w-20 h-20 bg-indigo-600 rounded-[32px] mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-indigo-600/30">
                        <QrCode size={40} className="text-white" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Tu Código Coli</h3>
                      <p className="text-slate-400 text-sm mb-10 font-medium">Comparte este código para ganar recompensas cuando tus amigos reserven.</p>

                      <div className="bg-slate-50 p-8 rounded-[40px] border-4 border-white shadow-inner mb-10">
                        <QrCode size={180} className="text-slate-900 mx-auto" />
                      </div>

                      <button
                        onClick={() => setShowQr(false)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black py-5 rounded-3xl transition-all"
                      >
                        Cerrar
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Reserved State */}
          {flowState === 'RESERVED' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-16 py-12">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center justify-center w-40 h-40 rounded-[40px] bg-white text-slate-900 shadow-2xl border-2 border-slate-50 mb-4 transform rotate-3">
                  <QrCode size={80} />
                </div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">¡LISTO PARA EL USO!</h2>
                <p className="text-slate-500 text-xl max-w-md mx-auto font-medium">Presenta este código en el establecimiento para iniciar tu experiencia.</p>
              </div>

              <div className="bg-white border-2 border-indigo-600 rounded-[50px] p-12 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/5">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600 opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <ShieldCheck size={64} className="mx-auto text-indigo-600 mb-8" />
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">VALIDACIÓN DE SERVICIO</h3>
                <p className="text-slate-500 font-bold mb-12 text-lg">
                  ¿Ya disfrutaste del servicio? Confirma para liberar los fondos retenidos en el Escrow.
                </p>
                <button
                  onClick={handleValidacionB}
                  className="w-full bg-indigo-600 text-white font-black py-7 rounded-[32px] hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-600/30 active:scale-95 transition-all text-2xl uppercase tracking-widest"
                >
                  Confirmar Recepción
                </button>
              </div>
            </motion.div>
          )}

          {/* Validated State */}
          {flowState === 'VALIDATED' && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 py-16">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-emerald-100 border border-emerald-200 mb-4 shadow-lg shadow-emerald-500/10">
                  <CheckCircle size={56} className="text-emerald-600" />
                </div>
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter">EXPERIENCIA ÉXITO</h2>
                <p className="text-slate-500 text-xl font-medium">Transacción completada y fondos liberados.</p>
              </div>

              <div
                className="bg-indigo-600 rounded-[50px] p-16 cursor-pointer group hover:bg-indigo-700 transition-all hover:scale-[1.02] relative overflow-hidden shadow-2xl shadow-indigo-600/20"
                onClick={handleReferralClick}
              >
                <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                  <div className="w-28 h-28 rounded-[32px] bg-white text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:rotate-6 transition-transform">
                    <Gift size={56} />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-4xl font-black text-white mb-4 leading-none tracking-tight">
                      Gana dinero recomendando
                    </h3>
                    <p className="text-indigo-100 text-xl mb-8 font-medium">Únete a nuestra red de afiliados y genera comiciones reales.</p>
                    <p className="text-white font-black text-xl flex items-center justify-center md:justify-start gap-4 uppercase tracking-widest">
                      Convertirme en Afiliado <ArrowRight size={28} className="group-hover:translate-x-4 transition-transform" />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Similar Items Section */}
          <section className="mt-28 pb-20">
            <header className="flex justify-between items-end mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">EXPERIENCIAS SIMILARES</h2>
            </header>

            <div id="similar-scroll" className="flex gap-8 overflow-x-auto pb-10 hide-scrollbar snap-x -mx-2 px-2">
              {similarBusinesses.map((b) => (
                <Link
                  href={`/lugares/${b.id}`}
                  key={b.id}
                  className="min-w-[300px] group snap-start"
                >
                  <div className="relative h-64 w-full rounded-[40px] overflow-hidden bg-white border border-slate-100 transition-all group-hover:border-indigo-200 group-hover:shadow-2xl group-hover:shadow-indigo-900/5 group-hover:-translate-y-2">
                    <Image
                      src={b.image_url}
                      alt={b.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-xl font-black text-white truncate mb-2">{b.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                          <Star size={14} className="text-amber-400" fill="currentColor" />
                          <span className="text-xs font-black text-white">{b.rating}</span>
                        </div>
                        <span className="text-sm font-black text-indigo-400">${b.discount_price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {isLoadingMore && (
                <div className="min-w-[120px] flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
