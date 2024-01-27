"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Callout from "@/components/callout/Callout"
import InputField from "@/components/input/InputField"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  createPublikasi,
  getPublikasiById,
} from "@/controllers/publikasi-controller"
import { showToast } from "@/helpers/showToast"
import { downloadDocument, uploadDocument } from "@/helpers/uploadFiles"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useMemo, useState } from "react"
import {
  ArrowLeftCircle,
  FileText,
  Info,
  PlusCircle,
  XCircle,
} from "react-feather"
import "react-quill/dist/quill.snow.css"

export default function Page() {
  const router = useRouter()

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )

  const [inputPublikasi, setInputPublikasi] = useState({
    judul: "",
    penulis: "",
    tahun: "",
    isi: "",
    file: "",
    publicId: "",
  })
  const [file, setFile] = useState<File | null>(null)
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
    setFile(file)
  }

  useEffect(() => {
    file !== null && console.log(file?.type)
  }, [file])

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

      if (file !== null) {
        if (file.size >= 10485760) {
          throw new Error("Ukuran file terlalu besar")
        }

        formData.append("file", file)
        resUploadPhoto = await uploadDocument(formData)
      }

      const res = await createPublikasi({
        judul: inputPublikasi.judul,
        penulis: inputPublikasi.penulis,
        tahun: inputPublikasi.tahun,
        isi: inputPublikasi.isi,
        file: resUploadPhoto?.data?.url || "",
        fileName: file?.name || "",
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
              <Link href="/admin/publikasi" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl">Tambah Publikasi</h1>
          </div>

          <form
            method="POST"
            onSubmit={onSubmit}
            className="flex flex-col gap-3 w-full"
          >
            <div>
              <p className="text-sm">Dokumen</p>
              <div className="mt-2">
                <Callout
                  text="Format Dokumen .pdf dengan ukuran maksimal 10 MB"
                  CalloutIcon={Info}
                />
                {file ? (
                  <div className="w-full rounded-xl p-6 mt-2 bg-red-50 border border-red-300 items-center transition-all grid grid-cols-10">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-6 col-span-1"
                      src="/assets/pdf.png"
                      alt="icon pdf"
                    />
                    <div className="full justify-between items-center col-span-9 grid grid-cols-10">
                      <span className="ml-2 col-span-9 overflow-hidden">
                        {file.name}
                      </span>
                      <XCircle
                        className="w-6 stroke-red-500 cursor-pointer col-span-1 ml-4"
                        onClick={() => setFile(null)}
                      />
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="excel-file"
                    className="w-full rounded-xl flex p-6 mt-2 bg-white border border-red-300 hover:bg-red-200 cursor-pointer transition-all items-center justify-start gap-2"
                  >
                    <input
                      id="excel-file"
                      type="file"
                      accept="application/pdf"
                      onChange={(e: any) => {
                        onChangeInputFile(e)
                      }}
                      hidden
                    />
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-6"
                      src="/assets/pdf.png"
                      alt="icon pdf"
                    />
                    <span className="ml-2">Pilih Dokumen</span>
                  </label>
                )}
              </div>
            </div>
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
                type={WidgetTypes.SECONDARY}
                onClick={() => router.back()}
              />
              <FilledButton
                text="Tambah"
                ButtonIcon={PlusCircle}
                isSubmit={true}
                size={WidgetSizes.MEDIUM}
                type={WidgetTypes.SECONDARY}
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
