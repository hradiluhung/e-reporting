import { getServerSession } from "next-auth"
import { redirect, usePathname } from "next/navigation"
import React from "react"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"

type Props = {
  children: React.ReactNode
}

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/")
  }

  return <>{children}</>
}
