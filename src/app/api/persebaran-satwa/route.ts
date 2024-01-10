import startDb from "@/db/dbConfig"
import PersebaranSatwa from "@/models/persebaran-satwa"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET ALL PERSEBARAN SATWA
export async function GET() {
  try {
    await startDb()

    const persebaranSatwa = await PersebaranSatwa.find()

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan data persebaran satwa",
      data: persebaranSatwa,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// CREATE PERSEBARAN SATWA
export async function POST(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()
    const {
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      lokasiPelepasliaran,
      koordinatPelepasliaran,
      tanggalPelepasliaran,
      image,
      publicId,
    } = reqBody

    const persebaranSatwa = await PersebaranSatwa.create({
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      lokasiPelepasliaran,
      koordinatPelepasliaran,
      tanggalPelepasliaran,
      image,
      publicId,
    })

    return NextResponse.json({
      status: 201,
      message: "Berhasil menambahkan data persebaran satwa",
      data: persebaranSatwa,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
