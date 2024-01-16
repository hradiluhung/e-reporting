"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input/InputField"
import TextArea from "@/components/input/TextArea"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  StatusDilindungi,
  StatusEndemik,
  StatusSatwaRehab,
} from "@/constants/satwa-rehab"
import { createInterkoneksi } from "@/controllers/interkoneksi-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { uploadPhoto } from "@/helpers/uploadPhotos"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { ArrowLeftCircle, PlusCircle, Trash2 } from "react-feather"

export default function Page() {
  const router = useRouter()
  const [inputInterkoneksi, setInputInterkoneksi] = useState({
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
        !inputInterkoneksi.namaPusatRehabilitasi ||
        !inputInterkoneksi.personInCharge ||
        !inputInterkoneksi.kontakHp ||
        !inputInterkoneksi.kontakEmail ||
        !inputInterkoneksi.jenisSatwa ||
        !inputInterkoneksi.namaIlmiah ||
        !inputInterkoneksi.idSatwa ||
        !inputInterkoneksi.statusDilindungi ||
        !inputInterkoneksi.statusEndemik ||
        !inputInterkoneksi.asalUsul ||
        !inputInterkoneksi.lokasiRehabilitasi ||
        !inputInterkoneksi.tanggalSerahTerima ||
        !inputInterkoneksi.kondisiSatwa ||
        !inputInterkoneksi.status ||
        !inputInterkoneksi.keterangan
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

      const res = await createInterkoneksi({
        ...inputInterkoneksi,
        image: resUploadImage?.data?.url || "",
        publicId: resUploadImage?.data?.publicId || "",
      })

      if (res.status === 201) {
        showToast(res.message, WidgetTypes.SUCCESS)
        router.push("/admin/interkoneksi-rehab")
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
              <Link href="/admin/interkoneksi-rehab" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Tambah Interkoneksi Satwa Rehabilitasi
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
                placeholder="Pilih Gambar"
                type="file"
                acceptedFileTypes="image/*"
                onChange={onChangeInputFile}
                size={WidgetSizes.MEDIUM}
                value={inputInterkoneksi.image}
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
              label="Nama Pusat Rehabilitasi"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  namaPusatRehabilitasi: e.target.value,
                })
              }}
              placeholder="Nama Pusat Rehabilitasi"
              value={inputInterkoneksi.namaPusatRehabilitasi}
            />
            <InputField
              label="Person In Charge"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  personInCharge: e.target.value,
                })
              }}
              placeholder="Nama Person In Charge"
              value={inputInterkoneksi.personInCharge}
            />
            <InputField
              label="Kontak HP"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  kontakHp: e.target.value,
                })
              }}
              placeholder="Contoh: 081234567890"
              value={inputInterkoneksi.kontakHp}
            />
            <InputField
              label="Kontak Email"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  kontakEmail: e.target.value,
                })
              }}
              placeholder="Contoh: contoh@mail.com"
              value={inputInterkoneksi.kontakEmail}
            />
            <InputField
              label="Jenis Satwa"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  jenisSatwa: e.target.value,
                })
              }}
              placeholder="Contoh: Vertebrata"
              value={inputInterkoneksi.jenisSatwa}
            />
            <InputField
              label="Nama Ilmiah"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  namaIlmiah: e.target.value,
                })
              }}
              placeholder="Contoh: Cygnus Cygnus"
              value={inputInterkoneksi.namaIlmiah}
            />
            <InputField
              label="ID Satwa"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  idSatwa: e.target.value,
                })
              }}
              placeholder="ID Satwa"
              value={inputInterkoneksi.idSatwa}
            />
            <Dropdown
              label="Status Dilindungi"
              options={Object.values(StatusDilindungi)}
              defaultValue="Status Dilindungi"
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  statusDilindungi: e.target.value,
                })
              }}
              placeholder="Status Dilindungi"
              size={WidgetSizes.MEDIUM}
              value={inputInterkoneksi.statusDilindungi}
            />
            <Dropdown
              label="Status Endemik"
              options={Object.values(StatusEndemik)}
              defaultValue="Status Endemik"
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  statusEndemik: e.target.value,
                })
              }}
              placeholder="Status Endemik"
              size={WidgetSizes.MEDIUM}
              value={inputInterkoneksi.statusEndemik}
            />
            <TextArea
              label="Asal Usul"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  asalUsul: e.target.value,
                })
              }}
              placeholder="Isi dengan asal usul satwa di sini"
              value={inputInterkoneksi.asalUsul}
            />
            <InputField
              label="Lokasi Rehabilitasi"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  lokasiRehabilitasi: e.target.value,
                })
              }}
              placeholder="Contoh: Taman Safari Indonesia"
              value={inputInterkoneksi.lokasiRehabilitasi}
            />
            <InputField
              label="Tanggal Serah Terima"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  tanggalSerahTerima: e.target.value,
                })
              }}
              type="date"
              placeholder="Tanggal Serah Terima"
              value={inputInterkoneksi.tanggalSerahTerima}
            />
            <InputField
              label="Kondisi Satwa"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  kondisiSatwa: e.target.value,
                })
              }}
              placeholder="Contoh: Baik"
              value={inputInterkoneksi.kondisiSatwa}
            />
            <Dropdown
              label="Status"
              options={Object.values(StatusSatwaRehab)}
              defaultValue="Status"
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  status: e.target.value,
                })
              }}
              placeholder="Status Satwa"
              size={WidgetSizes.MEDIUM}
              value={inputInterkoneksi.status}
            />
            <TextArea
              label="Keterangan"
              size={WidgetSizes.MEDIUM}
              onChange={(e) => {
                setInputInterkoneksi({
                  ...inputInterkoneksi,
                  keterangan: e.target.value,
                })
              }}
              placeholder="Isi Keterangan di sini"
              value={inputInterkoneksi.keterangan}
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
