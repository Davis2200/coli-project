import { Star, Share2, CheckCircle, MapPin, Navigation } from 'lucide-react';

export default async function FichaTecnica({ params }: { params: Promise<{ id: string }> }) {
  // En Next.js 15 app router, params es Promesa
  const { id } = await params;
  
  return (
    <div className="pb-28">
      {/* Cabecera / Foto */}
      <div className="w-full h-72 bg-gray-300 relative rounded-b-3xl overflow-hidden shadow-lg">
        <div className="w-full h-full bg-slate-400 flex items-center justify-center text-slate-500">
          [Image Placeholder]
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h1 className="text-3xl font-bold">Tour Gastronómico Local</h1>
          <div className="flex items-center gap-2 mt-1">
            <Star className="text-yellow-400" size={18} fill="currentColor" />
            <span className="font-semibold">4.8</span>
            <span className="text-sm text-gray-200">(124 reseñas)</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-8">
        {/* Precios e Info Básica */}
        <div className="flex justify-between items-center p-5 glass-panel rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--primary))]/5 rounded-bl-full -z-10"></div>
          <div>
            <p className="text-gray-400 line-through text-sm font-medium">$1,200 MXN</p>
            <p className="text-3xl font-extrabold text-[hsl(var(--secondary))]">$1,080 <span className="text-lg">MXN</span></p>
            <div className="inline-block mt-1 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-bold px-2 py-1 rounded-full">
              -10% Descuento Coli
            </div>
          </div>
          <div className="text-right flex flex-col gap-1 text-sm text-gray-600 font-medium">
            <span className="flex items-center justify-end gap-1"><Navigation size={14}/> 4 Horas</span>
            <span className="flex items-center justify-end gap-1">👥 Máx. 10</span>
            <span className="text-green-600 flex items-center justify-end gap-1 mt-1">
              <CheckCircle size={14}/> Seguro
            </span>
          </div>
        </div>

        {/* Tarjeta de Descripción */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            Sobre la experiencia
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Descubre los sabores ocultos de la ciudad guiado por expertos locales. Una experiencia inolvidable que apoya a los pequeños comerciantes. Ideal para sumergirse en la cultura.
          </p>
        </div>

        {/* Qué Incluye */}
        <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-[hsl(var(--secondary))]/10 rounded-full"></div>
          <h3 className="font-bold text-[hsl(var(--secondary))] mb-4 text-lg">¿Qué incluye?</h3>
          <ul className="space-y-3 text-sm text-gray-700 font-medium font-sans">
            <li className="flex items-center gap-3">
              <span className="p-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"><CheckCircle size={16}/></span> 
              Degustación en 4 paradas
            </li>
            <li className="flex items-center gap-3">
              <span className="p-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"><CheckCircle size={16}/></span> 
              Bebidas tradicionales
            </li>
            <li className="flex items-center gap-3">
              <span className="p-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"><CheckCircle size={16}/></span> 
              Guía certificado nativo
            </li>
          </ul>
        </div>

        {/* Similares (Scroll Infinito Placeholder) */}
        <div className="pt-2">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Experiencias Similares</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
            {/* Componentes BusinessCard iterados aquí */}
            <div className="min-w-[280px] h-48 bg-slate-100 rounded-2xl snap-center flex items-center justify-center text-slate-400 font-medium shadow-sm border border-slate-200">
               Card Similar 1
            </div>
            <div className="min-w-[280px] h-48 bg-slate-100 rounded-2xl snap-center flex items-center justify-center text-slate-400 font-medium shadow-sm border border-slate-200">
               Card Similar 2
            </div>
          </div>
        </div>
      </div>

      {/* Barra de acción fija inferior */}
      <div className="fixed bottom-0 left-0 w-full glass-panel border-t border-white/50 p-4 flex gap-4 z-40">
        <button className="flex-1 bg-white border-2 border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-50 active:scale-95 transition-all shadow-sm">
          <Share2 size={20} />
          Recomendar
        </button>
        <button className="flex-1 bg-gradient-coli text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl active:scale-95 transition-all">
          Reservar 
        </button>
      </div>
    </div>
  );
}
