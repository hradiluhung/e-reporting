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
