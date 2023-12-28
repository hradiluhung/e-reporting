import axios from "axios"

// CREATE SATWA REHABILITASI
export const createSatwaRehabilitasi = async ({
  jenisSatwa,
  namaIlmiah,
  idSatwa,
  statusDilindungi,
  statusEndemik,
  asalUsulSatwa,
  lokasiRehabilitasi,
  tanggalSerahTerima,
  kondisiSatwa,
  status,
  keterangan,
  image,
  publicId,
}: {
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  asalUsulSatwa: string
  lokasiRehabilitasi: string
  tanggalSerahTerima: string
  kondisiSatwa: string
  status: string
  keterangan: string
  image?: string
  publicId?: string
}) => {
  try {
    const response = await axios.post("/api/satwa-rehab", {
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      asalUsulSatwa,
      lokasiRehabilitasi,
      tanggalSerahTerima,
      kondisiSatwa,
      status,
      keterangan,
      image,
      publicId,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET ALL SATWA REHABILITASI
export const getAllSatwaRehabilitasi = async () => {
  try {
    const response = await axios.get("/api/satwa-rehab")
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
