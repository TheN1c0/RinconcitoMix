"use server";

import { prisma } from "@/lib/prisma";
import { uploadImageLocal } from "@/lib/upload";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

// Tipo de entrada para variantes
interface VariantInput {
  name: string;
  price?: number;
  stock: number;
}

/**
 * Crea un nuevo producto y sus variantes
 */
export async function createProduct(formData: FormData, variants: VariantInput[]) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const categoryId = formData.get("categoryId") as string;
    const isCustom = formData.get("isCustom") === "true";

    if (!name || isNaN(price)) {
      return { success: false, error: "El nombre y el precio base son obligatorios." };
    }

    // Generar slug único
    let slug = slugify(name, { lower: true, strict: true });
    
    // Verificar colisión de slug
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Procesar imágenes cargadas
    const images: string[] = [];
    const imageFiles = formData.getAll("images") as File[];
    
    for (const file of imageFiles) {
      if (file && file.size > 0 && file.name !== "undefined") {
        const url = await uploadImageLocal(file);
        images.push(url);
      }
    }

    // Si no se subió ninguna imagen, usar una por defecto
    if (images.length === 0) {
      images.push("/placeholder-pet.png");
    }

    // Crear el producto en la base de datos
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || null,
        price,
        stock,
        images,
        isCustom,
        categoryId: categoryId || null,
        variants: {
          create: variants.map(v => ({
            name: v.name,
            price: v.price !== undefined && v.price !== null ? v.price : null,
            stock: v.stock
          }))
        }
      }
    });

    revalidatePath("/");
    revalidatePath("/catalogo");

    return { success: true, product };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}

/**
 * Modifica un producto existente
 */
export async function updateProduct(
  id: string,
  formData: FormData,
  variants: VariantInput[],
  existingImages: string[]
) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const categoryId = formData.get("categoryId") as string;
    const isCustom = formData.get("isCustom") === "true";

    if (!name || isNaN(price)) {
      return { success: false, error: "El nombre y el precio base son obligatorios." };
    }

    // Buscar el producto actual
    const currentProduct = await prisma.product.findUnique({ where: { id } });
    if (!currentProduct) {
      return { success: false, error: "El producto no existe." };
    }

    // Generar slug si cambió el nombre
    let slug = currentProduct.slug;
    if (name !== currentProduct.name) {
      slug = slugify(name, { lower: true, strict: true });
      const existing = await prisma.product.findUnique({ where: { slug, NOT: { id } } });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    // Procesar nuevas imágenes cargadas
    const newImages: string[] = [];
    const imageFiles = formData.getAll("images") as File[];
    
    for (const file of imageFiles) {
      if (file && file.size > 0 && file.name !== "undefined") {
        const url = await uploadImageLocal(file);
        newImages.push(url);
      }
    }

    // Combinar imágenes existentes que el usuario no borró + las nuevas cargadas
    const finalImages = [...existingImages, ...newImages];
    if (finalImages.length === 0) {
      finalImages.push("/placeholder-pet.png");
    }

    // Usar una transacción para actualizar producto y recrear variantes de forma segura
    await prisma.$transaction(async (tx) => {
      // 1. Eliminar variantes viejas
      await tx.productVariant.deleteMany({
        where: { productId: id }
      });

      // 2. Actualizar datos del producto y añadir nuevas variantes
      await tx.product.update({
        where: { id },
        data: {
          name,
          slug,
          description: description || null,
          price,
          stock,
          images: finalImages,
          isCustom,
          categoryId: categoryId || null,
          variants: {
            create: variants.map(v => ({
              name: v.name,
              price: v.price !== undefined && v.price !== null ? v.price : null,
              stock: v.stock
            }))
          }
        }
      });
    });

    revalidatePath("/");
    revalidatePath("/catalogo");
    revalidatePath(`/producto/${slug}`);

    return { success: true };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}

/**
 * Elimina un producto por ID
 */
export async function deleteProduct(id: string) {
  try {
    // Al tener onDelete: Cascade configurado en schema.prisma, las variantes se eliminan solas.
    // Si no está, las eliminamos manualmente
    await prisma.productVariant.deleteMany({
      where: { productId: id }
    });

    const deleted = await prisma.product.delete({
      where: { id }
    });

    revalidatePath("/");
    revalidatePath("/catalogo");

    return { success: true, slug: deleted.slug };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { success: false, error: error?.message || "Ocurrió un error al eliminar el producto." };
  }
}
