"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, AlertCircle, Sparkles, Info, Clock } from "lucide-react";
import { MOCK_NOTIFICATIONS, ColiNotification } from "@/src/lib/mock-data";

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  role: string;
}

const getIcon = (type: ColiNotification['type']) => {
  switch (type) {
    case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
    case 'alert': return <AlertCircle size={16} className="text-rose-500" />;
    case 'promo': return <Sparkles size={16} className="text-amber-500" />;
    default: return <Info size={16} className="text-blue-500" />;
  }
};

export function NotificationsDropdown({ isOpen, onClose, role }: NotificationsDropdownProps) {
  const notifications = MOCK_NOTIFICATIONS[role] || [];
  const isDark = role === 'business';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, x: role === 'business' ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`absolute top-full mt-4 right-0 w-80 sm:w-96 ${isDark ? 'bg-slate-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-100 text-slate-900'
              } backdrop-blur-xl border rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden`}
          >
            <div className={`p-6 border-b ${isDark ? 'border-white/5' : 'border-slate-50'} flex justify-between items-center`}>
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Bell size={16} className={isDark ? 'text-rose-500' : 'text-indigo-500'} /> Notificaciones
              </h3>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                {notifications.length} Nuevas
              </span>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                <div className="divide-y divide-transparent">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      whileHover={{ x: 5 }}
                      className={`p-5 flex gap-4 cursor-pointer transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                        } ${!notif.read ? (isDark ? 'bg-white/[0.02]' : 'bg-indigo-50/30') : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5' : 'bg-slate-100'
                        }`}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm font-bold leading-tight">{notif.title}</p>
                          <span className={`text-[9px] font-medium flex items-center gap-1 opacity-50 whitespace-nowrap`}>
                            <Clock size={10} /> {notif.time}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {notif.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center space-y-3">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto opacity-50">
                    <Bell size={24} className="text-slate-400" />
                  </div>
                  <p className="text-xs font-medium text-slate-400">No tienes notificaciones por ahora</p>
                </div>
              )}
            </div>

            <div className={`p-4 text-center border-t ${isDark ? 'border-white/5' : 'border-slate-50'}`}>
              <button className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-rose-500' : 'text-indigo-500'
                } hover:opacity-70 transition-opacity`}>
                Marcar todas como leídas
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
