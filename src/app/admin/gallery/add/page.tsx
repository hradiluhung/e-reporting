"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input/InputField"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { MediaType } from "@/constants/media-type"
import { createGallery } from "@/controllers/gallery-controller"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import { showToast } from "@/helpers/showToast"
import { uploadPhoto, uploadVideo } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { ArrowLeftCircle, PlusCircle, Trash2 } from "react-feather"

export default function Page() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [listLembaga, setListLembaga] = useState<Lembaga[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [inputGallery, setInputGallery] = useState({
    idLembaga: "",
    type: "",
    image: "",
    publicId: "",
  })
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)

  const onChangeInputFile = async (e: any) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const fetchLembagas = async () => {
    const res = await getAllLembaga()
    setListLembaga(res.data)
    setIsLoadingInit(false)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)

      if (!inputGallery.idLembaga || !file) {
        throw new Error("Mohon isi semua field")
      }

      const formData = new FormData()
      let resUploadImage = null

      if (file !== null) {
        // const compressedImage = await compressFile(file)
        formData.append("file", file)

        if (file.type.includes("image"))
          resUploadImage = await uploadPhoto(formData)
        else resUploadImage = await uploadVideo(formData)
      }

      const res = await createGallery({
        idLembaga: inputGallery.idLembaga,
        type: file.type.includes("image") ? MediaType.IMAGE : MediaType.VIDEO,
        media: resUploadImage?.data?.url || "",
        publicId: resUploadImage?.data?.publicId || "",
      })

      if (res.status === 201) {
        showToast(res.message, WidgetTypes.SUCCESS)
        router.push("/admin/gallery")
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  useEffect(() => {
    fetchLembagas()
  }, [])

  useEffect(() => {
    if (file !== null) {
      console.log(file.type)
    }
  }, [file])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="w-full flex flex-col items-start justify-center gap-6 md:w-1/3 lg:w-1/2">
          <div className="flex gap-3 items-center">
            <div>
              <Link href="/admin/gallery" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl">Tambah Gallery</h1>
          </div>

          {isLoadingInit ? (
            <div className="w-full">
              <Skeleton size={WidgetSizes.LARGE} />
            </div>
          ) : listLembaga.length <= 0 ? (
            <div className="bg-white p-6 flex flex-col shadow-md rounded-lg gap-4 items-center justify-center">
              <p>Belum ada lembaga. Silakan tambah lembaga terlebih dahulu</p>
              <Link href="/admin/profil/add" passHref>
                <FilledButton
                  text="Tambah Lembaga"
                  ButtonIcon={PlusCircle}
                  size={WidgetSizes.MEDIUM}
                />
              </Link>
            </div>
          ) : (
            <form
              method="POST"
              onSubmit={onSubmit}
              className="flex flex-col gap-3 w-full"
            >
              {!file ? (
                <InputField
                  label="Gambar/Video"
                  acceptedFileTypes="image/*,video/*"
                  placeholder="Gambar/Video"
                  type="file"
                  onChange={onChangeInputFile}
                  size={WidgetSizes.MEDIUM}
                  value={inputGallery.image}
                />
              ) : file.type.includes("image") ? (
                <div className="w-full">
                  <label className="text-neutral-500 text-sm">
                    Gambar/Video<span className="ms-1 text-red-500">*</span>
                  </label>
                  <div className="relative w-full rounded-md border border-neutral-50 bg-neutral-0">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={URL.createObjectURL(file)}
                      alt="Cover Mata Kuliah"
                      className="w-full object-cover rounded-md"
                    />

                    <div className="absolute top-2 right-2">
                      <FilledButton
                        ButtonIcon={Trash2}
                        onClick={() => setFile(null)}
                        size={WidgetSizes.MEDIUM}
                        type={WidgetTypes.ERROR}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <label className="text-neutral-500 text-sm">Gambar</label>
                  <div className="relative w-full rounded-md border border-neutral-50 bg-neutral-0">
                    <video controls className="w-full object-cover rounded-md">
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </video>

                    <div className="absolute top-2 right-2">
                      <FilledButton
                        ButtonIcon={Trash2}
                        onClick={() => setFile(null)}
                        size={WidgetSizes.MEDIUM}
                        type={WidgetTypes.ERROR}
                      />
                    </div>
                  </div>
                </div>
              )}
              <Dropdown
                label="Lembaga"
                options={listLembaga.map((lembaga) => lembaga._id)}
                optionsText={listLembaga.map((lembaga) => lembaga.nama)}
                defaultValue="Lembaga"
                onChange={(e) => {
                  setInputGallery({
                    ...inputGallery,
                    idLembaga: e.target.value,
                  })
                }}
                placeholder="Pilih Lembaga"
                size={WidgetSizes.MEDIUM}
                value={inputGallery.idLembaga}
              />

              <div className="w-full flex justify-end gap-2">
                <OutlinedButton
                  text="Batal"
                  size={WidgetSizes.MEDIUM}
                  onClick={() => router.back()}
                  type={WidgetTypes.SECONDARY}
                />
                <FilledButton
                  text="Tambah"
                  ButtonIcon={PlusCircle}
                  isSubmit={true}
                  type={WidgetTypes.SECONDARY}
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
