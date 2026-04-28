"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Heart, Navigation, Star, MapPin, Search } from "lucide-react";

// Importación dinámica para evitar errores de SSR con librerías de mapas
const MapaFavoritos = dynamic(
    () => import('@/src/components/maps/MapaFavoritos').then((mod) => mod.MapaFavoritos),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
                <div className="text-slate-400 font-medium">Preparando mapa...</div>
            </div>
        )
    }
);

export default function FavoritosPage() {
    // Datos de ejemplo (sustituir por tu fetch de Neo4j más adelante)
    const favoritosEjemplo = [
        { id: 1, nombre: "Terraza Bellas Artes", rating: 4.9, direccion: "Av. Juárez, Centro Histórico", categoria: "Vistas" },
        { id: 2, nombre: "Museo Soumaya", rating: 4.8, direccion: "Blvd. Miguel de Cervantes Saavedra", categoria: "Cultura" },
        { id: 3, nombre: "Taquería El Progreso", rating: 4.7, direccion: "Maestro Antonio Caso 30", categoria: "Comida" },
    ];

    return (
        <main className="relative h-[calc(100vh-72px)] w-full overflow-hidden flex bg-background">

            {/* Panel Lateral de Favoritos (Glassmorphism) */}
            <aside className="glass-panel absolute left-6 top-6 bottom-6 w-96 z-10 rounded-[32px] p-6 flex flex-col gap-6 shadow-2xl border border-white/50">

                {/* Cabecera del Panel */}
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-100 rounded-xl">
                            <Heart className="text-rose-500 fill-rose-500" size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            Favoritos
                        </h1>
                    </div>
                    <p className="text-slate-500 text-sm font-medium pl-1">
                        {favoritosEjemplo.length} lugares guardados
                    </p>
                </div>

                {/* Buscador interno rápido */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Buscar en mis favoritos..."
                        className="w-full bg-white/50 border border-slate-200 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>

                {/* Lista Scrollable */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {favoritosEjemplo.map((lugar) => (
                        <div
                            key={lugar.id}
                            className="p-4 rounded-2xl bg-white/60 border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                        >
                            {/* Indicador lateral de color (Púrpura Colibrí) */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
                                        {lugar.categoria}
                                    </span>
                                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                        {lugar.nombre}
                                    </h3>
                                </div>
                                <span className="flex items-center gap-1 text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg border border-indigo-100">
                                    <Star size={10} className="fill-indigo-600" /> {lugar.rating}
                                </span>
                            </div>

                            <div className="flex items-center gap-1 text-slate-500 mt-2">
                                <MapPin size={12} />
                                <p className="text-[11px] font-medium truncate">{lugar.direccion}</p>
                            </div>

                            <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-indigo-600 hover:text-indigo-700 transition-colors">
                                <Navigation size={12} /> Trazar Ruta
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pie del panel / Acción rápida */}
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">
                    Exportar mi Ruta
                </button>
            </aside>

            {/* Contenedor del Mapa (Fondo completo) */}
            <div className="flex-1 w-full h-full z-0">
                <MapaFavoritos />
            </div>

            {/* Botones de control flotantes (Opcional) */}
            <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-20">
                <button className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 text-slate-600 hover:text-indigo-600 transition-all">
                    <Navigation size={24} />
                </button>
            </div>

        </main>
    );
}