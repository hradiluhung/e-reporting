import axios from "axios"

// GET ALL GALLERY
export const getAllGallery = async () => {
  try {
    const response = await axios.get("/api/gallery")
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// CREATE GALLERY
export const createGallery = async ({
  media,
  publicId,
  type,
  idLembaga,
}: {
  media: string
  publicId: string
  type: string
  idLembaga: string
}) => {
  try {
    const response = await axios.post("/api/gallery", {
      media,
      publicId,
      type,
      idLembaga,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// DELETE GALLERY BY ID
export const deleteGalleryById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/gallery/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET GALLERY BY ID
export const getGalleryById = async (id: string) => {
  try {
    const response = await axios.get(`/api/gallery/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// UPDATE GALLERY BY ID
export const updateGalleryById = async ({
  id,
  media,
  publicId,
  type,
  idLembaga,
}: {
  id: string
  media: string
  publicId: string
  type: string
  idLembaga: string
}) => {
  try {
    const response = await axios.put(`/api/gallery/${id}`, {
      media,
      publicId,
      type,
      idLembaga,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
