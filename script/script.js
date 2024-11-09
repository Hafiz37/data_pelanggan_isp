// Queue untuk pelanggan aktif
let pelangganAktif = [
  ["Budi", "Jl. Merdeka No.1", "1234567890"],
  ["Siti", "Jl. Kemerdekaan No.2", "0987654321"]
]; // Inisialisasi dengan beberapa data awal

// Stack untuk rekapDismantle
let rekapDismantle = [
  ["Andi", "Jl. Proklamasi No.3", "1122334455"],
  ["Dewi", "Jl. Pahlawan No.4", "5566778899"]
]; // Inisialisasi dengan beberapa data awal

// Fungsi queue untuk pelanggan aktif
function isQueueEmpty() {
  return pelangganAktif.length === 0;
}

function countQueue() {
  return pelangganAktif.length;
}

function enqueueArray(data) {
  pelangganAktif.push(data);
}

function dequeueArray() {
  if (!isQueueEmpty()) {
    return pelangganAktif.shift();
  } else {
    console.log("Data pelanggan kosong!");
    return null;
  }
}

// Fungsi stack untuk rekapDismantle
function isStackEmpty() {
  return rekapDismantle.length === 0;
}

function countStack() {
  return rekapDismantle.length;
}

function pushArray(data) {
  rekapDismantle.unshift(data); // Menambah data di depan array untuk simulasi stack
}

function popArray() {
  if (!isStackEmpty()) {
    return rekapDismantle.shift();
  } else {
    console.log("Data stack kosong!");
    return null;
  }
}

// Fungsi untuk menampilkan data pelanggan aktif
function renderPelangganAktif() {
  let pelangganAktifHtml = document.getElementById("pelangganAktif");
  pelangganAktifHtml.innerHTML = "";

  for (let i = 0; i < pelangganAktif.length; i++) {
    let item = pelangganAktif[i];
    if (item) {
      let pelanggan = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${i}" aria-expanded="false" aria-controls="flush-collapse-${i}">
            ${i + 1}. ${item[0]}
          </button>
        </h2>
        <div id="flush-collapse-${i}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            Alamat: ${item[1]}<br>
            NIK: ${item[2]}<br><br>
            <button type="button" class="btn btn-outline-danger" onclick="dismantlePelanggan(${i})">Dismantle</button>
          </div>
        </div>
      </div>
      `;
      pelangganAktifHtml.insertAdjacentHTML("beforeend", pelanggan);
    }
  }
}

// Fungsi untuk menambahkan pelanggan baru
let submit = document.getElementById("btnKirimBaru");
submit.addEventListener("click", (e) => {
  e.preventDefault();

  let namaPelanggan = document.getElementById("namaPelanggan").value;
  let alamatPelanggan = document.getElementById("alamatPelanggan").value;
  let nikPelanggan = document.getElementById("nikPelanggan").value;

  let nikExists = pelangganAktif.some(item => item && item[2] === nikPelanggan);

  if (namaPelanggan.length === 0 || nikPelanggan.length === 0 || alamatPelanggan.length === 0) {
    alert("Anda belum memasukkan data");
  } else if (nikExists) {
    alert(`NIK ${nikPelanggan} sudah terdaftar, coba masukkan data lainnya`);
  } else {
    enqueueArray([namaPelanggan, alamatPelanggan, nikPelanggan]);
    alert("Pelanggan berhasil ditambahkan!");
  }

  renderPelangganAktif();
  document.getElementById("formPelangganBaru").reset();
});

// Fungsi untuk menghapus pelanggan pada indeks tertentu
function dismantlePelanggan(i) {
  if (i < 0 || i >= pelangganAktif.length) {
    alert("Indeks tidak valid!");
    return;
  }

  let [nama, alamat, nik] = pelangganAktif[i];
  alert(`Berhasil menghapus pelanggan dengan NAMA ${nama}, ALAMAT ${alamat}, NIK ${nik}`);

  // Masukkan data pelanggan ke rekapDismantle di depan (menggunakan stack)
  pushArray([nama, alamat, nik]);

  // Hapus pelanggan dari queue pelangganAktif
  pelangganAktif.splice(i, 1);

  renderPelangganAktif();
  renderRekapDismantle();
}

// Fungsi untuk menampilkan data pelanggan yang telah dihapus (rekapDismantle)
function renderRekapDismantle() {
  let pelangganDismantleHtml = document.getElementById("pelangganDismantle");
  pelangganDismantleHtml.innerHTML = "";

  for (let i = 0; i < rekapDismantle.length; i++) {
    let item = rekapDismantle[i];
    if (item) {
      let pelanggan = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#dismantle-collapse-${i}" aria-expanded="false" aria-controls="dismantle-collapse-${i}">
            ${i + 1}. ${item[0]}
          </button>
        </h2>
        <div id="dismantle-collapse-${i}" class="accordion-collapse collapse" data-bs-parent="#accordionDismantleExample">
          <div class="accordion-body">
            Alamat: ${item[1]}<br>
            NIK: ${item[2]}<br><br>
          </div>
        </div>
      </div>
      `;
      pelangganDismantleHtml.insertAdjacentHTML("beforeend", pelanggan);
    }
  }
}

// Inisialisasi awal
renderPelangganAktif();
renderRekapDismantle();
