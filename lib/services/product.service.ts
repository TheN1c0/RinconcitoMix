import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export async function getProducts(filters: ProductFilters) {
  const where: Prisma.ProductWhereInput = {};

  if (filters.category && filters.category !== "all") {
    where.category = {
      slug: filters.category,
    };
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) {
      where.price.gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      where.price.lte = filters.maxPrice;
    }
  }

  if (filters.inStock) {
    where.stock = {
      gt: 0,
    };
  }

  if (filters.search) {
    where.name = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
    },
  });

  if (!product) return null;

  return {
    ...product,
    price: Number(product.price),
    variants: product.variants.map((v) => ({
      ...v,
      price: v.price ? Number(v.price) : null,
    })),
  };
}
