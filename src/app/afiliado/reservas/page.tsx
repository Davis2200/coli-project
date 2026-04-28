"use client";

import { CalendarCheck, DollarSign, ArrowUpRight, Filter, Search, Download, CreditCard, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const MOCK_RESERVAS = [
  { id: "RES-9901", business: "Restaurante El Faro", date: "2024-04-20", client: "Juan Pérez", total: "$1,200.00", commission: "$180.00", status: "Confirmado" },
  { id: "RES-9902", business: "Hotel Arena", date: "2024-04-19", client: "Ana García", total: "$4,500.00", commission: "$675.00", status: "Pendiente" },
  { id: "RES-9903", business: "Aventura Extrema", date: "2024-04-18", client: "Pedro López", total: "$2,800.00", commission: "$420.00", status: "Pagado" },
  { id: "RES-9904", business: "Club Social", date: "2024-04-17", client: "María José", total: "$850.00", commission: "$127.50", status: "Cancelado" },
  { id: "RES-9905", business: "Teatro Mazatlán", date: "2024-04-16", client: "Carlos Slim", total: "$1,100.00", commission: "$165.00", status: "Confirmado" },
];

export default function ReservasReferidasPage() {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmado": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Pagado": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Pendiente": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Cancelado": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmado": return <CheckCircle2 size={12} />;
      case "Pagado": return <DollarSign size={12} />;
      case "Pendiente": return <Clock size={12} />;
      case "Cancelado": return <AlertCircle size={12} />;
      default: return null;
    }
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
            <CalendarCheck size={12} fill="currentColor" /> Historial de Éxitos
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Reservas <span className="text-emerald-600">Referidas</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-lg">
            Rastreo detallado de conversiones y comisiones generadas a través de tus enlaces y códigos QR.
          </p>
        </motion.div>
      </section>

      {/* Resumen de Comisiones */}
      <section className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-900 rounded-[40px] p-10 flex items-center justify-between shadow-2xl shadow-emerald-900/20 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="relative z-10">
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Comisiones Totales</p>
            <p className="text-5xl font-black text-white tracking-tighter">$15,420.00</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-[28px] flex items-center justify-center text-emerald-400 border border-white/5 shadow-xl">
            <CreditCard size={32} />
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-[40px] p-10 flex items-center justify-between shadow-sm group">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Por cobrar</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter">$1,280.00</p>
          </div>
          <div className="w-16 h-16 bg-emerald-50 rounded-[28px] flex items-center justify-center text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
            <Clock size={32} />
          </div>
        </div>
      </section>

      {/* Tabla de Reservas Centrada */}
      <section className="w-full max-w-6xl px-6">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Listado de Conversiones</h3>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar reserva..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                <Download size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Negocio / Cliente</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estatus</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Monto Total</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tu Comisión</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_RESERVAS.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-sm font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">{res.business}</p>
                        <p className="text-[10px] font-medium text-slate-400">{res.client}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{res.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(res.status)}`}>
                        {getStatusIcon(res.status)}
                        {res.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-500">{res.total}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-emerald-600">{res.commission}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                        <ArrowUpRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 border-t border-slate-50 bg-slate-50/10 flex justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <span>Mostrando {MOCK_RESERVAS.length} resultados</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors opacity-50 cursor-not-allowed">Anterior</button>
              <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">Siguiente</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
