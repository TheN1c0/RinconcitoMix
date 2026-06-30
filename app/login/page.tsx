"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Capturar errores que envíe NextAuth en la URL (ej. ?error=CredentialsSignin)
  const urlError = searchParams.get("error");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    urlError === "CredentialsSignin" 
      ? "Credenciales incorrectas. Verifica tu email y contraseña." 
      : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      // Iniciar sesión con Credentials
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        redirect: false, // para manejar la respuesta manualmente en el cliente
      });

      if (result?.error) {
        setError("Credenciales incorrectas. Por favor intenta de nuevo.");
        setLoading(false);
      } else {
        // Redirigir al Dashboard en caso de éxito
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error inesperado al intentar iniciar sesión.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-md bg-surface-container-lowest border border-surface-container-high rounded-3xl p-8 shadow-[0_12px_40px_rgb(7,69,115,0.06)] space-y-6">
        
        {/* Brand/Title */}
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-black text-primary tracking-tight">
            Rinconcito Mix
          </Link>
          <h1 className="font-headline-md text-xl text-on-surface">
            Acceso al Panel Admin
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant">
            Ingresa tus credenciales para administrar la tienda
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-2xl border border-error/20 flex items-start gap-2 text-xs">
            <span className="material-symbols-outlined text-lg flex-shrink-0">warning</span>
            <span className="font-semibold leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="font-label-md text-xs text-on-surface block mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rinconcitomix.cl"
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="font-label-md text-xs text-on-surface block mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-label-md py-4 rounded-full shadow-[0_4px_12px_rgb(7,69,115,0.2)] hover:opacity-95 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:bg-surface-container disabled:text-outline disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-on-primary"></div>
                <span>Ingresando...</span>
              </>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-primary font-semibold hover:underline flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Volver a la Tienda
          </Link>
        </div>

      </div>
    </main>
  );
}
