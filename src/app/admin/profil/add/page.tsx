"use client"
import FilledButton from "@/components/buttons/FilledButton"
import InputField from "@/components/input-field/InputField"
import { WidgetTypes } from "@/constants/button-types"
import { createLembaga } from "@/controllers/lembaga-controller"
import { showToast } from "@/helpers/showToast"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Page() {
  const router = useRouter()
  const [inputLembaga, setInputLembaga] = useState({
    nama: "",
    tentang: "",
    alamat: "",
    kontak: "",
    namaKontak: "",
  })
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      const res = await createLembaga(inputLembaga)

      if (res.status === 201) {
        showToast(res.message, WidgetTypes.SUCCESS)
        router.push("/admin/profil")
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  return (
    <div className="w-full px-4 pt-24 pb-12 md:px-8 lg:px-36 lg:pt-36 lg:pb-24">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center gap-6 md:w-3/4 lg:w-2/3">
          <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
            Tambah Lembaga
          </h1>
          <form
            method="POST"
            onSubmit={onSubmit}
            className="flex flex-col gap-5 w-full"
          >
            <InputField
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, nama: e.target.value })
              }}
              placeholder="Nama Lembaga"
              value={inputLembaga.nama}
            />
            <InputField
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, tentang: e.target.value })
              }}
              placeholder="Tentang Lembaga"
              value={inputLembaga.tentang}
            />
            <InputField
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, alamat: e.target.value })
              }}
              placeholder="Alamat"
              value={inputLembaga.alamat}
            />
            <InputField
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, kontak: e.target.value })
              }}
              placeholder="Kontak (No Telp)"
              value={inputLembaga.kontak}
            />
            <InputField
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, namaKontak: e.target.value })
              }}
              placeholder="Nama Kontak"
              value={inputLembaga.namaKontak}
            />
            <FilledButton
              text="Tambah"
              isSubmit={true}
              isLoading={isLoadingSubmit}
              isDisabled={isLoadingSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
