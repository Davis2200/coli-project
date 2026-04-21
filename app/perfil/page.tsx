"use client";

import { useUserStore } from "@/lib/store";
import { User, Mail, MapPin, Calendar, Heart, Award, Share2, Edit2, Settings, MessageSquare, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfilePage() {
  // ✅ 1. Obtenemos el objeto user completo
  const user = useUserStore((state) => state.user);

  // ✅ 2. Ajustamos el Mock para que use los datos reales del store
  const userMock = {
    // Si user existe, usa su nombre, si no, un valor por defecto
    name: user?.name || "Usuario Coli",
    // Si el rol es negocio, ponemos el nombre del local
    role: user?.role || 'turista',
    bio: "Entusiasta de la gastronomía mexicana y los viajes de aventura. Siempre buscando el mejor mezcal de la ciudad. 🌮🥃",
    joinDate: "Enero 2024",
    location: "Oaxaca, México",
    level: 12,
    points: 2450,
    following: 128,
    followers: 89,
    interests: ["Gastronomía", "Historia", "Aventura", "Mixología", "Hotelería"],
  };
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 px-6">

      {/* Header Profile Card */}
      <section className="relative bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl shadow-indigo-900/[0.03]">
        {/* Cover Image */}
        <div className="h-56 w-full bg-gradient-to-r from-indigo-600 via-rose-500 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            className="absolute inset-0"
          >
            <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000" alt="Cover" fill className="object-cover" />
          </motion.div>
        </div>

        {/* Profile Content */}
        <div className="px-10 pb-10">
          <div className="relative flex flex-col md:flex-row md:items-end gap-8 -mt-20 mb-10">
            {/* Avatar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-[40px] overflow-hidden border-8 border-white bg-white shadow-2xl"
            >
              <div className="w-full h-full rounded-[32px] overflow-hidden relative border border-slate-100">
                <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userMock.role}`} alt="Avatar" fill className="object-cover" />
              </div>
              <div className="absolute bottom-3 right-3 w-7 h-7 bg-emerald-500 border-4 border-white rounded-full"></div>
            </motion.div>

            {/* Info Basica */}
            <div className="flex-1 space-y-4 pb-2">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{userMock.name}</h1>
                <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                  {userMock.role}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100"><MapPin size={14} className="text-rose-500" /> {userMock.location}</span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100"><Calendar size={14} className="text-indigo-500" /> Unido en {userMock.joinDate}</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-3">
              <button className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-white transition-all shadow-sm">
                <Edit2 size={20} />
              </button>
              <button className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all">
                Compartir Perfil
              </button>
            </div>
          </div>

          {/* Social Stats */}
          <div className="flex gap-12 border-t border-slate-100 pt-8">
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{userMock.following}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Siguiendo</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{userMock.followers}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-indigo-600">${userMock.points}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Coli Points</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Col: Bio & Interests */}
        <div className="lg:col-span-1 space-y-10">
          <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-indigo-900/[0.02]">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-50 pb-6 mb-6 flex items-center gap-3">
              <User size={18} className="text-indigo-600" /> Biografía
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
              "{userMock.bio}"
            </p>
          </section>

          <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-indigo-900/[0.02]">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-50 pb-6 mb-6 flex items-center gap-3">
              <Heart size={18} className="text-rose-500" /> Intereses
            </h2>
            <div className="flex flex-wrap gap-2">
              {userMock.interests.map(tag => (
                <span key={tag} className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right Col: Activity & Gamification */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-indigo-900/[0.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-indigo-900 pointer-events-none">
              <Award size={160} />
            </div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-50 pb-6 mb-10 flex items-center gap-3">
              <Award size={18} className="text-indigo-600" /> Nivel de Usuario
            </h2>
            <div className="bg-slate-50/50 rounded-[32px] p-10 border border-slate-100 flex items-center gap-10">
              <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                <div className="absolute inset-0 border-[6px] border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-indigo-600 rounded-full border-t-transparent -rotate-45 shadow-sm shadow-indigo-600/10"></div>
                <span className="text-5xl font-black text-slate-900 tracking-tighter">{userMock.level}</span>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Progreso para Nivel {userMock.level + 1}</span>
                  <span className="text-indigo-600">75%</span>
                </div>
                <div className="h-4 w-full bg-white rounded-full overflow-hidden border border-slate-100 p-1 shadow-inner">
                  <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full shadow-lg shadow-indigo-600/20"></div>
                </div>
                <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">¡Te faltan 150 puntos para el siguiente rango!</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-indigo-900/[0.02] overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                <Star size={18} className="text-indigo-600" /> Actividad Reciente
              </h2>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest cursor-pointer hover:underline underline-offset-4 decoration-2">Ver todo</span>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center gap-6 p-8 hover:bg-slate-50 transition-all rounded-[32px] cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform shadow-sm">
                  <MapPin size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-800 tracking-tight">Visitaste "Sabor a Maguey"</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Hace 2 días • Colonia Roma</p>
                </div>
                <div className="ml-auto flex -space-x-3">
                  {[1, 2].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${i}`} alt="Friend" fill />
                  </div>)}
                </div>
              </div>

              <div className="flex items-center gap-6 p-8 hover:bg-slate-50 transition-all rounded-[32px] cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 group-hover:scale-110 transition-transform shadow-sm">
                  <MessageSquare size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-800 tracking-tight">Dejaste una reseña estelar</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Hace 5 días • "Vuelo en Globo"</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
