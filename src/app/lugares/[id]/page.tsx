"use client";

import { use, useState, useEffect } from "react";
import { Star, MapPin, Navigation, Lock, ShieldCheck, QrCode, Gift, ArrowRight, CheckCircle, MessageSquare, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MOCK_BUSINESSES, Business } from "@/src/lib/mock-data";
import { useUserStore } from "@/src/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function UniversalFichaTecnica({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated, user } = useUserStore();
  const role = user?.role || 'turista';

  // Configuración de Tema Dinámico
  const theme = {
    primary: role === 'afiliado' ? 'emerald-600' : 'indigo-600',
    hover: role === 'afiliado' ? 'hover:bg-emerald-700' : 'hover:bg-indigo-700',
    bg: role === 'afiliado' ? 'bg-emerald-50' : 'bg-indigo-50',
    light: role === 'afiliado' ? 'text-emerald-600' : 'text-indigo-600',
    border: role === 'afiliado' ? 'border-emerald-600' : 'border-indigo-600',
    shadow: role === 'afiliado' ? 'shadow-emerald-600/20' : 'shadow-indigo-600/20',
    accent: role === 'afiliado' ? 'emerald' : 'indigo'
  };

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

  const [flowState, setFlowState] = useState<'VIEWING' | 'FORM' | 'SUMMARY' | 'PAYMENT' | 'RESERVED' | 'VALIDATED'>('VIEWING');
  const [formData, setFormData] = useState<any>({});
  const [opcionPago, setOpcionPago] = useState<'ANTICIPO' | 'TOTAL'>('TOTAL');
  const [showQr, setShowQr] = useState(false);
  const anticipoAmount = Math.round(business.discount_price * 0.2);

  const handleReservaEscrow = () => {
    // El usuario puede iniciar el flujo incluso sin login, se pedirá después o se asume invitado
    setFlowState('FORM');
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
      <div className={`max-w-4xl mx-auto bg-white min-h-screen shadow-2xl ${role === 'afiliado' ? 'shadow-emerald-900/5' : 'shadow-indigo-900/5'} relative overflow-hidden`}>

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
                <span className={`px-4 py-2 rounded-full bg-${theme.primary} text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-${theme.primary}/20`}>
                  {business.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none drop-shadow-sm">{business.name}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-100 shadow-xl shadow-${theme.primary}/5">
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
                    <MessageSquare size={48} className={`text-${theme.accent}-100 mb-4`} />
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
                        ? `border-${theme.primary} bg-${theme.accent}-50/50 shadow-lg shadow-${theme.primary}/5`
                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                        }`}
                    >
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${opcionPago === 'TOTAL' ? `text-${theme.primary}` : 'text-slate-400'}`}>Pago Total</div>
                      <div className="text-3xl font-black text-slate-900">${business.discount_price} <span className="text-xs font-bold text-slate-400 ml-1">MXN</span></div>
                    </button>

                    <button
                      onClick={() => setOpcionPago('ANTICIPO')}
                      className={`w-full p-5 rounded-3xl border-2 text-left transition-all relative ${opcionPago === 'ANTICIPO'
                        ? `border-${theme.primary} bg-${theme.accent}-50/50 shadow-lg shadow-${theme.primary}/5`
                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                        }`}
                    >
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${opcionPago === 'ANTICIPO' ? `text-${theme.primary}` : 'text-slate-400'}`}>Anticipo (20%)</div>
                      <div className="text-3xl font-black text-slate-900">${anticipoAmount} <span className="text-xs font-bold text-slate-400 ml-1">MXN</span></div>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleReservaEscrow}
                      className={`w-full ${role === 'afiliado' ? 'bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700' : 'bg-indigo-600 shadow-indigo-600/20 hover:bg-indigo-700'} text-white font-black py-6 rounded-3xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-widest`}
                    >
                      Reservar Ahora
                    </button>

                    <Link
                      href="/register"
                      className="w-full bg-slate-50 text-slate-600 font-black py-4 rounded-3xl border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest"
                    >
                      <Share2 size={18} className="text-rose-500" />
                      Recomendar y ganar
                    </Link>
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
                      <div className={`w-20 h-20 bg-${theme.primary} rounded-[32px] mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-${theme.primary}/30`}>
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

          {/* --- STAGE 1: FORM --- */}
          {flowState === 'FORM' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto py-12 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Configura tu Reserva</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Paso 1 de 3: Detalles del Servicio</p>
              </div>

              <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8">
                {business.category === 'Restaurante' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Personas</label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} Personas</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Zona Preferida</label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all">
                          <option>Terraza / Exterior</option>
                          <option>Interior / A/C</option>
                          <option>Zona de Bar</option>
                          <option>Área Fumadores</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {(business.category === 'Tour' || business.category === 'Hotel') && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Número de Asistentes / Huéspedes</label>
                        <input type="number" placeholder="¿Cuántos vienen?" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Notas Especiales (Alergias, Ocasión)</label>
                  <textarea placeholder="Ej. Es un aniversario..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 min-h-[120px]" />
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setFlowState('SUMMARY')}
                    className={`w-full py-6 bg-${theme.primary} text-white font-black rounded-3xl shadow-xl shadow-${theme.primary}/20 ${theme.hover} transition-all uppercase tracking-widest leading-none`}
                  >
                    Continuar al Resumen
                  </button>
                  <button onClick={() => setFlowState('VIEWING')} className="w-full mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors">Cancelar</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- STAGE 2: SUMMARY --- */}
          {flowState === 'SUMMARY' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto py-12 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Confirmar Detalles</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Paso 2 de 3: Resumen de Reservación</p>
              </div>

              <div className="bg-white p-12 rounded-[48px] border-4 border-slate-50 shadow-2xl space-y-10 relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-slate-50 pb-8">
                  <div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Servicio seleccionado</h4>
                    <p className="text-2xl font-black text-slate-900 uppercase italic">{business.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">Protección Escrow</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 py-4">
                  <div className="space-y-1 text-left">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Fecha Estimada</p>
                    <p className="text-lg font-black text-slate-900">24 Mayo, 2024</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Precio Final</p>
                    <p className="text-lg font-black text-slate-900">${business.discount_price} MXN</p>
                  </div>
                </div>

                <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-4">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest opacity-60">
                    <span>Subtotal</span>
                    <span>${business.discount_price}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest opacity-60">
                    <span>Comisión de Servicio</span>
                    <span>$0.00</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-widest text-rose-500">Total a Pagar</span>
                    <span className="text-3xl font-black italic tracking-tighter">${business.discount_price} MXN</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <button
                    onClick={() => setFlowState('PAYMENT')}
                    className={`w-full py-6 bg-${theme.primary} text-white font-black rounded-3xl shadow-xl shadow-${theme.primary}/20 ${theme.hover} transition-all uppercase tracking-widest leading-none flex items-center justify-center gap-3`}
                  >
                    Ir al Pago Seguro <ArrowRight size={20} />
                  </button>
                  <button onClick={() => setFlowState('FORM')} className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors">Volver a editar</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- STAGE 3: PAYMENT (STRIPE SIMULATOR) --- */}
          {flowState === 'PAYMENT' && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto py-12 space-y-12">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                  <Lock size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Checkout Seguro por Stripe</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Método de Pago</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Paso 3 de 3: Finalizar Transacción</p>
              </div>

              <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-slate-100 space-y-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 text-left block">Número de Tarjeta</label>
                    <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 font-mono text-lg flex items-center justify-between text-slate-400">
                      <span>•••• •••• •••• ••••</span>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-slate-200 rounded animate-pulse" />
                        <div className="w-10 h-6 bg-slate-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 text-left block">Vencimiento</label>
                      <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 font-mono text-slate-400">MM / YY</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 text-left block">CVC</label>
                      <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 font-mono text-slate-400">•••</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl flex items-start gap-4">
                  <ShieldCheck className="text-emerald-500 mt-1 flex-shrink-0" size={24} />
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Tus fondos serán retenidos en nuestro sistema **Escrow**. El dinero solo se liberará al dueño del negocio una vez que escanees tu código en el establecimiento.
                  </p>
                </div>

                <button
                  onClick={() => setFlowState('RESERVED')}
                  className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-xl hover:bg-black transition-all uppercase tracking-widest leading-none text-lg italic"
                >
                  Pagar ${business.discount_price} MXN
                </button>
              </div>
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

              <div className={`bg-white border-2 border-${theme.primary} rounded-[50px] p-12 text-center relative overflow-hidden shadow-2xl shadow-${theme.primary}/5`}>
                <div className={`absolute top-0 right-0 w-40 h-40 bg-${theme.primary} opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
                <ShieldCheck size={64} className={`mx-auto text-${theme.primary} mb-8`} />
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">VALIDACIÓN DE SERVICIO</h3>
                <p className="text-slate-500 font-bold mb-12 text-lg">
                  ¿Ya disfrutaste del servicio? Confirma para liberar los fondos retenidos en el Escrow.
                </p>
                <button
                  onClick={handleValidacionB}
                  className={`w-full bg-${theme.primary} text-white font-black py-7 rounded-[32px] ${theme.hover} hover:shadow-2xl hover:shadow-${theme.primary}/30 active:scale-95 transition-all text-2xl uppercase tracking-widest`}
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
                className={`bg-${theme.primary} rounded-[50px] p-16 cursor-pointer group ${theme.hover} transition-all hover:scale-[1.02] relative overflow-hidden shadow-2xl shadow-${theme.primary}/20`}
                onClick={handleReferralClick}
              >
                <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                  <div className={`w-28 h-28 rounded-[32px] bg-white text-${theme.primary} flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:rotate-6 transition-transform`}>
                    <Gift size={56} />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-4xl font-black text-white mb-4 leading-none tracking-tight">
                      Gana dinero recomendando
                    </h3>
                    <p className={`text-${theme.accent}-100 text-xl mb-8 font-medium`}>Únete a nuestra red de afiliados y genera comiciones reales.</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
              {similarBusinesses.map((b) => (
                <Link
                  href={`/lugares/${b.id}`}
                  key={b.id}
                  className="group"
                >
                  <div className={`relative h-64 w-full rounded-[40px] overflow-hidden bg-white border border-slate-100 transition-all group-hover:border-${theme.accent}-200 group-hover:shadow-2xl group-hover:shadow-${theme.accent}-900/5 group-hover:-translate-y-2`}>
                    <Image
                      src={b.image_url}
                      alt={b.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">{b.category}</p>
                      <h4 className="text-xl font-black text-white truncate mb-2 uppercase italic">{b.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-lg border border-white/20">
                          <Star size={14} className="text-amber-400" fill="currentColor" />
                          <span className="text-xs font-black text-white">{b.rating}</span>
                        </div>
                        <span className={`text-sm font-black text-white`}>${b.discount_price} MXN</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {isLoadingMore && (
                <div className="col-span-full flex items-center justify-center py-8">
                  <div className={`w-10 h-10 border-4 border-${theme.primary} border-t-transparent rounded-full animate-spin`}></div>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>

      {/* Floating Action Bar Premium */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 pb-10 pointer-events-none">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="max-w-md mx-auto bg-white/90 backdrop-blur-2xl border border-slate-200 p-4 rounded-[32px] flex items-center justify-between pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.1)] gap-6 ring-1 ring-slate-100"
        >
          <div className="flex flex-col pl-4 min-w-max">
            <span className="text-[10px] font-black text-slate-400 line-through tracking-widest uppercase">
              ${business.base_price} MXN
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-black text-${theme.accent}-600 tracking-tighter`}>
                ${business.discount_price}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MXN</span>
            </div>
          </div>

          <button
            onClick={handleReservaEscrow}
            className={`flex-1 flex items-center justify-center px-8 py-5 ${role === 'afiliado' ? 'bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700' : 'bg-indigo-600 shadow-indigo-600/20 hover:bg-indigo-700'} text-white rounded-[24px] font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest whitespace-nowrap`}
          >
            {flowState === 'VIEWING' ? "Reservar Ahora" : (flowState === 'RESERVED' ? "Ver Código" : "Gestionar")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
