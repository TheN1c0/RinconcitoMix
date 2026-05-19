import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-slate-950 w-full py-12 border-t mt-auto border-t-stone-200 dark:border-slate-800">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-xl font-bold text-blue-800 dark:text-blue-400">
          Rinconcito Mix
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end font-['Plus_Jakarta_Sans'] text-sm text-stone-500 dark:text-slate-400">
          <Link className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors hover:opacity-80 duration-200" href="/legal/privacidad">Política de Privacidad</Link>
          <Link className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors hover:opacity-80 duration-200" href="/legal/envio">Envíos</Link>
          <Link className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors hover:opacity-80 duration-200" href="/legal/terminos">Términos y Condiciones</Link>
          <Link className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors hover:opacity-80 duration-200" href="/contacto">Contacto</Link>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 mt-8 font-['Plus_Jakarta_Sans'] text-sm text-stone-500 dark:text-slate-400">
        © {new Date().getFullYear()} Rinconcito Mix. Hecho con amor para mascotas y personas.
      </div>
    </footer>
  );
}
