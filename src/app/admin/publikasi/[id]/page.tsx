"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  deletePublikasiById,
  getPublikasiById,
} from "@/controllers/publikasi-controller"
import { showToast } from "@/helpers/showToast"
import { deleteMedia } from "@/helpers/uploadFiles"
import parse from "html-react-parser"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { ArrowLeftCircle, Download, Edit2, Trash2, X } from "react-feather"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [publikasi, setPublikasi] = useState<Publikasi | null>(null)
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false)
  const [fileUrl, setFileUrl] = useState<string>("")

  const onDeletePublikasi = async (id: string, publidId: string) => {
    try {
      setIsLoadingDelete(true)

      await deleteMedia(publidId)
      const res = await deletePublikasiById(id)

      if (res.status === 200) {
        showToast(res.message, WidgetTypes.SUCCESS)
        setIsModalDeleteOpen(false)
        router.back()
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  const fetchPublikasi = useCallback(async () => {
    const res = await getPublikasiById(params.id)
    setPublikasi(res.data)

    const response = await fetch(res.data.file)
    const blob = await response.blob()
    var urlBlob = new Blob([blob], { type: "application/pdf" })
    var url = URL.createObjectURL(urlBlob)
    setFileUrl(url)

    setIsLoadingInit(false)
  }, [params.id])

  const onDownloadFile = async () => {
    try {
      if (!publikasi) return

      setIsLoadingDownload(true)

      const response = await fetch(publikasi.publicId)
      const blob = await response.blob()
      const urlBlob = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = urlBlob
      link.download = publikasi.fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingDownload(false)
    }
  }

  useEffect(() => {
    fetchPublikasi()
  }, [fetchPublikasi])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="w-full flex justify-between">
          <div className="flex gap-3 items-center">
            <div>
              <Link href="/admin/publikasi" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl">Detail Publikasi</h1>
          </div>

          <div className="flex gap-2 justify-end items-stretch">
            <Link href={`/admin/publikasi/edit/${params.id}`} passHref>
              <OutlinedButton
                type={WidgetTypes.SECONDARY}
                ButtonIcon={Edit2}
                text="Edit"
                size={WidgetSizes.SMALL}
              />
            </Link>

            <FilledButton
              ButtonIcon={Trash2}
              type={WidgetTypes.ERROR}
              text="Hapus"
              size={WidgetSizes.SMALL}
              onClick={() => setIsModalDeleteOpen(true)}
            />
          </div>
        </div>
        <div className="w-full">
          {isLoadingInit ? (
            <Skeleton size={WidgetSizes.LARGE} />
          ) : (
            publikasi !== null && (
              <>
                <div className="w-full gap-6 items-center justify-center py-4">
                  <div>
                    <h1 className="text-3xl font-semibold text-gray-800">
                      {publikasi.judul}
                    </h1>
                  </div>
                </div>
                <div className="mt-2 flex gap-4">
                  <p>
                    Dipublikasi pada:{" "}
                    {new Date(publikasi.createdAt).toLocaleDateString("id-ID")}
                  </p>
                  <p>Ditulis oleh: {publikasi.penulis}</p>
                </div>
                <div className="mt-6 publikasi-content">
                  {parse(publikasi.isi)}
                </div>

                {publikasi.file && (
                  <div className="mt-10">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold">File PDF</h1>
                      <OutlinedButton
                        text="Download File"
                        ButtonIcon={Download}
                        size={WidgetSizes.SMALL}
                        onClick={() => onDownloadFile()}
                        type={WidgetTypes.SECONDARY}
                        isLoading={isLoadingDownload}
                      />
                    </div>
                    <div
                      className="w-full rounded-2xl overflow-hidden mt-4"
                      style={{ height: 560 }}
                    >
                      <iframe src={fileUrl} width="100%" height="100%"></iframe>
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>

      {isModalDeleteOpen && publikasi && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 bg-black bg-opacity-50 flex justify-center items-center ${
            isModalDeleteOpen ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg p-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <h1 className="font-semibold text-lg">
                    Hapus Satwa Rehabilitasi
                  </h1>
                  <X
                    onClick={() => setIsModalDeleteOpen(false)}
                    className="w-6 cursor-pointer"
                  />
                </div>
                <div className="flex gap-6 items-center mt-2 justify-start ">
                  <p>
                    Yakin ingin menghapus <b>{publikasi.judul}</b>?
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-2 mt-4">
              <FilledButton
                text="Hapus"
                size={WidgetSizes.SMALL}
                type={WidgetTypes.ERROR}
                ButtonIcon={Trash2}
                isLoading={isLoadingDelete}
                isDisabled={isLoadingDelete}
                onClick={() => {
                  onDeletePublikasi(publikasi._id, publikasi.file)
                }}
              />
              <OutlinedButton
                text="Batal"
                size={WidgetSizes.SMALL}
                ButtonIcon={X}
                onClick={() => setIsModalDeleteOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
