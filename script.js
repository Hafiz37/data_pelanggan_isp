// Array data pelanggan aktif
let pelangganAktif = [
  ["alviana", "ketandan", "0813"],
  ["adhel", "maospati", "0824"],
  ["fitria", "pagotan", "0872"],
  ["aura", "ngariboyo", "0843"],
];

// Array untuk merekap pengurangan barang
let rekapDismantle = [];

// Fungsi untuk menampilkan data barang
function tampilkanPelangganAktif() {
  console.log("Data Pelanggan Aktif:");
  pelangganAktif.forEach((item, i) => {
    console.log(
      `${i + 1}. nama: ${item[0]} - alamat: ${item[1]} - NIK: ${item[2]}`
    );
  });
}

// Fungsi untuk menambah pelanggan
function pelangganBaru(nama, alamat, nik) {
  let nikExists = false;
  pelangganAktif.forEach((item) => {
    if (nik === item[2]) {
      nikExists = true;
    }
  });

  if (nikExists) {
    console.log(`NIK ${nik} sudah terdaftar, coba masukkan data lainnya`);
  } else {
    pelangganAktif.push([nama, alamat, nik]);
    console.log(
      `Berhasil menambahkan = NAMA ${nama}, ALAMAT ${alamat}, NIK ${nik}`
    );
  }
}

// Fungsi untuk menghapus pelanggan berdasarkan NIK
function pelangganDismantle(nik) {
  pelangganAktif.forEach((item, i) => {
    if (nik === item[2]) {
      pelangganAktif.splice(i, 1);
      console.log(
        `Berhasil menghapus pelanggan dengan NAMA ${item[0]}, ALAMAT ${item[1]}, NIK ${item[2]}`
      );
      rekapDismantle.push([item[0], item[1], item[2]]);
    }
  });
}

function tampilkanRekapDismantle() {
  if (rekapDismantle.length == 0) {
    console.log("Belum ada pengurangan");
  } else {
    console.log("rekap dismantle :");
    rekapDismantle.forEach((item, i) => {
      console.log(
        `${i + 1}. NAMA ${item[0]}, ALAMAT ${item[1]}, NIK ${item[2]}`
      );
    });
  }
}
