import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-stone-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(43,93,140,0.08)]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-20">
        <div className="flex items-center gap-4">
          <Link className="text-2xl font-extrabold tracking-tight text-blue-800 dark:text-blue-400" href="/">Rinconcito Mix</Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-['Plus_Jakarta_Sans'] text-sm font-medium tracking-tight">
          <Link className="text-blue-800 dark:text-blue-300 font-bold border-b-2 border-blue-800 dark:border-blue-300 pb-1" href="/">Home</Link>
          <Link className="text-stone-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" href="/catalogo">Accesorios</Link>
          <Link className="text-stone-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" href="/catalogo?category=plaquitas">Plaquitas</Link>
        </nav>
        <div className="flex items-center gap-4 text-blue-800 dark:text-blue-400">
          <button className="p-2 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 ease-in-out flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </button>
          <button className="p-2 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 ease-in-out flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
          </button>
          <Link href="/login" className="p-2 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 ease-in-out flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
