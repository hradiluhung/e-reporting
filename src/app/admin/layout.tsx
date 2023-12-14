import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

type Props = {
  children: React.ReactNode
}

export default async function PrivateLayout({ children }: Props) {
  const session = await getServerSession(authOptions)
  const isAuthed = session?.user !== undefined

  if (!session?.user) {
    redirect("/")
  }

  return (
    <>
      <Navbar isAuthed={isAuthed} />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
