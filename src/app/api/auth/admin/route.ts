import startDb from "@/db/dbConfig"
import Admin from "@/models/admin"
import { NextResponse } from "next/server"
import { hashPassword } from "@/helpers/hashPassword"

export const dynamic = "force-dynamic"

interface NewUserRequest {
  username: string
  name: string
  angkatan: number
  password: string
}

interface NewAdminResponse {
  id: string
  username: string
}

type NewResponse = NextResponse<{ admin?: NewAdminResponse; error?: string }>

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest

  await startDb()

  const oldAdmin = await Admin.findOne({ username: body.username })
  if (oldAdmin)
    return NextResponse.json({ status: 422, error: "Username sudah digunakan" })

  body.password = await hashPassword(body.password)
  const user = await Admin.create({ ...body })

  return NextResponse.json({
    status: 201,
    message: `Berhasil membuat akun ${user.username}`,
    admin: {
      id: user._id,
      username: user.username,
    },
  })
}
