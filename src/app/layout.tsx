import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/providers/AuthProvider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
    <AuthProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className}`}>
          <ToastContainer />
          <main className="flex flex-col min-h-full">{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
