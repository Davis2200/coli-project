"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star, Navigation } from "lucide-react";

// Corregir iconos de Leaflet que a veces no cargan en Next.js
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export function MapaFavoritos() {
    // Coordenadas centrales de CDMX
    const center: [number, number] = [19.4326, -99.1332];

    // Datos de ejemplo para visualizar en el mapa
    const puntosFavoritos = [
        { id: 1, pos: [19.4352, -99.1412], nombre: "Terraza Bellas Artes", rating: 4.9 },
        { id: 2, pos: [19.4406, -99.2047], nombre: "Museo Soumaya", rating: 4.8 },
    ];

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-full z-0"
                zoomControl={false} // Lo quitamos para ponerlo en una mejor posición
            >
                {/* Capa de diseño del mapa (Estilo claro/limpio) */}
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {puntosFavoritos.map((punto) => (
                    <Marker key={punto.id} position={punto.pos as [number, number]} icon={customIcon}>
                        <Popup className="custom-popup">
                            <div className="p-1">
                                <h3 className="font-bold text-slate-900">{punto.nombre}</h3>
                                <div className="flex items-center gap-1 text-indigo-600 font-bold text-xs mt-1">
                                    <Star size={12} className="fill-indigo-600" /> {punto.rating}
                                </div>
                                <button className="mt-2 w-full bg-slate-900 text-white text-[10px] py-2 rounded-lg flex items-center justify-center gap-2 font-black uppercase tracking-wider">
                                    <Navigation size={10} /> Trazar Ruta
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <ZoomControl position="bottomright" />
            </MapContainer>

            {/* Estilos CSS inyectados para personalizar los Popups de Leaflet */}
            <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 1.5rem; /* Siguiendo tu --radius de globals.css */
          padding: 8px;
          border: 1px solid #e2e8f0;
        }
        .leaflet-popup-tip {
          display: none;
        }
      `}</style>
        </div>
    );
}