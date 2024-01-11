import startDb from "@/db/dbConfig"
import Interkoneksi from "@/models/interkoneksi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET ALL INTERKONEKSI
export async function GET() {
  try {
    await startDb()

    const interkoneksis = await Interkoneksi.find()

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan data interkoneksi",
      data: interkoneksis,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// CREATE INTERKONEKSI
export async function POST(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()
    const {
      namaPusatRehabilitasi,
      personInCharge,
      kontakHp,
      kontakEmail,
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      asalUsul,
      lokasiRehabilitasi,
      tanggalSerahTerima,
      kondisiSatwa,
      status,
      keterangan,
      image,
      publicId,
    } = reqBody

    const interkoneksi = await Interkoneksi.create({
      namaPusatRehabilitasi,
      personInCharge,
      kontakHp,
      kontakEmail,
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      asalUsul,
      lokasiRehabilitasi,
      tanggalSerahTerima,
      kondisiSatwa,
      status,
      keterangan,
      image,
      publicId,
    })

    return NextResponse.json({
      status: 201,
      message: `Berhasil membuat interkoneksi`,
      data: interkoneksi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
