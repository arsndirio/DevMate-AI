# DevMate AI

> AI coding assistant berbasis Google Gemini untuk membantu developer Indonesia memahami error, menganalisis kode, dan menemukan solusi teknis.

---

## Status Proyek

**Fase saat ini: Foundation (Tahap 0 — Selesai)**

Fondasi proyek telah disiapkan. Implementasi fitur produk belum dimulai.
Lihat [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) untuk roadmap lengkap.

---

## Prasyarat

Pastikan kamu sudah menginstall:

| Tool | Versi Minimum | Versi yang Digunakan |
|------|---------------|----------------------|
| Node.js | 20.x | 24.x |
| npm | 10.x | 11.x |
| Git | 2.x | 2.42.x |

---

## Setup

### 1. Clone repository

```bash
git clone https://github.com/<username>/DevMate-AI.git
cd DevMate-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Konfigurasi environment

```bash
cp .env.example .env.local
```

Buka `.env.local` dan isi nilai yang diperlukan:

```env
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-2.0-flash
```

> **Dapatkan API key gratis di:** https://aistudio.google.com/

### 4. Jalankan development server

```bash
npm run dev
```

Buka http://localhost:3000 di browser.

---

## NPM Scripts

| Script | Perintah | Deskripsi |
|--------|----------|-----------|
| Development | `npm run dev` | Jalankan dev server |
| Build | `npm run build` | Build production |
| Start | `npm run start` | Jalankan production build |
| Type Check | `npm run typecheck` | Periksa TypeScript errors |
| Lint | `npm run lint` | Jalankan ESLint |
| Test | `npm run test` | Jalankan unit tests |
| Test Watch | `npm run test:watch` | Test dengan watch mode |
| Coverage | `npm run test:coverage` | Generate coverage report |

---

## Struktur Proyek

```
DevMate-AI/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Halaman utama
│   │   └── globals.css         # Global styles & design tokens
│   ├── components/
│   │   ├── ui/                 # Komponen UI reusable
│   │   ├── chat/               # Komponen domain chat
│   │   └── layout/             # Komponen layout
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── gemini/             # Integrasi Gemini API (SERVER ONLY)
│   │   ├── storage/            # Abstraksi localStorage
│   │   └── utils/              # Utility functions
│   ├── types/                  # TypeScript types
│   ├── validations/            # Zod schemas
│   └── test/                   # Test setup
├── docs/                       # Dokumentasi proyek
│   ├── PROJECT_BLUEPRINT.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── TECH_DECISIONS.md
│   └── QUALITY_CHECKLIST.md
├── AGENTS.md                   # Panduan untuk AI coding agent
├── .env.example                # Template environment variables
└── README.md                   # File ini
```

---

## Stack Teknologi

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| Framework | Next.js (App Router) | ^16.4.1 |
| UI | React | ^19.3.1 |
| Bahasa | TypeScript (strict) | ^7.0.2 |
| Styling | Tailwind CSS v4 | ^4.3.3 |
| AI SDK | @google/genai | ^2.30.0 |
| Validasi | Zod | ^4.6.7 |
| Markdown | react-markdown | ^10.1.0 |
| Highlighting | react-syntax-highlighter | ^16.1.2 |
| Testing | Vitest | ^5.0.5 |
| Linting | ESLint | ^9.0.0 |

---

## Kontribusi

Proyek ini menggunakan panduan engineering yang ketat. Baca [`AGENTS.md`](AGENTS.md) sebelum berkontribusi.

---

## Keamanan

- **Jangan pernah commit** file `.env.local` atau API key
- `GEMINI_API_KEY` hanya diakses di server — tidak pernah di klien
- Lihat `docs/TECH_DECISIONS.md` TD-003 untuk detail keamanan Gemini SDK

---

## Lisensi

MIT License — Lihat [LICENSE](LICENSE) untuk detail.