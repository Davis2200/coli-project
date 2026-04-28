"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MOCK_BUSINESSES, Business } from "@/src/lib/mock-data";
import { BusinessCard } from "@/src/components/ui/BusinessCard";
import Image from "next/image";

const ITEMS_PER_PAGE = 6;

export default function PublicIndex() {
  const [displayedItems, setDisplayedItems] = useState<Business[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    setDisplayedItems(MOCK_BUSINESSES.slice(0, ITEMS_PER_PAGE));
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      const nextItems = MOCK_BUSINESSES.slice(
        page * ITEMS_PER_PAGE,
        (page + 1) * ITEMS_PER_PAGE
      );

      if (nextItems.length > 0) {
        setDisplayedItems((prev) => [...prev, ...nextItems]);
        setPage((prev) => prev + 1);
      }

      if (displayedItems.length + nextItems.length >= MOCK_BUSINESSES.length) {
        setHasMore(false);
      }
    }
  }, [inView, hasMore, page, displayedItems.length]);

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden bg-slate-50 text-slate-900 pb-24">

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-24 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 flex flex-col items-center"
        >
          {/* Logo Principal con Estilo */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[40px] overflow-hidden shadow-2xl shadow-indigo-600/20 border-4 border-white transform hover:rotate-3 transition-transform duration-500">
            <Image
              src="/coli-logo.jpeg"
              alt="Coli Logo"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-slate-900">
              EXPLORA LO <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-rose-500 to-indigo-600 bg-[length:200%_auto] animate-gradient">
                AUTÉNTICO
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
              Descubre rincones mágicos y apoya la economía local con experiencias únicas elegidas para ti.
            </p>
          </div>

          {/* BOTÓN CENTRADO CÁLIDO */}
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-center bg-indigo-600 px-12 py-6 rounded-[32px] text-xl font-bold text-white shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10">Descubre lugares asombrosos ¡Regístrate!</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        </motion.div>
      </main>

      {/* Grid de Negocios */}
      <section className="w-full max-w-screen-xl mx-auto px-6 z-10">
        <div className="flex items-center gap-6 mb-16 px-4">
          <div className="h-px flex-1 bg-slate-200" />
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Lugares destacados</h2>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayedItems.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
            >
              <Link href={`/lugares/${business.id}`} className="block group">
                <BusinessCard business={business} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Indicador de carga */}
        <div ref={ref} className="w-full flex justify-center py-32">
          {hasMore && (
            <div className="flex gap-3">
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}