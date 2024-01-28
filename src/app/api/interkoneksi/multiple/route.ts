import startDb from "@/db/dbConfig"
import Interkoneksi from "@/models/interkoneksi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// CREATE MULTIPLE INTERKONEKSI SATWA
export async function POST(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()

    const interkoneksiSatwa = await Interkoneksi.insertMany(reqBody)

    return NextResponse.json({
      status: 201,
      message: "Berhasil membuat banyak interkoneksi satwa",
      data: interkoneksiSatwa,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// DELETE MULTIPLE INTERKONEKSI SATWA
export async function DELETE(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()

    const deletedInterkoneksiSatwa = await Interkoneksi.find({
      _id: { $in: reqBody },
    })

    await Interkoneksi.deleteMany({
      _id: { $in: reqBody },
    })

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus banyak interkoneksi satwa",
      data: deletedInterkoneksiSatwa,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
