"use client"
import { WidgetTypes } from "@/constants/button-types"
import { createPublikasi } from "@/controllers/publikasi-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { uploadPhoto } from "@/helpers/uploadPhotos"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"

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

  return <div>Tambah</div>
}
