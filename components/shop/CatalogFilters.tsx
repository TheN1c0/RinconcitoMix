"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Category } from "@prisma/client";

export function CatalogFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentInStock = searchParams.get("inStock") === "true";

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  useEffect(() => {
    setMinPrice(currentMinPrice);
    setMaxPrice(currentMaxPrice);
  }, [currentMinPrice, currentMaxPrice]);

  const updateFilters = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "" || value === "all" || value === "false") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      router.push(`/catalogo?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handlePriceBlur = () => {
    if (minPrice !== currentMinPrice) updateFilters("minPrice", minPrice);
    if (maxPrice !== currentMaxPrice) updateFilters("maxPrice", maxPrice);
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePriceBlur();
    }
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-md">
      <div className="bg-surface-container-low rounded-xl p-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Categorías</h2>
        <div className="flex flex-wrap gap-xs">
          <button
            onClick={() => updateFilters("category", "all")}
            className={`font-label-md text-label-md px-sm py-[6px] rounded-full transition-colors ${
              currentCategory === "all"
                ? "bg-secondary-container text-on-secondary-container hover:opacity-90"
                : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container-highest"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters("category", cat.slug)}
              className={`font-label-md text-label-md px-sm py-[6px] rounded-full transition-colors ${
                currentCategory === cat.slug
                  ? "bg-secondary-container text-on-secondary-container hover:opacity-90"
                  : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container-highest"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-low rounded-xl p-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Rango de Precio</h2>
        <div className="flex items-center gap-sm">
          <div className="flex-1">
            <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Min</label>
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={handlePriceBlur}
              onKeyDown={handlePriceKeyDown}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-sm py-xs font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="$0"
              type="number"
            />
          </div>
          <div className="text-outline-variant mt-sm">-</div>
          <div className="flex-1">
            <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Max</label>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={handlePriceBlur}
              onKeyDown={handlePriceKeyDown}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-sm py-xs font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="$100000"
              type="number"
            />
          </div>
        </div>
      </div>
      <div className="bg-surface-container-low rounded-xl p-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Disponibilidad</h2>
        <div className="space-y-sm">
          <label className="flex items-center gap-sm cursor-pointer group" onClick={() => updateFilters("inStock", currentInStock ? "false" : "true")}>
            <div className={`w-5 h-5 rounded-DEFAULT border flex items-center justify-center transition-colors ${currentInStock ? "bg-primary border-primary" : "bg-surface-container-lowest border-outline group-hover:border-primary"}`}>
              {currentInStock && <span className="material-symbols-outlined text-[16px] text-on-primary">check</span>}
            </div>
            <span className="font-body-md text-body-md text-on-surface">En Stock</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
