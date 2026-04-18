"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, MapPin, Sparkles, Navigation } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { MOCK_BUSINESSES, Business } from "@/lib/mock-data";
import { BusinessCard } from "@/components/ui/BusinessCard";

const ITEMS_PER_PAGE = 6;

export default function PublicIndex() {
  const [displayedItems, setDisplayedItems] = useState<Business[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  // Initial load
  useEffect(() => {
    setDisplayedItems(MOCK_BUSINESSES.slice(0, ITEMS_PER_PAGE));
  }, []);

  // Load more on scroll
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
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden bg-background text-foreground pb-24">
      {/* Sticky CTA (Action Bar) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
        <div className="glass-panel pointer-events-auto px-6 py-3 rounded-full flex items-center gap-4 bg-black/40 border-pink-500/20 shadow-[0_0_20px_rgba(228,0,124,0.15)]">
          <span className="text-sm font-medium text-white hidden sm:block">Descubre lugares asombrosos</span>
          <Link 
            href="/register" 
            className="px-4 py-1.5 bg-gradient-coli text-white text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-transform"
          >
            Regístrate para obtener beneficios
          </Link>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-pink-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40rem] h-[40rem] bg-purple-700/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen fixed" />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-16 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium border border-pink-500/30 text-pink-300">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>La ciudad en tu bolsillo</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Descubre lo auténtico <br />
            con <span className="text-gradient">Coli</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Recomendaciones hiper-locales, experiencias únicas de turismo y comisiones por invitar a tus amigos. Todo impulsado por conexiones reales.
          </p>
        </motion.div>
      </main>

      {/* Infinite Scroll Grid */}
      <section className="w-full max-w-7xl px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BusinessCard business={business} />
            </motion.div>
          ))}
        </div>
        
        {/* Intersection Observer target */}
        <div ref={ref} className="w-full flex justify-center py-12">
          {hasMore && (
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}