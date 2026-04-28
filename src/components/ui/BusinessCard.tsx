"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Business } from "@/src/lib/mock-data";

export function BusinessCard({
  business
}: {
  business: Business;
}) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Restaurante": return "bg-orange-100 text-orange-600 border-orange-200";
      case "Tour": return "bg-teal-100 text-teal-600 border-teal-200";
      case "Hotel": return "bg-sky-100 text-sky-600 border-sky-200";
      case "Evento": return "bg-amber-100 text-amber-600 border-amber-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div
      className="bg-white group relative flex flex-col rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 mx-auto max-w-sm sm:max-w-none w-full border border-slate-100 shadow-lg shadow-black/[0.03]"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getCategoryColor(business.category)}`}>
          {business.category}
        </span>
      </div>

      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={business.image_url}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800 leading-tight pr-2">
            {business.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-700">{business.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3 text-slate-500">
          <MapPin size={12} className="text-teal-500" />
          <span className="text-xs font-medium">Oaxaca, México</span>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-6 leading-relaxed">
          {business.description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through">
              ${business.base_price} MXN
            </span>
            <span className="text-2xl font-black text-slate-900 flex items-baseline gap-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">${business.discount_price}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">MXN</span>
            </span>
          </div>

          <div className="px-5 py-2.5 bg-teal-500 text-white rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-md shadow-teal-500/20 cursor-pointer">
            Ver lugar
          </div>
        </div>
      </div>
    </div>
  );
}

