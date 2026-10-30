## 0. Cara memakai (instruksi untuk AI)
Ikuti dokumen ini di setiap tugas. Jika ada konflik, urutan prioritasnya:
1. Keamanan dan kebenaran.
2. Aturan di dokumen ini.
3. Kebiasaan bawaan AI (jangan diikuti jika bertentangan).

**Sebelum menulis kode**, tulis rencana singkat:
- daftar file yang akan dibuat atau diubah, beserta perkiraan jumlah barisnya,
- fungsi atau komponen yang sudah ada dan bisa dipakai ulang. Cari dulu di codebase.

**Setelah selesai**, jalankan `npm run check`, ikuti checklist bagian 10, dan laporkan jumlah baris tiap file yang diubah.

Prinsip: **kecil, satu tanggung jawab, tanpa duplikasi, mudah dibaca.** Ringkas itu bagus, selama tetap terbaca.

---

## 1. Batas ukuran (WAJIB)
| Unit | Batas |
|---|---|
| File | **150 baris** (semua dihitung: kosong, komentar, import) |
| Fungsi | 30 baris (ideal ≤ 20) |
| Komponen UI | 80 baris |
| Parameter fungsi | 3 (lebih dari itu, pakai satu objek) |
| Kedalaman nesting | 2 level (sisanya early return) |
| Lebar baris | 100 karakter |
| File per folder | 8 (lebih dari itu, buat subfolder) |

Aturan:
- Di sekitar baris 120, berhenti menambah kode ke file itu dan rencanakan pemecahan. Jangan menunggu sampai 150.
- Dilarang menyiasati batas dengan menggabung beberapa pernyataan dalam satu baris, menghapus baris kosong, atau menghapus komentar penting. Pecah file.
- Berlaku untuk semua kode tulisan tangan (JS/TS, CSS, SQL, test). Pengecualian hanya: lockfile, file hasil generate, dan data statis (fixture/seed).

## 2. Cara memecah file
Jika sebuah file akan melewati 150 baris:
1. Identifikasi tanggung jawab berbeda di dalamnya (tampilan, state, data, aturan bisnis, konstanta).
2. Buat file baru **di folder yang berhubungan**: folder fitur yang sama, atau subfolder jika folder sudah penuh. Jangan menaruhnya di folder generik.
3. **Pindahkan, jangan salin.** Perbarui semua import. Tidak boleh ada duplikasi setelah pemecahan.
4. Beri nama sesuai isi (`cart-totals.js`). Dilarang: `utils2.js`, `helpers.js`, `misc.js`, `common.js`, `temp.js`.
5. File asal menjadi pintu masuk yang tipis. Ekspor publik fitur lewat `index.js`.
6. Jalankan `npm run check` dan test. Perilaku tidak boleh berubah.

| Yang membesar | Pecah menjadi |
|---|---|
| Komponen UI | komponen anak + `use-*.js` (state/efek) + `*.constants.js` |
| Route handler | `*.routes.js` + `*.controller.js` + `*.service.js` + `*.schema.js` |
| Fungsi bisnis panjang | beberapa fungsi kecil, satu per langkah |
| Kumpulan fungsi pembantu | satu file per tema (`price-format.js`, `date-format.js`) |
| CSS | satu file per komponen, di sebelah komponennya |
| Test | satu file test per modul, dikelompokkan per skenario |
| Query database | satu repository per entitas |

## 3. Struktur folder (berbasis fitur)
```
src/
├─ app/                      # routing, provider, entry point
├─ features/
│  ├─ product/
│  │  ├─ components/         # ProductCard.jsx, ProductGallery.jsx
│  │  ├─ hooks/              # use-product-list.js
│  │  ├─ api.js              # pemanggilan API khusus fitur ini
│  │  ├─ product.constants.js
│  │  └─ index.js            # ekspor publik fitur
│  ├─ cart/  checkout/  order/  auth/
└─ shared/
   ├─ ui/                    # Button.jsx, Input.jsx (tanpa logika bisnis)
   ├─ lib/                   # format-rupiah.js, http-client.js
   ├─ config/                # env.js, routes.js
   └─ styles/                # tokens.css (token dari DESIGN.md), base.css

server/
├─ modules/
│  └─ product/
│     ├─ product.routes.js
│     ├─ product.controller.js   # HTTP saja: baca request, panggil service, kirim respons
│     ├─ product.service.js      # aturan bisnis
│     ├─ product.repository.js   # satu-satunya yang menyentuh database
│     └─ product.schema.js       # validasi input
├─ middleware/               # auth.js, error-handler.js
└─ config/
```
- Kelompokkan per **fitur**, bukan per jenis file.
- Arah impor satu arah: `app → features → shared`. `shared` tidak boleh mengimpor dari `features`.
- Fitur tidak mengimpor bagian dalam fitur lain, hanya lewat `index.js`-nya.
- Tidak boleh ada circular import.
- Backend: `route → controller → service → repository`. Lapisan tidak boleh melompat.

## 4. Cegah penumpukan kode
- **Satu file, satu alasan untuk berubah.**
- UI tidak memanggil database atau `fetch` mentah. Pemanggilan data lewat `api.js` atau hook.
- Aturan bisnis tidak boleh ada di komponen maupun controller.
- Komponen hanya menampilkan. State dan efek yang kompleks pindah ke custom hook.
- **Aturan tiga:** duplikasi dua kali boleh, yang ketiga wajib diekstrak. Jangan membuat abstraksi untuk sesuatu yang baru dipakai sekali.
- Tidak ada file "gudang" (`utils`, `helpers`, `common`). Satu file berisi satu tema fungsi dan bernama jelas.
- Konstanta, teks UI, dan angka ajaib dipindah ke `*.constants.js`.
- Hapus: kode mati, kode yang dikomentari, `console.log`, import tak terpakai, TODO tanpa penjelasan.
- **Diff minimal:** ubah hanya bagian yang relevan. Jangan menulis ulang file utuh atau merapikan kode di luar tugas.
- Dependency baru hanya jika perlu. Sebutkan alasannya dan pastikan fiturnya belum ada di bahasa, framework, atau library yang sudah terpasang.

## 5. Kode ringkas dan efektif
1. **Cari dulu sebelum menulis.** Jika sesuatu yang umum butuh lebih dari 10 baris (format uang/tanggal, validasi, debounce, deep clone), biasanya sudah ada solusi bawaan.
2. **Early return** (guard clause) alih-alih if/else bersarang.
3. **Tabel pencarian** (object/Map) alih-alih rantai if/else atau switch panjang.
4. **Deklaratif:** `map`, `filter`, `reduce`, `some`, `every` alih-alih loop manual dengan variabel penampung.
5. **Sintaks modern:** destructuring, spread, `?.`, `??`, template literal, `Object.fromEntries`, `structuredClone`, `Array.at`.
6. Nilai atau objek mahal yang dipakai berulang dibuat **sekali** di luar fungsi.
7. Jangan membuat fungsi pembungkus yang hanya memanggil fungsi lain.
8. Async: `async/await`, `try/catch` di satu titik (batas modul), dan `Promise.all` untuk permintaan yang independen.
9. **Ringkas bukan berarti sulit dibaca.** Dilarang: nested ternary, one-liner di atas 100 karakter, regex tanpa penjelasan, trik "pintar", dan nama singkatan (`usr`, `tmp`).

```js
// ❌ Panjang
function getStatusLabel(status) {
  if (status === 'pending') {
    return 'Menunggu';
  } else if (status === 'paid') {
    return 'Dibayar';
  } else if (status === 'shipped') {
    return 'Dikirim';
  } else {
    return 'Tidak diketahui';
  }
}
// ✅ Ringkas
const STATUS_LABEL = { pending: 'Menunggu', paid: 'Dibayar', shipped: 'Dikirim' };
export const statusLabel = (s) => STATUS_LABEL[s] ?? 'Tidak diketahui';
```
```js
// ❌ Loop manual
let total = 0;
for (let i = 0; i < items.length; i++) {
  total += items[i].price * items[i].qty;
}
// ✅
const total = items.reduce((sum, { price, qty }) => sum + price * qty, 0);
```
```js
// ❌ Nesting dalam
function canCheckout(user, cart) {
  if (user) {
    if (cart.items.length > 0) {
      if (user.address) return true;
    }
  }
  return false;
}
// ✅
const canCheckout = (user, cart) => Boolean(user?.address && cart.items.length);
```
```js
// ❌ Menulis ulang format ribuan secara manual
// ✅ Gunakan bawaan, buat instance sekali
const nf = new Intl.NumberFormat('id-ID');
export const rupiah = (n) => `Rp${nf.format(n)}`;
```

## 6. Penamaan dan komentar
- File `kebab-case.js`, komponen `PascalCase.jsx`, fungsi dan variabel `camelCase` diawali kata kerja (`getOrder`, `calculateTotal`), boolean diawali `is/has/can`, konstanta `UPPER_SNAKE_CASE`.
- Identifier dalam bahasa Inggris. Teks yang tampil ke pengguna dalam bahasa Indonesia, disimpan di satu tempat (`*.constants.js`), bukan tersebar di komponen.
- Komentar menjelaskan **mengapa**, bukan **apa**. Jangan mengomentari hal yang sudah jelas dari nama.
- JSDoc hanya untuk fungsi publik (yang diekspor lewat `index.js`) yang tidak jelas dari namanya.

## 7. CSS
- Satu file CSS per komponen, maksimal 150 baris.
- Semua warna, jarak, radius, dan font memakai token dari `DESIGN.md` (`var(--...)`). Dilarang menulis ulang hex atau px di komponen.
- Tanpa `!important`. Selector maksimal 2 level. Satu konvensi penamaan (BEM atau CSS Modules).
- Pakai fitur yang meringkas: `gap`, `grid`, `clamp()`, `inset`, `aspect-ratio`, shorthand. Pola berulang jadi satu kelas.
- Mobile-first: gaya dasar untuk mobile, `@media (min-width: ...)` untuk layar lebih besar.
- Jika memakai Tailwind: daftarkan token `DESIGN.md` di konfigurasi, jangan pakai nilai arbitrer seperti `[#2F54A8]`, dan ekstrak kombinasi kelas yang berulang tiga kali atau lebih menjadi komponen.

## 8. Aturan khusus e-commerce
- Uang disimpan sebagai **bilangan bulat rupiah** (tanpa float). Format hanya saat ditampilkan.
- Server **menghitung ulang** harga, diskon, ongkir, dan total. Jangan percaya angka dari klien.
- Validasi semua input di server dengan skema (jumlah, ID, alamat). Query database selalu terparameterisasi.
- Pengurangan stok dan pembuatan pesanan dalam satu transaksi database. Callback pembayaran idempoten (callback yang sama tidak membuat pesanan ganda).
- Rahasia (API key, token, kredensial DB) hanya di environment variable. Sediakan `.env.example`, jangan commit `.env`.
- Error ditangani terpusat (`error-handler.js`). Dilarang `catch {}` kosong. Pesan ke pengguna tanpa detail teknis.
- Jangan mencatat data sensitif di log (kata sandi, token, data kartu).
- Setiap daftar dan form wajib punya state loading, error, dan kosong.

## 9. Tooling (penegak otomatis)
`eslint.config.js` (ESLint 9, contoh JavaScript; untuk TypeScript tambahkan `typescript-eslint`):
```js
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'max-lines': ['error', 150],
      'max-lines-per-function': ['error', { max: 30, skipBlankLines: true, skipComments: true }],
      'max-depth': ['error', 2],
      'max-params': ['error', 3],
      complexity: ['error', 8],
      'no-nested-ternary': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      eqeqeq: 'error',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'max-lines-per-function': ['error', { max: 80, skipBlankLines: true, skipComments: true }],
    },
  },
];
```
`.prettierrc`:
```json
{ "printWidth": 100, "singleQuote": true, "semi": true, "trailingComma": "all" }
```
`package.json` (bagian scripts):
```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "check:size": "node scripts/check-size.mjs",
    "check": "npm run lint && npm run check:size"
  }
}
```
`scripts/check-size.mjs` (lintas platform, mencakup CSS yang tidak dicek ESLint):
```js
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const MAX = 150;
const EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.css']);
const SKIP = new Set(['node_modules', 'dist', 'build', '.git']);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    if (SKIP.has(name)) return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const tooLong = walk('.')
  .filter((f) => EXT.has(extname(f)))
  .map((f) => [f, readFileSync(f, 'utf8').trimEnd().split('\n').length])
  .filter(([, lines]) => lines > MAX);

tooLong.forEach(([f, n]) => console.error(`${f}: ${n} baris (maks ${MAX})`));
process.exit(tooLong.length ? 1 : 0);
```

## 10. Checklist sebelum selesai
- [ ] `npm run check` lulus: tidak ada file di atas 150 baris.
- [ ] Fungsi ≤ 30 baris, komponen ≤ 80, nesting ≤ 2, parameter ≤ 3.
- [ ] File baru ada di folder fitur yang berhubungan dan bernama sesuai isi.
- [ ] Sudah mencari kode yang bisa dipakai ulang, tidak ada duplikasi.
- [ ] Tidak ada if/else atau switch panjang yang bisa jadi tabel pencarian, dan tidak ada loop manual yang bisa `map/filter/reduce`.
- [ ] Tidak ada kode mati, `console.log`, import tak terpakai, atau angka ajaib.
- [ ] Warna dan jarak memakai token `DESIGN.md`.
- [ ] Uang berupa integer, total dihitung ulang di server, input divalidasi.
- [ ] Tidak ada dependency baru tanpa alasan.
- [ ] Hanya mengubah bagian yang relevan dengan tugas.