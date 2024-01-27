"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import InputField from "@/components/input/InputField"
import TextArea from "@/components/input/TextArea"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  getLembagaById,
  updateLembagaById,
} from "@/controllers/lembaga-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { deleteMedia, uploadPhoto } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { ArrowLeftCircle, PlusCircle, Trash2 } from "react-feather"

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      const formData = new FormData()
      let resUploadPhoto = null

      if (
        !lembaga.nama ||
        !lembaga.tentang ||
        !lembaga.alamat ||
        !lembaga.kontak ||
        !lembaga.namaKontak
      ) {
        throw new Error("Mohon isi semua field")
      }

      if (image == null && lembaga.image == "") {
        await deleteMedia(lembaga.publicId)
        const res = await updateLembagaById({
          id: lembaga._id,
          nama: lembaga.nama,
          tentang: lembaga.tentang,
          alamat: lembaga.alamat,
          kontak: lembaga.kontak,
          namaKontak: lembaga.namaKontak,
          image: "",
          publicId: "",
        })

        if (res.status === 200) {
          showToast(res.message, WidgetTypes.SUCCESS)
          router.back()
        } else {
          showToast(res.message, WidgetTypes.ERROR)
          setIsLoadingSubmit(false)
        }
        return
      }

      if (lembaga.image == "") {
        await deleteMedia(lembaga.publicId)
      }

      if (image != null) {
        const compressedImage = await compressFile(image)
        formData.append("file", compressedImage)
        resUploadPhoto = await uploadPhoto(formData)
      }

      const res = await updateLembagaById({
        id: lembaga._id,
        nama: lembaga.nama,
        tentang: lembaga.tentang,
        alamat: lembaga.alamat,
        kontak: lembaga.kontak,
        namaKontak: lembaga.namaKontak,
        image: resUploadPhoto?.data?.url || lembaga.image || "",
        publicId: resUploadPhoto?.data?.publicId || lembaga.publicId || "",
      })

      if (res.status === 200) {
        showToast(res.message, WidgetTypes.SUCCESS)
        router.back()
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
          <div className="flex gap-3 items-center">
            <div>
              <Link href="/admin/profil" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl">Edit Lembaga</h1>
          </div>
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
              {image == null && lembaga.image == "" ? (
                <InputField
                  label="Gambar"
                  acceptedFileTypes="image/*"
                  placeholder="Pilih Gambar"
                  type="file"
                  onChange={onChangeInputFile}
                  size={WidgetSizes.MEDIUM}
                  value=""
                />
              ) : (
                <div className="w-full">
                  <label className="text-sm">Gambar</label>
                  <div className="relative w-full rounded-md border border-neutral-50 bg-neutral-0">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={
                        image != null
                          ? URL.createObjectURL(image)
                          : lembaga.image
                      }
                      alt="Cover Mata Kuliah"
                      className="w-full object-cover rounded-md"
                    />

                    <div className="absolute top-2 right-2">
                      <FilledButton
                        ButtonIcon={Trash2}
                        onClick={() => {
                          setImage(null)
                          setLembaga({
                            ...lembaga,
                            image: "",
                          })
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
                  type={WidgetTypes.SECONDARY}
                  onClick={() => router.back()}
                />
                <FilledButton
                  text="Simpan"
                  ButtonIcon={PlusCircle}
                  isSubmit={true}
                  size={WidgetSizes.MEDIUM}
                  type={WidgetTypes.SECONDARY}
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
