"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import InputField from "@/components/input-field/InputField"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
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

      if (
        !inputLembaga.nama ||
        !inputLembaga.tentang ||
        !inputLembaga.alamat ||
        !inputLembaga.kontak ||
        !inputLembaga.namaKontak
      ) {
        throw new Error("Mohon isi semua field")
      }

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
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="w-full flex flex-col items-start justify-center gap-6 md:w-1/3 lg:w-1/2">
          <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
            Tambah Lembaga
          </h1>
          <form
            method="POST"
            onSubmit={onSubmit}
            className="flex flex-col gap-5 w-full"
          >
            <InputField
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, nama: e.target.value })
              }}
              placeholder="Nama Lembaga"
              value={inputLembaga.nama}
            />
            <InputField
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, tentang: e.target.value })
              }}
              placeholder="Tentang Lembaga"
              value={inputLembaga.tentang}
            />
            <InputField
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, alamat: e.target.value })
              }}
              placeholder="Alamat"
              value={inputLembaga.alamat}
            />
            <InputField
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, kontak: e.target.value })
              }}
              placeholder="Kontak (No Telp)"
              value={inputLembaga.kontak}
            />
            <InputField
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, namaKontak: e.target.value })
              }}
              placeholder="Nama Kontak"
              value={inputLembaga.namaKontak}
            />
            <div className="w-full flex justify-end gap-2">
              <OutlinedButton
                text="Batal"
                size={WidgetSizes.MEDIUM}
                onClick={() => router.back()}
              />
              <FilledButton
                text="Tambah"
                isSubmit={true}
                size={WidgetSizes.MEDIUM}
                isLoading={isLoadingSubmit}
                isDisabled={isLoadingSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
