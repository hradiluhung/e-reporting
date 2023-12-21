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
