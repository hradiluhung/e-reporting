import startDb from "@/db/dbConfig"
import Feedback from "@/models/feedback"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// CREATE FEEDBACK
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  await startDb()

  try {
    const reqBody = await request.json()
    const idLembaga = params.id

    const feedback = await Feedback.create({
      ...reqBody,
      idLembaga,
    })

    return NextResponse.json({
      status: 201,
      message: `Berhasil membuat feedback`,
      data: feedback,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}

// GET FEEDBACK BY ID LEMBAGA
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const idLembaga = params.id

  await startDb()

  try {
    const feedbacks = await Feedback.find({ idLembaga })

    return NextResponse.json({
      status: 200,
      message: "Berhasil mendapatkan feedback",
      data: feedbacks,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message })
  }
}
