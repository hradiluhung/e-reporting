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
  image: string
  publicId: string
  createdAt: string
  updatedAt: string
}
