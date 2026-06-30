"use client";

import Link from 'next/link';
import { useCartStore, useCartDrawer } from '@/store/cart';
import { useEffect, useState } from 'react';

export function Header() {
  const { items } = useCartStore();
  const { openDrawer } = useCartDrawer();
  const [mounted, setMounted] = useState(false);

  // Solucionar problemas de hidratación de Next.js al usar localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md fixed top-0 w-full z-45 border-b border-stone-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(43,93,140,0.08)]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-20">
        <div className="flex items-center gap-4">
          <Link className="text-2xl font-extrabold tracking-tight text-blue-800 dark:text-blue-400 font-['Plus_Jakarta_Sans']" href="/">Rinconcito Mix</Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-['Plus_Jakarta_Sans'] text-sm font-medium tracking-tight">
          <Link className="text-stone-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" href="/">Home</Link>
          <Link className="text-stone-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" href="/catalogo">Accesorios</Link>
          <Link className="text-stone-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" href="/catalogo?category=plaquitas">Plaquitas</Link>
        </nav>
        <div className="flex items-center gap-4 text-blue-800 dark:text-blue-400">
          <Link href="/catalogo" className="p-2 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 ease-in-out flex items-center justify-center">
            <span className="material-symbols-outlined font-normal" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </Link>
          <button 
            onClick={openDrawer}
            className="p-2 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 ease-in-out flex items-center justify-center relative"
          >
            <span className="material-symbols-outlined font-normal" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                {totalItems}
              </span>
            )}
          </button>
          <Link href="/login" className="p-2 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 ease-in-out flex items-center justify-center">
            <span className="material-symbols-outlined font-normal" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
