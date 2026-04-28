"use client";

import { use, useState } from "react";
import {
  CalendarCheck,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  PackageCheck,
  User,
  MoreVertical,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_BUSINESSES } from "@/src/lib/mock-data";

const MOCK_RESERVAS = [
  { id: "RES-402", customer: "David E.", status: "Pendiente", amount: 1080, time: "14:30 PM", date: "Hoy", type: "Pago Total" },
  { id: "RES-403", customer: "Sofia V.", status: "Confirmada", amount: 500, time: "16:00 PM", date: "Hoy", type: "Anticipo" },
  { id: "RES-405", customer: "Carlos R.", status: "Finalizada", amount: 2250, time: "11:00 AM", date: "Ayer", type: "Pago Total" },
  { id: "RES-408", customer: "Ana M.", status: "Problema", amount: 0, time: "13:15 PM", date: "Ayer", type: "Cancelada" },
];

export default function BusinessReservasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const business = MOCK_BUSINESSES.find(b => b.id === id) || MOCK_BUSINESSES[0];
  const [filterStatus, setFilterStatus] = useState("Todos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada": return "text-emerald-500 bg-emerald-50 border-emerald-100";
      case "Pendiente": return "text-amber-500 bg-amber-50 border-amber-100";
      case "Finalizada": return "text-slate-400 bg-slate-50 border-slate-100";
      case "Problema": return "text-rose-500 bg-rose-50 border-rose-100";
      default: return "text-slate-400 bg-slate-50 border-slate-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmada": return <CheckCircle2 size={14} />;
      case "Pendiente": return <Clock size={14} />;
      case "Finalizada": return <PackageCheck size={14} />;
      case "Problema": return <AlertCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-32">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">
            <CalendarCheck size={14} /> Gestión de Operaciones
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
            Reservas <span className="text-rose-600">Recibidas</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">{business.name}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-600 shadow-sm">
            <Filter size={16} /> Filtrar
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-black transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest">
            Exportar CSV
          </button>
        </div>
      </header>

      {/* Tabla de Reservas */}
      <section className="w-full max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden ring-1 ring-slate-100">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-10 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Cliente</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Costo / Tipo</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Fecha / Hora</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Estado</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_RESERVAS.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center font-black text-rose-600 text-sm italic">
                        {reserva.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{reserva.customer}</p>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{reserva.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-lg font-black text-slate-900 tracking-tighter">${reserva.amount} MXN</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{reserva.type}</p>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-black text-slate-900">{reserva.date}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{reserva.time}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${getStatusColor(reserva.status)}`}>
                      {getStatusIcon(reserva.status)}
                      {reserva.status}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <button className="px-5 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-slate-900/10">
                        Atender
                      </button>
                      <button className="p-3 hover:bg-white rounded-xl text-slate-300 transition-colors border border-transparent hover:border-slate-100">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info adicional para el dueño */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-50 rounded-[40px] p-8 border border-rose-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-rose-600 shadow-xl shadow-rose-900/5">
              <PackageCheck size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Total del Día</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tighter">$1,580.00 MXN Liberados</h4>
            </div>
          </div>
          <div className="bg-slate-900 rounded-[40px] p-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-white">
              <Activity size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Flujo Escrow</p>
              <h4 className="text-2xl font-black text-white tracking-tighter">12 Operaciones en Retención</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
