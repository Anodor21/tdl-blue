# Daftar Tugas (Persona 3 Reload Style)

To-Do List sederhana dengan visual terinspirasi UI **Persona 3 Reload**: navy dalam `#001233`, biru laut cerah `#16cffb`, merah `#e60024`, panel miring (skew) dengan border tegas dan shadow komik.

## Fitur

- Layout dua kolom (Arahan 1 desainer: Panel Terpisah dengan Garis Miring): panel statistik di kiri, zona misi di kanan, dipisah garis diagonal cyan miring
- Statistik ringkas: total tugas, selesai, belum selesai
- Tanggal hari ini berformat Indonesia (contoh: Sabtu, 15 November 2026)
- Progress bar persentase tugas selesai (gaya P3R: track miring, fill putih bergaris diagonal, tip merah)
- Tambah, tandai selesai/kembalikan, dan hapus tugas
- Data tersimpan di `localStorage`, tugas bertahan walau browser ditutup
- Efek suara: `sfx/navigation.wav` (tambah / toggle / hover), `sfx/close-menu.mp3` (hapus)
- Animasi: slide-up saat tambah (stagger 60ms), fade-out saat hapus, transisi 0.3s saat toggle
- Empty state: pesan ramah saat daftar masih kosong
- Aksesibel: tombol teks `<button>` asli (Enter/Space), label form visible, kontras WCAG AA, menghormati `prefers-reduced-motion`
- Responsive di layar < 600px: satu kolom, pemisah disembunyikan, skew dinolkan agar panel tidak pecah

## Jalankan

Buka `index.html` di browser. Font (Montserrat, Permanent Marker) dimuat dari Google Fonts.

## Struktur

```
index.html      struktur halaman (layout dua kolom: panel statistik + zona misi, dipisah garis diagonal)
style.css       seluruh desain Persona 3 Reload via CSS custom properties
script.js       logika todo + localStorage + statistik + tanggal + progress + efek suara
assets/         favicon.png
sfx/            navigation.wav, close-menu.mp3, menu-utama.mp3
```
