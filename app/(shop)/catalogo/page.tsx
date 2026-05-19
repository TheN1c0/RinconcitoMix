import Link from 'next/link';

export default function CatalogoPage() {
  return (
    <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 md:px-md py-lg flex flex-col gap-lg">
      {/* Page Header & Global Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-surface-container-highest pb-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Catálogo de Productos</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Todo lo que tu compañero necesita.</p>
        </div>
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-low border border-outline-variant rounded-full py-sm pl-xl pr-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-surface transition-colors placeholder:text-outline" placeholder="Buscar accesorios..." type="text" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-lg">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-md">
          <div className="bg-surface-container-low rounded-xl p-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Categorías</h2>
            <div className="flex flex-wrap gap-xs">
              <button className="bg-secondary-container text-on-secondary-container font-label-md text-label-md px-sm py-[6px] rounded-full hover:opacity-90 transition-opacity">Todos</button>
              <button className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant font-label-md text-label-md px-sm py-[6px] rounded-full hover:bg-surface-container-highest transition-colors">Collares</button>
              <button className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant font-label-md text-label-md px-sm py-[6px] rounded-full hover:bg-surface-container-highest transition-colors">Plaquitas</button>
              <button className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant font-label-md text-label-md px-sm py-[6px] rounded-full hover:bg-surface-container-highest transition-colors">Comederos</button>
              <button className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant font-label-md text-label-md px-sm py-[6px] rounded-full hover:bg-surface-container-highest transition-colors">Pins</button>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Rango de Precio</h2>
            <div className="flex items-center gap-sm">
              <div className="flex-1">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Min</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-sm py-xs font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary" placeholder="$0" type="number" />
              </div>
              <div className="text-outline-variant mt-sm">-</div>
              <div className="flex-1">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Max</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-sm py-xs font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary" placeholder="$100000" type="number" />
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Disponibilidad</h2>
            <div className="space-y-sm">
              <label className="flex items-center gap-sm cursor-pointer group">
                <div className="w-5 h-5 rounded-DEFAULT border border-outline group-hover:border-primary flex items-center justify-center bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-[16px] text-surface-container-lowest group-hover:text-surface-container-lowest">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">En Stock</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer group">
                <div className="w-5 h-5 rounded-DEFAULT border border-outline group-hover:border-primary flex items-center justify-center bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-[16px] text-surface-container-lowest group-hover:text-surface-container-lowest">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">En Oferta</span>
              </label>
            </div>
          </div>
        </aside>
        {/* Product Grid */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Static Product Cards for now, matching the UI from HTML */}
          <article className="bg-surface-container-lowest rounded-xl flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 relative shadow-sm border border-surface-container-highest">
            <div className="absolute top-sm right-sm z-10 bg-error-container text-on-error-container font-label-md text-label-md px-sm py-xs rounded-full flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Poco Stock
            </div>
            <div className="aspect-square bg-surface-container-low relative overflow-hidden">
              <img alt="Correa de algodón trenzado" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1dcR0CcU__qPFZZUCKpye9XIBsED1wSP3aHPpSjsSFOeiHdBkO1CbIZkDKII72qgF7wAf0GD4cVOpVyE_jMXxi69-pXlIcPIAyu22n84oqrxJ1iLhD23DdaR_VPqMWc84aU4R3i1j1AXjC_J5yorYH7Rxcd6Ui-1Ge2gj0iRu_lAH7cMtN9EwsEQWy59Jk_84a6Bf5bC73jq_OBdzpW14I-kti40Wui9RMrEByguVzL5-JKXihJtltmxpqZ2ZGgoN0jOtNmx3l_rM" />
            </div>
            <div className="p-md flex flex-col flex-grow">
              <span className="font-label-md text-label-md text-secondary mb-xs">Correas</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm line-clamp-2">Correa de Algodón Pastel</h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary">$28,000</span>
                <button aria-label="Add to cart" className="bg-primary text-on-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_shopping_cart</span>
                </button>
              </div>
            </div>
          </article>

          <article className="bg-surface-container-lowest rounded-xl flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 relative shadow-sm border border-surface-container-highest">
            <div className="aspect-square bg-surface-container-low relative overflow-hidden">
              <img alt="Plato de cerámica terracota" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_aBlGId9S6Hm4WgAkMOks4p-Xs7LjfeGHNU0aen9yBMrOye_DXBxcLsnG2POh3CGOG9hVh4MQIj5wr_q1Vm19_ZP8JqGsJ3UdWuel4VWM5bBiWRR18fl-JUMiprAdARL1v2xmBoL8ziGlvrQe8IHGUnMRUn0eRpy93Jd1JA990oPK1Eu-wt2ZwscDC184wguyOLd4aJSIlRHI-FDRFkh1vEr1rkC9vxSJQUm1wKJEPhbBZH31DBxjQdUNP_jaAzZXujnNqd6E856e" />
            </div>
            <div className="p-md flex flex-col flex-grow">
              <span className="font-label-md text-label-md text-secondary mb-xs">Comederos</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm line-clamp-2">Plato de Cerámica Terracota</h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary">$34,000</span>
                <button aria-label="Add to cart" className="bg-primary text-on-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_shopping_cart</span>
                </button>
              </div>
            </div>
          </article>
          
          <article className="bg-surface-container-lowest rounded-xl flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 relative shadow-sm border border-surface-container-highest">
            <div className="aspect-square bg-surface-container-low relative overflow-hidden">
              <img alt="Collar de cuero" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGxj_ptMlQTAxbchjpPxO11Rp-IEwOF1Tr9Za9HBVAknEmKRU04W_bX0X8_gTINaG90XYsKa87gRQZOThAfHxDIJwfr_IvONUoANIokD7CcwlvBv4cd50uCfFDzNEVl7ez_4qw8qM6iPRHlR8etm45vuyLp9DQrHq4fpB--a42ZH6FEWwMXmjlOutoH6DSaegkO4mV6ViS5BKzvu9WUsC1wJQJXJEv6UfruYWgsJczdGvRrOAcp_FiFTez3RH6bsQoBJSjTsOlOaIa" />
            </div>
            <div className="p-md flex flex-col flex-grow">
              <span className="font-label-md text-label-md text-secondary mb-xs">Collares</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm line-clamp-2">Collar de Cuero Clásico</h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary">$22,000</span>
                <button aria-label="Add to cart" className="bg-primary text-on-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_shopping_cart</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
