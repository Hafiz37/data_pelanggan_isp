// Array data pelanggan aktif
let pelangganAktif = [
  ["alviana", "ketandan", "0813"],
  ["adhel", "maospati", "0824"],
  ["fitria", "pagotan", "0872"],
  ["aura", "ngariboyo", "0843"],
];

// Array untuk merekap pelanggan dismantle
let rekapDismantle = [];

// Fungsi untuk menampilkan semua data pelanggan aktif
function renderPelangganAktif() {
  let pelangganAktifHtml = document.getElementById("pelangganAktif");
  pelangganAktifHtml.innerHTML = "";

  pelangganAktif.forEach((item, i) => {
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
  });
}

// Fungsi untuk menambah pelanggan
document.getElementById("formPelangganBaru").addEventListener("submit", (e) => {
  e.preventDefault();

  let namaPelanggan = document.getElementById("namaPelanggan").value;
  let nikPelanggan = document.getElementById("nikPelanggan").value;
  let alamatPelanggan = document.getElementById("alamatPelanggan").value;

  let nikExists = false;
  pelangganAktif.forEach((item) => {
    if (nikPelanggan === item[2]) {
      nikExists = true;
    }
  });

  if (nikExists) {
    alert(`NIK ${nikPelanggan} sudah terdaftar, coba masukkan data lainnya`);
  } else {
    pelangganAktif.push([namaPelanggan, alamatPelanggan, nikPelanggan]);
    renderPelangganAktif();
  }

  document.getElementById("formPelangganBaru").reset();
});

// Fungsi untuk menghapus pelanggan berdasarkan indeks
function dismantlePelanggan(i) {
  let [nama, alamat, nik] = pelangganAktif[i];
  alert(
    `Berhasil menghapus pelanggan dengan NAMA ${nama}, ALAMAT ${alamat}, NIK ${nik}`
  );
  rekapDismantle.push([nama, alamat, nik]);
  pelangganAktif.splice(i, 1);
  renderPelangganAktif();
  renderRekapDismantle();
}

function renderRekapDismantle() {
  let pelangganDismantleHtml = document.getElementById("pelangganDismantle");
  pelangganDismantleHtml.innerHTML = ""; // Bersihkan konten sebelumnya

  rekapDismantle.forEach((item, i) => {
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
  });
}

renderPelangganAktif();
renderRekapDismantle();
