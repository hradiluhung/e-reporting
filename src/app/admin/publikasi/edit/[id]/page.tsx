"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import InputField from "@/components/input/InputField"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  getPublikasiById,
  updatePublikasiById,
} from "@/controllers/publikasi-controller"
import { compressFile } from "@/helpers/imageComporession"
import { showToast } from "@/helpers/showToast"
import { deletePhoto, uploadPhoto } from "@/helpers/uploadPhotos"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ArrowLeftCircle, PlusCircle, Trash2 } from "react-feather"
import "react-quill/dist/quill.snow.css"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )
  const [publikasi, setPublikasi] = useState<Publikasi | null>(null)
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
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

        if (image !== null) {
          const compressedImage = await compressFile(image)
          formData.append("file", compressedImage)
          resUploadPhoto = await uploadPhoto(formData)
        }

        if (image == null && publikasi.image == "") {
          await deletePhoto(publikasi.publicId)
          const res = await updatePublikasiById({
            id: publikasi._id,
            judul: publikasi.judul,
            penulis: publikasi.penulis,
            tahun: publikasi.tahun,
            isi: publikasi.isi,
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

        if (publikasi.image == "") {
          await deletePhoto(publikasi.publicId)
        }

        if (image != null) {
          const compressedImage = await compressFile(image)
          formData.append("file", compressedImage)
          resUploadPhoto = await uploadPhoto(formData)
        }

        const res = await updatePublikasiById({
          id: publikasi._id,
          judul: publikasi.judul,
          penulis: publikasi.penulis,
          tahun: publikasi.tahun,
          isi: publikasi.isi,
          image: resUploadPhoto?.data?.url || publikasi.image || "",
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
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
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
                {image == null && publikasi.image == "" ? (
                  <InputField
                    label="Gambar"
                    acceptedFileTypes="image/*"
                    placeholder="Pilih Gambar"
                    type="file"
                    onChange={onChangeInputFile}
                    size={WidgetSizes.MEDIUM}
                    value={publikasi.image}
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
                        src={
                          image != null
                            ? URL.createObjectURL(image)
                            : publikasi.image
                        }
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
                  <label className="text-neutral-500 text-sm">
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
            )
          )}
        </div>
      </div>
    </div>
  )
}
