import startDb from "@/db/dbConfig"
import Gallery from "@/models/gallery"
import Lembaga from "@/models/lembaga"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET ALL GALLERY
export async function GET() {
  try {
    await startDb()

    const gallery = await Gallery.find()

    const galleryWithLembaga = await Promise.all(
      gallery.map(async (item) => {
        const lembaga = await Lembaga.findById(item.idLembaga)
        return { ...item.toJSON(), lembaga }
      })
    )

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan data lembaga",
      data: galleryWithLembaga,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// CREATE GALLERY
export async function POST(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()

    const gallery = await Gallery.create(reqBody)

    return NextResponse.json({
      status: 201,
      message: `Berhasil membuat gallery`,
      data: gallery,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
