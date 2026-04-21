"use client";

import { CheckCircle, ShieldCheck, QrCode, Gift, ArrowRight } from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function ValidacionBidireccionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isValidated, setIsValidated] = useState(false);
  
  // Handlers for telemetry and validation
  const handleValidateService = () => {
    // Simulating < 50ms metrics recording
    setTimeout(() => {
      console.log("[Telemetry] Event fired: servicio_validado_por_turista");
      setIsValidated(true);
    }, 45);
  };

  const handleReferralClick = () => {
    // Telemetry event for tracking referral levers
    setTimeout(() => {
      console.log("[Telemetry] Event fired: clic_referral_lever");
      router.push("/afiliado");
    }, 30);
  };

  return (
    <div className="min-h-screen bg-background pt-8 pb-32">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* Encabezado */}
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-coli text-white shadow-[0_0_40px_rgba(255,0,255,0.4)] mb-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
            {isValidated ? <ShieldCheck size={48} className="relative z-10" /> : <QrCode size={48} className="relative z-10" />}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            {isValidated ? "Servicio Confirmado" : "Boleto Digital"}
          </h1>
          <p className="text-gray-400 text-lg">
            {isValidated 
              ? "Has validado exitosamente el servicio. ¡Esperamos que lo hayas disfrutado!" 
              : "Muestra este código al llegar a tu experiencia. Tus fondos están respaldados por el Escrow."}
          </p>
        </div>

        {/* Tarjeta de Validación B (Bidireccional) */}
        <div className={`glass-panel border-2 rounded-3xl p-8 relative overflow-hidden transition-all duration-700 ${isValidated ? 'border-[hsl(var(--primary))]/50 shadow-[0_0_30px_rgba(255,0,255,0.15)] bg-black/60' : 'border-white/10'}`}>
          {/* Fondo decorativo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[hsl(var(--secondary))]/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white mb-6">
              <ShieldCheck className="text-[hsl(var(--primary))]" />
              Liberación de Fondos Garantizados
            </h2>
            <div className="bg-black/40 border border-white/5 p-6 rounded-2xl mb-8">
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">
                Al confirmar la recepción de tu servicio, autorizas al Contrato Inteligente (Escrow) de Coli a liberar tus fondos retenidos hacia la cuenta del negocio.
              </p>
            </div>
            
            <button 
              onClick={handleValidateService}
              disabled={isValidated}
              className={`w-full font-bold py-5 rounded-2xl transition-all flex justify-center items-center gap-3 text-lg 
                ${isValidated 
                  ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/30 cursor-default" 
                  : "bg-white text-black border-2 border-transparent hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95"}`
              }
            >
              {isValidated ? "Pagado y Liberado" : "Sí, ya recibí el servicio"}
              {isValidated && <CheckCircle size={24} />}
            </button>
          </div>
        </div>

        {/* Módulo de Telemetría: Referral Onboarding (Solamente tras validar para no romper el flujo) */}
        {isValidated && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 mt-10">
            <div className="bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--secondary))]/20 border border-[hsl(var(--primary))]/30 rounded-3xl p-8 cursor-pointer group hover:bg-[hsl(var(--primary))]/30 transition-all hover:scale-[1.02]" onClick={handleReferralClick}>
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-gradient-coli flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,0,255,0.5)] group-hover:animate-pulse">
                  <Gift size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-shadow">
                    ¿Vives aquí o conoces a otros turistas? Únete como afiliado y gana dinero refiriendo
                  </h3>
                  <p className="text-[hsl(var(--primary))] font-semibold text-sm flex items-center justify-center md:justify-start gap-1">
                    Activar mi Panel de Afiliado <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
