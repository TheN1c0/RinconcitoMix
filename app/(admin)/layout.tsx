"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}

function AdminLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-surface-container-low flex items-center justify-center font-['Plus_Jakarta_Sans']">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si no está autenticado o no es ADMIN, la página se mantendrá en blanco o cargando hasta que el middleware redirija
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-surface-container-low flex items-center justify-center font-['Plus_Jakarta_Sans']">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const navItems = [
    {
      name: "Resumen Dashboard",
      path: "/dashboard",
      icon: "dashboard",
    },
    {
      name: "Administrar Productos",
      path: "/dashboard/productos",
      icon: "inventory_2",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col md:flex-row font-['Plus_Jakarta_Sans'] text-on-surface">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-surface-container-high flex flex-col">
        {/* Brand */}
        <div className="h-20 border-b border-surface-container-high flex items-center px-6 gap-2">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
          <span className="text-xl font-black text-primary tracking-tight">Rinconcito Admin</span>
        </div>

        {/* User Info */}
        {session?.user && (
          <div className="px-6 py-4 border-b border-surface-container-high bg-surface-container-low/30">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Conectado como</p>
            <p className="text-sm font-extrabold text-on-surface mt-1 truncate">{session.user.name || "Administrador"}</p>
            <p className="text-xs text-outline truncate">{session.user.email}</p>
          </div>
        )}

        {/* Links */}
        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-md scale-[1.02]"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-surface-container-high space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-lg">storefront</span>
            <span>Volver a la Tienda</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-error hover:bg-error-container/20 transition-colors text-left"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow flex flex-col min-h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-20 bg-surface-container-lowest border-b border-surface-container-high flex items-center justify-between px-6 md:px-8">
          <div>
            <h2 className="font-headline-sm text-lg font-bold text-primary">
              {pathname === "/dashboard" ? "Resumen" : pathname.startsWith("/dashboard/productos") ? "Gestión de Productos" : "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-outline">
            <span>Rinconcito Mix MVP v0.2</span>
          </div>
        </header>

        {/* View Port */}
        <div className="flex-grow p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
