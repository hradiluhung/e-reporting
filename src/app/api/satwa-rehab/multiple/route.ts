import startDb from "@/db/dbConfig"
import SatwaRehabilitasi from "@/models/satwa-rehabilitasi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// CREATE MULTIPLE SATWA REHABILITASI
export async function POST(request: Request) {
  await startDb()

  try {
    const reqBody = await request.json()

    const satwaRehab = await SatwaRehabilitasi.insertMany(reqBody)

    return NextResponse.json({
      status: 201,
      message: "Berhasil membuat banyak satwa rehabilitasi",
      data: satwaRehab,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// DELETE MULTIPLE SATWA REHABILITASI
export async function DELETE(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()

    const deletedSatwaRehabs = await SatwaRehabilitasi.find({
      _id: { $in: reqBody },
    })

    await SatwaRehabilitasi.deleteMany({
      _id: { $in: reqBody },
    })

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus banyak satwa rehabilitasi",
      data: deletedSatwaRehabs,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
