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

// CREATE LEMBAGA
export async function POST(request: Request) {
  await startDb()

  try {
    const reqBody = await request.json()
    const { nama, tentang, alamat, kontak, namaKontak } = reqBody

    const lembaga = await Lembaga.create({
      nama,
      tentang,
      alamat,
      kontak,
      namaKontak,
    })

    return NextResponse.json({
      status: 201,
      message: `Berhasil membuat lembaga ${lembaga.nama}`,
      data: lembaga,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
