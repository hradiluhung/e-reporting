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
  getInterkoneksiById,
  updateInterkoneksiById,
} from "@/controllers/interkoneksi-controller"
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
  const [interkoneksiSatwa, setInterkoneksiSatwa] = useState({
    _id: "",
    namaPusatRehabilitasi: "",
    personInCharge: "",
    kontakHp: "",
    kontakEmail: "",
    jenisSatwa: "",
    namaIlmiah: "",
    idSatwa: "",
    statusDilindungi: "",
    statusEndemik: "",
    asalUsul: "",
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

  const fetchInterkoneksiSatwa = useCallback(async () => {
    try {
      const res = await getInterkoneksiById(params.id)
      setInterkoneksiSatwa(res.data)

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
    fetchInterkoneksiSatwa()
  }, [fetchInterkoneksiSatwa])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      const formData = new FormData()
      let resUploadPhoto = null

      if (
        !interkoneksiSatwa.namaPusatRehabilitasi ||
        !interkoneksiSatwa.personInCharge ||
        !interkoneksiSatwa.kontakHp ||
        !interkoneksiSatwa.kontakEmail ||
        !interkoneksiSatwa.jenisSatwa ||
        !interkoneksiSatwa.namaIlmiah ||
        !interkoneksiSatwa.idSatwa ||
        !interkoneksiSatwa.statusDilindungi ||
        !interkoneksiSatwa.statusEndemik ||
        !interkoneksiSatwa.asalUsul ||
        !interkoneksiSatwa.lokasiRehabilitasi ||
        !interkoneksiSatwa.tanggalSerahTerima ||
        !interkoneksiSatwa.kondisiSatwa ||
        !interkoneksiSatwa.status ||
        !interkoneksiSatwa.keterangan
      ) {
        throw new Error("Mohon isi semua field")
      }

      if (image == null && interkoneksiSatwa.image == "") {
        await deleteMedia(interkoneksiSatwa.publicId)
        const res = await updateInterkoneksiById({
          id: interkoneksiSatwa._id,
          namaPusatRehabilitasi: interkoneksiSatwa.namaPusatRehabilitasi,
          personInCharge: interkoneksiSatwa.personInCharge,
          kontakHp: interkoneksiSatwa.kontakHp,
          kontakEmail: interkoneksiSatwa.kontakEmail,
          jenisSatwa: interkoneksiSatwa.jenisSatwa,
          namaIlmiah: interkoneksiSatwa.namaIlmiah,
          idSatwa: interkoneksiSatwa.idSatwa,
          statusDilindungi: interkoneksiSatwa.statusDilindungi,
          statusEndemik: interkoneksiSatwa.statusEndemik,
          asalUsul: interkoneksiSatwa.asalUsul,
          lokasiRehabilitasi: interkoneksiSatwa.lokasiRehabilitasi,
          tanggalSerahTerima: interkoneksiSatwa.tanggalSerahTerima,
          kondisiSatwa: interkoneksiSatwa.kondisiSatwa,
          status: interkoneksiSatwa.status,
          keterangan: interkoneksiSatwa.keterangan,
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

      if (interkoneksiSatwa.image == "") {
        await deleteMedia(interkoneksiSatwa.publicId)
      }

      if (image != null) {
        const compressedImage = await compressFile(image)
        formData.append("file", compressedImage)
        resUploadPhoto = await uploadPhoto(formData)
      }

      const res = await updateInterkoneksiById({
        id: interkoneksiSatwa._id,
        namaPusatRehabilitasi: interkoneksiSatwa.namaPusatRehabilitasi,
        personInCharge: interkoneksiSatwa.personInCharge,
        kontakHp: interkoneksiSatwa.kontakHp,
        kontakEmail: interkoneksiSatwa.kontakEmail,
        jenisSatwa: interkoneksiSatwa.jenisSatwa,
        namaIlmiah: interkoneksiSatwa.namaIlmiah,
        idSatwa: interkoneksiSatwa.idSatwa,
        statusDilindungi: interkoneksiSatwa.statusDilindungi,
        statusEndemik: interkoneksiSatwa.statusEndemik,
        asalUsul: interkoneksiSatwa.asalUsul,
        lokasiRehabilitasi: interkoneksiSatwa.lokasiRehabilitasi,
        tanggalSerahTerima: interkoneksiSatwa.tanggalSerahTerima,
        kondisiSatwa: interkoneksiSatwa.kondisiSatwa,
        status: interkoneksiSatwa.status,
        keterangan: interkoneksiSatwa.keterangan,
        image: resUploadPhoto?.data?.url || interkoneksiSatwa.image || "",
        publicId:
          resUploadPhoto?.data?.publicId || interkoneksiSatwa.publicId || "",
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
              Edit Interkoneksi Satwa Rehabilitasi
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
              {image == null && interkoneksiSatwa.image == "" ? (
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
                          : interkoneksiSatwa.image
                      }
                      alt="Cover Mata Kuliah"
                      className="w-full object-cover rounded-md"
                    />

                    <div className="absolute top-2 right-2">
                      <FilledButton
                        ButtonIcon={Trash2}
                        onClick={() => {
                          setImage(null)
                          setInterkoneksiSatwa({
                            ...interkoneksiSatwa,
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
                label="Nama Pusat Rehabilitasi"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    namaPusatRehabilitasi: e.target.value,
                  })
                }}
                placeholder="Nama Pusat Rehabilitasi"
                value={interkoneksiSatwa.namaPusatRehabilitasi}
              />
              <InputField
                label="Person In Charge"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    personInCharge: e.target.value,
                  })
                }}
                placeholder="Nama Person In Charge"
                value={interkoneksiSatwa.personInCharge}
              />
              <InputField
                label="Kontak HP"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    kontakHp: e.target.value,
                  })
                }}
                placeholder="Contoh: 081234567890"
                value={interkoneksiSatwa.kontakHp}
              />
              <InputField
                label="Kontak Email"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    kontakEmail: e.target.value,
                  })
                }}
                placeholder="Contoh: contoh@mail.com"
                value={interkoneksiSatwa.kontakEmail}
              />
              <InputField
                label="Jenis Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    jenisSatwa: e.target.value,
                  })
                }}
                placeholder="Contoh: Vertebrata"
                value={interkoneksiSatwa.jenisSatwa}
              />
              <InputField
                label="Nama Ilmiah"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    namaIlmiah: e.target.value,
                  })
                }}
                placeholder="Contoh: Cygnus Cygnus"
                value={interkoneksiSatwa.namaIlmiah}
              />
              <InputField
                label="ID Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    idSatwa: e.target.value,
                  })
                }}
                placeholder="ID Satwa"
                value={interkoneksiSatwa.idSatwa}
              />
              <Dropdown
                label="Status Dilindungi"
                options={Object.values(StatusDilindungi)}
                defaultValue="Status Dilindungi"
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    statusDilindungi: e.target.value,
                  })
                }}
                placeholder="Status Dilindungi"
                size={WidgetSizes.MEDIUM}
                value={interkoneksiSatwa.statusDilindungi}
              />
              <Dropdown
                label="Status Endemik"
                options={Object.values(StatusEndemik)}
                defaultValue="Status Endemik"
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    statusEndemik: e.target.value,
                  })
                }}
                placeholder="Status Endemik"
                size={WidgetSizes.MEDIUM}
                value={interkoneksiSatwa.statusEndemik}
              />
              <TextArea
                label="Asal Usul"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    asalUsul: e.target.value,
                  })
                }}
                placeholder="Isi dengan asal usul satwa di sini"
                value={interkoneksiSatwa.asalUsul}
              />
              <InputField
                label="Lokasi Rehabilitasi"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    lokasiRehabilitasi: e.target.value,
                  })
                }}
                placeholder="Contoh: Taman Safari Indonesia"
                value={interkoneksiSatwa.lokasiRehabilitasi}
              />
              <InputField
                label="Tanggal Serah Terima"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    tanggalSerahTerima: e.target.value,
                  })
                }}
                type="date"
                placeholder="Tanggal Serah Terima"
                value={interkoneksiSatwa.tanggalSerahTerima}
              />
              <InputField
                label="Kondisi Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    kondisiSatwa: e.target.value,
                  })
                }}
                placeholder="Contoh: Baik"
                value={interkoneksiSatwa.kondisiSatwa}
              />
              <Dropdown
                label="Status"
                options={Object.values(StatusSatwaRehab)}
                defaultValue="Status"
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    status: e.target.value,
                  })
                }}
                placeholder="Status Satwa"
                size={WidgetSizes.MEDIUM}
                value={interkoneksiSatwa.status}
              />
              <TextArea
                label="Keterangan"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInterkoneksiSatwa({
                    ...interkoneksiSatwa,
                    keterangan: e.target.value,
                  })
                }}
                placeholder="Isi Keterangan di sini"
                value={interkoneksiSatwa.keterangan}
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
