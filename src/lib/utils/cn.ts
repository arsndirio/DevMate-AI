/**
 * src/lib/utils/cn.ts
 * Utility untuk menggabungkan class names.
 * Tidak menggunakan clsx/tailwind-merge agar tidak menambah dependency yang belum disetujui.
 */

/**
 * Menggabungkan array string class menjadi satu string,
 * mengabaikan nilai falsy (null, undefined, false, "").
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
