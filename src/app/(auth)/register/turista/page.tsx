"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegistrationStepper } from "@/src/components/auth/RegistrationStepper";
import { ArrowRight, Compass, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/src/lib/store";
import { db_simulation } from "@/src/lib/db-simulation";

const turistaSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof turistaSchema>;

export default function RegisterTuristaPage() {
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const steps = ["Identidad", "Verificación"];
  const login = useUserStore((state) => state.login);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: zodResolver(turistaSchema)
  });

  const onSubmit = (data: FormValues) => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      const newUser = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'turista' as const,
        mes_activacion: new Date().toISOString().slice(0, 7)
      };

      console.log("[Neo4j Simulation]: CREATE (u:User:Turista {id: '" + newUser.id + "', name: '" + data.name + "', email: '" + data.email + "', password_hash: 'HIDDEN', role: 'turista', mes_activacion: '" + newUser.mes_activacion + "'})");

      // Guardar en DB simulada
      db_simulation.saveUser(newUser);

      // Persistencia local (sesión)
      login({
        name: data.name,
        role: "turista"
      });

      window.location.href = "/turista/explorar";
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-900">Registro Turista</h2>
        <p className="text-sm text-slate-500">Explora la ciudad como un local</p>
      </div>

      <RegistrationStepper steps={steps} currentStep={step} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  {...register("name")}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                  placeholder="Ej. Ana García"
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  {...register("email")}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                  placeholder="ana@ejemplo.com"
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

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full flex justify-center items-center gap-2 py-4 bg-gradient-coli text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">Verificación Rápida</h3>
                <p className="text-sm text-slate-500 px-4">
                  Te hemos enviado un código a <strong>{watch("email") || "tu correo"}</strong>. <br /> <span className="opacity-50 text-[10px] uppercase font-bold tracking-widest">(Simulación OTP: 123456)</span>
                </p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="123456"
                  className="w-full text-center tracking-widest bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-slate-900 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all transition-all placeholder:text-slate-200"
                />
              </div>

              <div className="pt-4 flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="py-3 px-6 bg-white border border-slate-100 text-slate-400 rounded-2xl font-bold hover:text-slate-600 transition-all"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 py-4 bg-gradient-coli text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Finalizar Registro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
