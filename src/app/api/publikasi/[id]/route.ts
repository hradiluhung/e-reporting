import startDb from "@/db/dbConfig"
import Feedback from "@/models/feedback"
import Lembaga from "@/models/lembaga"
import Publikasi from "@/models/publikasi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DELETE PUBLIKASI BY ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await startDb()
    const id = params.id

    const publikasi = await Publikasi.findByIdAndDelete(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus publikasi",
      data: publikasi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// GET PUBLIKASI BY ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await startDb()
    const id = params.id

    const publikasi = await Publikasi.findById(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan publikasi",
      data: publikasi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// UPDATE PUBLIKASI BY ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await startDb()
    const id = params.id
    const body = await request.json()

    const publikasi = await Publikasi.findByIdAndUpdate(id, body, {
      new: true,
    })

    return NextResponse.json({
      status: 200,
      message: "Berhasil mengubah publikasi",
      data: publikasi,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
