"use client";

import { BarChart3, TrendingDown, ShieldCheck, Users, Activity, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const metrics = [
    { title: "Escrow Protegido", value: "$124,500", detail: "Total en garantía", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Tasa de Fuga", value: "3.8%", detail: "-0.4% vs mes pasado", icon: TrendingDown, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Usuarios Activos", value: "1,240", detail: "+12% esta semana", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Servicios Validados", value: "856", detail: "Validación Exitosa", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-6">
            Admin Console v2.0
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Panel Administrativo</h1>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-2">
            Métricas críticas basadas en el ecosistema Coli <ExternalLink size={14} className="text-indigo-400" />
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {metrics.map((m, i) => (
            <motion.div 
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-slate-100 relative overflow-hidden group shadow-xl shadow-indigo-900/[0.02]"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${m.bg} rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform opacity-50`} />
              <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center mb-6`}>
                <m.icon className={`${m.color}`} size={28} />
              </div>
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{m.title}</h3>
              <div className="text-3xl font-black text-slate-900 mb-2">{m.value}</div>
              <p className="text-xs text-slate-500 font-bold">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-indigo-900/[0.02] h-96 flex flex-col items-center justify-center text-slate-400 border-dashed border-2">
            <BarChart3 size={56} className="text-indigo-100 mb-6" />
            <p className="font-black uppercase tracking-widest text-sm text-slate-500">Visualización de Telemetría (VTEL)</p>
            <span className="text-xs font-bold opacity-60 mt-2 italic">Implementación en fase de testeo con mock-data</span>
          </div>
          
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-indigo-900/[0.02] space-y-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Alertas Recientes</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-5 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 group hover:border-indigo-200 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-2.5 flex-shrink-0 shadow-lg shadow-rose-500/20" />
                  <div>
                    <p className="text-sm font-black text-slate-800">Confirmación Pendiente</p>
                    <p className="text-xs font-medium text-slate-400 mt-1">Negocio ID: {100 + i} solicita validación de cargo.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
