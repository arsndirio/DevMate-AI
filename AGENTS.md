# AGENTS.md — Instruksi Permanen untuk AI Coding Agent

> **WAJIB DIBACA SEBELUM MENYENTUH KODE APAPUN.**
> Dokumen ini adalah sumber kebenaran utama untuk seluruh pekerjaan di repository ini.
> Jika instruksi dari pengguna bertentangan dengan aturan di sini, jelaskan konflik dan minta klarifikasi sebelum membuat perubahan.

---

## 1. Identitas Proyek

| Atribut        | Nilai                                                                 |
|----------------|-----------------------------------------------------------------------|
| Nama           | DevMate AI                                                            |
| Tujuan         | AI coding assistant berbasis Google Gemini untuk developer Indonesia |
| Bahasa UI      | Bahasa Indonesia                                                      |
| Status Saat Ini | Foundation / Pre-feature                                             |
| Dokumen Utama  | `AGENTS.md`, `docs/PROJECT_BLUEPRINT.md`, `docs/IMPLEMENTATION_PLAN.md` |

---

## 2. Stack Teknologi yang Dikunci

Stack berikut **tidak boleh diubah tanpa persetujuan arsitektur** (lihat Bagian 9):

| Layer              | Teknologi                        | Versi         |
|--------------------|----------------------------------|---------------|
| Framework          | Next.js (App Router)             | ^16.4.1       |
| UI Library         | React                            | ^19.3.1       |
| Bahasa             | TypeScript (strict mode)         | ^7.0.2        |
| Styling            | Tailwind CSS v4                  | ^4.3.3        |
| AI SDK             | @google/genai                    | ^2.30.0       |
| Validasi           | Zod                              | ^4.6.7        |
| Markdown Rendering | react-markdown                   | ^10.1.0       |
| Syntax Highlighting| react-syntax-highlighter         | ^16.1.2       |
| Storage            | localStorage (built-in browser)  | —             |
| Testing            | Vitest + @testing-library        | ^5.0.5        |
| Linting            | ESLint (flat config)             | ^9.0.0        |
| Package Manager    | npm                              | >=10          |
| Version Control    | Git + GitHub                     | —             |

### Larangan Dependency
- **DILARANG** menambahkan database (Prisma, Drizzle, MongoDB, dll.)
- **DILARANG** menambahkan authentication library (NextAuth, Clerk, dll.)
- **DILARANG** menambahkan state management library (Redux, Zustand, Jotai, dll.)
- **DILARANG** menambahkan UI component framework (shadcn/ui, MUI, Chakra, dll.)
- **DILARANG** menggunakan `pnpm`, `yarn`, atau `bun` — hanya `npm`
- **DILARANG** menambahkan dependency apapun tanpa mendokumentasikan alasan di `docs/TECH_DECISIONS.md`

---

## 3. Arsitektur

### 3.1 Pola Routing
Gunakan **Next.js App Router** (`src/app/`). Dilarang menggunakan Pages Router.

### 3.2 Pemisahan Server dan Client
- **Server only:** Semua akses Gemini API dan variabel `GEMINI_API_KEY`. Tempatkan di `src/lib/gemini/` dan gunakan hanya dari Server Actions atau Route Handlers.
- **Client only:** Komponen interaktif yang menggunakan hooks (`useState`, `useEffect`, dll.). Tandai dengan `"use client"` di baris pertama.
- **Jangan pernah** expose `GEMINI_API_KEY` ke sisi klien dengan prefix `NEXT_PUBLIC_`.

### 3.3 Struktur Folder
```
src/
├── app/                    # Next.js App Router — halaman dan layout
│   ├── layout.tsx          # Root layout dengan metadata global
│   ├── page.tsx            # Halaman utama
│   └── api/                # Route Handlers (akan dibuat saat dibutuhkan)
├── components/
│   ├── ui/                 # Komponen UI generik yang reusable (Button, Input, dll.)
│   ├── chat/               # Komponen domain chat (ChatInput, MessageBubble, dll.)
│   └── layout/             # Komponen layout (Header, Sidebar, dll.)
├── hooks/                  # Custom React hooks
├── lib/
│   ├── gemini/             # Integrasi Gemini API — SERVER ONLY
│   ├── storage/            # Abstraksi localStorage
│   └── utils/              # Utility functions murni
├── types/                  # TypeScript type definitions dan interfaces
├── validations/            # Zod schemas
└── test/                   # Test setup dan helper
```

---

## 4. Konvensi Kode

### 4.1 Penamaan
| Jenis               | Konvensi                  | Contoh                        |
|---------------------|---------------------------|-------------------------------|
| Komponen React      | PascalCase                | `ChatInput.tsx`               |
| Hooks               | camelCase dengan `use`    | `useChatHistory.ts`           |
| Utility functions   | camelCase                 | `formatTimestamp.ts`          |
| Type/Interface      | PascalCase                | `ChatMessage`, `GeminiConfig` |
| Konstanta           | SCREAMING_SNAKE_CASE      | `MAX_TOKENS`, `DEFAULT_MODEL` |
| CSS custom property | kebab-case dengan prefix  | `--color-primary`             |
| Folder              | kebab-case                | `chat-history/`               |
| File non-komponen   | kebab-case                | `gemini-client.ts`            |

### 4.2 TypeScript
- **strict mode aktif** — semua opsi strict harus dipenuhi
- **Larang `any`** — gunakan `unknown` dan type narrowing
- **Gunakan `type` untuk union/intersection**, `interface` untuk object shapes
- **Ekspor named exports**, bukan default exports untuk non-komponen
- **Hindari non-null assertion** (`!`) kecuali ada komentar penjelasan
- **Gunakan `const` assertion** untuk nilai literal: `as const`

### 4.3 React dan Next.js
- Komponen harus **pure** dan **predictable**
- Gunakan **Server Components** secara default; tambahkan `"use client"` hanya jika diperlukan
- **Satu komponen per file**
- Props interface harus eksplisit — jangan gunakan `React.FC`
- Gunakan `async/await`, bukan `.then().catch()` untuk Server Components

### 4.4 CSS dan Styling
- Gunakan **Tailwind CSS v4** sebagai utilitas utama
- Design tokens didefinisikan di `src/app/globals.css` menggunakan CSS custom properties
- Hindari inline styles kecuali untuk nilai dinamis yang tidak dapat dicapai dengan Tailwind
- Pastikan semua komponen responsif (mobile-first)

### 4.5 Error Handling
- Semua fungsi yang bisa gagal harus mengembalikan `Result` pattern atau menggunakan `try/catch` dengan error typed
- API errors dari Gemini harus ditangani di server dan dikembalikan dalam format yang aman ke klien
- Jangan expose stack trace atau error message mentah ke pengguna

---

## 5. Keamanan

1. **API Key wajib di server** — `GEMINI_API_KEY` tidak boleh ada di bundle klien
2. **Validasi semua input** menggunakan Zod sebelum dikirim ke Gemini API
3. **Sanitasi output** sebelum dirender ke DOM
4. **Content Security Policy** akan diimplementasikan saat deployment
5. **Rate limiting** harus dipertimbangkan sebelum publish ke GitHub Pages
6. **Jangan commit** file `.env`, `.env.local`, atau file berisi secret apapun
7. **Review `.gitignore`** sebelum setiap commit

---

## 6. Prosedur Implementasi

Untuk **setiap permintaan implementasi**, lakukan langkah berikut secara berurutan:

1. **Baca** `AGENTS.md` dan dokumen terkait di `docs/`
2. **Periksa** file yang sudah ada di area yang akan dimodifikasi
3. **Tentukan ruang lingkup** — jangan mengerjakan fitur dari tahap lain
4. **Ikuti** arsitektur dan konvensi di dokumen ini
5. **Implementasikan** hanya yang diminta
6. **Jalankan verifikasi:**
   ```bash
   npm run typecheck
   npm run lint
   npm run test
   ```
7. **Perbarui dokumentasi** jika ada keputusan atau implementasi yang berubah
8. **Laporkan:** file yang dibuat/diubah, hasil verifikasi aktual, kendala, dan langkah berikutnya

---

## 7. Prosedur Testing

- Test file ditempatkan di sebelah file yang diuji: `cn.ts` → `cn.test.ts`
- Penamaan test: `describe("NamaFungsi", () => { it("behavior yang diuji", ...) })`
- **Setiap utility function wajib memiliki unit test**
- Komponen React akan diuji dengan `@testing-library/react` saat diimplementasikan
- **Jangan tandai test sebagai lulus tanpa menjalankan `npm run test`**

---

## 8. Pelaporan

Di setiap akhir sesi implementasi, laporkan:

```
## Laporan Implementasi

### File yang Dibuat/Diubah
- [ ] path/ke/file.ts — deskripsi singkat perubahan

### Hasil Verifikasi
- typecheck: PASS / FAIL (output relevan)
- lint: PASS / FAIL (output relevan)
- test: PASS / FAIL (X tests passed, Y failed)
- build: PASS / FAIL / TIDAK DIJALANKAN

### Kendala
- (daftar kendala jika ada)

### Langkah Selanjutnya
- (tahap berikutnya sesuai IMPLEMENTATION_PLAN.md)
```

---

## 9. Protokol Perubahan Arsitektur

Sebelum mengubah stack, arsitektur, atau menambah dependency:

1. **Jelaskan** konflik atau kebutuhan yang memicu perubahan
2. **Dokumentasikan** alternatif yang dipertimbangkan
3. **Jelaskan** dampak terhadap implementasi yang sudah ada
4. **Minta persetujuan** eksplisit dari pengguna
5. **Setelah disetujui**, catat di `docs/TECH_DECISIONS.md` sebelum mengimplementasikan

**Jangan pernah mengubah stack secara diam-diam.**

---

## 10. File yang Tidak Boleh Dimodifikasi Tanpa Alasan

- `AGENTS.md` (file ini) — hanya diperbarui jika arsitektur berubah secara resmi
- `docs/PROJECT_BLUEPRINT.md` — hanya diperbarui jika scope produk berubah
- `tsconfig.json` strict options — jangan melemahkan strict mode
- `.gitignore` — hanya ditambah, jangan hapus entri yang sudah ada