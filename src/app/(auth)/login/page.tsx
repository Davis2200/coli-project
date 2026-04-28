"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db_simulation } from "@/src/lib/db-simulation";
import { useUserStore } from "@/src/lib/store";
import { MOCK_SESSIONS } from "@/src/lib/mock-data";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // 1. Buscar en la "Base de Datos" simulada (localStorage)
    const virtualUser = db_simulation.findUserByEmail(data.email);

    // 2. Si no está ahí, buscar en los Mocks estáticos
    const mockUser = Object.values(MOCK_SESSIONS).find(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    );

    const activeUser = virtualUser || mockUser;

    if (activeUser && activeUser.password === data.password) {
      const normalizedRole = activeUser.role === 'negocio' ? 'business' : activeUser.role;

      login({
        name: activeUser.name,
        role: normalizedRole as 'turista' | 'afiliado' | 'business'
      });

      // Redirección unificada a explorar según rol
      if (normalizedRole === "business") {
        router.push(`/afiliado/explorar`); // Dueños ven el catálogo general
      } else if (normalizedRole === "turista") {
        router.push("/turista/explorar");
      } else if (normalizedRole === "afiliado") {
        router.push("/afiliado/explorar");
      } else {
        router.push("/");
      }

    } else {
      if (!activeUser) {
        setError("email", { message: "Usuario no encontrado" });
      } else {
        setError("password", { message: "Contraseña incorrecta" });
      }
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 mb-5 shadow-sm">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Bienvenido</h2>
        <p className="text-sm font-medium text-slate-400 mt-2">Gestiona tu cuenta en la comunidad Coli</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Input de Email */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Correo Electrónico</label>
          <input
            {...register("email")}
            type="email"
            placeholder="tu@correo.com"
            className={`w-full bg-white border ${errors.email ? 'border-rose-300 ring-rose-500/10' : 'border-slate-200 ring-indigo-500/5'} rounded-[20px] px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:border-indigo-500 transition-all placeholder:text-slate-300 text-sm font-medium`}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-rose-600 text-[10px] font-bold px-2 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" /> {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Input de Contraseña */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Contraseña</label>
            <Link href="/recuperar" className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className={`w-full bg-white border ${errors.password ? 'border-rose-300 ring-rose-500/10' : 'border-slate-200 ring-indigo-500/5'} rounded-[20px] px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:border-indigo-500 transition-all placeholder:text-slate-300 text-sm font-medium`}
          />
          {errors.password && (
            <p className="text-rose-600 text-[10px] font-bold px-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.password.message}
            </p>
          )}
        </div>

        {/* Botón de Iniciar Sesión */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-3 py-5 bg-indigo-600 text-white rounded-[24px] font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all mt-10 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Iniciar Sesión
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="text-center mt-12 pt-6 border-t border-slate-100">
        <p className="text-xs font-medium text-slate-400">
          ¿No tienes cuenta? {" "}
          <Link href="/register" className="text-rose-500 hover:text-rose-600 font-black transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </motion.div>
  );
}