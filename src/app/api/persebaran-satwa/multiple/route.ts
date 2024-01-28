import startDb from "@/db/dbConfig"
import PersebaranSatwa from "@/models/persebaran-satwa"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DELETE MULTIPLE PERSEBARAN
export async function DELETE(request: Request) {
  try {
    await startDb()

    const reqBody = await request.json()

    const deletedPersebaran = await PersebaranSatwa.find({
      _id: { $in: reqBody },
    })

    await PersebaranSatwa.deleteMany({
      _id: { $in: reqBody },
    })

    return NextResponse.json({
      status: 200,
      message: "Berhasil menghapus banyak interkoneksi satwa",
      data: deletedPersebaran,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
