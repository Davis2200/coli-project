export default function ReservasPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-6 pt-12 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Mis Próximas Aventuras</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 flex h-48">
            <div className="w-1/3 bg-orange-500 relative">
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-4xl opacity-20">COLI</div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-orange-500 uppercase">Confirmada</p>
                <h3 className="text-xl font-bold text-slate-800">Restaurante La Selva</h3>
                <p className="text-sm text-slate-500">20 de Mayo • 14:00 PM</p>
              </div>
              <button className="text-sm font-bold bg-slate-100 py-2 rounded-xl hover:bg-slate-200 transition-colors">
                Ver QR de Acceso
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}