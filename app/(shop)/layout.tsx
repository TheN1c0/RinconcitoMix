import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
