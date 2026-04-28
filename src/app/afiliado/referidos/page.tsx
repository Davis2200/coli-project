"use client";

import { Users, UserPlus, Search, Filter, MoreHorizontal, Mail, Phone, Calendar, ArrowUpRight, Zap, Target } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const MOCK_REFERIDOS = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos.r@gmail.com", date: "2024-04-15", status: "Activo", earnings: "$150.00", initial: "CR" },
  { id: 2, name: "Elena Martínez", email: "elena.mtz@yahoo.com", date: "2024-04-12", status: "Pendiente", earnings: "$0.00", initial: "EM" },
  { id: 3, name: "Roberto Sánchez", email: "rober77@hotmail.com", date: "2024-04-10", status: "Completado", earnings: "$420.50", initial: "RS" },
  { id: 4, name: "Lucía Fernández", email: "lucia.f@gmail.com", date: "2024-04-08", status: "Activo", earnings: "$85.00", initial: "LF" },
  { id: 5, name: "Miguel Ángel", email: "m.angel@outlook.com", date: "2024-04-05", status: "Inactivo", earnings: "$12.00", initial: "MA" },
];

export default function MisReferidosPage() {
  const [filter, setFilter] = useState("Todos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Pendiente": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Completado": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Inactivo": return "bg-slate-100 text-slate-500 border-slate-200";
      default: return "bg-slate-100 text-slate-500";
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
            <Users size={12} fill="currentColor" /> Red de Crecimiento
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Mis <span className="text-emerald-600">Referidos</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-lg">
            Gestiona a tus capitaneados y monitorea su actividad para maximizar tus comisiones de embajador.
          </p>
        </motion.div>
      </section>

      {/* Estadísticas Rápidas */}
      <section className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <Target size={24} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Captados</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">128</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
            <Zap size={24} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Conversión</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">24%</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <UserPlus size={24} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nuevos (Mes)</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">+12</p>
        </div>
      </section>

      {/* Tabla de Referidos Centrada */}
      <section className="w-full max-w-6xl px-6">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Directorio de Red</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filtrar por nombre..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Usuario</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estatus</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha Registro</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ganancias Generadas</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_REFERIDOS.map((ref) => (
                  <tr key={ref.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-100 shadow-sm">
                          {ref.initial}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 tracking-tight">{ref.name}</p>
                          <p className="text-[10px] font-medium text-slate-400">{ref.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(ref.status)}`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-tighter">
                        <Calendar size={14} className="text-slate-300" />
                        {ref.date}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900">{ref.earnings}</p>
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

          <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex justify-center">
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-all flex items-center gap-2 group">
              Cargar más registros <MoreHorizontal size={14} className="group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
