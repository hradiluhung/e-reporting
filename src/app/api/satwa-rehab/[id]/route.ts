import startDb from "@/db/dbConfig"
import SatwaRehabilitasi from "@/models/satwa-rehabilitasi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DELETE SATWA REHABILITASI BY ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await startDb()

  try {
    const satwaRehab = await SatwaRehabilitasi.findByIdAndDelete(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus satwa rehabilitasi",
      data: satwaRehab,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// GET SATWA REHABILITASI BY ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await startDb()

  try {
    const satwaRehab = await SatwaRehabilitasi.findById(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan satwa rehabilitasi",
      data: satwaRehab,
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
    const satwaRehab = await SatwaRehabilitasi.findByIdAndUpdate(id, body, {
      new: true,
    })

    return NextResponse.json({
      status: 200,
      message: "Berhasil mengubah data satwa rehabilitasi",
      data: satwaRehab,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
