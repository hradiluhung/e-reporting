import startDb from "@/db/dbConfig"
import Admin from "@/models/admin"
import { compare } from "bcrypt-ts"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const comparePassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        await startDb()

        const admin = await Admin.findOne({ username })
        if (!admin) throw Error("Admin tidak ditemukan")

        const passwordMatch = await comparePassword(password, admin.password)
        if (!passwordMatch) throw Error("Password salah")

        return {
          id: admin._id,
          username: admin.username,
        }
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      return params.token
    },
    session({ session, token }) {
      if (session.user) {
        ;(session.user as { id: string }).id = token.id as string
      }
      return session
    },
  },
}
