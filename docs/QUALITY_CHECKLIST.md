# QUALITY_CHECKLIST.md — Checklist Kualitas DevMate AI

> Gunakan checklist ini sebelum menandai setiap tahap sebagai **Done**.
> Centang item hanya jika sudah diverifikasi secara nyata, bukan hanya asumsi.

---

## 1. Checklist Kualitas Kode

### TypeScript
- [ ] Tidak ada `any` yang tidak terdokumentasi
- [ ] Tidak ada TypeScript error (`npm run typecheck` = 0 errors)
- [ ] Semua fungsi memiliki parameter dan return type yang eksplisit
- [ ] Interface dan type didefinisikan di `src/types/` atau dekat dengan penggunaannya
- [ ] Tidak ada `@ts-ignore` tanpa komentar penjelasan

### JavaScript / React
- [ ] Tidak ada `console.log` yang tertinggal di production code
- [ ] Semua event handlers dibersihkan (`useEffect` cleanup)
- [ ] Tidak ada memory leaks pada komponen yang unmount
- [ ] Semua dependencies di `useEffect` terdaftar dengan benar
- [ ] Tidak ada infinite render loop

### ESLint
- [ ] `npm run lint` tidak menghasilkan error
- [ ] Warnings yang tersisa terdokumentasi dan memiliki alasan

### Struktur Kode
- [ ] Setiap file memiliki satu responsibility yang jelas
- [ ] Tidak ada circular dependencies
- [ ] Import paths menggunakan alias `@/*`, bukan path relatif yang dalam
- [ ] File ditempatkan di folder yang sesuai dengan arsitektur

---

## 2. Checklist Keamanan

- [ ] `GEMINI_API_KEY` tidak ada di kode klien atau bundle output
- [ ] Tidak ada variabel `NEXT_PUBLIC_` yang mengekspos secret
- [ ] `.env.local` ada di `.gitignore` dan tidak pernah di-commit
- [ ] Input pengguna divalidasi dengan Zod sebelum dikirim ke API
- [ ] Output dari AI di-sanitasi sebelum dirender ke DOM
- [ ] Tidak ada `dangerouslySetInnerHTML` tanpa sanitasi
- [ ] HTTP security headers aktif (X-Content-Type-Options, X-Frame-Options, dll.)
- [ ] Tidak ada secret dalam komentar kode, console.log, atau error messages

---

## 3. Checklist UI/UX dan Responsivitas

### Responsivitas
- [ ] Layout berfungsi di 375px (mobile kecil)
- [ ] Layout berfungsi di 768px (tablet)
- [ ] Layout berfungsi di 1280px (desktop)
- [ ] Tidak ada horizontal overflow yang tidak disengaja

### Aksesibilitas
- [ ] Semua elemen interaktif bisa diakses dengan keyboard
- [ ] Focus indicator terlihat jelas
- [ ] Semua gambar memiliki `alt` text yang deskriptif
- [ ] Form elements memiliki label yang terasosiasi
- [ ] ARIA attributes digunakan dengan benar jika diperlukan
- [ ] Contrast ratio memenuhi WCAG AA (4.5:1 untuk teks biasa)

### User Experience
- [ ] Loading state ditampilkan saat menunggu respons AI
- [ ] Error state ditampilkan dengan pesan yang ramah pengguna
- [ ] Empty state ditampilkan dengan tepat
- [ ] Animasi tidak mengganggu (bisa dimatikan jika `prefers-reduced-motion`)

---

## 4. Checklist Pengujian

- [ ] `npm run test` berjalan dan semua test pass
- [ ] Setiap utility function memiliki unit test
- [ ] Test tidak bergantung pada state eksternal yang tidak dikontrol
- [ ] Mocking digunakan untuk dependency eksternal (API calls, localStorage)
- [ ] Test cases mencakup happy path, error case, dan edge case
- [ ] Coverage report dihasilkan (`npm run test:coverage`)

---

## 5. Checklist Kesiapan GitHub

- [ ] `README.md` akurat dan up to date
- [ ] `npm run build` berhasil tanpa error atau warning yang signifikan
- [ ] `git status` tidak menampilkan file yang seharusnya di-ignore
- [ ] `.gitignore` mencakup semua file sensitif
- [ ] Tidak ada API key, password, atau secret dalam commit history
- [ ] Branch utama (`main`) dalam kondisi bisa di-build
- [ ] Commit messages deskriptif dan bermakna

---

## 6. Kriteria Penerimaan Fitur

Setiap fitur baru dianggap selesai jika:

1. **Fungsional:** Fitur bekerja sesuai spesifikasi yang tercatat di `IMPLEMENTATION_PLAN.md`
2. **Terverifikasi:** `npm run typecheck`, `npm run lint`, dan `npm run test` semua pass
3. **Aman:** Tidak ada security vulnerability baru yang diintroduce
4. **Terdokumentasi:** Perubahan tercatat di `IMPLEMENTATION_PLAN.md` dengan status `Done` dan bukti verifikasi
5. **Responsif:** UI berfungsi di semua breakpoint yang ditargetkan
6. **Accessible:** Memenuhi standar aksesibilitas dasar