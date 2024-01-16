"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input/InputField"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { StatusDilindungi, StatusEndemik } from "@/constants/satwa-rehab"
import {
  getPersebaranSatwaById,
  updatePersebaranSatwaById,
} from "@/controllers/persebaran-satwa-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { deletePhoto, uploadPhoto } from "@/helpers/uploadPhotos"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { ArrowLeftCircle, PlusCircle, Trash2 } from "react-feather"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [persebaranSatwa, setPersebaranSatwa] = useState({
    _id: "",
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
  const [isLoadingInit, setIsLoadingInit] = useState(true)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const fetctPersebaranSatwa = useCallback(async () => {
    try {
      const res = await getPersebaranSatwaById(params.id)
      setPersebaranSatwa(res.data)
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
    fetctPersebaranSatwa()
  }, [fetctPersebaranSatwa])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      const formData = new FormData()
      let resUploadPhoto = null

      if (
        !persebaranSatwa.jenisSatwa ||
        !persebaranSatwa.namaIlmiah ||
        !persebaranSatwa.idSatwa ||
        !persebaranSatwa.statusDilindungi ||
        !persebaranSatwa.statusEndemik ||
        !persebaranSatwa.koordinatPelepasliaran ||
        !persebaranSatwa.tanggalPelepasliaran
      ) {
        throw new Error("Mohon isi semua field")
      }

      if (image == null && persebaranSatwa.image == "") {
        await deletePhoto(persebaranSatwa.publicId)
        const res = await updatePersebaranSatwaById({
          id: persebaranSatwa._id,
          jenisSatwa: persebaranSatwa.jenisSatwa,
          namaIlmiah: persebaranSatwa.namaIlmiah,
          idSatwa: persebaranSatwa.idSatwa,
          statusDilindungi: persebaranSatwa.statusDilindungi,
          statusEndemik: persebaranSatwa.statusEndemik,
          lokasiPelepasliaran: persebaranSatwa.lokasiPelepasliaran,
          koordinatPelepasliaran: persebaranSatwa.koordinatPelepasliaran,
          tanggalPelepasliaran: persebaranSatwa.tanggalPelepasliaran,
          image: "",
          publicId: "",
        })
        console.log(res.data)

        if (res.status === 200) {
          showToast(res.message, WidgetTypes.SUCCESS)
          router.back()
        } else {
          showToast(res.message, WidgetTypes.ERROR)
          setIsLoadingSubmit(false)
        }
        return
      }

      if (persebaranSatwa.image == "") {
        await deletePhoto(persebaranSatwa.publicId)
      }

      if (image != null) {
        const compressedImage = await compressFile(image)
        formData.append("file", compressedImage)
        resUploadPhoto = await uploadPhoto(formData)
      }

      const res = await updatePersebaranSatwaById({
        id: persebaranSatwa._id,
        jenisSatwa: persebaranSatwa.jenisSatwa,
        namaIlmiah: persebaranSatwa.namaIlmiah,
        idSatwa: persebaranSatwa.idSatwa,
        statusDilindungi: persebaranSatwa.statusDilindungi,
        statusEndemik: persebaranSatwa.statusEndemik,
        lokasiPelepasliaran: persebaranSatwa.lokasiPelepasliaran,
        koordinatPelepasliaran: persebaranSatwa.koordinatPelepasliaran,
        tanggalPelepasliaran: persebaranSatwa.tanggalPelepasliaran,
        image: resUploadPhoto?.data?.url || persebaranSatwa.image || "",
        publicId:
          resUploadPhoto?.data?.publicId || persebaranSatwa.publicId || "",
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
              <Link href="/admin/persebaran" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Edit Persebaran Satwa Rehabilitasi
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
              {image == null && persebaranSatwa.image == "" ? (
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
                          : persebaranSatwa.image
                      }
                      alt="Cover Mata Kuliah"
                      className="w-full object-cover rounded-md"
                    />

                    <div className="absolute top-2 right-2">
                      <FilledButton
                        ButtonIcon={Trash2}
                        onClick={() => {
                          setImage(null)
                          setPersebaranSatwa({
                            ...persebaranSatwa,
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
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    jenisSatwa: e.target.value,
                  })
                }}
                placeholder="Contoh: Vertebrata"
                value={persebaranSatwa.jenisSatwa}
              />
              <InputField
                label="Nama Ilmiah"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    namaIlmiah: e.target.value,
                  })
                }}
                placeholder="Contoh: Cygnus cygnus"
                value={persebaranSatwa.namaIlmiah}
              />
              <InputField
                label="ID Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    idSatwa: e.target.value,
                  })
                }}
                placeholder="ID Satwa"
                value={persebaranSatwa.idSatwa}
              />
              <Dropdown
                label="Status Dilindungi"
                options={Object.values(StatusDilindungi)}
                defaultValue="Status Dilindungi"
                onChange={(e) => {
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    statusDilindungi: e.target.value,
                  })
                }}
                placeholder="Status Dilindungi"
                size={WidgetSizes.MEDIUM}
                value={persebaranSatwa.statusDilindungi}
              />
              <Dropdown
                label="Status Endemik"
                options={Object.values(StatusEndemik)}
                defaultValue="Status Endemik"
                onChange={(e) => {
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    statusEndemik: e.target.value,
                  })
                }}
                placeholder="Status Endemik"
                size={WidgetSizes.MEDIUM}
                value={persebaranSatwa.statusEndemik}
              />
              <InputField
                label="Lokasi Pelepasliaran"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    lokasiPelepasliaran: e.target.value,
                  })
                }}
                placeholder="Contoh: Taman Safari Indonesia"
                value={persebaranSatwa.lokasiPelepasliaran}
              />
              <InputField
                label="Koordinat Pelepasliaran"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    koordinatPelepasliaran: e.target.value,
                  })
                }}
                placeholder="Contoh: -6.597906143849867, 106.80562781695498"
                value={persebaranSatwa.koordinatPelepasliaran}
              />
              <InputField
                label="Tanggal Pelepasliaran"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setPersebaranSatwa({
                    ...persebaranSatwa,
                    tanggalPelepasliaran: e.target.value,
                  })
                }}
                type="date"
                placeholder="Tanggal Pelepasliaran"
                value={persebaranSatwa.tanggalPelepasliaran}
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
          )}
        </div>
      </div>
    </div>
  )
}
