"use client";

import { use, useState } from "react";
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile, ShieldCheck, CheckCheck, User, Zap, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MOCK_BUSINESSES } from "@/src/lib/mock-data";

const CONTACTS = [
  { id: 1, name: "David Explorador", status: "En línea", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", lastMsg: "¿Cómo va la campaña del restaurante?", time: "10:30 AM", unread: 1, type: "afiliado" },
  { id: 2, name: "Soporte Colibrí", status: "ú. vez 5 min", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Support", lastMsg: "Tu cuenta ha sido verificada.", time: "9:45 AM", unread: 0, type: "system" },
  { id: 3, name: "Sofia Viajes", status: "En línea", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", lastMsg: "Acabo de enviar 3 clientes nuevos.", time: "Ayer", unread: 0, type: "afiliado" },
  { id: 4, name: "Admin Finanzas", status: "Ausente", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin", lastMsg: "Reporte de ingresos listo.", time: "Ayer", unread: 0, type: "system" },
];

export default function BusinessChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const business = MOCK_BUSINESSES.find(b => b.id === id) || MOCK_BUSINESSES[0];

  const [selectedChat, setSelectedChat] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola David, vi que las conversiones subieron hoy.", side: "right", time: "10:25 AM" },
    { id: 2, text: "¿Cómo va la campaña del restaurante? Los clientes están muy contentos.", side: "left", time: "10:30 AM" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      side: "right" as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl h-[800px] bg-white rounded-[48px] shadow-2xl shadow-rose-900/10 border border-slate-100 flex overflow-hidden ring-1 ring-slate-100"
      >
        {/* Sidebar de Contactos */}
        <div className="w-80 lg:w-96 border-r border-slate-50 flex flex-col bg-slate-50/50">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-600/20">
                <Store size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Mensajería</h2>
                <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest leading-none">{business.name}</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar afiliados o soporte..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500/50 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-8">
            {CONTACTS.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedChat(contact)}
                className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all ${selectedChat.id === contact.id
                    ? "bg-white shadow-xl shadow-rose-900/5 border border-slate-100"
                    : "hover:bg-white/50"
                  }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-sm">
                    <Image src={contact.avatar} alt={contact.name} fill className="object-cover" />
                  </div>
                  {contact.status === "En línea" && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-sm font-black text-slate-900 truncate">{contact.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">{contact.time}</span>
                  </div>
                  <p className={`text-xs truncate ${contact.unread > 0 ? "text-slate-900 font-bold" : "text-slate-400 font-medium"}`}>
                    {contact.lastMsg}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-slate-100 bg-rose-50/30">
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <div className="w-8 h-8 bg-rose-600 rounded-xl flex items-center justify-center text-white">
                <ShieldCheck size={16} />
              </div>
              <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Canal de Negocio</span>
            </div>
          </div>
        </div>

        {/* Ventana de Chat */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header del Chat */}
          <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                <Image src={selectedChat.avatar} alt={selectedChat.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">{selectedChat.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${selectedChat.status === "En línea" ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span className="text-xs font-bold text-slate-400">{selectedChat.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                <Phone size={20} />
              </button>
              <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                <Video size={20} />
              </button>
              <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/20">
            <div className="text-center">
              <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                Hoy, 20 de Abril
              </span>
            </div>

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.side === "right" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] space-y-2 ${msg.side === "right" ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`p-5 rounded-[28px] text-sm font-medium shadow-sm transition-all ${msg.side === "right"
                      ? "bg-rose-600 text-white rounded-br-none shadow-rose-600/20"
                      : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                    }`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] font-bold text-slate-300">{msg.time}</span>
                    {msg.side === "right" && <CheckCheck size={12} className="text-rose-500" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input de Mensaje */}
          <div className="p-8 bg-white border-t border-slate-50">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4 bg-slate-50/50 p-2 rounded-[32px] border border-slate-100 focus-within:border-rose-500/50 focus-within:ring-4 focus-within:ring-rose-500/10 transition-all">
              <button type="button" className="p-4 hover:bg-white rounded-2xl text-slate-400 transition-colors">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Discute nuevas promociones con David..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-900 placeholder:text-slate-300"
              />
              <button type="button" className="p-4 hover:bg-white rounded-2xl text-slate-400 transition-colors">
                <Smile size={20} />
              </button>
              <button
                type="submit"
                className="bg-rose-600 text-white p-4 rounded-2xl shadow-xl shadow-rose-600/20 hover:bg-rose-700 hover:scale-[1.05] active:scale-95 transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
