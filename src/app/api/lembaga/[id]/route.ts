import startDb from "@/db/dbConfig"
import Feedback from "@/models/feedback"
import Lembaga from "@/models/lembaga"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DELETE LEMBAGA BY ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await startDb()

  try {
    const lembaga = await Lembaga.findByIdAndDelete(id)
    await Feedback.deleteMany({ idLembaga: id })

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus lembaga",
      data: lembaga,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// GET LEMBAGA BY ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await startDb()

  try {
    const lembaga = await Lembaga.findById(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan lembaga",
      data: lembaga,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// UPDATE LEMBAGA BY ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await request.json()

  await startDb()

  try {
    const lembaga = await Lembaga.findByIdAndUpdate(id, body, { new: true })

    return NextResponse.json({
      status: 200,
      message: "Berhasil mengubah data lembaga",
      data: lembaga,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
