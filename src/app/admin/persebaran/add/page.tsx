"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input/InputField"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { StatusDilindungi, StatusEndemik } from "@/constants/satwa-rehab"
import { createPersebaranSatwa } from "@/controllers/persebaran-satwa-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { uploadPhoto } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { ArrowLeftCircle, PlusCircle, Trash2 } from "react-feather"

export default function Page() {
  const router = useRouter()
  const [inputPersebaranSatwa, setInputPersebaranSatwa] = useState({
    jenisSatwa: "",
    namaIlmiah: "",
    idSatwa: "",
    statusDilindungi: "",
    statusEndemik: "",
    lokasiPelepasliaran: "",
    koordinatPelepasliaran: "",
    tanggalPelepasliaran: "",
    image: "",
    publicId: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const onChangeInputFile = async (e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoadingSubmit(true)

      if (
        !inputPersebaranSatwa.jenisSatwa ||
        !inputPersebaranSatwa.namaIlmiah ||
        !inputPersebaranSatwa.idSatwa ||
        !inputPersebaranSatwa.statusDilindungi ||
        !inputPersebaranSatwa.statusEndemik ||
        !inputPersebaranSatwa.lokasiPelepasliaran ||
        !inputPersebaranSatwa.koordinatPelepasliaran ||
        !inputPersebaranSatwa.tanggalPelepasliaran
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

      const res = await createPersebaranSatwa({
        ...inputPersebaranSatwa,
        image: resUploadImage?.data?.url || "",
        publicId: resUploadImage?.data?.publicId || "",
      })

      if (res.status === 201) {
        showToast(res.message, WidgetTypes.SUCCESS)
        router.push("/admin/persebaran")
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
              <Link href="/admin/persebaran" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Tambah Persebaran Satwa Rehabilitasi
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
                value={inputPersebaranSatwa.image}
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

            <InputField
              label="Jenis Satwa"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  jenisSatwa: e.target.value,
                })
              }}
              placeholder="Contoh: Vertebrata"
              value={inputPersebaranSatwa.jenisSatwa}
            />
            <InputField
              label="Nama Ilmiah"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  namaIlmiah: e.target.value,
                })
              }}
              placeholder="Contoh: Cygnus cygnus"
              value={inputPersebaranSatwa.namaIlmiah}
            />
            <InputField
              label="ID Satwa"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  idSatwa: e.target.value,
                })
              }}
              placeholder="ID Satwa"
              value={inputPersebaranSatwa.idSatwa}
            />
            <Dropdown
              label="Status Dilindungi"
              options={Object.values(StatusDilindungi)}
              defaultValue="Status Dilindungi"
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  statusDilindungi: e.target.value,
                })
              }}
              placeholder="Status Dilindungi"
              size={WidgetSizes.MEDIUM}
              value={inputPersebaranSatwa.statusDilindungi}
            />
            <Dropdown
              label="Status Endemik"
              options={Object.values(StatusEndemik)}
              defaultValue="Status Endemik"
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  statusEndemik: e.target.value,
                })
              }}
              placeholder="Status Endemik"
              size={WidgetSizes.MEDIUM}
              value={inputPersebaranSatwa.statusEndemik}
            />
            <InputField
              label="Lokasi Pelepasliaran"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  lokasiPelepasliaran: e.target.value,
                })
              }}
              placeholder="Contoh: Taman Safari Indonesia"
              value={inputPersebaranSatwa.lokasiPelepasliaran}
            />
            <InputField
              label="Koordinat Pelepasliaran"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  koordinatPelepasliaran: e.target.value,
                })
              }}
              placeholder="Contoh: -6.597906143849867, 106.80562781695498"
              value={inputPersebaranSatwa.koordinatPelepasliaran}
            />
            <InputField
              label="Tanggal Pelepasliaran"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputPersebaranSatwa({
                  ...inputPersebaranSatwa,
                  tanggalPelepasliaran: e.target.value,
                })
              }}
              type="date"
              placeholder="Tanggal Pelepasliaran"
              value={inputPersebaranSatwa.tanggalPelepasliaran}
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
