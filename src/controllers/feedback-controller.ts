import axios from "axios"

// CREATE FEEDBACK BY ID LEMBAGA
export const createFeedback = async ({
  idLembaga,
  jenis,
  isi,
  pengirim,
  kontakPengirim,
}: {
  idLembaga: string
  jenis: string
  isi: string
  pengirim: string
  kontakPengirim: string
}) => {
  try {
    const response = await axios.post(`/api/feedback/lembaga/${idLembaga}`, {
      jenis,
      isi,
      pengirim,
      kontakPengirim,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

// GET FEEDBACK BY ID LEMBAGA
export const getFeedbackByIdLembaga = async (idLembaga: string) => {
  try {
    const response = await axios.get(`/api/feedback/lembaga/${idLembaga}`)
    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
