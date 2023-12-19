import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React, { Suspense } from "react"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import Sidebar from "@/components/sidebar/Sidebar"
import Loading from "./loading"

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
      <Sidebar />
      <div className="p-0 py-16 lg:ps-72">
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
