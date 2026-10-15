# PROJECT_BLUEPRINT.md — Cetak Biru Proyek DevMate AI

> **Status:** Foundation Phase — Belum ada fitur produk yang diimplementasikan.
> Dokumen ini adalah sumber kebenaran untuk scope dan arsitektur produk.

---

## 1. Tujuan dan Latar Belakang

DevMate AI adalah aplikasi web AI coding assistant yang membantu developer Indonesia:
- **Memahami error** dari pesan error yang ditampilkan IDE atau terminal
- **Menganalisis kode** untuk menemukan bug, anti-pattern, atau potensi masalah
- **Mendapatkan solusi teknis** dengan penjelasan yang jelas dalam Bahasa Indonesia
- **Belajar dari penjelasan AI** yang dikontekstualisasikan dengan kode aktual mereka

Proyek ini menggunakan **Google Gemini API** sebagai engine AI utama.

---

## 2. Target Pengguna

| Segmen | Deskripsi |
|--------|-----------|
| Primary | Developer Indonesia level junior hingga menengah |
| Secondary | Mahasiswa/pelajar yang belajar pemrograman |
| Out of scope | Enterprise teams, non-developer users |

### Use Case Utama (MVP)
1. **Analisis Error** — Pengguna paste error message → AI menjelaskan penyebab dan solusi
2. **Review Kode** — Pengguna paste code snippet → AI memberikan feedback dan saran
3. **Tanya Teknis** — Pengguna menanyakan konsep atau cara implementasi → AI menjawab dengan contoh kode

---

## 3. Stack Teknologi

Lihat `AGENTS.md` Bagian 2 untuk daftar lengkap dan aturan dependency.

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| Framework | Next.js 16 App Router | SSR native, Server Actions, API Routes dalam satu codebase |
| AI SDK | @google/genai | SDK resmi Google, mendukung Gemini 2.0 |
| Styling | Tailwind CSS v4 | Utility-first, performa tinggi, kompatibel dengan Next.js |
| Storage | localStorage | Cukup untuk MVP, tidak memerlukan backend database |
| Testing | Vitest | Kompatibel dengan Vite ecosystem, cepat, TypeScript native |

---

## 4. Arsitektur Frontend

```
Browser (Client)
    │
    ├── React Server Components (default)
    │       └── Fetch data, render HTML di server
    │
    └── React Client Components ("use client")
            └── UI interaktif: input chat, animasi, event handlers
```

### Komponen Utama (Planned — Belum Diimplementasikan)
- `ChatInterface` — Container utama percakapan
- `MessageList` — Daftar pesan dengan scroll
- `MessageBubble` — Satu pesan (user/AI) dengan markdown rendering
- `ChatInput` — Area input dengan textarea auto-resize
- `SettingsPanel` — Konfigurasi API key dan model

---

## 5. Arsitektur Backend (Server)

```
Next.js Server
    │
    ├── Server Actions (src/app/actions/)
    │       └── Endpoint untuk mengirim pesan ke Gemini
    │
    └── src/lib/gemini/
            ├── client.ts       — Inisialisasi @google/genai SDK
            ├── prompts.ts      — System prompts dan template
            └── types.ts        — Types untuk Gemini responses
```

**Prinsip utama:** `GEMINI_API_KEY` hanya dibaca di server. Tidak ada akses AI dari sisi klien.

---

## 6. Alur Komunikasi

```
User Input (Browser)
    │
    ▼
Client Component (ChatInput)
    │ Server Action call
    ▼
Server Action (src/app/actions/chat.ts)  ← BELUM DIBUAT
    │ Validasi input (Zod)
    │
    ▼
Gemini Client (src/lib/gemini/client.ts)  ← BELUM DIBUAT
    │ @google/genai SDK
    ▼
Google Gemini API (eksternal)
    │
    ▼
Response diproses di server
    │ Streaming atau non-streaming
    ▼
Client Component menerima response
    │
    ▼
react-markdown + react-syntax-highlighter render hasil
```

---

## 7. Strategi Penyimpanan Lokal

Menggunakan **localStorage** untuk:
- Riwayat percakapan (chat history) — format JSON
- Pengaturan pengguna: API key (user-provided), model preference
- UI preferences: tema warna (light/dark)

**Abstraksi:** Semua akses localStorage melalui `src/lib/storage/` agar mudah diganti di masa depan.

**Batasan:**
- Tidak sync antar device
- Data hilang jika user clear browser storage
- Tidak ada enkripsi (API key disimpan sebagai plaintext — user harus aware)

---

## 8. Batasan MVP

Fitur yang **akan** dibangun pada MVP:
- [ ] Chat interface satu percakapan
- [ ] Kirim pesan teks ke Gemini dan tampilkan respons
- [ ] Markdown rendering untuk respons AI
- [ ] Syntax highlighting untuk code block dalam respons
- [ ] Penyimpanan riwayat chat di localStorage
- [ ] Input API key oleh pengguna (disimpan lokal)
- [ ] Pilihan model Gemini dasar

---

## 9. Fitur yang Ditunda (Post-MVP)

Fitur berikut **tidak dikerjakan** sampai MVP selesai dan disetujui:
- Multi-session / multiple chat threads
- Upload file / gambar untuk dianalisis
- Ekspor percakapan ke file
- Streaming response (akan dievaluasi berdasarkan UX)
- PWA / offline support
- Authentication dan cloud sync
- Deployment ke Vercel / platform cloud
- Fitur kolaborasi