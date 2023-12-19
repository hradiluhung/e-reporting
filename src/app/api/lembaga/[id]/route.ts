import startDb from "@/db/dbConfig"
import Lembaga from "@/models/lembaga"
import { NextResponse } from "next/server"

// DELETE LEMBAGA BY ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await startDb()

  try {
    const lembaga = await Lembaga.findByIdAndDelete(id)

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus lembaga",
      data: lembaga,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
