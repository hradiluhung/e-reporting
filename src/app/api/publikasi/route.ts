import startDb from "@/db/dbConfig"
import Publikasi from "@/models/publikasi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET ALL PUBLIKASI
export async function GET() {
  try {
    await startDb()

    const publikasis = await Publikasi.find()

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan data publikasi",
      data: publikasis,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// CREATE PUBLIKASI
export async function POST(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()
    const { judul, penulis, tahun, isi, image, publicId } = reqBody

    const publikasi = await Publikasi.create({
      judul,
      penulis,
      tahun,
      isi,
      image,
      publicId,
    })

    return NextResponse.json({
      status: 201,
      message: `Berhasil membuat publikasi ${publikasi.judul}`,
      data: publikasi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
