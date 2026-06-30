import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

/**
 * Guarda un objeto File de forma local en la carpeta public/uploads.
 * Retorna la ruta accesible públicamente (ej. /uploads/12345-imagen.png).
 */
export async function uploadImageLocal(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const uploadDir = join(process.cwd(), "public", "uploads");
  
  // Asegurar que exista la carpeta public/uploads
  await mkdir(uploadDir, { recursive: true });
  
  // Limpiar el nombre del archivo de caracteres extraños
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filename = `${Date.now()}-${cleanName}`;
  const path = join(uploadDir, filename);
  
  await writeFile(path, buffer);
  
  return `/uploads/${filename}`;
}
