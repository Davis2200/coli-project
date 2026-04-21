import { Activity, Clock, DollarSign, AlertTriangle, CheckCircle, PackageCheck, TrendingUp, Users, Star } from "lucide-react";
import { useState } from "react";

// Mock Data para el negocio
const MOCK_METRICS = {
  leakageRate: "4.2%",
  confirmationTime: "12m 45s",
  fundsRetained: 14500,
  fundsReleased: 38200,
  nps: 88,
  occupancy: "92%",
  satisfaction: "4.9/5"
};

const MOCK_RESERVAS = [
  { id: "RES-101", customer: "David E.", status: "retencion", amount: 1200 },
  { id: "RES-102", customer: "Sofia V.", status: "retencion", amount: 2500 }
];

export default function BusinessDashboardPage() {
  const [reservas, setReservas] = useState(MOCK_RESERVAS);
  
  const handleAtendido = (reservaId: string) => {
    setTimeout(() => {
      console.log(`[Telemetry] Event fired: servicio_validado_por_negocio for ${reservaId}`);
      setReservas((prev) => prev.filter(r => r.id !== reservaId));
    }, 45);
  };

  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">Salud del Negocio</h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Panel de Control Escrow y Métricas Operativas</p>
          </div>
          <div className="flex gap-3">
             <div className="glass-panel px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Sistema En Línea</span>
             </div>
          </div>
        </div>

        {/* Dashboard de Salud - KPIs Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* NPS Score */}
          <div className="glass-panel p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Star size={80} />
            </div>
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Star size={14} className="text-yellow-400" /> NPS Score
            </h3>
            <div className="text-5xl font-black text-white italic tracking-tighter">{MOCK_METRICS.nps}</div>
            <div className="mt-4 flex items-center gap-2">
               <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full w-[88%] bg-gradient-coli"></div>
               </div>
               <span className="text-[10px] font-bold text-green-400 uppercase">Excelente</span>
            </div>
          </div>

          {/* Ocupación */}
          <div className="glass-panel p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users size={80} />
            </div>
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Users size={14} className="text-[hsl(var(--secondary))]" /> Ocupación
            </h3>
            <div className="text-5xl font-black text-white italic tracking-tighter">{MOCK_METRICS.occupancy}</div>
            <p className="text-[10px] text-[hsl(var(--secondary))] font-black uppercase tracking-widest mt-4">+12% esta semana</p>
          </div>

          {/* Tasa de Fuga */}
          <div className="glass-panel p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-400" /> Leakage Rate
            </h3>
            <div className="text-5xl font-black text-white italic tracking-tighter">{MOCK_METRICS.leakageRate}</div>
            <p className="text-[10px] text-red-400 font-black uppercase tracking-widest mt-4">Bajo Control</p>
          </div>

          {/* Tiempo Confirmación */}
          <div className="glass-panel p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={14} className="text-[hsl(var(--primary))]" /> Confirmación
            </h3>
            <div className="text-4xl font-black text-white italic tracking-tighter">{MOCK_METRICS.confirmationTime}</div>
            <p className="text-[10px] text-[hsl(var(--primary))] font-black uppercase tracking-widest mt-6">Óptimo</p>
          </div>
        </div>

        {/* Gestión Transaccional - Fondos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-black/40 rounded-[40px] p-10 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-coli opacity-5 blur-[100px] pointer-events-none"></div>
              <h2 className="text-2xl font-black flex items-center gap-3 text-white mb-10 uppercase italic tracking-tighter">
                <DollarSign className="text-[hsl(var(--secondary))]" /> Flujo de Fondos (Escrow)
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Retenido */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl">
                  <h3 className="text-white/30 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">Escrow Retenido</h3>
                  <div className="text-4xl font-black text-white flex items-baseline gap-2 italic tracking-tighter">
                    ${MOCK_METRICS.fundsRetained.toLocaleString()} <span className="text-sm text-white/20 font-bold uppercase not-italic">MXN</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-6">
                    <div className="h-full w-1/3 bg-white/20 rounded-full"></div>
                  </div>
                </div>

                {/* Liberado */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent border border-[hsl(var(--primary))]/20 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-1.5 h-full bg-gradient-coli"></div>
                  <h3 className="text-[hsl(var(--primary))] text-[10px] font-black mb-4 uppercase tracking-[0.2em]">Fondos Liberados</h3>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-coli flex items-baseline gap-2 italic tracking-tighter">
                    ${MOCK_METRICS.fundsReleased.toLocaleString()} <span className="text-sm text-[hsl(var(--primary))] opacity-40 font-bold uppercase not-italic tracking-normal">MXN</span>
                  </div>
                  <button className="mt-8 text-[10px] font-black text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all uppercase tracking-widest border border-white/5">Retirar Fondos</button>
                </div>
              </div>
           </div>

           {/* Health Summary Card */}
           <div className="glass-panel p-10 rounded-[40px] border border-white/10 flex flex-col">
              <h2 className="text-xl font-black text-white mb-8 uppercase italic tracking-tighter">Status Operativo</h2>
              <div className="flex-1 space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest">
                       <span>Satisfacción Cliente</span>
                       <span className="text-green-400">Excelente</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-[95%] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest">
                       <span>Conversión Promedio</span>
                       <span className="text-[hsl(var(--primary))]">8.4%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-[65%] bg-[hsl(var(--primary))]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest">
                       <span>Retención de Marca</span>
                       <span className="text-[hsl(var(--secondary))]">Alta</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-[82%] bg-[hsl(var(--secondary))]"></div>
                    </div>
                 </div>
              </div>
              <div className="mt-8 p-4 rounded-2xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/10 text-center">
                 <p className="text-[10px] font-black text-[hsl(var(--primary))] uppercase tracking-widest">Tu negocio es tendencia</p>
              </div>
           </div>
        </div>

        {/* Acción Crítica: Operaciones en Curso */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black flex items-center gap-3 text-white uppercase italic tracking-tighter">
              <Activity className="text-[hsl(var(--primary))]" /> Operaciones en Curso
            </h2>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{reservas.length} Pendientes</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservas.length === 0 ? (
              <div className="col-span-full text-center p-20 glass-panel border border-white/5 rounded-[40px] text-white/20">
                <CheckCircle className="mx-auto mb-6 opacity-20" size={64} />
                <p className="text-lg font-black uppercase tracking-[0.3em]">No hay reservas pendientes</p>
              </div>
            ) : (
              reservas.map(reserva => (
                <div key={reserva.id} className="flex flex-col sm:flex-row items-center justify-between p-8 glass-panel border border-white/5 hover:border-[hsl(var(--primary))]/30 rounded-[32px] gap-6 transition-all group">
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-coli flex items-center justify-center border border-white/10 shadow-lg group-hover:rotate-6 transition-transform">
                      <span className="font-black text-white text-xl italic">{reserva.customer.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-white text-xl uppercase italic tracking-tight">{reserva.customer}</h4>
                      <p className="text-[10px] text-white/30 font-bold tracking-widest mt-1 uppercase">{reserva.id} • ${reserva.amount} MXN</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAtendido(reserva.id)}
                    className="w-full sm:w-auto bg-white text-black font-black py-4 px-8 rounded-2xl shadow-xl hover:bg-[hsl(var(--primary))] hover:text-white transition-all outline-none flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                  >
                    Atendido <PackageCheck size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

