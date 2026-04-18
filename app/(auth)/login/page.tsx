"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("Iniciando sesión con:", data);
    // TODO: Connect to Neo4j / Auth handler
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 rounded-full flex items-center justify-center mx-auto text-pink-400 mb-4">
          <Lock className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Bienvenido de vuelta</h2>
        <p className="text-sm text-muted-foreground">Ingresa para ver tus reservaciones y comisiones</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Correo Electrónico</label>
          <input
            {...register("email")}
            type="email"
            placeholder="tu@correo.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-white/20"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-muted-foreground">Contraseña</label>
            <Link href="/recuperar" className="text-xs text-pink-400 hover:text-pink-300">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-white/20"
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 py-4 bg-gradient-coli text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all mt-8 shadow-[0_0_20px_rgba(228,0,124,0.3)] hover:shadow-[0_0_30px_rgba(228,0,124,0.5)]"
        >
          {isSubmitting ? "Cargando..." : "Iniciar Sesión"} <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="text-center mt-8 pt-6 border-t border-white/10">
        <p className="text-sm text-muted-foreground">
          ¿No tienes cuenta? {" "}
          <Link href="/register" className="text-pink-400 hover:text-pink-300 font-bold transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
