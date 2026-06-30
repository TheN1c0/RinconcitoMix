import { getProducts, getCategories } from "@/lib/services/product.service";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogFilters } from "@/components/shop/CatalogFilters";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === "string" ? resolvedParams.category : undefined;
  const minPrice = typeof resolvedParams.minPrice === "string" && !isNaN(Number(resolvedParams.minPrice)) ? Number(resolvedParams.minPrice) : undefined;
  const maxPrice = typeof resolvedParams.maxPrice === "string" && !isNaN(Number(resolvedParams.maxPrice)) ? Number(resolvedParams.maxPrice) : undefined;
  const inStock = resolvedParams.inStock === "true";
  const search = typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;

  const [products, categories] = await Promise.all([
    getProducts({
      category,
      minPrice,
      maxPrice,
      inStock,
      search,
    }),
    getCategories()
  ]);

  return (
    <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 md:px-md py-lg flex flex-col gap-lg">
      {/* Page Header & Global Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-surface-container-highest pb-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Catálogo de Productos</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Todo lo que tu compañero necesita.</p>
        </div>
        <form method="GET" action="/catalogo" className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            name="search"
            defaultValue={search || ""}
            className="w-full bg-surface-container-low border border-outline-variant rounded-full py-sm pl-xl pr-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-surface transition-colors placeholder:text-outline" 
            placeholder="Buscar accesorios..." 
            type="text" 
          />
          {category && <input type="hidden" name="category" value={category} />}
          {minPrice && <input type="hidden" name="minPrice" value={minPrice} />}
          {maxPrice && <input type="hidden" name="maxPrice" value={maxPrice} />}
          {inStock && <input type="hidden" name="inStock" value="true" />}
        </form>
      </div>
      
      <div className="flex flex-col md:flex-row gap-lg">
        {/* Sidebar Filters */}
        <CatalogFilters categories={categories} />
        
        {/* Product Grid */}
        <div className="flex-grow">
          {products.length === 0 ? (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-surface-container-highest">
              <span className="material-symbols-outlined text-4xl text-outline mb-2" style={{ fontVariationSettings: "'FILL' 0" }}>search_off</span>
              <h2 className="font-headline-sm text-on-surface mb-2">No encontramos productos</h2>
              <p className="font-body-md text-on-surface-variant">Prueba ajustando los filtros o buscando otra cosa.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
