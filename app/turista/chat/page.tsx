"use client";
import { useState } from "react";
import { Search, Send, MoreVertical } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-80px)] flex bg-[#F9F8F6] p-4 gap-4">
      {/* LISTA DE CONTACTOS */}
      <aside className="w-full md:w-80 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input className="w-full bg-slate-50 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none" placeholder="Buscar chat..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex items-center gap-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-slate-50">
              <div className="w-12 h-12 rounded-full bg-slate-200" />
              <div className="flex-1">
                <p className="font-bold text-sm">Negocio {i}</p>
                <p className="text-xs text-slate-500 truncate">Hola, ¿cómo puedo ayudarte hoy?</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ÁREA DE MENSAJES */}
      <main className="hidden md:flex flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500" />
            <p className="font-black text-slate-800 uppercase">Soporte Coli</p>
          </div>
          <MoreVertical size={20} className="text-slate-400" />
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[url('/pattern.png')] bg-repeat opacity-80">
          <div className="max-w-[70%] bg-orange-100 p-4 rounded-2xl rounded-bl-none text-slate-800 font-medium">
            ¡Hola! Estamos listos para ayudarte con tu reserva.
          </div>
        </div>
        <div className="p-4 bg-white border-t border-slate-50 flex gap-2">
          <input className="flex-1 bg-slate-50 rounded-2xl px-6 py-3 focus:outline-none font-medium" placeholder="Escribe un mensaje..." />
          <button className="bg-orange-500 text-white p-4 rounded-2xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
            <Send size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}