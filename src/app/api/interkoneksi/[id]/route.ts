import startDb from "@/db/dbConfig"
import Interkoneksi from "@/models/interkoneksi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DELETE INTERKONEKSI BY ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    await startDb()

    const interkoneksi = await Interkoneksi.findByIdAndDelete(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus interkoneksi",
      data: interkoneksi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// GET INTERKONEKSI BY ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    await startDb()

    const interkoneksi = await Interkoneksi.findById(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan interkoneksi",
      data: interkoneksi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// UPDATE INTERKONEKSI BY ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    await startDb()

    const interkoneksi = await Interkoneksi.findByIdAndUpdate(id, body, {
      new: true,
    })

    return NextResponse.json({
      status: 200,
      message: "Berhasil mengubah interkoneksi",
      data: interkoneksi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
