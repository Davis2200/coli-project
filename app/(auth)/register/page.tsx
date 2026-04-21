"use client";

import Link from "next/link";
import { User, Store, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterSelectionPage() {
  const options = [
    {
      title: "Turista / Local",
      description: "Explora Oaxaca, encuentra joyas ocultas y vive experiencias auténticas.",
      icon: <User className="w-6 h-6 text-rose-600" />,
      href: "/register/turista",
      delay: 0.1,
      accent: "bg-rose-50 border-rose-100",
    },
    {
      title: "Afiliado",
      description: "Recomienda tus lugares favoritos y gana beneficios exclusivos.",
      icon: <Megaphone className="w-6 h-6 text-indigo-600" />,
      href: "/register/afiliado",
      delay: 0.2,
      accent: "bg-indigo-50 border-indigo-100",
    },
    {
      title: "Dueño de Negocio",
      description: "Toma el control de tu presencia digital. Recibe pagos y reseñas.",
      icon: <Store className="w-6 h-6 text-emerald-600" />,
      href: "/register/partner",
      delay: 0.3,
      accent: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Únete a Coli</h1>
        <p className="text-slate-500 font-medium">Selecciona cómo quieres participar en la comunidad</p>
      </div>

      <div className="space-y-4 mt-10">
        {options.map((opt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: opt.delay }}
          >
            <Link
              href={opt.href}
              className="group flex items-center p-5 rounded-3xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/[0.04] transition-all duration-300"
            >
              <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center mr-5 transition-transform group-hover:scale-110 ${opt.accent} border`}>
                {opt.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {opt.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10 pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500 font-medium">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-black">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
