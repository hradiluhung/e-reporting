"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import InputField from "@/components/input/InputField"
import TextArea from "@/components/input/TextArea"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { createLembaga } from "@/controllers/lembaga-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { uploadPhoto } from "@/helpers/uploadPhotos"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { PlusCircle, Trash2 } from "react-feather"

export default function Page() {
  const router = useRouter()
  const [inputLembaga, setInputLembaga] = useState({
    nama: "",
    tentang: "",
    alamat: "",
    kontak: "",
    namaKontak: "",
    image: "",
    publicId: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const onChangeInputFile = async (e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }

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

      const formData = new FormData()
      let resUploadImage = null

      if (image !== null) {
        const compressedImage = await compressFile(image)
        formData.append("file", compressedImage)
        resUploadImage = await uploadPhoto(formData)
      }

      const res = await createLembaga({
        nama: inputLembaga.nama,
        tentang: inputLembaga.tentang,
        alamat: inputLembaga.alamat,
        kontak: inputLembaga.kontak,
        namaKontak: inputLembaga.namaKontak,
        image: resUploadImage?.data?.url || "",
        publicId: resUploadImage?.data?.publicId || "",
      })

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
            className="flex flex-col gap-3 w-full"
          >
            {!image ? (
              <InputField
                label="Gambar"
                placeholder="Pilih Gambar"
                type="file"
                onChange={onChangeInputFile}
                size={WidgetSizes.MEDIUM}
                value={inputLembaga.image}
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
            <InputField
              label="Nama Lembaga"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, nama: e.target.value })
              }}
              placeholder="Isi nama lembaga"
              value={inputLembaga.nama}
            />
            <TextArea
              label="Deskripsi"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, tentang: e.target.value })
              }}
              placeholder="Isi deskripsi lembaga"
              value={inputLembaga.tentang}
            />
            <TextArea
              label="Alamat"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, alamat: e.target.value })
              }}
              placeholder="Isi alamat"
              value={inputLembaga.alamat}
            />
            <InputField
              label="Kontak"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputLembaga({ ...inputLembaga, kontak: e.target.value })
              }}
              placeholder="08xxxxxxxxxx"
              value={inputLembaga.kontak}
              type="tel"
            />
            <InputField
              label="Nama Kontak"
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
                ButtonIcon={PlusCircle}
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
