// Struktur Node untuk Linked List
class Node {
  constructor(nama, alamat, nik) {
    this.nama = nama;
    this.alamat = alamat;
    this.nik = nik;  
    this.next = null;
  }
}

// Kelas Linked List untuk rekapDismantle
class LinkedList {
  constructor() {
    this.head = null; 
    this.size = 0;    
  }

  // Menambahkan node baru ke Linked List (menggunakan pushArray)
  add(nama, alamat, nik) {
    const newNode = new Node(nama, alamat, nik);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode; 
    }
    this.size++;
  }

 // Fungsi untuk mendapatkan semua data dari LinkedList tanpa menggunakan push()
  getAll() {
    let current = this.head;
    const data = [];

    while (current) {
      // Menambahkan data dengan cara manual tanpa menggunakan push()
      if (data.length > 0) {
        data[data.length] = [current.nama, current.alamat, current.nik];
      } else {
        data[0] = [current.nama, current.alamat, current.nik];
      }
      current = current.next;
    }

    return data;  // Mengembalikan array data
  }

}

// Inisialisasi Linked List untuk rekapDismantle
const rekapDismantleList = new LinkedList();


// Fungsi Menambah Data ke Linked List (Fitur Push ke Stack)
function pushLinkedList(data) {
  const [nama, alamat, nik] = data;
  // Jika LinkedList kosong, data pertama dimasukkan
  if (!rekapDismantleList.head) {
    rekapDismantleList.add(nama, alamat, nik);
  } else {
    let current = rekapDismantleList.head;
    while (current.next) {
      current = current.next;
    }
    current.next = new Node(nama, alamat, nik);
    rekapDismantleList.size++;
  }
}



// Array pelanggan aktif (antrian/queue)
let pelangganAktif = [
  ["sasa", "Jl. Proklamasi No.1", "1122334411"],
  ["ratna", "Jl. Pahlawan No.2", "5566778822"],
  ["rura", "Jl. Proklamasi No.8", "1122334423"],
  ["hilmi", "Jl. Pahlawan No.9", "5566778445"],
  ["kasim", "Jl. Pahlawan No.10", "5566778499"]
];

// Fungsi Queue (Fitur Tambah Pelanggan)
let back = pelangganAktif.length;
let front = 0;

function isQueueEmpty() {
  return back === 0;
}

function enqueueArray(data) {
  if (!isQueueEmpty()) {
    pelangganAktif[pelangganAktif.length] = data;
    back++;
  } else {
    pelangganAktif[0] = data;
    front++;
    back++;
  }
  sortPelangganAktifByName();
}

function dequeuePelangganAktif(i) {
  if (!isQueueEmpty()) {
    for (let j = i; j < back - 1; j++) {
      pelangganAktif[j] = pelangganAktif[j + 1];
    }
    pelangganAktif.length = back - 1;
    back--;
  }
}


// Fungsi Bubble Sort (Mengurutkan Nama Pelanggan Aktif)
function sortPelangganAktifByName() {
  let length = pelangganAktif.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (pelangganAktif[j][0].localeCompare(pelangganAktif[j + 1][0]) > 0) {
        let temp = pelangganAktif[j];
        pelangganAktif[j] = pelangganAktif[j + 1];
        pelangganAktif[j + 1] = temp;
      }
    }
  }
}

// Fungsi pencarian pelanggan linier search
function searchPelanggan(targetName) {
  let found = false; 
  let result = null; 

  for (let i = 0; i < pelangganAktif.length; i++) {
    if (pelangganAktif[i][0].toLowerCase() === targetName.toLowerCase()) {
      result = pelangganAktif[i];
      found = true;
      break;
    }
  }

  if (!found) {
    alert(`Pelanggan dengan nama "${targetName}" tidak ditemukan.`);
  } else {
    alert(`Ditemukan pelanggan:\nNama: ${result[0]}\nAlamat: ${result[1]}\nNIK: ${result[2]}`);
  }
}

document.getElementById("formCariPelanggan").addEventListener("submit", (e) => {
  e.preventDefault();

  let inputField = document.getElementById("namaCariPelanggan");
  let targetName = inputField.value.trim();

  if (targetName.length > 0) {
    searchPelanggan(targetName); 
    inputField.value = ""; 
  } else {
    alert("Masukkan nama pelanggan yang ingin dicari.");
  }
});

// Fungsi Render Pelanggan Aktif
function renderPelangganAktif() {
  let pelangganAktifHtml = document.getElementById("pelangganAktif");
  pelangganAktifHtml.innerHTML = "";

  for (let i = 0; i < pelangganAktif.length; i++) {
    let item = pelangganAktif[i];
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

// Fungsi Tambah Data
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

// Fungsi Hapus Pelanggan (Dismantle)
function dismantlePelanggan(i) {
  let [nama, alamat, nik] = pelangganAktif[i];
  alert(`Berhasil menghapus pelanggan dengan NAMA ${nama}, ALAMAT ${alamat}, NIK ${nik}`);

  pushLinkedList([nama, alamat, nik]); 
  dequeuePelangganAktif(i); 

  renderPelangganAktif();
  renderRekapDismantle();
}

// Fungsi Render Rekap Dismantle (Linked List)
function renderRekapDismantle() {
  let pelangganDismantleHtml = document.getElementById("pelangganDismantle");
  pelangganDismantleHtml.innerHTML = "";

  const allData = rekapDismantleList.getAll();

  for (let i = 0; i < allData.length; i++) {
    let item = allData[i];
    let dismantle = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-dismantle-${i}" aria-expanded="false" aria-controls="flush-collapse-dismantle-${i}">
            ${i + 1}. ${item[0]}
          </button>
        </h2>
        <div id="flush-collapse-dismantle-${i}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            Alamat: ${item[1]}<br>
            NIK: ${item[2]}
          </div>
        </div>
      </div>
    `;
    pelangganDismantleHtml.insertAdjacentHTML("beforeend", dismantle);
  }
}

// Render data pelanggan awal
renderPelangganAktif();
renderRekapDismantle();