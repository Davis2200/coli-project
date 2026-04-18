"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Store, ShieldCheck, UploadCloud, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const partnerSchema = z.object({
  businessName: z.string().min(2, "Obligatorio"),
  taxId: z.string().min(12, "RFC debe tener al menos 12 caracteres"),
  address: z.string().min(10, "Dirección completa necesaria"),
  clabe: z.string().length(18, "CLABE debe ser de 18 dígitos"),
  photoUrl: z.any().optional(), // File upload simulation
});

export default function RegisterPartnerPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof partnerSchema>>({
    resolver: zodResolver(partnerSchema)
  });

  const onSubmit = (data: z.infer<typeof partnerSchema>) => {
    console.log("Registrando Partner KYC:", data);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto text-pink-500 mb-4">
          <Store className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white">Alta de Negocio (Partner)</h2>
        <p className="text-sm text-yellow-500/80 mt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Verificación KYC Requerida
        </p>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm flex gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0 text-orange-400" />
        <p>Para garantizar la seguridad de la red Coli, requerimos documentación oficial. Sus datos están encriptados.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Nombre Comercial / Razón Social</label>
          <input
            {...register("businessName")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          />
          {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">RFC / Tax ID</label>
          <input
            {...register("taxId")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white uppercase focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          />
          {errors.taxId && <p className="text-red-400 text-xs mt-1">{errors.taxId.message}</p>}
        </div>

        <div>
           <label className="block text-sm font-medium text-muted-foreground mb-1">Comprobante de Domicilio / Dirección</label>
          <input
            {...register("address")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          />
          {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
        </div>

        <div>
           <label className="block text-sm font-medium text-muted-foreground mb-1">CLABE Interbancaria (Para dispersión de pagos)</label>
          <input
            {...register("clabe")}
            type="number"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all appearance-none"
          />
          {errors.clabe && <p className="text-red-400 text-xs mt-1">{errors.clabe.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Fotos del Establecimiento (Min. 3)</label>
          <div className="w-full h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-white/10 hover:border-pink-500/50 transition-all">
             <UploadCloud className="w-8 h-8 mb-2" />
             <span className="text-sm">Haz clic para subir o arrastra los archivos</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-4 bg-gradient-coli text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all mt-8"
        >
          Enviar Solicitud KYC
        </button>
      </form>
    </motion.div>
  );
}
