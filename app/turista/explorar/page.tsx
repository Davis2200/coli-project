"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MOCK_BUSINESSES, Business } from "@/lib/mock-data";
import { BusinessCard } from "@/components/ui/BusinessCard";

const ITEMS_PER_PAGE = 6;

export default function ExplorarPage() {
  const [displayedItems, setDisplayedItems] = useState<Business[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({ threshold: 0, rootMargin: "200px" });

  useEffect(() => {
    setDisplayedItems(MOCK_BUSINESSES.slice(0, ITEMS_PER_PAGE));
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      const nextItems = MOCK_BUSINESSES.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
      if (nextItems.length > 0) {
        setDisplayedItems((prev) => [...prev, ...nextItems]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    }
  }, [inView, hasMore, page]);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-slate-800">
      {/* IMPORTANTE: Aquí NO hay <nav> ni lógicas de Sidebar. 
          Todo eso ya vive en components/layout/NavbarTurista.tsx 
          inyectado por el layout.tsx principal.
      */}

      <main className="max-w-screen-xl mx-auto px-6 pt-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            ¿A dónde vamos hoy?
          </h1>
          <p className="text-slate-500 font-medium">
            Experiencias auténticas verificadas por Coli.
          </p>
        </header>

        {/* GRID DE NEGOCIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedItems.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 3) * 0.1 }}
            >
              <Link href={`/lugares/${business.id}`} className="block group">
                <BusinessCard business={business} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SENSOR PARA SCROLL INFINITO */}
        <div ref={ref} className="py-20 flex justify-center">
          {hasMore && (
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2.5 h-2.5 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}