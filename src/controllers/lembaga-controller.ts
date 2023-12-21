import axios from "axios"

// GET ALL LEMBAGA
export const getAllLembaga = async () => {
  try {
    const response = await axios.get("/api/lembaga")
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// CREATE LEMBAGA
export const createLembaga = async ({
  nama,
  tentang,
  alamat,
  kontak,
  namaKontak,
  image,
  publicId,
}: {
  nama: string
  tentang: string
  alamat: string
  kontak: string
  namaKontak: string
  image: string
  publicId: string
}) => {
  try {
    const response = await axios.post("/api/lembaga", {
      nama,
      tentang,
      alamat,
      kontak,
      namaKontak,
      image,
      publicId,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// DELETE LEMBAGA BY ID
export const deleteLembagaById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/lembaga/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
