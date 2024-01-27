"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Callout from "@/components/callout/Callout"
import InputField from "@/components/input/InputField"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  getPublikasiById,
  updatePublikasiById,
} from "@/controllers/publikasi-controller"
import { showToast } from "@/helpers/showToast"
import { deleteMedia, uploadPhoto } from "@/helpers/uploadFiles"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { ArrowLeftCircle, Info, PlusCircle, XCircle } from "react-feather"
import "react-quill/dist/quill.snow.css"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )
  const [publikasi, setPublikasi] = useState<Publikasi | null>(null)
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
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

  const fetchPublikasi = useCallback(async () => {
    const res = await getPublikasiById(params.id)
    setPublikasi(res.data)

    setIsLoadingInit(false)
  }, [params.id])

  useEffect(() => {
    fetchPublikasi()
  }, [fetchPublikasi])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (publikasi) {
        setIsLoadingSubmit(true)

        const formData = new FormData()
        let resUploadPhoto = null

        if (
          !publikasi.judul ||
          !publikasi.penulis ||
          !publikasi.tahun ||
          !publikasi.isi
        ) {
          throw new Error("Mohon isi semua field")
        }

        if (file !== null) {
          formData.append("file", file)
          resUploadPhoto = await uploadPhoto(formData)
        }

        if (file == null && publikasi.file == "") {
          await deleteMedia(publikasi.publicId)
          const res = await updatePublikasiById({
            id: publikasi._id,
            judul: publikasi.judul,
            penulis: publikasi.penulis,
            tahun: publikasi.tahun,
            isi: publikasi.isi,
            file: "",
            fileName: "",
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

        if (publikasi.file == "") {
          await deleteMedia(publikasi.publicId)
        }

        if (file != null) {
          if (file.size >= 10485760) {
            throw new Error("Ukuran file terlalu besar")
          }

          formData.append("file", file)
          resUploadPhoto = await uploadPhoto(formData)
        }

        const res = await updatePublikasiById({
          id: publikasi._id,
          judul: publikasi.judul,
          penulis: publikasi.penulis,
          tahun: publikasi.tahun,
          isi: publikasi.isi,
          file: resUploadPhoto?.data?.url || publikasi.file || "",
          fileName: file?.name || "",
          publicId: resUploadPhoto?.data?.publicId || publikasi.publicId || "",
        })

        if (res.status === 200) {
          showToast(res.message, WidgetTypes.SUCCESS)
          router.back()
        } else {
          showToast(res.message, WidgetTypes.ERROR)
        }
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
            <h1 className="font-bold text-2xl text-neutral-100">
              Edit Publikasi
            </h1>
          </div>

          {/* Form */}
          {isLoadingInit ? (
            <div className="w-full">
              <Skeleton size={WidgetSizes.LARGE} />
            </div>
          ) : (
            publikasi && (
              <form
                method="POST"
                onSubmit={onSubmit}
                className="flex flex-col gap-3 w-full"
              >
                <div>
                  <p className="text-sm">Dokumen</p>
                  <Callout
                    text="Format Dokumen .pdf dengan ukuran maksimal 10 MB"
                    CalloutIcon={Info}
                  />
                  {file == null && publikasi.file == "" ? (
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
                  ) : (
                    <div className="w-full rounded-xl p-6 mt-2 bg-red-50 border border-red-300 items-center transition-all grid grid-cols-10">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-6"
                        src="/assets/pdf.png"
                        alt="icon pdf"
                      />
                      <div className="full justify-between items-center col-span-9 grid grid-cols-10">
                        <span className="ml-2 col-span-9 overflow-hidden">
                          {file != null ? file.name : publikasi.fileName}
                        </span>
                        <XCircle
                          className="w-6 stroke-red-500 cursor-pointer col-span-1 ml-4"
                          onClick={() => {
                            setFile(null)
                            setPublikasi({
                              ...publikasi,
                              file: "",
                            })
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <InputField
                  label="Judul"
                  size={WidgetSizes.MEDIUM}
                  onChange={(e) => {
                    setPublikasi({
                      ...publikasi,
                      judul: e.target.value,
                    })
                  }}
                  placeholder="Isi judul"
                  value={publikasi.judul}
                />
                <InputField
                  label="Penulis"
                  size={WidgetSizes.MEDIUM}
                  onChange={(e) => {
                    setPublikasi({
                      ...publikasi,
                      penulis: e.target.value,
                    })
                  }}
                  placeholder="Isi penulis"
                  value={publikasi.penulis}
                />
                <InputField
                  label="Tahun"
                  type="number"
                  size={WidgetSizes.MEDIUM}
                  onChange={(e) => {
                    setPublikasi({
                      ...publikasi,
                      tahun: e.target.value,
                    })
                  }}
                  placeholder="Isi tahun"
                  value={publikasi.tahun}
                />
                <div>
                  <label className="text-sm">
                    Isi
                    <span className="ms-1 text-red-500">*</span>
                  </label>
                  <div className="bg-neutral-0">
                    <ReactQuill
                      theme="snow"
                      value={publikasi.isi}
                      onChange={(value) =>
                        setPublikasi({ ...publikasi, isi: value })
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
                    type={WidgetTypes.SECONDARY}
                  />
                  <FilledButton
                    text="Simpan"
                    ButtonIcon={PlusCircle}
                    isSubmit={true}
                    type={WidgetTypes.SECONDARY}
                    size={WidgetSizes.MEDIUM}
                    isLoading={isLoadingSubmit}
                    isDisabled={isLoadingSubmit}
                  />
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  )
}
