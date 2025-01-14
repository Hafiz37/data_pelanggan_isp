let pelangganAktif = [
  ["sasa", "Jl. Proklamasi No.1", "1122334411"],
  ["ratna", "Jl. Pahlawan No.2", "5566778822"],
  ["rura", "Jl. Proklamasi No.8", "1122334423"],
  ["hilmi", "Jl. Pahlawan No.9", "5566778445"],
  ["kasim", "Jl. Pahlawan No.10", "5566778499"]
]; 

// fungsi queue (fitur tambah pelanggan)
let back = pelangganAktif.length
let front = 0

function isQueueEmpty() {
  return back === 0;
}

function countQueue() {
  if(isQueueEmpty()){
    return 0 
  } else {
    return back
  }
}

function destroyQueue(){
  for (let i = 0; i < pelangganAktif.length; i++) {
    pelangganAktif[i] = ''    
  }
  front = 0
  back = 0
}

function enqueueArray(data) {
  if (!isQueueEmpty()){
    pelangganAktif[pelangganAktif.length] = data;
    back++
  } else {
    pelangganAktif[0] = data
    front++
    back++
  }
  sortPelangganAktifByName()
}


function dequeuePelangganAktif(i) {
  if (!isQueueEmpty()) {
    for (let j = i; j < back - 1; j++) {
      pelangganAktif[j] = pelangganAktif[j + 1];
    }
    // pelangganAktif[back - 1] = '';
    pelangganAktif.length = back - 1; 
    back--; 
  } else {
    alert("Data Masih kosong");
  }
}





let rekapDismantle = [
  ["Andi", "Jl. Proklamasi No.3", "1122334455"],
  ["Dewi", "Jl. Pahlawan No.4", "5566778899"],
  ["anan", "Jl. Proklamasi No.5", "1122334412"],
  ["manda", "Jl. Pahlawan No.6", "5566778439"],
  ["nando", "Jl. Pahlawan No.7", "5566778431"]
];

// Fungsi stack (fitur dismantle)
let topStack = 0
function isStackEmpty() {
  return rekapDismantle.length === 0;
}


function pushArray(data) {
  if(!isStackEmpty()){
        rekapDismantle[rekapDismantle.length] = data;
        topStack++
  }else{
    rekapDismantle[0] = data
  }
}


// fungsi bubble sort, mengurutkan alfabet nama pelanggan aktif
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



// fungsi linier search, mencari data yang diketikkan
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
    alert(`Ditemukan pelanggan:\nNama: ${result[0]}, Alamat: ${result[1]}, NIK: ${result[2]}`);
  }
}

let formCariPelanggan = document.getElementById("formCariPelanggan");
let searchButton = document.getElementById("btnCariPelanggan");

formCariPelanggan.addEventListener("submit", (e) => {
  e.preventDefault(); 
  let namaCari = document.getElementById("namaCariPelanggan").value;
  searchPelanggan(namaCari);
  formCariPelanggan.reset();
});



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



// fungsi tambah data
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



// Fungsi menghapus pelanggan
function dismantlePelanggan(i) {
  if (i < 0 || i >= pelangganAktif.length) {
    alert("Indeks tidak valid!");
    return;
  }

  let [nama, alamat, nik] = pelangganAktif[i];
  alert(`Berhasil menghapus pelanggan dengan NAMA ${nama}, ALAMAT ${alamat}, NIK ${nik}`);

  pushArray([nama, alamat, nik]);

  // pelangganAktif.splice(i, 1);
  dequeuePelangganAktif(i)

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