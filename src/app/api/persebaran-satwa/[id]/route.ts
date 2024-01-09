import startDb from "@/db/dbConfig"
import PersebaranSatwa from "@/models/persebaran-satwa"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DELETE PERSEBARAN SATWA BY ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    await startDb()

    const persebaranSatwa = await PersebaranSatwa.findByIdAndDelete(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus persebaran satwa",
      data: persebaranSatwa,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// GET PERSEBARAN SATWA BY ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    await startDb()

    const persebaranSatwa = await PersebaranSatwa.findById(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan persebaran satwa",
      data: persebaranSatwa,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// UPDATE PERSEBARAN SATWA BY ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    await startDb()

    const persebaranSatwa = await PersebaranSatwa.findByIdAndUpdate(id, body, {
      new: true,
    })

    return NextResponse.json({
      status: 200,
      message: "Berhasil mengubah persebaran satwa",
      data: persebaranSatwa,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
