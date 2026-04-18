"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegistrationStepper } from "@/components/auth/RegistrationStepper";
import { ArrowRight, Loader2, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const turistaSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  interests: z.array(z.string()).min(1, "Selecciona al menos 1 interés"),
});

type FormValues = z.infer<typeof turistaSchema>;

const INTERESTS_OPTIONS = ["Gastronomía", "Cultura", "Aventura", "Vida Nocturna", "Relax", "Arte"];

export default function RegisterTuristaPage() {
  const [step, setStep] = useState(0);
  const steps = ["Identidad", "Intereses", "Verificación"];
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(turistaSchema),
    defaultValues: { interests: [] }
  });

  const selectedInterests = watch("interests");

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setValue("interests", selectedInterests.filter(i => i !== interest));
    } else {
      setValue("interests", [...selectedInterests, interest]);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      console.log("Registrando turista en Neo4j:", data);
      // TODO: Connect to Neo4j Action createTuristaNode(data)
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Registro Turista</h2>
        <p className="text-sm text-muted-foreground">Explora la ciudad como un local</p>
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
                <label className="block text-sm font-medium text-muted-foreground mb-1">Nombre Completo</label>
                <input
                  {...register("name")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="Ej. Ana García"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Correo Electrónico</label>
                <input
                  {...register("email")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="ana@ejemplo.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="pt-4 flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => console.log("Registrar como Guest")}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  Entrar como Invitado
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 flex justify-center items-center gap-2 py-3 bg-gradient-coli text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
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
              className="space-y-4"
            >
              <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">
                ¿Qué te interesa explorar?
              </label>
              <div className="flex flex-wrap gap-3 justify-center">
                {INTERESTS_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${
                      selectedInterests.includes(interest)
                        ? "bg-pink-600/20 border-pink-500 text-pink-300"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {errors.interests && <p className="text-red-400 text-xs mt-1 text-center">{errors.interests.message}</p>}

              <div className="pt-8 flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="py-3 px-6 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 flex justify-center items-center gap-2 py-3 bg-gradient-coli text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
                >
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto text-pink-400">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Verificación Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Te hemos enviado un código a <strong>{watch("email") || "tu correo"}</strong>. <br/> (Simulación OTP)
                </p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="123456"
                  className="w-full text-center tracking-widest bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
              </div>

              <div className="pt-4 flex justify-between gap-4">
                 <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-6 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 py-3 bg-gradient-coli text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
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
