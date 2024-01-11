import axios from "axios"

// CREATE INTERKONEKSI
export const createInterkoneksi = async ({
  namaPusatRehabilitasi,
  personInCharge,
  kontakHp,
  kontakEmail,
  jenisSatwa,
  namaIlmiah,
  idSatwa,
  statusDilindungi,
  statusEndemik,
  asalUsul,
  lokasiRehabilitasi,
  tanggalSerahTerima,
  kondisiSatwa,
  status,
  keterangan,
  image,
  publicId,
}: {
  namaPusatRehabilitasi: string
  personInCharge: string
  kontakHp: string
  kontakEmail: string
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  asalUsul: string
  lokasiRehabilitasi: string
  tanggalSerahTerima: string
  kondisiSatwa: string
  status: string
  keterangan: string
  image?: string
  publicId?: string
}) => {
  try {
    const response = await axios.post("/api/interkoneksi", {
      namaPusatRehabilitasi,
      personInCharge,
      kontakHp,
      kontakEmail,
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      asalUsul,
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

// GET ALL INTERKONEKSI
export const getAllInterkoneksi = async () => {
  try {
    const response = await axios.get("/api/interkoneksi")
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// DELETE INTERKONEKSI BY ID
export const deleteInterkoneksiById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/interkoneksi/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET INTERKONEKSI BY ID
export const getInterkoneksiById = async (id: string) => {
  try {
    const response = await axios.get(`/api/interkoneksi/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// UPDATE INTERKONEKSI BY ID
export const updateInterkoneksiById = async ({
  id,
  namaPusatRehabilitasi,
  personInCharge,
  kontakHp,
  kontakEmail,
  jenisSatwa,
  namaIlmiah,
  idSatwa,
  statusDilindungi,
  statusEndemik,
  asalUsul,
  lokasiRehabilitasi,
  tanggalSerahTerima,
  kondisiSatwa,
  status,
  keterangan,
  image,
  publicId,
}: {
  id: string
  namaPusatRehabilitasi: string
  personInCharge: string
  kontakHp: string
  kontakEmail: string
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  asalUsul: string
  lokasiRehabilitasi: string
  tanggalSerahTerima: string
  kondisiSatwa: string
  status: string
  keterangan: string
  image?: string
  publicId?: string
}) => {
  try {
    const response = await axios.put(`/api/interkoneksi/${id}`, {
      namaPusatRehabilitasi,
      personInCharge,
      kontakHp,
      kontakEmail,
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      asalUsul,
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
