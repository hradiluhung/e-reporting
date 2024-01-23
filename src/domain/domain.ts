// Lembaga
type Lembaga = {
  _id: string
  nama: string
  tentang: string
  alamat: string
  kontak: string
  namaKontak: string
  image: string
  publicId: string
  feedbacks: [
    {
      pengirim: string
      isi: string
      jenis: string
      kontakPengirim: string
    }
  ]
  createdAt: string
  updatedAt: string
}

// SatwaRehabilitasi
type SatwaRehabilitasi = {
  _id: string
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  asalUsulSatwa: string
  lokasiRehabilitasi: string
  tanggalSerahTerima: Date
  kondisiSatwa: string
  status: string
  keterangan: string
  image: string
  publicId: string
  createdAt: string
  updatedAt: string
}

// PersebaranSatwa
type PersebaranSatwa = {
  _id: string
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  lokasiPelepasliaran: string
  koordinatPelepasliaran: string
  tanggalPelepasliaran: Date
  image: string
  publicId: string
  createdAt: string
  updatedAt: string
}

// Interkoneksi
type Interkoneksi = {
  _id: string
  namaPusatRehabilitasi: string
  personInCharge: string
  kontakPIC: string
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  asalUsul: string
  lokasiRehabilitasi: string
  tanggalSerahTerima: Date
  kondisiSatwa: string
  status: string
  keterangan: string
  image: string
  publicId: string
  createdAt: string
  updatedAt: string
}

// Publikasi
type Publikasi = {
  _id: string
  judul: string
  penulis: string
  tahun: string
  isi: string
  file: string
  fileName: string
  publicId: string
  createdAt: string
  updatedAt: string
}

// Gallery
type Gallery = {
  _id: string
  media: string
  publicId: string
  type: string
  lembaga: Lembaga
  createdAt: string
  updatedAt: string
}
