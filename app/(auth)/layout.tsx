import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background subtleties */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-[10%] w-[40%] h-[40%] bg-rose-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="mb-8 flex justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-all bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
        
        <div className="glass-panel rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-indigo-900/[0.05]">
          {children}
        </div>
      </div>
    </div>
  );
}
