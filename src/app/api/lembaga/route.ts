import startDb from "@/db/dbConfig"
import Lembaga from "@/models/lembaga"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET ALL LEMBAGA
export async function GET() {
  try {
    await startDb()

    const lembagas = await Lembaga.find()

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan data lembaga",
      data: lembagas,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
