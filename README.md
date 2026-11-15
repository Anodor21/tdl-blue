# To Do List

To-Do List sederhana dengan visual terinspirasi UI: navy dalam `#001233`, biru laut cerah `#16cffb`, merah `#e60024`, panel miring (skew) dengan border tegas dan shadow komik.

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
