"use client"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import { WidgetTypes } from "@/constants/button-types"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PlusCircle } from "react-feather"

export default function Page() {
  const [lembagas, setLembagas] = useState<Lembaga[]>([])

  const fetchAllLembaga = async () => {
    const res = await getAllLembaga()
    setLembagas(res.data)
  }

  useEffect(() => {
    fetchAllLembaga()
  }, [])

  return (
    <div className="w-full px-4 pt-24 pb-12 md:px-8 lg:px-36 lg:pt-36 lg:pb-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="text-center">
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Kelola Profil Lembaga
            </h1>
            <p className="text-base">Lembaga Pengelola Satwa</p>
          </div>
          <div>
            <Link href="/admin/profil/add">
              <OutlinedButton
                text="Tambah"
                ButtonIcon={PlusCircle}
                type={WidgetTypes.PRIMARY}
              />
            </Link>
          </div>
        </div>
        <div className="w-full">
          {lembagas.length === 0 && (
            <div className="w-full flex justify-center">
              <p className="text-center">Belum ada data lembaga</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
