import startDb from "@/db/dbConfig"
import SatwaRehabilitasi from "@/models/satwa-rehabilitasi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET ALL SATWA REHABILITASI
export async function GET() {
  try {
    await startDb()

    const satwaRehabs = await SatwaRehabilitasi.find()

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan data satwa rehabilitasi",
      data: satwaRehabs,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// CREATE SATWA REHABILITASI
export async function POST(request: Request) {
  await startDb()

  try {
    const reqBody = await request.json()
    const {
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      asalUsulSatwa,
      lokasiRehabilitasi,
      tanggalSerahTerima,
      kondisiSatwa,
      status,
      keterangan,
      image,
      publicId,
    } = reqBody

    const satwaRehab = await SatwaRehabilitasi.create({
      jenisSatwa,
      namaIlmiah,
      idSatwa,
      statusDilindungi,
      statusEndemik,
      asalUsulSatwa,
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
      message: `Berhasil membuat satwa rehabilitasi`,
      data: satwaRehab,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
