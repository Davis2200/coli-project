"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Megaphone, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/src/lib/store";
import { db_simulation } from "@/src/lib/db-simulation";

const afiliadoSchema = z.object({
  name: z.string().min(2, "Obligatorio"),
  email: z.string().email("Inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export default function RegisterAfiliadoPage() {
  const [showPass, setShowPass] = useState(false);
  const login = useUserStore((state) => state.login);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof afiliadoSchema>>({
    resolver: zodResolver(afiliadoSchema)
  });

  const onSubmit = (data: z.infer<typeof afiliadoSchema>) => {
    const newUser = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'afiliado' as const,
      mes_activacion: new Date().toISOString().slice(0, 7)
    };

    console.log("[Neo4j Simulation]: CREATE (a:User:Afiliado {id: '" + newUser.id + "', name: '" + data.name + "', email: '" + data.email + "', password_hash: 'HIDDEN', role: 'afiliado', mes_activacion: '" + newUser.mes_activacion + "'})");

    // Guardar en DB simulada
    db_simulation.saveUser(newUser);

    // Persistencia local (sesión)
    login({
      name: data.name,
      role: "afiliado"
    });

    window.location.href = "/afiliado/explorar";
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-4">
          <Megaphone className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Registro de Afiliado</h2>
        <p className="text-sm text-slate-500 mt-2">Monetiza tus recomendaciones</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
          <input
            {...register("name")}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
            placeholder="Juan Pérez"
          />
          {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
          <input
            {...register("email")}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
            placeholder="juan@afiliado.com"
          />
          {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña</label>
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
              placeholder="••••••"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Confirmar</label>
            <input
              {...register("confirmPassword")}
              type={showPass ? "text" : "password"}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
              placeholder="••••••"
            />
            {errors.confirmPassword && <p className="text-rose-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all mt-8"
        >
          Crear Cuenta de Afiliado <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
