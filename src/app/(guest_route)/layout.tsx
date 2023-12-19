"use client"
import Footer from "@/components/footer/Footer"
import Navbar from "@/components/navbar/Navbar"
import { useSession } from "next-auth/react"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { status } = useSession()
  const isAuthed = status === "authenticated"

  return (
    <>
      <Navbar isAuthed={isAuthed} />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
