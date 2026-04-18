"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Megaphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const afiliadoSchema = z.object({
  name: z.string().min(2, "Obligatorio"),
  email: z.string().email("Inválido"),
  socialUrl: z.string().url("Proporciona una URL válida de red social"),
});

export default function RegisterAfiliadoPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof afiliadoSchema>>({
    resolver: zodResolver(afiliadoSchema)
  });

  const onSubmit = (data: z.infer<typeof afiliadoSchema>) => {
    console.log("Registrando afiliado:", data);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto text-purple-400 mb-4">
          <Megaphone className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white">Registro de Afiliado</h2>
        <p className="text-sm text-muted-foreground mt-2">Monetiza tus recomendaciones</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Nombre Completo</label>
          <input
            {...register("name")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Correo Electrónico (para pagos)</label>
          <input
            {...register("email")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
           <label className="block text-sm font-medium text-muted-foreground mb-1">Link de Red Social Principal</label>
          <input
            {...register("socialUrl")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="https://instagram.com/tuPerfil"
          />
          {errors.socialUrl && <p className="text-red-400 text-xs mt-1">{errors.socialUrl.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all mt-8"
        >
          Crear Cuenta de Afiliado <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
