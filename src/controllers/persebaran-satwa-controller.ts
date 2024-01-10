import axios from "axios"

// CREATE PERSEBARAN SATWA
export const createPersebaranSatwa = async ({
  jenisSatwa,
  namaIlmiah,
  idSatwa,
  statusDilindungi,
  statusEndemik,
  lokasiPelepasliaran,
  koordinatPelepasliaran,
  tanggalPelepasliaran,
  image,
  publicId,
}: {
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  lokasiPelepasliaran: string
  koordinatPelepasliaran: string
  tanggalPelepasliaran: string
  image?: string
  publicId?: string
}) => {
  try {
    const response = await axios.post("/api/persebaran-satwa", {
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      lokasiPelepasliaran,
      koordinatPelepasliaran,
      tanggalPelepasliaran,
      image,
      publicId,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET ALL PERSEBARAN SATWA
export const getAllPersebaranSatwa = async () => {
  try {
    const response = await axios.get("/api/persebaran-satwa")
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// DELETE PERSEBARAN SATWA BY ID
export const deletePersebaranSatwaById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/persebaran-satwa/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET PERSEBARAN SATWA BY ID
export const getPersebaranSatwaById = async (id: string) => {
  try {
    const response = await axios.get(`/api/persebaran-satwa/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// UPDATE PERSEBARAN SATWA BY ID
export const updatePersebaranSatwaById = async ({
  id,
  jenisSatwa,
  namaIlmiah,
  idSatwa,
  statusDilindungi,
  statusEndemik,
  lokasiPelepasliaran,
  koordinatPelepasliaran,
  tanggalPelepasliaran,
  image,
  publicId,
}: {
  id: string
  jenisSatwa: string
  namaIlmiah: string
  idSatwa: string
  statusDilindungi: string
  statusEndemik: string
  lokasiPelepasliaran: string
  koordinatPelepasliaran: string
  tanggalPelepasliaran: string
  image?: string
  publicId?: string
}) => {
  try {
    const response = await axios.put(`/api/persebaran-satwa/${id}`, {
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      lokasiPelepasliaran,
      koordinatPelepasliaran,
      tanggalPelepasliaran,
      image,
      publicId,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
