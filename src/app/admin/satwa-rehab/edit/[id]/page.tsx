"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input/InputField"
import TextArea from "@/components/input/TextArea"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  StatusDilindungi,
  StatusEndemik,
  StatusSatwaRehab,
} from "@/constants/satwa-rehab"
import {
  getSatwaRehabById,
  updateSatwaRehabById,
} from "@/controllers/satwa-rehab-controller"
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
  const [satwaRehab, setSatwaRehab] = useState({
    _id: "",
    jenisSatwa: "",
    namaIlmiah: "",
    idSatwa: "",
    statusDilindungi: "",
    statusEndemik: "",
    asalUsulSatwa: "",
    lokasiRehabilitasi: "",
    tanggalSerahTerima: "",
    kondisiSatwa: "",
    status: "",
    keterangan: "",
    image: "",
    publicId: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [isLoadingInit, setIsLoadingInit] = useState(true)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const fetchSatwaRehab = useCallback(async () => {
    try {
      const res = await getSatwaRehabById(params.id)
      setSatwaRehab(res.data)
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
    fetchSatwaRehab()
  }, [fetchSatwaRehab])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      const formData = new FormData()
      let resUploadPhoto = null

      if (
        !satwaRehab.jenisSatwa ||
        !satwaRehab.namaIlmiah ||
        !satwaRehab.idSatwa ||
        !satwaRehab.statusDilindungi ||
        !satwaRehab.statusEndemik ||
        !satwaRehab.asalUsulSatwa ||
        !satwaRehab.lokasiRehabilitasi ||
        !satwaRehab.tanggalSerahTerima ||
        !satwaRehab.kondisiSatwa ||
        !satwaRehab.status ||
        !satwaRehab.keterangan
      ) {
        throw new Error("Mohon isi semua field")
      }

      if (image == null && satwaRehab.image == "") {
        await deleteMedia(satwaRehab.publicId)
        const res = await updateSatwaRehabById({
          id: satwaRehab._id,
          jenisSatwa: satwaRehab.jenisSatwa,
          namaIlmiah: satwaRehab.namaIlmiah,
          idSatwa: satwaRehab.idSatwa,
          statusDilindungi: satwaRehab.statusDilindungi,
          statusEndemik: satwaRehab.statusEndemik,
          asalUsulSatwa: satwaRehab.asalUsulSatwa,
          lokasiRehabilitasi: satwaRehab.lokasiRehabilitasi,
          tanggalSerahTerima: satwaRehab.tanggalSerahTerima,
          kondisiSatwa: satwaRehab.kondisiSatwa,
          status: satwaRehab.status,
          keterangan: satwaRehab.keterangan,
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

      if (satwaRehab.image == "") {
        await deleteMedia(satwaRehab.publicId)
      }

      if (image != null) {
        const compressedImage = await compressFile(image)
        formData.append("file", compressedImage)
        resUploadPhoto = await uploadPhoto(formData)
      }

      const res = await updateSatwaRehabById({
        id: satwaRehab._id,
        jenisSatwa: satwaRehab.jenisSatwa,
        namaIlmiah: satwaRehab.namaIlmiah,
        idSatwa: satwaRehab.idSatwa,
        statusDilindungi: satwaRehab.statusDilindungi,
        statusEndemik: satwaRehab.statusEndemik,
        asalUsulSatwa: satwaRehab.asalUsulSatwa,
        lokasiRehabilitasi: satwaRehab.lokasiRehabilitasi,
        tanggalSerahTerima: satwaRehab.tanggalSerahTerima,
        kondisiSatwa: satwaRehab.kondisiSatwa,
        status: satwaRehab.status,
        keterangan: satwaRehab.keterangan,
        image: resUploadPhoto?.data?.url || satwaRehab.image || "",
        publicId: resUploadPhoto?.data?.publicId || satwaRehab.publicId || "",
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
              <Link href="/admin/satwa-rehab" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Edit Satwa Rehabilitasi
            </h1>
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
              {image == null && satwaRehab.image == "" ? (
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
                  <label className="text-neutral-500 text-sm">Gambar</label>
                  <div className="relative w-full rounded-md border border-neutral-50 bg-neutral-0">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={
                        image != null
                          ? URL.createObjectURL(image)
                          : satwaRehab.image
                      }
                      alt="Cover Mata Kuliah"
                      className="w-full object-cover rounded-md"
                    />

                    <div className="absolute top-2 right-2">
                      <FilledButton
                        ButtonIcon={Trash2}
                        onClick={() => {
                          setImage(null)
                          setSatwaRehab({
                            ...satwaRehab,
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
                label="Jenis Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    jenisSatwa: e.target.value,
                  })
                }}
                placeholder="Contoh: Vertebrata"
                value={satwaRehab.jenisSatwa}
              />
              <InputField
                label="Nama Ilmiah"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    namaIlmiah: e.target.value,
                  })
                }}
                placeholder="Contoh: Cygnus cygnus"
                value={satwaRehab.namaIlmiah}
              />
              <InputField
                label="ID Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    idSatwa: e.target.value,
                  })
                }}
                placeholder="ID Satwa"
                value={satwaRehab.idSatwa}
              />
              <Dropdown
                label="Status Dilindungi"
                options={Object.values(StatusDilindungi)}
                defaultValue="Status Dilindungi"
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    statusDilindungi: e.target.value,
                  })
                }}
                placeholder="Status Dilindungi"
                size={WidgetSizes.MEDIUM}
                value={satwaRehab.statusDilindungi}
              />
              <Dropdown
                label="Status Endemik"
                options={Object.values(StatusEndemik)}
                defaultValue="Status Endemik"
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    statusEndemik: e.target.value,
                  })
                }}
                placeholder="Status Endemik"
                size={WidgetSizes.MEDIUM}
                value={satwaRehab.statusEndemik}
              />
              <TextArea
                label="Asal Usul"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    asalUsulSatwa: e.target.value,
                  })
                }}
                placeholder="Isi dengan asal usul satwa di sini"
                value={satwaRehab.asalUsulSatwa}
              />
              <InputField
                label="Lokasi Rehabilitasi"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    lokasiRehabilitasi: e.target.value,
                  })
                }}
                placeholder="Contoh: Taman Safari Indonesia"
                value={satwaRehab.lokasiRehabilitasi}
              />
              <InputField
                label="Tanggal Serah Terima"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    tanggalSerahTerima: e.target.value,
                  })
                }}
                type="date"
                placeholder="Tanggal Serah Terima"
                value={satwaRehab.tanggalSerahTerima}
              />
              <InputField
                label="Kondisi Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    kondisiSatwa: e.target.value,
                  })
                }}
                placeholder="Contoh: Baik"
                value={satwaRehab.kondisiSatwa}
              />
              <Dropdown
                label="Status"
                options={Object.values(StatusSatwaRehab)}
                defaultValue="Status"
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    status: e.target.value,
                  })
                }}
                placeholder="Status Satwa"
                size={WidgetSizes.MEDIUM}
                value={satwaRehab.status}
              />
              <TextArea
                label="Keterangan"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setSatwaRehab({
                    ...satwaRehab,
                    keterangan: e.target.value,
                  })
                }}
                placeholder="Isi Keterangan di sini"
                value={satwaRehab.keterangan}
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
