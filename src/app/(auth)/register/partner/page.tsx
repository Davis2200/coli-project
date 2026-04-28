"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Store, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/src/lib/store";
import { db_simulation } from "@/src/lib/db-simulation";

const partnerSchema = z.object({
  businessName: z.string().min(2, "Obligatorio"),
  email: z.string().email("Correo inválido"),
  categoria: z.enum(["Restaurante", "Tour", "Hotel", "Evento"], {
    errorMap: () => ({ message: "Selecciona una categoría válida" }),
  }),
  ubicacion: z.string().min(5, "Ubicación requerida"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export default function RegisterPartnerPage() {
  const [showPass, setShowPass] = useState(false);
  const login = useUserStore((state) => state.login);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof partnerSchema>>({
    resolver: zodResolver(partnerSchema)
  });

  const onSubmit = (data: z.infer<typeof partnerSchema>) => {
    const bizId = "biz_" + Math.random().toString(36).substr(2, 9);
    const userId = crypto.randomUUID();

    const newUser = {
      id: userId,
      name: data.businessName,
      email: data.email,
      password: data.password,
      role: 'business' as const,
      mes_activacion: new Date().toISOString().slice(0, 7)
    };

    console.log("[Neo4j Simulation]: CREATE (n:Negocio {id: '" + bizId + "', nombre: '" + data.businessName + "', categoria: '" + data.categoria + "', ubicacion: '" + data.ubicacion + "'})");
    console.log("[Neo4j Simulation]: CREATE (u:User:Negocio {id: '" + userId + "', name: '" + data.businessName + "', email: '" + data.email + "', role: 'business'})-[:GESTIONA]->(n)");

    // Guardar en DB simulada
    db_simulation.saveUser(newUser);

    // Persistencia local (sesión)
    login({
      name: data.businessName,
      role: "business"
    });

    window.location.href = "/afiliado/explorar"; // Enviamos a explorar como pidió el usuario
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
          <Store className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Registro de Negocio</h2>
        <p className="text-sm text-slate-500 mt-2">Únete a la red de aliados de Coli</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Negocio</label>
          <input
            {...register("businessName")}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
            placeholder="Sabor a Maguey"
          />
          {errors.businessName && <p className="text-rose-500 text-xs mt-1">{errors.businessName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
          <input
            {...register("email")}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
            placeholder="admin@mi-negocio.com"
          />
          {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Categoría</label>
            <select
              {...register("categoria")}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none"
            >
              <option value="">Seleccionar...</option>
              <option value="Restaurante">Restaurante</option>
              <option value="Tour">Tour</option>
              <option value="Hotel">Hotel</option>
              <option value="Evento">Evento</option>
            </select>
            {errors.categoria && <p className="text-rose-500 text-xs mt-1">{errors.categoria.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Ubicación</label>
            <input
              {...register("ubicacion")}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
              placeholder="Ej. Oaxaca Centro"
            />
            {errors.ubicacion && <p className="text-rose-500 text-xs mt-1">{errors.ubicacion.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña</label>
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300"
              placeholder="••••••"
            />
            {errors.confirmPassword && <p className="text-rose-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all mt-6"
        >
          Dar de Alta Negocio <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
