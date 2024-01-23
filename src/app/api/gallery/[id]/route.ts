import startDb from "@/db/dbConfig"
import Gallery from "@/models/gallery"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DELETE GALLERY BY ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await startDb()

  try {
    const gallery = await Gallery.findByIdAndDelete(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus gallery",
      data: gallery,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// GET GALLERY BY ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await startDb()

  try {
    const gallery = await Gallery.findById(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan gallery",
      data: gallery,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// UPDATE GALLERY BY ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await request.json()

  await startDb()

  try {
    const gallery = await Gallery.findByIdAndUpdate(id, body, { new: true })

    return NextResponse.json({
      status: 200,
      message: "Berhasil mengupdate gallery",
      data: gallery,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
