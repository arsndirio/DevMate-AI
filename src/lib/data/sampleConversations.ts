/**
 * src/lib/data/sampleConversations.ts
 * Data contoh percakapan dan kartu saran (suggestion cards) untuk mode pratinjau UI DevMate AI.
 * CATATAN: Seluruh konten ini adalah data demo untuk validasi antarmuka pengguna
 * dan bukan hasil dari pemanggilan langsung Google Gemini API.
 */

import type { ChatConversation, SuggestionCard } from "@/types/chat";

export const SUGGESTION_CARDS: SuggestionCard[] = [
  {
    id: "sug-error-map",
    title: "Jelaskan Error Ini",
    description: "Analisis akar penyebab TypeError: Cannot read properties of undefined (reading 'map')",
    prompt: "Saya mengalami runtime error di React: `TypeError: Cannot read properties of undefined (reading 'map')`. Mengapa ini terjadi dan bagaimana penanganan yang benar?",
    category: "error",
    sampleConversationId: "conv-1",
  },
  {
    id: "sug-review-hook",
    title: "Review Kode Saya",
    description: "Evaluasi efisiensi re-render dan manajemen state pada custom hook data fetching",
    prompt: "Tolong lakukan code review pada custom hook data fetching saya. Apakah ada potensi memory leak atau re-render berlebih?",
    category: "review",
    sampleConversationId: "conv-2",
  },
  {
    id: "sug-optimize-zod",
    title: "Sarankan Solusi Optimal",
    description: "Implementasi validasi Server Actions dengan Zod v4 dan pesan error Bahasa Indonesia",
    prompt: "Bagaimana cara membuat schema validasi Zod v4 untuk Server Action dengan error message berbahasa Indonesia yang type-safe?",
    category: "optimize",
    sampleConversationId: "conv-3",
  },
  {
    id: "sug-concept-rsc",
    title: "Jelaskan Konsep",
    description: "Pahami perbedaan Server Components vs Client Components di Next.js 16",
    prompt: "Jelaskan perbedaan fundamental antara Server Components dan Client Components di Next.js 16, serta kapan waktu yang tepat menggunakannya.",
    category: "refactor",
  },
];

export const SAMPLE_CONVERSATIONS: ChatConversation[] = [
  {
    id: "conv-1",
    title: "TypeError: Cannot read properties of undefined",
    updatedAt: "Baru saja",
    preview: "Analisis runtime error pada rendering daftar produk di React...",
    category: "today",
    messages: [
      {
        id: "msg-1-user",
        role: "user",
        timestamp: "10:42",
        content:
          "Halo DevMate, saya mengalami runtime error saat membuka halaman katalog produk di Next.js:\n\n```text\nTypeError: Cannot read properties of undefined (reading 'map')\n    at ProductList (src/components/ProductList.tsx:14:26)\n```\n\nBerikut potongan kode saya. Kenapa error ini muncul padahal fungsi `fetchProducts()` sudah dipanggil?",
        codeSnippet: {
          language: "tsx",
          filename: "ProductList.tsx",
          code: `import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((item) => (
        <div key={item.id} className="p-4 border rounded">
          <h3>{item.name}</h3>
          <p>Rp {item.price.toLocaleString("id-ID")}</p>
        </div>
      ))}
    </div>
  );
}`,
        },
      },
      {
        id: "msg-1-assistant",
        role: "assistant",
        isSample: true,
        timestamp: "10:42",
        content: `Error **\`TypeError: Cannot read properties of undefined (reading 'map')\`** terjadi karena **siklus render awal React bersifat sinkron**, sedangkan pemanggilan \`fetch()\` di dalam \`useEffect\` berjalan secara **asinkron**.

### 🔍 Akar Masalah
Pada saat komponen \`ProductList\` pertama kali dirender ke DOM:
1. State diinisialisasi dengan \`useState<Product[]>()\` tanpa nilai awal, sehingga nilainya adalah \`undefined\`.
2. React langsung mengeksekusi JSX sebelum pemanggilan \`useEffect\` tuntas.
3. Baris \`products.map(...)\` mencoba memanggil metode \`.map\` pada nilai \`undefined\`.

---

### 💡 Solusi yang Direkomendasikan

Ada 3 pendekatan standar tergantung kebutuhan antarmuka:

#### 1. Berikan Nilai Awal Array Kosong *(Paling Sederhana)*
Cukup inisialisasi state dengan array kosong \`[]\` agar fungsi \`.map\` valid saat render pertama:

\`\`\`tsx
// Sebelum:
const [products, setProducts] = useState<Product[]>();

// Sesudah:
const [products, setProducts] = useState<Product[]>([]);
\`\`\`

#### 2. Gunakan Optional Chaining dan Fallback UI *(Best Practice)*
Tambahkan pemeriksaan status loading dan fallback jika data belum tersedia:

\`\`\`tsx
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data katalog");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProducts(data.items ?? []);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <p className="text-gray-500 animate-pulse">Memuat katalog produk...</p>;
  }

  if (error) {
    return <p className="text-red-500 font-medium">Terjadi kesalahan: {error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-gray-500">Belum ada produk yang tersedia.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((item) => (
        <article key={item.id} className="p-4 border border-zinc-200 rounded-lg shadow-xs">
          <h3 className="font-semibold text-zinc-900">{item.name}</h3>
          <p className="text-zinc-600">Rp {item.price.toLocaleString("id-ID")}</p>
        </article>
      ))}
    </div>
  );
}
\`\`\`

---

### 🚀 Catatan Next.js App Router (Modern)
Jika komponen ini berada di Next.js App Router, Anda dapat menjadikannya **Async Server Component** murni tanpa \`useState\` dan \`useEffect\`, sehingga kode lebih ringkas dan data langsung siap sebelum HTML dikirim ke browser:

\`\`\`tsx
// app/products/page.tsx (Server Component)
export default async function ProductsPage() {
  const res = await fetch("https://api.example.com/products", { cache: "no-store" });
  const data = await res.json();
  const products: Product[] = data.items ?? [];

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
\`\`\``,
      },
    ],
  },
  {
    id: "conv-2",
    title: "Optimasi Re-render & Custom Hook",
    updatedAt: "Kemarin",
    preview: "Review performa custom hook pencarian dengan debounce...",
    category: "yesterday",
    messages: [
      {
        id: "msg-2-user",
        role: "user",
        timestamp: "14:15",
        content:
          "Saya membuat hook pencarian data dengan query, tetapi setiap ketikan memicu re-render seluruh daftar item. Bagaimana cara mengatasinya dengan teknik debounce?",
      },
      {
        id: "msg-2-assistant",
        role: "assistant",
        isSample: true,
        timestamp: "14:16",
        content: `Re-render berlebih pada kolom pencarian umumnya terjadi karena state query langsung mengupdate filter data pada setiap keystroke.

### Rekomendasi Solusi: Custom \`useDebounce\` Hook

Gunakan hook \`useDebounce\` agar kalkulasi filter hanya dijalankan setelah jeda ketikan (misal 300ms):

\`\`\`typescript
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
\`\`\`

Dengan cara ini, daftar 5.000 item tidak akan di-filter 10 kali saat pengguna mengetik kata 10 huruf, melainkan hanya 1 kali setelah pengguna berhenti mengetik.`,
      },
    ],
  },
  {
    id: "conv-3",
    title: "Validasi Form dengan Zod v4",
    updatedAt: "2 hari lalu",
    preview: "Implementasi schema Zod type-safe di Next.js Server Actions...",
    category: "earlier",
    messages: [
      {
        id: "msg-3-user",
        role: "user",
        timestamp: "09:10",
        content:
          "Bagaimana membuat skema validasi Zod v4 untuk form registrasi developer dengan pesan error Bahasa Indonesia yang jelas?",
      },
      {
        id: "msg-3-assistant",
        role: "assistant",
        isSample: true,
        timestamp: "09:11",
        content: `Berikut adalah contoh skema Zod v4 dengan pesan validasi berbahasa Indonesia yang terstruktur dan aman untuk Server Actions:

\`\`\`typescript
import { z } from "zod";

export const RegisterUserSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter" })
    .max(100, { message: "Nama lengkap maksimal 100 karakter" }),
  email: z
    .string()
    .email({ message: "Format alamat email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Kata sandi minimal 8 karakter" })
    .regex(/[A-Z]/, { message: "Kata sandi harus memuat setidaknya 1 huruf besar" })
    .regex(/[0-9]/, { message: "Kata sandi harus memuat setidaknya 1 angka" }),
  experienceYears: z
    .number({ message: "Tahun pengalaman harus berupa angka" })
    .min(0, { message: "Tahun pengalaman tidak boleh negatif" })
    .max(50, { message: "Tahun pengalaman tidak valid" }),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
\`\`\`

Skema ini dapat digunakan langsung di Server Action Next.js dengan fungsi \`safeParse()\` untuk mengembalikan error terstruktur ke antarmuka pengguna tanpa melempar exception fatal.`,
      },
    ],
  },
];
