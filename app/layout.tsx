import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rinconcito Mix — Accesorios para Mascotas",
    template: "%s | Rinconcito Mix",
  },
  description:
    "Plaquitas personalizadas, collares, pins y comederos para tu mascota. Envíos a todo Santiago, Chile.",
  keywords: [
    "accesorios mascotas",
    "plaquitas personalizadas",
    "collares mascotas",
    "Santiago Chile",
    "Rinconcito Mix",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Rinconcito Mix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-sans">
        {children}
      </body>
    </html>
  );
}
