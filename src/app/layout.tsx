import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Reporting Indonesia Wildlife",
  description:
    "Aplikasi untuk melaporkan kejadian terkait satwa liar di Indonesia",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isAuth={false} />
        <>{children}</>
        <Footer />
      </body>
    </html>
  )
}
