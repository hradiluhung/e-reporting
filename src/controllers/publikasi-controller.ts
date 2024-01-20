import axios from "axios"

// GET ALL PUBLIKASI
export const getAllPublikasi = async () => {
  try {
    const response = await axios.get("/api/publikasi")
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// CREATE PUBLIKASI
export const createPublikasi = async ({
  judul,
  penulis,
  tahun,
  isi,
  image,
  publicId,
}: {
  judul: string
  penulis: string
  tahun: string
  isi: string
  image: string
  publicId: string
}) => {
  try {
    const response = await axios.post("/api/publikasi", {
      judul,
      penulis,
      tahun,
      isi,
      image,
      publicId,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// DELETE LEMBAGA BY ID
export const deletePublikasiById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/publikasi/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET LEMBAGA BY ID
export const getPublikasiById = async (id: string) => {
  try {
    const response = await axios.get(`/api/publikasi/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// UPDATE LEMBAGA BY ID
export const updatePublikasiById = async ({
  id,
  judul,
  penulis,
  tahun,
  isi,
  image,
  publicId,
}: {
  id: string
  judul: string
  penulis: string
  tahun: string
  isi: string
  image: string
  publicId: string
}) => {
  try {
    const response = await axios.put(`/api/publikasi/${id}`, {
      judul,
      penulis,
      tahun,
      isi,
      image,
      publicId,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
