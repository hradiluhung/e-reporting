import startDb from "@/db/dbConfig"
import Feedback from "@/models/feedback"
import Lembaga from "@/models/lembaga"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET ALL LEMBAGA
export async function GET() {
  try {
    await startDb()

    const lembagas = await Lembaga.find()

    // get feedback for each lembaga
    const lembagasWithFeedback = await Promise.all(
      lembagas.map(async (lembaga) => {
        const feedbacks = await Feedback.find({ lembaga: lembaga._id })
        return { ...lembaga._doc, feedbacks }
      })
    )

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan data lembaga",
      data: lembagasWithFeedback,
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
    const { nama, tentang, alamat, kontak, namaKontak, image, publicId } =
      reqBody

    const lembaga = await Lembaga.create({
      nama,
      tentang,
      alamat,
      kontak,
      namaKontak,
      image,
      publicId,
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
