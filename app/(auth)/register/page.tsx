"use client";

import Link from "next/link";
import { User, Store, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterSelectionPage() {
  const options = [
    {
      title: "Turista / Local",
      description: "Explora la ciudad, encuentra joyas ocultas y disfruta.",
      icon: <User className="w-6 h-6 text-pink-400" />,
      href: "/register/turista",
      delay: 0.1,
    },
    {
      title: "Afiliado",
      description: "Recomienda lugares y gana comisiones por reservaciones.",
      icon: <Megaphone className="w-6 h-6 text-purple-400" />,
      href: "/register/afiliado",
      delay: 0.2,
    },
    {
      title: "Dueño de Negocio",
      description: "Publica tu hotel, tour o restaurante. Acepta pagos.",
      icon: <Store className="w-6 h-6 text-pink-600" />,
      href: "/register/partner",
      delay: 0.3,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Únete a Coli</h1>
        <p className="text-muted-foreground">Selecciona cómo quieres participar</p>
      </div>

      <div className="space-y-4 mt-8">
        {options.map((opt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: opt.delay }}
          >
            <Link
              href={opt.href}
              className="group flex items-center p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full glass-panel flex items-center justify-center mr-4 group-hover:shadow-[0_0_15px_rgba(228,0,124,0.3)] transition-shadow">
                {opt.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                  {opt.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {opt.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6 pt-4 border-t border-white/10">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-pink-400 hover:text-pink-300 font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
