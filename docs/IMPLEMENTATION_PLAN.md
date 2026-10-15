# IMPLEMENTATION_PLAN.md — Rencana Implementasi DevMate AI

> **Aturan Pelaporan Status:**
> - `Not Started` — Belum dikerjakan
> - `In Progress` — Sedang dikerjakan
> - `Blocked` — Menunggu keputusan atau dependency lain
> - `Done` — Selesai dan telah diverifikasi dengan bukti aktual
>
> **JANGAN tandai Done tanpa menjalankan verifikasi dan mencatat hasilnya.**

---

## Tahap 0 — Foundation & Engineering Standards

**Status: Done**
**Selesai:** 2026-10-15
**Tujuan:** Menyiapkan fondasi proyek, standar engineering, dan panduan permanen.

### Deliverables
- [x] Direktori proyek diperiksa dan terkonfirmasi kosong
- [x] Stack teknologi dikunci dan didokumentasikan
- [x] `package.json` dengan dependency yang kompatibel
- [x] `tsconfig.json` dengan strict mode aktif
- [x] `next.config.ts` dengan security headers dasar
- [x] `vitest.config.ts` terkonfigurasi
- [x] `eslint.config.mjs` dengan aturan TypeScript
- [x] `src/app/layout.tsx` — Root layout dengan metadata
- [x] `src/app/page.tsx` — Halaman placeholder
- [x] `src/app/globals.css` — Design tokens dasar
- [x] `src/lib/utils/cn.ts` — Utility pertama dengan unit test
- [x] `src/test/setup.ts` — Vitest setup
- [x] Struktur folder `src/` sesuai blueprint
- [x] `AGENTS.md` — Panduan permanen untuk AI agent
- [x] `docs/PROJECT_BLUEPRINT.md`
- [x] `docs/IMPLEMENTATION_PLAN.md`
- [x] `docs/TECH_DECISIONS.md`
- [x] `docs/QUALITY_CHECKLIST.md`
- [x] `.env.example` tanpa secret asli
- [x] `.gitignore` yang mengecualikan secret dan build output
- [x] `README.md` yang akurat sesuai status aktual
- [x] Git repository diinisialisasi
- [x] Initial commit dibuat

### Verifikasi Tahap 0
```bash
npm run typecheck   # PASS: 0 errors
npm run lint        # PASS: 0 errors
npm run test        # PASS: 1 file, 4 tests passed
npm run build       # PASS: Compiled successfully, 3/3 static pages generated
```

**Hasil Aktual (2026-10-15):**
- `npm run typecheck`: **PASS** (TypeScript 7.0.2 compiler memeriksa seluruh codebase tanpa error)
- `npm run lint`: **PASS** (ESLint 9 flat config + Babel parser memeriksa file `.ts` dan `.tsx` tanpa error)
- `npm run test`: **PASS** (Vitest 5.0.5 menjalankan 4 unit tests untuk `cn()` utility dalam 1.27s)
- `npm run build`: **PASS** (Next.js 16.4.1 Turbopack berhasil mengompilasi production build dan merender rute statis)

---

## Tahap 1 — Design System & Layout Dasar

**Status: Done**
**Selesai:** 2026-10-16
**Dependency:** Tahap 0 selesai
**Tujuan:** Implementasi design system lengkap dan shell layout aplikasi.

### Deliverables
- [x] Design tokens lengkap di `globals.css` (colors, spacing, typography, shadows)
- [x] `src/components/layout/Header.tsx` — Header dengan branding, badge status, & toggle
- [x] `src/components/layout/Sidebar.tsx` — Sidebar navigasi, status model, & riwayat
- [x] `src/components/ui/Button.tsx` — Komponen Button dengan variants dan typed props
- [x] `src/components/ui/Badge.tsx` — Komponen Badge status & indikator bahasa
- [x] `src/components/ui/Icon.tsx` — Set ikon SVG konsisten tanpa emoji UI
- [x] Responsive layout dasar (mobile backdrop, desktop layout)
- [x] PostCSS configuration (`postcss.config.mjs`) untuk kompilasi Tailwind v4

### Verifikasi
- `npm run typecheck`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors)
- `npm run test`: **PASS** (4 unit tests pass)
- `npm run build`: **PASS** (Turbopack static pages compiled)

---

## Tahap 2 — Chat Interface (UI Only, No AI)

**Status: Done**
**Selesai:** 2026-10-16
**Dependency:** Tahap 1 selesai
**Tujuan:** Bangun UI chat yang fungsional tanpa koneksi AI.

### Deliverables
- [x] `src/types/chat.ts` — Type definitions untuk ChatMessage, ChatConversation, AnalysisSettings
- [x] `src/lib/data/sampleConversations.ts` — Dataset realistis untuk studi kasus demo
- [x] `src/components/chat/WelcomeState.tsx` — Sapaan & 4 suggestion cards interaktif
- [x] `src/components/chat/CodeBlock.tsx` — Syntax highlighting & copy button interaktif
- [x] `src/components/chat/MessageBubble.tsx` — Markdown renderer terformat dengan badge demo
- [x] `src/components/chat/AnalysisSettingsBar.tsx` — Kontrol kustomisasi parameter analisis
- [x] `src/components/chat/ChatComposer.tsx` — Textarea multi-line, helper sisipkan kode, & tombol kirim
- [x] State management lokal pada `src/app/page.tsx`
- [x] Penanda mode demo yang jelas dan transparan (tanpa AI palsu)

### Verifikasi
- `npm run typecheck`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors)
- `npm run test`: **PASS** (4 unit tests pass)
- `npm run build`: **PASS** (Turbopack static pages compiled)

---

## Tahap 3 — Gemini API Integration

**Status: Not Started**
**Dependency:** Tahap 2 selesai
**Tujuan:** Hubungkan chat UI ke Gemini API.

### Deliverables
- [ ] `src/lib/gemini/client.ts` — Inisialisasi @google/genai SDK (server only)
- [ ] `src/lib/gemini/prompts.ts` — System prompt untuk DevMate AI
- [ ] `src/validations/chat.ts` — Zod schema untuk validasi input
- [ ] `src/app/actions/chat.ts` — Server Action untuk mengirim pesan
- [ ] Integrasi response ke ChatInterface
- [ ] Error handling untuk API failures (quota, invalid key, network)
- [ ] Loading state yang akurat

### Kriteria Selesai
- Pesan terkirim ke Gemini dan respons ditampilkan
- Error ditampilkan dengan pesan yang ramah pengguna
- API key tidak terekspos ke klien (verifikasi dengan bundle analysis)
- Input divalidasi sebelum dikirim ke AI

---

## Tahap 4 — Markdown Rendering & Syntax Highlighting

**Status: Not Started**
**Dependency:** Tahap 3 selesai
**Tujuan:** Tampilkan respons AI dengan format yang baik.

### Deliverables
- [ ] Integrasi `react-markdown` untuk rendering respons AI
- [ ] Integrasi `react-syntax-highlighter` untuk code blocks
- [ ] Pilihan tema syntax highlighting (sesuai light/dark mode)
- [ ] Copy-to-clipboard untuk code blocks
- [ ] Sanitasi HTML output

### Kriteria Selesai
- Code blocks ditampilkan dengan syntax highlighting yang sesuai bahasa
- Markdown (bold, italic, list, heading) dirender dengan benar
- Tidak ada XSS vulnerability dari output AI

---

## Tahap 5 — Persistensi localStorage

**Status: Not Started**
**Dependency:** Tahap 4 selesai
**Tujuan:** Simpan riwayat percakapan dan pengaturan.

### Deliverables
- [ ] `src/lib/storage/chat-history.ts` — CRUD untuk riwayat chat
- [ ] `src/lib/storage/settings.ts` — Simpan/baca pengaturan pengguna
- [ ] `src/hooks/useChatHistory.ts` — Hook untuk mengakses history
- [ ] `src/hooks/useSettings.ts` — Hook untuk pengaturan
- [ ] Panel pengaturan untuk input API key pengguna
- [ ] Tombol clear history

### Kriteria Selesai
- Chat history tersimpan dan terbaca setelah refresh
- Settings (API key, model) tersimpan lokal
- User mendapat peringatan bahwa API key disimpan secara lokal (plaintext)

---

## Tahap 6 — Polish & GitHub Readiness

**Status: Not Started**
**Dependency:** Tahap 5 selesai
**Tujuan:** Finalisasi untuk rilis ke GitHub.

### Deliverables
- [ ] README.md diperbarui dengan dokumentasi lengkap
- [ ] Error boundaries untuk crash recovery
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit
- [ ] Security review (tidak ada secret, tidak ada XSS)
- [ ] Build production berhasil tanpa warning
- [ ] Semua unit tests pass

---

## Catatan Penting

- **Setiap tahap harus diverifikasi** sebelum melanjutkan ke tahap berikutnya
- **Jangan skip tahap** atau menggabungkan dua tahap dalam satu sesi
- **Update status di dokumen ini** setiap kali ada perubahan