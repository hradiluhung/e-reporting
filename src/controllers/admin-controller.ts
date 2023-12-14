import axios from "axios"

// SIGN UP
export const signUp = async (newUser: {
  username: string
  password: string
}) => {
  try {
    const response = await axios.post("/api/auth/admin", newUser)

    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}
