import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CustomData {
  petName?: string;
  phone?: string;
  additionalInfo?: string;
}

export interface CartItem {
  id: string; // único para cada producto + variante + personalización
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  price: number; // precio unitario final para esta combinación
  quantity: number;
  variantId?: string;
  variantName?: string;
  customData?: CustomData;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        const { productId, variantId, customData } = item;
        
        // Generar un ID único basado en producto, variante y campos de personalización
        const customKey = customData
          ? `${customData.petName || ""}-${customData.phone || ""}-${customData.additionalInfo || ""}`
          : "";
        const id = `${productId}-${variantId || "default"}-${customKey}`;

        const items = get().items;
        const existingItemIndex = items.findIndex((i) => i.id === id);

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({
            items: [...items, { ...item, id, quantity }],
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "rinconcito-mix-cart", // clave para localStorage
    }
  )
);

interface CartDrawerState {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartDrawer = create<CartDrawerState>((set) => ({
  isOpen: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
}));
