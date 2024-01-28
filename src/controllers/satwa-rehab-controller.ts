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

// DELETE SATWA REHABILITASI BY ID
export const deleteSatwaRehabById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/satwa-rehab/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET SATWA REHABILITASI BY ID
export const getSatwaRehabById = async (id: string) => {
  try {
    const response = await axios.get(`/api/satwa-rehab/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// UPDATE SATWA REHABILITASI BY ID
export const updateSatwaRehabById = async ({
  id,
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
  id: string
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
    const response = await axios.put(`/api/satwa-rehab/${id}`, {
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

// CREATE MULTIPLE SATWA REHABILITASI
export const createMultipleSatwaRehabilitasi = async (data: any) => {
  try {
    const response = await axios.post("/api/satwa-rehab/multiple", data)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// DELETE MULTIPLE SATWA REHABILITASI
export const deleteMultipleSatwaRehabilitasi = async (data: any) => {
  try {
    const response = await axios.delete("/api/satwa-rehab/multiple", { data })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
