import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React, { Suspense } from "react"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import Sidebar from "@/components/sidebar/Sidebar"

type Props = {
  children: React.ReactNode
}

export default async function PrivateLayout({ children }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/")
  }

  return (
    <>
      <Sidebar />
      <div
        className="p-0 py-16 lg:ps-72 min-h-screen bg-no-repeat bg-fixed bg-gradient-primary"
        // background image with opacity 0.2
        style={{
          backgroundImage: `url(/assets/admin-bg.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
