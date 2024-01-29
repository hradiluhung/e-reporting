"use client"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { getPublikasiById } from "@/controllers/publikasi-controller"
import { showToast } from "@/helpers/showToast"
import parse from "html-react-parser"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Download } from "react-feather"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [publikasi, setPublikasi] = useState<Publikasi | null>(null)
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false)
  const [fileUrl, setFileUrl] = useState<string>("")

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
    <div className="w-full mt-16 py-6 lg:py-24">
      <div className="px-4 md:px-8 lg:px-36">
        {isLoadingInit ? (
          <Skeleton size={WidgetSizes.LARGE} />
        ) : (
          publikasi && (
            <>
              <div className="w-full text-center">
                <h1 className="text-3xl font-bold">{publikasi.judul}</h1>
                <p className="mt-4">Ditulis oleh {publikasi.penulis}</p>
                <p className="mt-1">
                  Dipublikasi pada:{" "}
                  {new Date(publikasi.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
              <div className="mt-12 publikasi-content">
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
  )
}
