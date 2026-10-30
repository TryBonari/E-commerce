# DESIGN.md: Aturan Desain E-commerce

## 0. Cara memakai (instruksi untuk AI)
Kamu adalah desainer sekaligus engineer front-end. Ikuti dokumen ini secara ketat.
Jika ada konflik, urutan prioritasnya:
1. Kegunaan dan aksesibilitas.
2. Aturan di dokumen ini.
3. Kebiasaan bawaan AI (jangan diikuti jika bertentangan).

Sebelum menulis kode, tulis 3 baris:
- palet yang dipilih (A, B, atau C),
- pasangan font,
- elemen khas (bagian 8) yang dipakai.

Setelah selesai, jalankan checklist di bagian 12 dan laporkan pelanggaran jika ada.

Prinsip utama: **unik di tampilan** (tipografi, ritme, proporsi), **standar di perilaku** (navigasi, keranjang, filter, dan checkout harus familiar). Jangan menciptakan ulang pola interaksi yang sudah dipahami pengguna.

---

## 1. Karakter visual
- Kata kunci: tenang, rapi, seperti katalog cetak yang baik, tepercaya.
- Teknik utama: tipografi besar dan tegas, garis tipis, blok warna solid, ruang kosong yang disengaja.
- Bukan: startup SaaS generik, neon, glassmorphism, dekoratif berlebihan.
- UI harus "diam" supaya foto produk yang menjadi pusat perhatian.

---

## 2. Warna

### 2.1 Token dasar (dipakai di semua palet)
```css
:root {
  /* Netral hangat, bukan abu murni */
  --paper:   #F7F5F0;  /* latar halaman */
  --paper-2: #EFECE4;  /* section selang-seling */
  --white:   #FFFFFF;  /* kartu, input, modal */
  --ink:     #0F1729;  /* teks utama */
  --ink-2:   #424C61;  /* teks sekunder */
  --ink-3:   #5F6A7E;  /* teks redup, minimal 14px */
  --line:    #E4E1D8;  /* garis tipis / pemisah */
  --line-2:  #CFCBBF;  /* border input */

  /* Skala biru (sengaja bukan biru default Tailwind) */
  --blue-50:#F1F4FB;  --blue-100:#E1E8F7; --blue-200:#C5D3EF; --blue-300:#9AB2E3;
  --blue-400:#6C8DD3; --blue-500:#4A6FC0; --blue-600:#2F54A8; --blue-700:#254389;
  --blue-800:#1B3166; --blue-900:#12214A; --blue-950:#0A1432;

  /* Semantik */
  --success:#1F7A4D; --warning:#8A5A00; --danger:#B3261E; --info:var(--blue-600);
}
```

### 2.2 Tiga kombinasi biru (pilih SATU per toko, jangan dicampur)
```css
/* A. Biru + Jingga Bata: kontras tinggi, energik, cocok produk umum dan promo */
[data-palette="a"] {
  --brand:var(--blue-600); --brand-hover:var(--blue-700); --brand-tint:var(--blue-50);
  --accent:#C2481A; --accent-hover:#A63B12; --accent-tint:#FBE9E1;
  --cta:var(--accent); --cta-hover:var(--accent-hover); --cta-ink:#FFFFFF;
}
/* B. Biru + Hijau Teluk: tenang dan tepercaya, cocok kesehatan, rumah, makanan */
[data-palette="b"] {
  --brand:var(--blue-600); --brand-hover:var(--blue-700); --brand-tint:var(--blue-50);
  --accent:#17766A; --accent-hover:#115F55; --accent-tint:#DDEFEB;
  --cta:var(--accent); --cta-hover:var(--accent-hover); --cta-ink:#FFFFFF;
}
/* C. Navy + Emas Kusam + Pasir: premium, cocok fashion dan aksesori */
[data-palette="c"] {
  --brand:var(--blue-800); --brand-hover:var(--blue-900); --brand-tint:#EFE8DA;
  --accent:#B9893A; --accent-hover:#9C7230; --accent-tint:#F3E9D2;
  --cta:var(--blue-800); --cta-hover:var(--blue-900); --cta-ink:#FFFFFF;
}
```
Catatan per palet:
- **A:** jingga hanya untuk CTA, harga diskon, dan badge. Jangan jadi latar besar.
- **B:** hijau aksen mirip hijau "sukses". Status stok dan pembayaran SELALU memakai ikon + teks, tidak boleh hanya warna.
- **C:** emas tidak boleh dipakai sebagai warna teks (kontras rendah di latar terang). Pakai hanya untuk garis, bintang rating, dan badge dengan teks `--ink`.

### 2.3 Aturan penggunaan
- Proporsi area per layar: **±70% netral, ±20% biru, maksimal 10% aksen** (praktisnya aksen jauh lebih sedikit).
- Satu layar hanya boleh memuat: 1 keluarga biru + 1 aksen + netral. Warna foto produk dianggap warna tak terkontrol, jadi UI harus menahan diri.
- Biru dipakai untuk: wordmark, tautan, state terpilih (varian, filter), focus ring, ikon aktif, blok solid (footer, promo).
- Aksen dipakai untuk: tombol CTA utama, harga diskon, badge, satu sorotan per section.
- Dilarang: aksen untuk teks paragraf, aksen untuk latar besar, dua aksen dalam satu komponen.
- Latar halaman: `--paper`. Selang-seling hanya dengan `--paper-2` atau `--brand-tint`. Maksimal 2 warna latar terang per halaman, ditambah 1 blok gelap (`--blue-900` atau `--ink`) untuk footer atau promo.
- Jika foto produk berlatar putih, pilih satu: ganti `--paper` menjadi `#FFFFFF` di area galeri, atau minta foto ulang. Jangan campur dua latar putih berbeda.
- Kontras teks minimal 4.5:1 (teks besar 3:1). Verifikasi dengan WebAIM Contrast Checker.
- Warna tidak boleh jadi satu-satunya penanda status.

### 2.4 Gradasi
Default: **tidak ada gradasi**. Hanya boleh dalam 3 kasus:
1. Latar hero sangat halus: 2 warna dari hue biru yang sama (`--blue-50` ke `--paper`), arah 180°, selisih terang maksimal ±6%.
2. Scrim di atas foto agar teks terbaca: hitam transparan hanya di sisi bawah.
3. Skeleton loading.

Dilarang: gradasi ungu–biru, pelangi, mesh gradient, teks gradasi, tombol gradasi, glow, blob. Maksimal 1 gradasi per layar.

---

## 3. Tipografi
```css
:root {
  --font-display: "Bricolage Grotesque", "Segoe UI", system-ui, sans-serif;
  --font-body:    "Instrument Sans", "Segoe UI", system-ui, sans-serif;
  --font-mono:    "DM Mono", ui-monospace, Menlo, monospace;
}
```
Google Fonts (cek ulang tautan, atau self-host):
`family=Bricolage+Grotesque:opsz,wght@12..96,500..700&family=Instrument+Sans:wght@400..600&family=DM+Mono:wght@400;500&display=swap`

Alternatif display untuk palet C: **Fraunces** (serif), sisanya tetap.

Pembagian peran:
- Display: hanya H1 sampai H3 dan angka besar. Berat 600, letter-spacing negatif.
- Body: semua teks lain. Berat 400 dan 500 saja (600 hanya untuk harga).
- Mono: hanya label indeks, SKU, badge, nomor pesanan. Selalu 12px, huruf kapital, letter-spacing +0.08em.
- Maksimal 3 keluarga font dan 5 varian berat di seluruh situs.

Skala (rasio ±1.25, fluid):
```css
--text-xs:   0.75rem;                                   /* 12 label mono */
--text-sm:   0.875rem;                                  /* 14 meta, caption */
--text-base: 1rem;                                      /* 16 body (minimum di mobile) */
--text-lg:   1.25rem;                                   /* 20 lead, nama produk di detail */
--text-xl:   clamp(1.5rem, 1.2rem + 1vw, 1.95rem);      /* H3 */
--text-2xl:  clamp(1.95rem, 1.4rem + 2vw, 2.75rem);     /* H2 */
--text-3xl:  clamp(2.5rem, 1.5rem + 4.5vw, 4.75rem);    /* H1 / hero */
```
- Line-height: body 1.6, H3 dan H2 1.15, H1 1.05.
- Letter-spacing: H1 -0.03em, H2 dan H3 -0.02em, body 0, label +0.08em.
- Input selalu 16px (mencegah zoom otomatis di iOS).
- `font-variant-numeric: tabular-nums` untuk harga, jumlah, dan tabel.
- Hierarki: maksimal 3 ukuran teks berbeda dalam satu komponen.

---

## 4. Tata letak tulisan
- Rata kiri dan ragged-right untuk semua teks. Rata tengah hanya untuk teks pendek (maksimal 3 baris) seperti empty state. Jangan pernah justify.
- Lebar baris paragraf: 60 sampai 68 karakter (`max-width: 64ch`). Deskripsi produk maksimal 62ch.
- `text-wrap: balance` untuk heading, `text-wrap: pretty` untuk paragraf.
- Heading maksimal 2 baris dan 12 kata. Nama produk di kartu dipotong 2 baris (`line-clamp: 2`).
- Jarak heading: atas = 1.5 sampai 2x tinggi baris heading, bawah = 0.5x (heading lebih dekat ke isinya daripada ke blok sebelumnya).
- Jarak antarparagraf 1em, tanpa indentasi. Daftar maksimal 7 item, bullet berupa tanda "–".
- Gaya penulisan: sentence case di semua tempat (bukan Title Case, bukan HURUF KAPITAL, kecuali label mono).
- Tombol diawali kata kerja konkret: "Tambah ke keranjang", "Lanjut ke pembayaran", "Lihat ukuran". Dilarang: "Submit", "Klik di sini", "Selengkapnya" tanpa konteks.
- Dilarang: tanda seru berlebihan, kalimat pembuka kosong ("Selamat datang di toko kami"), klaim superlatif tanpa bukti. Tulis manfaat konkret.
- Harga: format `Rp149.000` (titik ribuan, tanpa desimal), pakai `Intl.NumberFormat('id-ID')`. Harga coret berukuran lebih kecil dan warna `--ink-3`; harga diskon memakai `--accent` dan berat 600.
- Tautan di dalam teks selalu bergaris bawah.

---

## 5. Grid, layout, proporsi
- Container maksimal 1280px. Teks panjang maksimal 720px.
- Grid 12 kolom di desktop, 4 kolom di mobile. Gutter 24px (mobile 16px). Margin samping `clamp(16px, 4vw, 48px)`.
- Breakpoint: 640, 768, 1024, 1280. Desain mobile-first.
- Skala spasi (kelipatan 4/8): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Padding vertikal antar-section: 96px desktop dan 56px mobile.
- Aturan kedekatan: jarak di dalam grup maksimal setengah jarak antar-grup.
- Asimetri disengaja: hero dan section editorial memakai pembagian **5/7, 4/8, atau 3/9**. Hindari 6/6 untuk hero. Grid 3 atau 4 kolom sama rata hanya untuk daftar produk.
- Semua elemen sejajar dengan garis kolom. Satu "garis kiri" yang kuat per halaman (judul, label, dan konten mulai dari tepi yang sama).
- Rasio gambar (konsisten, `object-fit: cover`):
  - kartu produk 4:5
  - thumbnail 1:1
  - hero 5:4
  - blok editorial lebar 2:1
- Radius: `--r-sm: 4px` (tombol, input, badge, gambar), `--r-md: 8px` (modal, dropdown). Tidak ada radius di atas 12px, kecuali avatar atau pill status.
- Pemisah dan kedalaman: garis 1px `--line`, bukan bayangan. Bayangan hanya untuk elemen melayang (dropdown, modal, sticky bar) dan hanya satu token: `0 8px 24px rgba(15,23,41,.10)`.
- Target sentuh minimal 44x44px. Tinggi tombol dan input 48px.

---

## 6. Ruang kosong
- Ruang kosong adalah elemen desain: berikan "napas" di hero (padding atas dan bawah 80 sampai 120px) dan di antar-section.
- Jangan mengisi ruang kosong dengan ikon, ilustrasi, blob, atau dekorasi. Jika terasa kosong, kecilkan konten atau besarkan tipografi, jangan tambah ornamen.
- Kepadatan menyesuaikan fungsi:
  - **Longgar** di area brand (home, koleksi).
  - **Padat dan efisien** di area transaksi (listing, filter, keranjang, checkout).
- Padding di dalam kartu 16px. Teks minimal 24px dari tepi gambar atau blok.
- Setiap halaman wajib punya minimal satu area "istirahat" tanpa elemen interaktif.

---

## 7. Komponen
- **Tombol utama:** latar `--cta`, teks `--cta-ink`, tinggi 48, padding 0 24px, radius 4, body 500 16px, tanpa uppercase dan tanpa bayangan. Hover pakai `--cta-hover`. Fokus: outline 2px `--blue-400` dengan offset 2px. Maksimal 1 tombol utama per area pandang.
- **Tombol sekunder:** transparan, border 1px `--ink`, teks `--ink`. **Tersier:** teks bergaris bawah.
- **Input:** tinggi 48, border 1px `--line-2`, latar `--white`, label di atas (bukan hanya placeholder), pesan error di bawah dengan ikon dan teks `--danger`.
- **Kartu produk:** tanpa border dan bayangan. Gambar 4:5, lalu jarak 12px, nama (14 sampai 16px, 500, 2 baris), harga, rating kecil. Maksimal 1 badge per produk di pojok kiri atas gambar. Hover: tukar ke foto kedua atau garis bawah pada nama. Dilarang zoom atau lift.
- **Badge:** mono 12px kapital, radius 2, latar `--accent-tint`, teks `--accent` (palet C: teks `--ink`).
- **Header:** tinggi 64 (mobile 56), latar `--paper`, garis bawah 1px `--line`. Logo (wordmark huruf display) di kiri, pencarian lebar di tengah, akun dan keranjang di kanan. Posisi ini standar, jangan diubah.
- **Footer:** latar `--blue-900`, 4 kolom, pemisah garis tipis.

---

## 8. Elemen khas (pembeda dari desain generik, pakai konsisten)
1. **Label indeks:** setiap section diawali garis tipis penuh lebar, lalu label mono kecil ("01 / KATEGORI", "02 / PILIHAN MINGGU INI"), baru judul besar.
2. **Hero asimetris:** teks 5 kolom rata kiri, gambar 7 kolom yang "bocor" sampai tepi kanan layar (full-bleed satu sisi).
3. **Blok warna solid:** promo dan koleksi memakai panel datar (`--blue-800`, `--brand-tint`) dengan tipografi besar, bukan gambar acak atau gradasi.
4. **Kategori sebagai daftar tipografis**, bukan kartu berikon: nama kategori besar (display) dengan jumlah produk di sisi kanan (mono), dipisah garis tipis.

---

## 9. Gambar dan ikon
- Foto produk: latar seragam, sudut dan pencahayaan konsisten, rasio 4:5. Foto gaya hidup maksimal 1 per section.
- Format WebP/AVIF, `loading="lazy"` (kecuali hero), `width` dan `height` selalu diisi, `alt` deskriptif.
- Ikon: satu keluarga saja (Phosphor Icons regular, stroke konsisten), ukuran 20 atau 24px. Dilarang emoji sebagai ikon dan dilarang ikon di dalam lingkaran berwarna.
- Ilustrasi 3D, mockup melayang, dan stock photo generik dilarang.

---

## 10. Motion
- Durasi 150 sampai 200ms, easing `cubic-bezier(.2,0,0,1)`. Hanya animasikan `opacity` dan `transform`.
- Hanya untuk umpan balik (hover, fokus, buka/tutup, tambah ke keranjang). Tanpa parallax, bounce, atau animasi masuk berlebihan.
- Hormati `prefers-reduced-motion`.

---

## 11. Halaman kunci
- **Home (maksimal 6 section):** hero, kategori (daftar tipografis), produk pilihan, jaminan (3 poin teks dengan pemisah garis, tanpa ikon lingkaran), produk baru, footer.
- **Listing:** filter di kiri (desktop) atau sheet (mobile), grid 4 kolom (tablet 3, mobile 2 dengan gap 12px). Blok editorial 2 kolom boleh muncul maksimal sekali per 8 sampai 12 produk, bukan di hasil pencarian.
- **Detail produk:** galeri 7 kolom, info 5 kolom dan sticky. Urutan info: nama, harga, varian, jumlah, CTA, lalu detail dalam accordion. Mobile: bar bawah sticky berisi harga + CTA.
- **Keranjang dan checkout:** satu kolom utama (maksimal 640px) + ringkasan pesanan 4 kolom. Langkah ditulis teks ("1 Alamat, 2 Pengiriman, 3 Pembayaran"). Minimalkan field. Tampilkan metode bayar yang umum di Indonesia (QRIS, virtual account, e-wallet).

---

## 12. Larangan dan checklist akhir

### Dilarang (ciri "AI slop")
- Gradasi ungu–biru, glassmorphism, blob/orb, bentuk 3D melayang.
- Seluruh kartu memakai `rounded-2xl` + `shadow-lg`.
- Hero rata tengah dengan dua tombol dan judul klise ("Elevate your...", "Temukan produk terbaik").
- Tiga kartu fitur sejajar dengan ikon dalam lingkaran berwarna.
- Font Inter/Roboto/Arial saja tanpa hierarki. Biru default Tailwind (#2563EB / #3B82F6).
- Efek hover scale, glow, atau bounce. Emoji sebagai ikon.
- Testimoni palsu, lorem ipsum, dan angka statistik karangan.
- Lebih dari 1 aksen warna. Gradasi di tombol atau teks.

### Checklist (centang sebelum selesai)
- [ ] Hanya satu palet (A/B/C) yang dipakai, dan komposisi warna ±70/20/10.
- [ ] Tidak ada gradasi di luar 3 kasus yang diizinkan.
- [ ] Kontras teks ≥ 4.5:1, status tidak bergantung pada warna saja.
- [ ] Hanya font dari bagian 3, tombol dan input ≥ 48px, input 16px.
- [ ] Teks rata kiri, lebar baris ≤ 68ch, heading ≤ 2 baris.
- [ ] Semua spasi dari skala 4/8, semua rasio gambar konsisten.
- [ ] Minimal 2 dari 4 elemen khas (bagian 8) muncul di halaman.
- [ ] Ada area kosong yang disengaja, tidak diisi dekorasi.
- [ ] Pola navigasi, keranjang, dan checkout tetap standar.
- [ ] Tidak ada item di daftar "Dilarang".