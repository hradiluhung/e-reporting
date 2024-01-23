"use client"
import FilledButton from "@/components/buttons/FilledButton"
import SearchBar from "@/components/input/SearchBar"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  deletePublikasiById,
  getAllPublikasi,
  getPublikasiById,
} from "@/controllers/publikasi-controller"
import { showToast } from "@/helpers/showToast"
import { deletePhoto, downloadDocument } from "@/helpers/uploadFiles"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Loader, PlusCircle } from "react-feather"
import parse from "html-react-parser"
import Image from "next/image"

export default function Page() {
  const [publikasis, setPublikasis] = useState<Publikasi[]>([])
  const [filteredPublikasis, setFilteredPublikasis] = useState<Publikasi[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [selectedPublikasi, setSelectedPublikasi] = useState<Publikasi | null>(
    null
  )
  const [selectedDeletedPublikasi, setSelectedDeletedPublikasi] =
    useState<Publikasi | null>(null)
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
  const [listIsLoadingDownload, setListIsLoadingDownload] = useState<boolean[]>(
    []
  )

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchKeyword(e.target.value)
  }

  const onDownloadFile = async (publikasiId: string, index: number) => {
    try {
      setListIsLoadingDownload((prevState) => {
        const newState = [...prevState]
        newState[index] = true
        return newState
      })
      const publikasi = await getPublikasiById(publikasiId)
      const res = await downloadDocument(publikasi.data.publicId)

      const response = await fetch(res.data?.url)
      const blob = await response.blob()
      const urlBlob = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = urlBlob
      link.download = publikasi.data.fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setListIsLoadingDownload((prevState) => {
        const newState = [...prevState]
        newState[index] = false
        return newState
      })
    }
  }

  const fetchAllPublikasis = async () => {
    const res = await getAllPublikasi()
    setPublikasis(res.data)
    setIsLoadingInit(false)
    setListIsLoadingDownload(new Array(res.data.length).fill(false))
  }

  const onDeletePublikasi = async (id: string, publidId: string) => {
    try {
      setIsLoadingDelete(true)

      await deletePhoto(publidId)

      const res = await deletePublikasiById(id)
      if (res.status === 200) {
        fetchAllPublikasis()
        showToast(res.message, WidgetTypes.SUCCESS)
        setSelectedDeletedPublikasi(null)
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  useEffect(() => {
    fetchAllPublikasis()
  }, [])

  useEffect(() => {
    setFilteredPublikasis(
      publikasis.filter((publikasi) =>
        publikasi.judul.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
  }, [searchKeyword, publikasis])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Publikasi
            </h1>
            <p className="text-base">Artikel, Berita, dan Publikasi lainnya</p>
          </div>
          <div className="flex flex-start">
            <Link href="/admin/publikasi/add">
              <FilledButton
                text="Tambah"
                ButtonIcon={PlusCircle}
                type={WidgetTypes.PRIMARY}
                size={WidgetSizes.MEDIUM}
              />
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-start">
            <div className="w-full md:w-64">
              <SearchBar
                prompt="Cari Judul"
                searchKeyword={searchKeyword}
                onSearchKeywordChange={onSearchKeywordChange}
              />
            </div>
          </div>

          <div className="w-full">
            {isLoadingInit ? (
              <div className="flex flex-col gap-4">
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
              </div>
            ) : publikasis.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">Belum ada data publikasi</p>
              </div>
            ) : searchKeyword !== "" && filteredPublikasis.length !== 0 ? (
              <div className="w-full md:w-full">
                {filteredPublikasis.map((publikasi, index) => {
                  const firstParagraph = publikasi.isi.split("</p>")[0]

                  return (
                    <div
                      key={index}
                      className={`w-full px-8 py-12 ${
                        index !== publikasis.length - 1 &&
                        "border-b border-neutral-300"
                      }`}
                    >
                      <div className="w-full grid grid-cols-4 gap-6 items-center">
                        <div
                          className={`w-full col-span-3 ${
                            publikasi.file ? "col-span-3" : "col-span-4"
                          }`}
                        >
                          <Link
                            className="hover:text-primary-100"
                            href={`/admin/publikasi/${publikasi._id}`}
                          >
                            <h1 className="text-2xl">{publikasi.judul}</h1>
                          </Link>
                          <div className="mt-2 flex gap-4">
                            <p className="text-sm text-neutral-50">
                              Dipublikasi pada:{" "}
                              {new Date(publikasi.createdAt).toLocaleDateString(
                                "id-ID"
                              )}
                            </p>
                            <p className="text-sm text-neutral-50">
                              Ditulis oleh: {publikasi.penulis}
                            </p>
                          </div>
                          <div className="mt-4 publikasi-content__card">
                            {parse(firstParagraph)}
                          </div>
                        </div>

                        {publikasi.file && (
                          <div
                            className="col-span-1 hover:bg-primary-10 transition-all overflow-hidden flex items-center justify-center flex-col cursor-pointer border border-neutral-50 rounded-lg h-full"
                            onClick={() => onDownloadFile(publikasi._id, index)}
                          >
                            {listIsLoadingDownload[index] ? (
                              <Loader className="animate-spin w-4" />
                            ) : (
                              <>
                                <Image
                                  src={`/assets/${
                                    publikasi.fileName.includes(".pdf")
                                      ? "pdf.png"
                                      : publikasi.fileName.includes(".xlsx")
                                      ? "xlsx.png"
                                      : "docx.png"
                                  }`}
                                  width={36}
                                  height={36}
                                  alt="Excel Icon"
                                />
                                <p className="mt-2 text-xs">
                                  {publikasi.fileName}
                                </p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : searchKeyword !== "" && filteredPublikasis.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">Lembaga tidak ditemukan</p>
              </div>
            ) : (
              <div className="w-full md:w-full">
                {publikasis.map((publikasi, index) => {
                  const firstParagraph = publikasi.isi.split("</p>")[0]

                  return (
                    <div
                      key={index}
                      className={`w-full px-8 py-12 ${
                        index !== publikasis.length - 1 &&
                        "border-b border-neutral-300"
                      }`}
                    >
                      <div className="w-full grid grid-cols-4 gap-6 items-center">
                        <div
                          className={`w-full col-span-3 ${
                            publikasi.file ? "col-span-3" : "col-span-4"
                          }`}
                        >
                          <Link
                            className="hover:text-primary-100"
                            href={`/admin/publikasi/${publikasi._id}`}
                          >
                            <h1 className="text-2xl">{publikasi.judul}</h1>
                          </Link>
                          <div className="mt-2 flex gap-4">
                            <p className="text-sm text-neutral-50">
                              Dipublikasi pada:{" "}
                              {new Date(publikasi.createdAt).toLocaleDateString(
                                "id-ID"
                              )}
                            </p>
                            <p className="text-sm text-neutral-50">
                              Ditulis oleh: {publikasi.penulis}
                            </p>
                          </div>
                          <div className="mt-4 publikasi-content__card">
                            {parse(firstParagraph)}
                          </div>
                        </div>

                        {publikasi.file && (
                          <div
                            className="col-span-1 hover:bg-primary-10 transition-all overflow-hidden flex items-center justify-center flex-col cursor-pointer border border-neutral-50 rounded-lg h-full"
                            onClick={() => onDownloadFile(publikasi._id, index)}
                          >
                            {listIsLoadingDownload[index] ? (
                              <Loader className="animate-spin w-4" />
                            ) : (
                              <>
                                <Image
                                  src={`/assets/${
                                    publikasi.fileName.includes(".pdf")
                                      ? "pdf.png"
                                      : publikasi.fileName.includes(".xlsx")
                                      ? "xlsx.png"
                                      : "docx.png"
                                  }`}
                                  width={36}
                                  height={36}
                                  alt="Excel Icon"
                                />
                                <p className="mt-2 text-xs">
                                  {publikasi.fileName}
                                </p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
