"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import InputField from "@/components/input/InputField"
import TextArea from "@/components/input/TextArea"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { getLembagaById } from "@/controllers/lembaga-controller"
import { showToast } from "@/helpers/showToast"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { PlusCircle, Trash2 } from "react-feather"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [lembaga, setLembaga] = useState<Lembaga>({
    _id: "",
    nama: "",
    tentang: "",
    alamat: "",
    kontak: "",
    namaKontak: "",
    image: "",
    createdAt: "",
    feedbacks: [
      {
        pengirim: "",
        isi: "",
        jenis: "",
        kontakPengirim: "",
      },
    ],
    publicId: "",
    updatedAt: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [isLoadingInit, setIsLoadingInit] = useState(true)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const fetchLembaga = useCallback(async () => {
    try {
      const res = await getLembagaById(params.id)
      setLembaga(res.data)
      setIsLoadingInit(false)
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    }
  }, [params.id])

  const onChangeInputFile = async (e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }

  useEffect(() => {
    fetchLembaga()
  }, [fetchLembaga])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {}

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="w-full flex flex-col items-start justify-center gap-6 md:w-1/3 lg:w-1/2">
          <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
            Edit Lembaga
          </h1>
          {isLoadingInit ? (
            <div className="w-full">
              <Skeleton size={WidgetSizes.LARGE} />
            </div>
          ) : (
            <form
              method="POST"
              onSubmit={onSubmit}
              className="flex flex-col gap-3 w-full"
            >
              {!lembaga?.image ? (
                <InputField
                  label="Gambar"
                  placeholder="Pilih Gambar"
                  type="file"
                  onChange={onChangeInputFile}
                  size={WidgetSizes.MEDIUM}
                  value=""
                />
              ) : (
                <div className="w-full">
                  <label className="text-neutral-500 text-sm">Gambar</label>
                  <div className="relative w-full rounded-md border border-neutral-50 bg-neutral-0">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={lembaga.image}
                      alt="Cover Mata Kuliah"
                      className="w-full object-cover rounded-md"
                    />

                    <div className="absolute top-2 right-2">
                      <FilledButton
                        ButtonIcon={Trash2}
                        onClick={() => {
                          setImage(null)
                        }}
                        size={WidgetSizes.MEDIUM}
                        type={WidgetTypes.ERROR}
                      />
                    </div>
                  </div>
                </div>
              )}
              <InputField
                label="Nama Lembaga"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setLembaga({
                    ...lembaga,
                    nama: e.target.value,
                  })
                }}
                placeholder="Isi nama lembaga"
                value={lembaga?.nama || ""}
              />
              <TextArea
                label="Deskripsi"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setLembaga({ ...lembaga, tentang: e.target.value })
                }}
                placeholder="Isi deskripsi lembaga"
                value={lembaga.tentang}
              />
              <TextArea
                label="Alamat"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setLembaga({ ...lembaga, alamat: e.target.value })
                }}
                placeholder="Isi Alamat"
                value={lembaga.alamat}
              />
              <InputField
                label="Kontak"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setLembaga({ ...lembaga, kontak: e.target.value })
                }}
                placeholder="08xxxxxxxxxx"
                value={lembaga.kontak}
                type="tel"
              />
              <InputField
                label="Nama Kontak"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setLembaga({
                    ...lembaga,
                    namaKontak: e.target.value,
                  })
                }}
                placeholder="Nama Kontak"
                value={lembaga.namaKontak}
              />
              <div className="w-full flex justify-end gap-2">
                <OutlinedButton
                  text="Batal"
                  size={WidgetSizes.MEDIUM}
                  onClick={() => router.back()}
                />
                <FilledButton
                  text="Simpan"
                  ButtonIcon={PlusCircle}
                  isSubmit={true}
                  size={WidgetSizes.MEDIUM}
                  isLoading={isLoadingSubmit}
                  isDisabled={isLoadingSubmit}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
