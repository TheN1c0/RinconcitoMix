import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-surface-container-low overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-md py-xl lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 flex flex-col gap-6">
            <span className="inline-flex items-center px-4 py-2 bg-secondary-fixed rounded-full text-on-secondary-fixed-variant font-label-md w-max">Plaquitas Personalizadas</span>
            <h1 className="font-headline-lg text-primary text-5xl lg:text-6xl leading-tight">Los mejores accesorios para tu mejor amigo</h1>
            <p className="font-body-lg text-on-surface-variant max-w-lg">Descubre nuestras plaquitas personalizadas, collares coloridos y accesorios únicos diseñados para consentir a tus mascotas.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/catalogo" className="bg-primary text-on-primary font-label-md px-8 py-4 rounded-full shadow-[0_8px_16px_rgb(7,69,115,0.15)] hover:opacity-90 transition-opacity">Comprar Ahora</Link>
              <Link href="/catalogo" className="bg-secondary-fixed text-on-secondary-fixed-variant font-label-md px-8 py-4 rounded-full hover:bg-secondary-fixed-dim transition-colors">Explorar Categorías</Link>
            </div>
          </div>
          <div className="relative z-10 h-[400px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgb(7,69,115,0.08)] border-4 border-surface-container-lowest">
            <img alt="Hero Image" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0ugPG1Z7WTvfvyA8amNMzy-1RvzCQppvdQM8Ux85TkU9IqfmsAcPmEgt1f72zK6cdTj-D2bGe5i8P1j6O8ld8eSdKDMVX0-lc1ejsY5u4Ywxz0I3C7t3aPfjVnpYnLQBh8KEU7zTdBnvRk4I0bPTC-4SOHhK9dOt7kNmpd-AH2w2hWRypsgoUBPUnE6PdU4VxU2vIhkfR5kYI7KCuYwCP9a91-ubIKiqXc2ZQy7K82Xq7ECmb4r4_0DnYUmPil1dTbvgRvGbSDdTJw" />
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-fixed-dim/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tertiary-fixed-dim/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-md py-xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-md text-primary mb-2">Categorías</h2>
            <p className="font-body-md text-on-surface-variant">Encuentra exactamente lo que tu peludo necesita.</p>
          </div>
          <Link href="/catalogo" className="font-label-md text-secondary hover:underline hidden sm:block">Ver todo</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-auto md:h-[300px]">
          <Link href="/catalogo?category=plaquitas" className="relative group rounded-3xl overflow-hidden shadow-[0_8px_24px_rgb(7,69,115,0.06)] bg-surface-container-lowest flex flex-col border border-surface-container-high hover:shadow-[0_12px_32px_rgb(7,69,115,0.12)] transition-shadow duration-300 min-h-[250px]">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
            <img alt="Plaquitas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 object-left-top" src="https://lh3.googleusercontent.com/aida/ADBb0uhoaDFjWXAeZmpKOCB74p6bZ-mlFv3Q5e7WSHKMaTXVLPR8dsgLOZPK9gcoWum5o9s8__hJofT3yWPEEyOaGisrCM-uxwD9lwGLogC3Bm_YaEIBcTFW9fNYmO9mz5eQ_hZaVwRYKbcfmf3eLWFjY1wavHxr8-mU9zwHOHEYXEPMYv7I7OsTbd47DF6cOiIneo8P0i0fXh5UcUnrEu8syeDiSnnoGPO44KGj0QEndkTpSBeyFpjYLihGAzdVfvd61dcyjtQjfj1a6F4" />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
              <h3 className="font-headline-md text-on-primary mb-2">Plaquitas</h3>
            </div>
          </Link>
          <Link href="/catalogo?category=collares" className="relative group rounded-3xl overflow-hidden shadow-[0_8px_24px_rgb(7,69,115,0.06)] bg-surface-container-lowest border border-surface-container-high hover:shadow-[0_12px_32px_rgb(7,69,115,0.12)] transition-shadow duration-300 min-h-[250px]">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent z-10"></div>
            <img alt="Collares" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 object-center" src="https://lh3.googleusercontent.com/aida/ADBb0uhoaDFjWXAeZmpKOCB74p6bZ-mlFv3Q5e7WSHKMaTXVLPR8dsgLOZPK9gcoWum5o9s8__hJofT3yWPEEyOaGisrCM-uxwD9lwGLogC3Bm_YaEIBcTFW9fNYmO9mz5eQ_hZaVwRYKbcfmf3eLWFjY1wavHxr8-mU9zwHOHEYXEPMYv7I7OsTbd47DF6cOiIneo8P0i0fXh5UcUnrEu8syeDiSnnoGPO44KGj0QEndkTpSBeyFpjYLihGAzdVfvd61dcyjtQjfj1a6F4" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="font-headline-sm text-on-primary mb-1">Collares</h3>
            </div>
          </Link>
          <Link href="/catalogo?category=pins" className="relative group rounded-3xl overflow-hidden shadow-[0_8px_24px_rgb(7,69,115,0.06)] bg-surface-container-lowest border border-surface-container-high hover:shadow-[0_12px_32px_rgb(7,69,115,0.12)] transition-shadow duration-300 min-h-[250px]">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent z-10"></div>
            <img alt="Pins" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 object-right-top" src="https://lh3.googleusercontent.com/aida/ADBb0uhoaDFjWXAeZmpKOCB74p6bZ-mlFv3Q5e7WSHKMaTXVLPR8dsgLOZPK9gcoWum5o9s8__hJofT3yWPEEyOaGisrCM-uxwD9lwGLogC3Bm_YaEIBcTFW9fNYmO9mz5eQ_hZaVwRYKbcfmf3eLWFjY1wavHxr8-mU9zwHOHEYXEPMYv7I7OsTbd47DF6cOiIneo8P0i0fXh5UcUnrEu8syeDiSnnoGPO44KGj0QEndkTpSBeyFpjYLihGAzdVfvd61dcyjtQjfj1a6F4" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="font-headline-sm text-on-primary mb-1">Pins</h3>
            </div>
          </Link>
          <Link href="/catalogo?category=comederos" className="relative group rounded-3xl overflow-hidden shadow-[0_8px_24px_rgb(7,69,115,0.06)] bg-surface-container-lowest border border-surface-container-high hover:shadow-[0_12px_32px_rgb(7,69,115,0.12)] transition-shadow duration-300 min-h-[250px]">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent z-10"></div>
            <img alt="Comederos" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 object-bottom" src="https://lh3.googleusercontent.com/aida/ADBb0uhoaDFjWXAeZmpKOCB74p6bZ-mlFv3Q5e7WSHKMaTXVLPR8dsgLOZPK9gcoWum5o9s8__hJofT3yWPEEyOaGisrCM-uxwD9lwGLogC3Bm_YaEIBcTFW9fNYmO9mz5eQ_hZaVwRYKbcfmf3eLWFjY1wavHxr8-mU9zwHOHEYXEPMYv7I7OsTbd47DF6cOiIneo8P0i0fXh5UcUnrEu8syeDiSnnoGPO44KGj0QEndkTpSBeyFpjYLihGAzdVfvd61dcyjtQjfj1a6F4" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="font-headline-sm text-on-primary mb-1">Comederos</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-container py-xl">
        <div className="max-w-[1200px] mx-auto px-6 md:px-md">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-primary mb-4">Productos Destacados</h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">Selecciones favoritas amadas por mascotas y dueños.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* We will map over database products later, for now keeping the static UI exactly as the HTML */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_12px_rgb(7,69,115,0.04)] border border-surface-container-high group hover:shadow-[0_12px_24px_rgb(7,69,115,0.08)] transition-all duration-300">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-surface-container-low">
                <img alt="Plaquita Hueso" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 object-left-top" src="https://lh3.googleusercontent.com/aida/ADBb0uhoaDFjWXAeZmpKOCB74p6bZ-mlFv3Q5e7WSHKMaTXVLPR8dsgLOZPK9gcoWum5o9s8__hJofT3yWPEEyOaGisrCM-uxwD9lwGLogC3Bm_YaEIBcTFW9fNYmO9mz5eQ_hZaVwRYKbcfmf3eLWFjY1wavHxr8-mU9zwHOHEYXEPMYv7I7OsTbd47DF6cOiIneo8P0i0fXh5UcUnrEu8syeDiSnnoGPO44KGj0QEndkTpSBeyFpjYLihGAzdVfvd61dcyjtQjfj1a6F4" />
                <button className="absolute top-3 right-3 p-2 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full text-outline hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
                </button>
              </div>
              <div className="space-y-1">
                <span className="font-label-md text-secondary text-xs uppercase tracking-wider">Plaquitas</span>
                <h3 className="font-headline-sm text-on-surface line-clamp-1">Plaquita Hueso</h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-headline-sm text-primary">$4,990</span>
                  <button className="p-2 bg-primary-fixed text-primary rounded-full hover:bg-primary-fixed-dim transition-colors">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_12px_rgb(7,69,115,0.04)] border border-surface-container-high group hover:shadow-[0_12px_24px_rgb(7,69,115,0.08)] transition-all duration-300">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-surface-container-low">
                <div className="absolute top-3 left-3 bg-error-container text-on-error-container text-xs font-bold px-2 py-1 rounded-md z-10">Oferta</div>
                <img alt="Collar de Cuero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 object-center" src="https://lh3.googleusercontent.com/aida/ADBb0uhoaDFjWXAeZmpKOCB74p6bZ-mlFv3Q5e7WSHKMaTXVLPR8dsgLOZPK9gcoWum5o9s8__hJofT3yWPEEyOaGisrCM-uxwD9lwGLogC3Bm_YaEIBcTFW9fNYmO9mz5eQ_hZaVwRYKbcfmf3eLWFjY1wavHxr8-mU9zwHOHEYXEPMYv7I7OsTbd47DF6cOiIneo8P0i0fXh5UcUnrEu8syeDiSnnoGPO44KGj0QEndkTpSBeyFpjYLihGAzdVfvd61dcyjtQjfj1a6F4" />
                <button className="absolute top-3 right-3 p-2 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full text-outline hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
                </button>
              </div>
              <div className="space-y-1">
                <span className="font-label-md text-secondary text-xs uppercase tracking-wider">Collares</span>
                <h3 className="font-headline-sm text-on-surface line-clamp-1">Collar de Cuero Genuino</h3>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-primary">$12,990</span>
                    <span className="font-body-md text-outline line-through text-sm">$15,990</span>
                  </div>
                  <button className="p-2 bg-primary-fixed text-primary rounded-full hover:bg-primary-fixed-dim transition-colors">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div className="mt-12 text-center">
            <Link href="/catalogo" className="bg-surface-container-lowest text-primary font-label-md px-8 py-4 rounded-full border border-primary/20 shadow-sm hover:bg-surface-container-low transition-colors inline-flex items-center gap-2">
              Ver Todos los Productos
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-md py-xl">
        <div className="bg-secondary-fixed rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-5xl text-primary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <h2 className="font-headline-md text-primary mb-6">&quot;La mejor calidad para mi perrito. ¡La plaquita quedó hermosa y el collar es súper suave! ¡Nos encanta!&quot;</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
                <img alt="Customer" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuzc2IPF_9xlsDlg_sHb7Bqxq5MviJuYaKgfHa5pnXKVGpsQymgTJjG6V-Odlf4_hcXlaG598IekCgr2jKWHv25jmtnKq8zTKJqtKm-BP8bNrf8zBezEgAoOpgguoitIV7nK95HXGrRJBq4Beg6Zq1iZj-mMWb-8pebFuQOVMluHco3op1_PZ8eU-0T7B9YqonummSHRZNubVqAAjaRw7KO5GiobrBUsd7S5eKX15DjXb2XBEz4ocUxRC_oqD7L0s22JbI6Kl24uRS" />
              </div>
              <div className="text-left">
                <p className="font-label-md text-on-secondary-fixed-variant">Sarah & Bella</p>
                <p className="font-body-md text-secondary text-sm">Compradores Verificados</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
        </div>
      </section>
    </>
  );
}
