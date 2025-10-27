/**
 * Sanitizes a filename to be URL-safe and compatible with cloud storage
 * @param filename - The original filename to sanitize
 * @returns A sanitized filename with only lowercase letters, numbers, and hyphens
 *
 * @example
 * sanitizeFilename("Mi Camisa Favorita!") // "mi-camisa-favorita"
 * sanitizeFilename("Blusa   con   espacios") // "blusa-con-espacios"
 * sanitizeFilename("Vestido @#$% Especial") // "vestido-especial"
 * sanitizeFilename("Pantalón") // "pantal-n"
 * sanitizeFilename("---Test---") // "test"
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Replace any non-alphanumeric character with hyphen
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
}
