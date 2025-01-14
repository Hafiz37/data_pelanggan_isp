let pelangganAktif= [
  ["dinda", "malang", "1122334411"],
  ["anas", "nganjuk", "1122334422"],
  ["alviana", "jombang", "1122334433"],
  ["nanda", "magetan", "1122334455"]
]


let back = pelangganAktif.length

function isQueueEmpty(){
  return back ===  0
}



function tambahPelanggan(nama, alamat, nik){
  const data = [nama, alamat, nik]

  if(!isQueueEmpty()){
    pelangganAktif[back] = data
    back++
  } else {
    pelangganAktif[0] = data
    back++
  }
}



function renderPelangganAktif(){
  sortPelangganAktifByName()
  if(!isQueueEmpty()){
    console.log(`Data Pelanggan aktif`);
    pelangganAktif.forEach((item, index) => {
      console.log(`${index + 1}. Nama :  ${item[0]}, Alamat : ${item[1]}, NIK : ${item[2]}`);
    })
  } else {
    console.log(`Tidak ada pelanggan yang aktif`);
  }
}



function sortPelangganAktifByName(){
  let length = pelangganAktif.length
  for(let i = 0 ; i < length -1 ; i++){
    for(let j = 0 ; j < length -1 ; j++){
      if(pelangganAktif[j][0].localeCompare(pelangganAktif[j + 1][0]) > 0){
        let temp = pelangganAktif[j]
        pelangganAktif[j] = pelangganAktif[j + 1]
        pelangganAktif[j +1] = temp
      }
    }
  }
}


let rekapDismantle = []
let topStack = -1

function isStackEmpty(){
  return topStack === -1
}

function pushArray(data){
  if(!isStackEmpty()){
    topStack++
    rekapDismantle[topStack] = data
  } else {
    topStack = 0
    rekapDismantle[topStack] = data
  }
}

function popArray(){
  if(!isStackEmpty()){
    const data = rekapDismantle[topStack];
    rekapDismantle.length = topStack
    topStack--
  } else {
    console.log(`Stack masuk kosong`);
    return null
  }
}



class Node {
  constructor(data){
    this.data = data
    this.next = null
  }
}

class LinkedList{
  constructor(){
    this.head = null
    this.size = 0
  }

  add(data){
    const newNode = new Node(data)
    if(!this.head){
      this.head = newNode
    } else {
      let current = this.head
      while(current.next){
        current = current.next
      }
      current.next = newNode
    }
    this.size++
  }

  getAll(){
    const data = []
    let current = this.head
    while(current){
      data.push(current.data)
      current = current.next
    }
    return data
  }

  render(){
    const allData = this.getAll()
    console.log(`Daftar data dalam Lingked List`);
    allData.forEach((item, index) =>{
      console.log(`${index+1}. Nama : ${item[0]}, Alamat : ${item[1]}, NIK ${item[2]}`);
    })
  }
}

const rekapDismantleList = new LinkedList()

function dismantlePelanggan(namaPelanggan){
  let index = -1
  for(let i = 0 ; i < pelangganAktif.length ; i++){
    if(pelangganAktif[i][0].toLocaleLowerCase() === namaPelanggan.toLocaleLowerCase()){
      index = i
      break
    }
  }

  if(index !== -1){
    const [nama, alamat, nik] = pelangganAktif[index]
    console.log(`Berhasil menghapus pelanggan : \nNama : ${nama}\nAlamat : ${alamat}\nNIK : ${nik}`);

    pushArray([nama, alamat, nik])

    rekapDismantleList.add([nama, alamat, nik])

    for(let j = index ; j < pelangganAktif.length ; j++){
      pelangganAktif[j] = pelangganAktif[j + 1]
    }
    pelangganAktif.length--
    back--
  } else {
    console.log(`Pelanggan dengan nama ${namaPelanggan} tidak ditemukan`);
  }
}


function renderRekapDismantleList(){
  rekapDismantleList.render()
}


function searchPelanggan(targetName){
  let found = false
  let result = null

  for(let i = 0 ; i < pelangganAktif.length ; i++){
    if(pelangganAktif[i][0].toLocaleLowerCase() === targetName.toLocaleLowerCase()){
      result = pelangganAktif[i]
      found = true
      break
    }
  }

  if(!found){
    console.log(`Pelanggan dengan nama ${targetName} tidak ditemukan`);
  } else {
    console.log(`Ditemukan pelanggan : \nNama : ${result[0]}\nAlamat : ${result[1]}\nNIK : ${result[2]}`);
  }
}