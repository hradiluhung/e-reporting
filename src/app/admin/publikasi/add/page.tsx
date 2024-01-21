"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import InputField from "@/components/input/InputField"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { createPublikasi } from "@/controllers/publikasi-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { uploadPhoto } from "@/helpers/uploadPhotos"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import { ArrowLeftCircle, PlusCircle, Trash2 } from "react-feather"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function Page() {
  const router = useRouter()
  const [inputPublikasi, setInputPublikasi] = useState({
    judul: "",
    penulis: "",
    tahun: "",
    isi: "",
    image: "",
    publicId: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const onChangeInputFile = async (e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      if (
        !inputPublikasi.judul ||
        !inputPublikasi.penulis ||
        !inputPublikasi.tahun ||
        !inputPublikasi.isi
      ) {
        throw new Error("Mohon isi semua field")
      }

      const formData = new FormData()
      let resUploadPhoto = null

      if (image !== null) {
        const compressedImage = await compressFile(image)
        formData.append("file", compressedImage)
        resUploadPhoto = await uploadPhoto(formData)
      }

      const res = await createPublikasi({
        judul: inputPublikasi.judul,
        penulis: inputPublikasi.penulis,
        tahun: inputPublikasi.tahun,
        isi: inputPublikasi.isi,
        image: resUploadPhoto?.data?.url || "",
        publicId: resUploadPhoto?.data?.publicId || "",
      })

      if (res.status === 201) {
        showToast(res.message, WidgetTypes.SUCCESS)
        router.push("/admin/publikasi")
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
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Tambah Publikasi
            </h1>
          </div>

          <form
            method="POST"
            onSubmit={onSubmit}
            className="flex flex-col gap-3 w-full"
          >
            {!image ? (
              <InputField
                label="Gambar"
                acceptedFileTypes="image/*"
                placeholder="Pilih Gambar"
                type="file"
                onChange={onChangeInputFile}
                size={WidgetSizes.MEDIUM}
                value={inputPublikasi.image}
                isRequired={false}
              />
            ) : (
              <div className="w-full">
                <label className="text-neutral-500 text-sm">Gambar</label>
                <div className="relative w-full rounded-md border border-neutral-50 bg-neutral-0">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={URL.createObjectURL(image)}
                    alt="Cover Mata Kuliah"
                    className="w-full object-cover rounded-md"
                  />

                  <div className="absolute top-2 right-2">
                    <FilledButton
                      ButtonIcon={Trash2}
                      onClick={() => setImage(null)}
                      size={WidgetSizes.MEDIUM}
                      type={WidgetTypes.ERROR}
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
          <InputField
            label="Judul"
            size={WidgetSizes.MEDIUM}
            onChange={(e) => {
              setInputPublikasi({ ...inputPublikasi, judul: e.target.value })
            }}
            placeholder="Isi judul"
            value={inputPublikasi.judul}
          />
          <InputField
            label="Penulis"
            size={WidgetSizes.MEDIUM}
            onChange={(e) => {
              setInputPublikasi({
                ...inputPublikasi,
                penulis: e.target.value,
              })
            }}
            placeholder="Isi penulis"
            value={inputPublikasi.penulis}
          />
          <InputField
            label="Tahun"
            type="number"
            size={WidgetSizes.MEDIUM}
            onChange={(e) => {
              setInputPublikasi({
                ...inputPublikasi,
                tahun: e.target.value,
              })
            }}
            placeholder="Isi tahun"
            value={inputPublikasi.tahun}
          />

          <div>
            <label className="text-neutral-500 text-sm">
              Isi
              <span className="ms-1 text-red-500">*</span>
            </label>
            <div className="bg-neutral-0">
              <ReactQuill
                theme="snow"
                value={inputPublikasi.isi}
                onChange={(value) =>
                  setInputPublikasi({ ...inputPublikasi, isi: value })
                }
                modules={modules}
              />
            </div>
          </div>

          <div className="w-full flex justify-end gap-2">
            <OutlinedButton
              text="Batal"
              size={WidgetSizes.MEDIUM}
              onClick={() => router.back()}
            />
            <FilledButton
              text="Tambah"
              ButtonIcon={PlusCircle}
              isSubmit={true}
              size={WidgetSizes.MEDIUM}
              isLoading={isLoadingSubmit}
              isDisabled={isLoadingSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
