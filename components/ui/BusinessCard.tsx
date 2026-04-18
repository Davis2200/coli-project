"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Business } from "@/lib/mock-data";

export function BusinessCard({ business }: { business: Business }) {
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case "Restaurante": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Tour": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Hotel": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Evento": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="glass-panel group relative flex flex-col rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
      <Link href={`/business/${business.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Ver detalles de {business.name}</span>
      </Link>
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getCategoryColor(business.category)}`}>
          {business.category}
        </span>
      </div>

      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={business.image_url} 
          alt={business.name} 
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90" />
      </div>

      <div className="relative -mt-12 p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 z-20">
          <h3 className="text-xl font-bold text-white leading-tight pr-2 group-hover:text-pink-400 transition-colors">
            {business.name}
          </h3>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-white">{business.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 z-20">
          {business.description}
        </p>

        <div className="mt-auto flex items-end justify-between z-20">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through">
              ${business.base_price} MXN
            </span>
            <span className="text-lg font-black text-purple-400">
              ${business.discount_price} <span className="text-xs font-normal">MXN</span>
            </span>
          </div>

          <Link href="/login" className="relative z-30 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(228,0,124,0.4)]">
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
