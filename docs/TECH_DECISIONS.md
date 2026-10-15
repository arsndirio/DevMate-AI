# TECH_DECISIONS.md — Keputusan Teknologi DevMate AI

> Setiap keputusan teknologi yang signifikan harus dicatat di sini.
> Ketika ada perubahan arsitektur yang disetujui, tambahkan entri baru — jangan hapus entri lama.

---

## TD-001 — Next.js App Router sebagai Framework Utama

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan Next.js 16 dengan App Router sebagai framework web.

**Alasan:**
- App Router mendukung React Server Components secara native, memungkinkan pemisahan server/client yang bersih
- Server Actions memungkinkan akses Gemini API tanpa membuat API endpoint terpisah
- Built-in routing, image optimization, dan font optimization
- TypeScript support out of the box
- Deployment fleksibel (Vercel, self-hosted, dll.)

**Alternatif yang dipertimbangkan:**
- Vite + React SPA: Tidak ada SSR native, semua Gemini calls harus melalui API endpoint eksternal terpisah, risiko API key exposure lebih tinggi
- Remix: Ekosistem lebih kecil, tim lebih familiar dengan Next.js

**Konsekuensi:**
- Harus memahami perbedaan Server dan Client Components
- Build output lebih kompleks dari SPA biasa
- Development server Next.js diperlukan (tidak bisa buka HTML langsung)

---

## TD-002 — Tailwind CSS v4 untuk Styling

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan Tailwind CSS v4 sebagai sistem styling utama.

**Alasan:**
- Utility-first approach menghasilkan CSS yang lebih kecil (hanya class yang digunakan yang di-bundle)
- v4 menggunakan PostCSS dan tidak lagi memerlukan `tailwind.config.js` — konfigurasi via CSS
- Kompatibel dengan Next.js App Router
- Konsistensi styling di seluruh komponen

**Catatan implementasi:**
- Tailwind v4 menggunakan `@import "tailwindcss"` bukan `@tailwind base; @tailwind components;`
- Konfigurasi tema melalui CSS custom properties di `globals.css`
- Install: `@tailwindcss/postcss` sebagai dev dependency

**Alternatif yang dipertimbangkan:**
- CSS Modules: Lebih verbose, tidak ada design tokens built-in
- Styled Components: Runtime CSS-in-JS, performa lebih rendah dengan RSC
- Vanilla CSS: Kontrol penuh tapi lebih lambat untuk development

---

## TD-003 — @google/genai sebagai Gemini SDK

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan `@google/genai` versi ^2.30.0 (SDK resmi terbaru).

**Alasan:**
- SDK resmi dari Google — dokumentasi dan support terjamin
- Mendukung Gemini 2.0 dan model terbaru
- TypeScript types terintegrasi
- Mendukung streaming response untuk UX yang lebih baik

**Catatan keamanan:**
- SDK hanya boleh diinisialisasi di server (`src/lib/gemini/client.ts`)
- `GEMINI_API_KEY` hanya dibaca dari environment variable di server
- Jangan import `src/lib/gemini/` dari Client Components

**Alternatif yang dipertimbangkan:**
- `@google-cloud/aiplatform`: Untuk enterprise use, lebih kompleks
- Fetch langsung ke REST API: Lebih verbose, kehilangan type safety

---

## TD-004 — Zod untuk Validasi

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan Zod v4 untuk validasi input dan schema definition.

**Alasan:**
- TypeScript-first schema validation
- Integrasi baik dengan Server Actions dan API Routes
- Runtime validation yang aman dari input pengguna sebelum dikirim ke AI
- Pesan error yang informatif

**Scope penggunaan:**
- Validasi input chat sebelum dikirim ke Gemini API
- Validasi settings dari localStorage sebelum digunakan
- Type inference dari schema untuk konsistensi TypeScript

---

## TD-005 — react-syntax-highlighter untuk Code Highlighting

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan `react-syntax-highlighter` v16.

**Alasan:**
- Battle-tested (digunakan secara luas, termasuk di GitHub)
- Banyak tema tersedia (Prism, Highlight.js)
- Dokumentasi lengkap
- Kompatibel dengan React 19
- Mendukung 100+ bahasa programming

**Alternatif yang dipertimbangkan:**
- `shiki`: Lebih modern dan VSCode-grade quality, tapi bundle size lebih besar dan setup lebih kompleks
- `highlight.js` langsung: Tidak ada React wrapper resmi yang maintained

**Catatan implementasi:**
- Gunakan lazy loading untuk mengurangi initial bundle size
- Import tema secara spesifik, bukan seluruh library

---

## TD-006 — localStorage untuk Storage MVP

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan localStorage browser sebagai storage untuk MVP.

**Alasan:**
- Zero setup — tidak memerlukan database atau backend tambahan
- Cukup untuk use case MVP (single user, single device)
- Tidak ada biaya infrastructure
- Sesuai target deployment: aplikasi web lokal dan GitHub Pages

**Batasan yang diketahui:**
- Tidak sync antar device
- Data hilang jika user clear browser data
- Storage limit ~5-10MB per origin
- API key disimpan sebagai plaintext (user harus aware)
- Tidak ada enkripsi

**Rencana migrasi masa depan:**
- Jika diperlukan server-side storage, akan dievaluasi IndexedDB atau backend sederhana
- Keputusan ini tidak akan berubah tanpa diskusi eksplisit tentang kebutuhan yang tidak bisa dipenuhi localStorage

---

## TD-007 — Vitest untuk Testing

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan Vitest v5 untuk unit testing.

**Alasan:**
- Native Vite ecosystem — setup lebih cepat
- Kompatibel dengan Jest API (mudah migrasi)
- TypeScript support native tanpa konfigurasi tambahan
- Watch mode dan coverage terintegrasi
- Berjalan independen dari Next.js dev server

**Catatan kompatibilitas:**
- Vitest berjalan dengan Vite (bukan Next.js bundler) untuk testing
- Konfigurasi di `vitest.config.ts` terpisah dari `next.config.ts`
- Path alias `@/*` harus dikonfigurasi di kedua file

---

---

## TD-008 — @testing-library/dom dan jsdom untuk Unit Testing

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan `@testing-library/dom` dan `jsdom` sebagai environment testing DOM.

**Alasan:**
- `@testing-library/react` dan `@testing-library/jest-dom` memerlukan `@testing-library/dom` sebagai peer dependency.
- `jsdom` menyediakan simulasi browser DOM di lingkungan Node.js untuk pengujian komponen React dan browser utilities.

---

## TD-009 — Babel ESLint Parser untuk Kompatibilitas TypeScript 7.0

**Tanggal:** 2026-10-15
**Status:** Aktif

**Keputusan:** Menggunakan `@babel/eslint-parser` dengan preset TypeScript dan React sebagai parser ESLint untuk file `.ts` dan `.tsx`, sementara type-aware checking dan unused variable detection dipercayakan kepada compiler TypeScript (`tsc --noEmit` via `npm run typecheck`).

**Alasan:**
- `typescript-eslint` (termasuk yang dibundel di dalam `eslint-config-next`) secara eksplisit melempar error dan menolak berjalan pada TypeScript 7.0 (hanya mendukung TS <6.1.0 saat ini).
- Menurunkan TypeScript ke versi lama bertentangan dengan stack yang telah dikunci di `AGENTS.md` (TypeScript 7.0.2).
- `@babel/eslint-parser` mampu mem-parse syntax TypeScript 7 dan JSX/TSX modern dengan sempurna tanpa crash.
- `tsconfig.json` sudah memiliki `noUnusedLocals: true` dan `noUnusedParameters: true` serta strict mode penuh, sehingga deteksi variabel/parameter tidak terpakai ditangani lebih akurat dan type-aware oleh TypeScript compiler daripada linter regex/AST biasa.

**Rencana masa depan:**
- Evaluasi kembali adopsi `typescript-eslint` jika versi yang mendukung TypeScript >=7.0 sudah dirilis secara stabil.

---

## Template untuk Keputusan Baru

```markdown
## TD-NNN — Judul Keputusan

**Tanggal:** YYYY-MM-DD
**Status:** Aktif / Deprecated / Direvisi

**Keputusan:** (Deskripsi singkat keputusan)

**Alasan:** (Mengapa keputusan ini dibuat)

**Alternatif yang dipertimbangkan:** (Opsional)

**Konsekuensi:** (Dampak dan batasan)

**Catatan tambahan:** (Opsional)
```