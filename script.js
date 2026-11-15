const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const progressFill = document.getElementById('progress-fill');
const progressAngka = document.getElementById('progress-angka');
const statTotal = document.getElementById('stat-total');
const statSelesai = document.getElementById('stat-selesai');
const statBelum = document.getElementById('stat-belum');
const elTanggal = document.getElementById('tanggal');

// Ambil tugas dari penyimpanan browser, atau kosong kalau belum ada
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function simpan() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Efek suara sederhana; error ditelan agar tidak crash saat autoplay diblokir browser
function bunyi(file, volume = 1) {
  try {
    const audio = new Audio(file);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch {
    // Audio tidak tersedia -> abaikan
  }
}

// R-39: nama aksesibel tombol teks menyebut aksi DAN isi tugasnya, jadi pembaca layar tetap tahu tugas mana
function labelAksesibel(tugas) {
  return `${tugas.selesai ? 'Tandai belum selesai' : 'Tandai selesai'}: ${tugas.teks}`;
}

// Satu pembaru untuk progress bar dan tiga angka statistik di panel kiri
function updateProgress() {
  const selesai = tasks.filter((t) => t.selesai).length;
  const persen = tasks.length ? Math.round((selesai / tasks.length) * 100) : 0;
  progressFill.style.width = `${persen}%`;
  progressAngka.textContent = `${persen}%`;
  statTotal.textContent = tasks.length;
  statSelesai.textContent = selesai;
  statBelum.textContent = tasks.length - selesai;
}

function buatItem(tugas) {
  const li = document.createElement('li');
  li.className = 'todo-item' + (tugas.selesai ? ' completed' : '');

  // <button type="button"> asli: Enter/Space otomatis berfungsi tanpa handler tambahan (R-39)
  const teks = document.createElement('button');
  teks.type = 'button';
  teks.className = 'teks';
  teks.textContent = tugas.teks;
  teks.setAttribute('aria-label', labelAksesibel(tugas));
  teks.onclick = () => tandaiSelesai(tugas, li);

  const aksi = document.createElement('div');
  aksi.className = 'aksi';

  const toggle = document.createElement('button');
  toggle.className = 'toggle';
  toggle.textContent = tugas.selesai ? 'Kembalikan' : 'Selesai';
  toggle.onclick = () => tandaiSelesai(tugas, li);

  const hapus = document.createElement('button');
  hapus.className = 'hapus';
  hapus.textContent = 'Hapus';
  hapus.onclick = () => hapusTugas(tugas, li);

  aksi.appendChild(toggle);
  aksi.appendChild(hapus);
  li.appendChild(teks);
  li.appendChild(aksi);
  return li;
}

function tampilkan({ animasi = false, mulaiDari = 0 } = {}) {
  list.innerHTML = '';

  tasks.forEach((tugas, index) => {
    const li = buatItem(tugas);
    if (animasi && index >= mulaiDari) {
      li.classList.add('masuk');
      li.style.animationDelay = `${(index - mulaiDari) * 60}ms`;
    }
    list.appendChild(li);
  });

  // R-27: pesan daftar kosong tampil hanya saat tidak ada tugas
  emptyState.hidden = tasks.length > 0;
  updateProgress();
}

function tambahTugas(event) {
  event.preventDefault();
  const teks = input.value.trim();
  if (!teks) return;

  tasks.push({ teks, selesai: false });
  input.value = '';
  simpan();
  bunyi('sfx/navigation.wav');
  // Hanya item baru yang slide-up, item lama tetap diam
  tampilkan({ animasi: true, mulaiDari: tasks.length - 1 });
}

function tandaiSelesai(tugas, li) {
  tugas.selesai = !tugas.selesai;
  simpan();
  updateProgress();
  bunyi('sfx/navigation.wav');
  // Update elemen di tempat (tanpa render ulang) supaya transisi CSS 0.3s terlihat
  li.classList.toggle('completed', tugas.selesai);
  li.querySelector('.teks').setAttribute('aria-label', labelAksesibel(tugas));
  li.querySelector('.toggle').textContent = tugas.selesai ? 'Kembalikan' : 'Selesai';
}

function hapusTugas(tugas, li) {
  const i = tasks.indexOf(tugas);
  if (i === -1) return;
  // Data dihapus dulu supaya progress bar turun seketika, baru animasi keluar
  tasks.splice(i, 1);
  simpan();
  updateProgress();
  bunyi('sfx/close-menu.mp3');
  li.classList.add('keluar');
  // Tunggu animasi 0.25s selesai sebelum render ulang daftar
  setTimeout(tampilkan, 250);
}

form.onsubmit = tambahTugas;

// Suara hover tombol (opsional, volume rendah); mainkan hanya saat kursor MASUK ke tombol
document.addEventListener('mouseover', (e) => {
  const tombol = e.target.closest('button');
  if (tombol && !(e.relatedTarget && e.relatedTarget.closest('button') === tombol)) {
    bunyi('sfx/navigation.wav', 0.4);
  }
});

// Tanggal hari ini berformat Indonesia, cukup dihitung sekali saat halaman dibuka
elTanggal.textContent = new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

// Tampilkan tugas tersimpan tanpa animasi (MOTION 2: animasi hanya saat tambah/hapus/toggle)
tampilkan();
