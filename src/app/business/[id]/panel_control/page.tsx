"use client";

import { use, useState } from "react";
import {
  Users,
  MousePointer2,
  TrendingUp,
  Target,
  ArrowUpRight,
  Calendar,
  Filter,
  MoreVertical,
  Activity,
  Eye,
  CheckCircle2,
  Clock,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { MOCK_BUSINESSES } from "@/src/lib/mock-data";

const STATS = [
  { label: "Vistas Totales", value: "15,842", change: "+12.5%", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Clientes Únicos", value: "1,240", change: "+5.2%", icon: Users, color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Tasa de Conversión", value: "8.4%", change: "+1.1%", icon: Target, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Tiempo de Respuesta", value: "12 min", change: "-2 min", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
];

const RECENT_VIEWERS = [
  { id: 1, name: "David Explorador", role: "Turista", time: "Hace 5 min", action: "Vio menú" },
  { id: 2, name: "Agencia Delta", role: "Afiliado", time: "Hace 12 min", action: "Generó QR" },
  { id: 3, name: "Sofia Viajes", role: "Turista", time: "Hace 25 min", action: "Vio fotos" },
  { id: 4, name: "Carlos Ramos", role: "Turista", time: "Hace 45 min", action: "Vio ubicación" },
];

export default function BusinessPanelControl({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const business = MOCK_BUSINESSES.find(b => b.id === id) || MOCK_BUSINESSES[0];

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase tracking-widest">
              <Activity size={14} /> En vivo • Panel de Control
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              {business.name}
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Calendar size={16} /> Últimos 30 días
            </button>
            <button className="px-6 py-3 bg-rose-600 text-white rounded-2xl text-xs font-black hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20 flex items-center gap-2 uppercase tracking-widest">
              <Plus size={16} /> Nueva Campaña
            </button>
          </div>
        </div>
      </header>

      {/* Grid de KPIs */}
      <section className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:border-rose-200 transition-all"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Grid Principal de Datos */}
      <section className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Usuarios que ven el negocio */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Actividad en Tiempo Real</h2>
            <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">Ver todo el historial</button>
          </div>

          <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Usuario</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Acción</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Tiempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RECENT_VIEWERS.map((viewer) => (
                  <tr key={viewer.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 text-xs">
                          {viewer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{viewer.name}</p>
                          <p className={`text-[9px] font-bold uppercase tracking-widest ${viewer.role === 'Afiliado' ? 'text-emerald-500' : 'text-blue-500'}`}>
                            {viewer.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-600">{viewer.action}</td>
                    <td className="px-8 py-6 text-[10px] font-black text-slate-300 uppercase">{viewer.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Salud del Negocio / Insights */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Insights de Salud</h2>
          <div className="bg-slate-900 rounded-[48px] p-10 text-white space-y-10 shadow-2xl shadow-rose-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600 opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Satisfacción</span>
                <span className="text-2xl font-black italic">4.9/5</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} className="h-full bg-rose-600" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Referidos Coli</span>
                <span className="text-2xl font-black italic">342</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} className="h-full bg-emerald-500" />
              </div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center space-y-3">
              <Zap className="text-rose-500 mx-auto" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Tu negocio es tendencia</p>
              <p className="text-xs font-medium text-white/60">Has tenido un 15% más de vistas que el promedio esta semana.</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

import { Plus } from "lucide-react";
