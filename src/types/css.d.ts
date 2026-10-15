// src/types/css.d.ts
// Deklarasi type untuk CSS imports agar TypeScript tidak error.
// Next.js App Router menangani CSS imports secara native.
declare module "*.css" {
  const styles: { readonly [key: string]: string };
  export default styles;
}
