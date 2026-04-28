export default function ReferidosPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-orange-500 rounded-[40px] p-10 text-white shadow-2xl shadow-orange-200 relative overflow-hidden">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">Tu Red de Aventuras</h1>
        <p className="font-bold opacity-90 italic">Has recomendado 12 lugares este mes.</p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/20">
            <p className="text-3xl font-black">24</p>
            <p className="text-xs uppercase font-bold">Invitados</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/20">
            <p className="text-3xl font-black">$450</p>
            <p className="text-xs uppercase font-bold">Ganancia Est. (MXN)</p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-black text-slate-800 uppercase mb-4">Recomendaciones Recientes</h2>
        {/* Aquí mapearías las recomendaciones del Dashboard */}
      </section>
    </main>
  );
}