"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Callout from "@/components/callout/Callout"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input/InputField"
import TextArea from "@/components/input/TextArea"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  StatusDilindungi,
  StatusEndemik,
  StatusSatwaRehab,
} from "@/constants/satwa-rehab"
import {
  createMultipleSatwaRehabilitasi,
  createSatwaRehabilitasi,
} from "@/controllers/satwa-rehab-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { uploadPhoto } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  ArrowLeftCircle,
  PlusCircle,
  Trash2,
  X,
  XCircle,
} from "react-feather"
import readXlsxFile from "read-excel-file"

export default function Page() {
  const router = useRouter()

  const [inputSatwaRehab, setInputSatwaRehab] = useState({
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
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const [excelFile, setExcelFile] = useState<File | null>(null)
  const [isLoadingSubmitExcel, setIsLoadingSubmitExcel] = useState(false)

  const onChangeInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(file)
    }
  }

  const onChangeExcelFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setExcelFile(file)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoadingSubmit(true)

      if (
        !inputSatwaRehab.jenisSatwa ||
        !inputSatwaRehab.namaIlmiah ||
        !inputSatwaRehab.idSatwa ||
        !inputSatwaRehab.statusDilindungi ||
        !inputSatwaRehab.statusEndemik ||
        !inputSatwaRehab.asalUsulSatwa ||
        !inputSatwaRehab.lokasiRehabilitasi ||
        !inputSatwaRehab.tanggalSerahTerima ||
        !inputSatwaRehab.kondisiSatwa ||
        !inputSatwaRehab.status ||
        !inputSatwaRehab.keterangan
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

      const res = await createSatwaRehabilitasi({
        ...inputSatwaRehab,
        image: resUploadImage?.data?.url || "",
        publicId: resUploadImage?.data?.publicId || "",
      })

      if (res.status === 201) {
        showToast(res.message, WidgetTypes.SUCCESS)
        router.push("/admin/satwa-rehab")
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const onSubmitExportFile = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      e.stopPropagation()

      if (!excelFile) {
        throw new Error("Mohon pilih file excel")
      }

      readXlsxFile(excelFile).then(async (rows) => {
        setIsLoadingSubmitExcel(true)
        // convert the row to array of object with model above
        const data = rows.map((row) => {
          row[7] = String(row[7]).split("/").reverse().join("-")
          const dateObj = new Date(row[7])

          return {
            idSatwa: row[1],
            namaIlmiah: row[2],
            status: row[3],
            statusEndemik: row[4],
            statusDilindungi: row[5],
            kondisiSatwa: row[6],
            tanggalSerahTerima: dateObj,
            asalUsulSatwa: row[8],
            keterangan: row[9],
            jenisSatwa: "",
            lokasiRehabilitasi: "",
            image: "",
            publicId: "",
          }
        })

        // remove header and data with all of property is empty
        data.shift()

        // create the data
        const res = await createMultipleSatwaRehabilitasi(data)

        if (res.status === 201) {
          showToast(res.message, WidgetTypes.SUCCESS)
          router.push("/admin/satwa-rehab")
        } else {
          showToast(res.message, WidgetTypes.ERROR)
        }
      })
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingSubmitExcel(false)
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
              Tambah Satwa Rehabilitasi
            </h1>
          </div>
          <div className="w-full flex flex-col gap-4">
            <form
              onSubmit={(e: any) => {
                onSubmitExportFile(e)
              }}
            >
              <div>
                <p className="text-neutral-500 text-sm">
                  Export File Excel
                  <span className="ms-1 text-red-500">*</span>
                </p>
                <div className="mt-2">
                  <Callout
                    text="Pastikan header hanya 1 baris dan urutan kolom seperti berikut: No, ID Satwa, Nama Ilmiah, Status, Status Endemik, Status Dilindungi, Kondisi Satwa, Tanggal Serah Terima, Asal Usul Satwa, Keterangan"
                    CalloutIcon={AlertCircle}
                  />
                </div>
                <div className="mt-2">
                  {excelFile ? (
                    <div className="w-full rounded-xl flex p-6 mt-1 bg-primary-10 border border-primary-50 transition-all items-center justify-start gap-2">
                      <Image
                        src="/assets/xls.png"
                        width={24}
                        height={24}
                        alt="Excel Icon"
                      />
                      <div className="flex w-full justify-between items-center">
                        <span className="ml-2">{excelFile.name}</span>
                        <XCircle
                          className="w-6 stroke-primary-100 cursor-pointer"
                          onClick={() => setExcelFile(null)}
                        />
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="excel-file"
                      className={`w-full rounded-xl flex p-6 mt-1 bg-primary-10 border border-primary-50 hover:bg-primary-50 hover:bg-opacity-40 cursor-pointer transition-all items-center justify-start gap-2`}
                    >
                      <input
                        id="excel-file"
                        type="file"
                        accept=".xlsx, .xls, .csv"
                        onChange={(e: any) => {
                          onChangeExcelFile(e)
                        }}
                        hidden
                      />
                      <Image
                        src="/assets/xls.png"
                        width={24}
                        height={24}
                        alt="Excel Icon"
                      />

                      <span className="ml-2">Pilih File Excel</span>
                    </label>
                  )}
                </div>
              </div>
              <div className="mt-4 w-full flex justify-end">
                <FilledButton
                  text="Kirim"
                  ButtonIcon={PlusCircle}
                  isSubmit={true}
                  size={WidgetSizes.MEDIUM}
                  isLoading={isLoadingSubmitExcel}
                  isDisabled={isLoadingSubmitExcel}
                />
              </div>
            </form>
            <div className="w-full text-center mt-4 text-neutral-500 flex items-center">
              {/* separator */}
              <div className="w-full h-px bg-neutral-400"></div>
              <p className="px-4 w-full">Atau Input Manual</p>
              <div className="w-full h-px bg-neutral-400"></div>
            </div>
            <form
              method="POST"
              onSubmit={onSubmit}
              className="flex flex-col gap-3 w-full "
            >
              {!image ? (
                <InputField
                  label="Gambar"
                  acceptedFileTypes="image/*"
                  placeholder="Pilih Gambar"
                  type="file"
                  onChange={onChangeInputFile}
                  size={WidgetSizes.MEDIUM}
                  value={inputSatwaRehab.image}
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
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    jenisSatwa: e.target.value,
                  })
                }}
                placeholder="Contoh: Vertebrata"
                value={inputSatwaRehab.jenisSatwa}
              />
              <InputField
                label="Nama Ilmiah"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    namaIlmiah: e.target.value,
                  })
                }}
                placeholder="Contoh: Cygnus Cygnus"
                value={inputSatwaRehab.namaIlmiah}
              />
              <InputField
                label="ID Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    idSatwa: e.target.value,
                  })
                }}
                placeholder="ID Satwa"
                value={inputSatwaRehab.idSatwa}
              />
              <Dropdown
                label="Status Dilindungi"
                options={Object.values(StatusDilindungi)}
                defaultValue="Status Dilindungi"
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    statusDilindungi: e.target.value,
                  })
                }}
                placeholder="Status Dilindungi"
                size={WidgetSizes.MEDIUM}
                value={inputSatwaRehab.statusDilindungi}
              />
              <Dropdown
                label="Status Endemik"
                options={Object.values(StatusEndemik)}
                defaultValue="Status Endemik"
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    statusEndemik: e.target.value,
                  })
                }}
                placeholder="Status Endemik"
                size={WidgetSizes.MEDIUM}
                value={inputSatwaRehab.statusEndemik}
              />
              <TextArea
                label="Asal Usul"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    asalUsulSatwa: e.target.value,
                  })
                }}
                placeholder="Isi dengan asal usul satwa di sini"
                value={inputSatwaRehab.asalUsulSatwa}
              />
              <InputField
                label="Lokasi Rehabilitasi"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    lokasiRehabilitasi: e.target.value,
                  })
                }}
                placeholder="Contoh: Taman Safari Indonesia"
                value={inputSatwaRehab.lokasiRehabilitasi}
              />
              <InputField
                label="Tanggal Serah Terima"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    tanggalSerahTerima: e.target.value,
                  })
                }}
                type="date"
                placeholder="Tanggal Serah Terima"
                value={inputSatwaRehab.tanggalSerahTerima}
              />
              <InputField
                label="Kondisi Satwa"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    kondisiSatwa: e.target.value,
                  })
                }}
                placeholder="Contoh: Baik"
                value={inputSatwaRehab.kondisiSatwa}
              />
              <Dropdown
                label="Status"
                options={Object.values(StatusSatwaRehab)}
                defaultValue="Status"
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    status: e.target.value,
                  })
                }}
                placeholder="Status Satwa"
                size={WidgetSizes.MEDIUM}
                value={inputSatwaRehab.status}
              />
              <TextArea
                label="Keterangan"
                size={WidgetSizes.MEDIUM}
                onChange={(e) => {
                  setInputSatwaRehab({
                    ...inputSatwaRehab,
                    keterangan: e.target.value,
                  })
                }}
                placeholder="Isi Keterangan di sini"
                value={inputSatwaRehab.keterangan}
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
    </div>
  )
}
