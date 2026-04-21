export default function PromocionesPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-6 pt-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-900 uppercase">Ofertas para ti</h1>
        <p className="text-slate-500">Basado en tus lugares favoritos</p>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="break-inside-avoid bg-white p-6 rounded-[35px] border-2 border-dashed border-orange-200 hover:border-orange-500 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">-20% OFF</span>
              <p className="text-2xl font-black text-slate-800">COLI2026</p>
            </div>
            <h3 className="font-bold text-lg">Cafetería Central</h3>
            <p className="text-sm text-slate-500 mb-4">Válido en consumos mayores a $300 MXN</p>
            <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-orange-400" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}