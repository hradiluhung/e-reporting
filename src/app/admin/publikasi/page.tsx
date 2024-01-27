"use client"
import FilledButton from "@/components/buttons/FilledButton"
import SearchBar from "@/components/input/SearchBar"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { getAllPublikasi } from "@/controllers/publikasi-controller"
import { downloadDocument } from "@/helpers/uploadFiles"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { File, PlusCircle } from "react-feather"
import parse from "html-react-parser"
import Pagination from "@/components/pagination/Pagination"

export default function Page() {
  const [publikasis, setPublikasis] = useState<Publikasi[]>([])
  const [filteredPublikasis, setFilteredPublikasis] = useState<Publikasi[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [listFileUrl, setListFileUrl] = useState<string[]>([])

  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchKeyword(e.target.value)
  }

  const fetchAllPublikasis = async () => {
    const res = await getAllPublikasi()
    setPublikasis(res.data)

    res.data.forEach(async (publikasi: Publikasi) => {
      if (publikasi.file) {
        const resPdf = await downloadDocument(publikasi.publicId)
        const response = await fetch(resPdf.data?.url)

        const blob = await response.blob()
        var urlBlob = new Blob([blob], { type: "application/pdf" })
        var url = URL.createObjectURL(urlBlob)

        setListFileUrl((listFileUrl) => [...listFileUrl, url])
      }
    })

    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
    setIsLoadingInit(false)
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

    setPage(1)
  }, [searchKeyword, publikasis])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl">Publikasi</h1>
            <p className="text-base">Artikel, Berita, dan Publikasi lainnya</p>
          </div>
          <div className="flex flex-start">
            <Link href="/admin/publikasi/add">
              <FilledButton
                text="Tambah"
                ButtonIcon={PlusCircle}
                type={WidgetTypes.SECONDARY}
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
                {filteredPublikasis
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((publikasi, index) => {
                    const firstParagraph = publikasi.isi.split("</p>")[0]

                    return (
                      <div
                        key={index}
                        className={`w-full px-8 py-10 ${
                          index !== publikasis.length - 1 &&
                          "border-b border-neutral-300"
                        }`}
                      >
                        <div className="w-full grid grid-cols-4 gap-6 items-center">
                          <div className={`w-full col-span-4`}>
                            <Link
                              className="hover:text-primary-100"
                              href={`/admin/publikasi/${publikasi._id}`}
                            >
                              <h1 className="text-2xl underline">
                                {publikasi.judul}
                              </h1>
                            </Link>
                            <div className="mt-2 flex gap-4">
                              <p className="text-sm text-neutral-50">
                                Dipublikasi pada:{" "}
                                {new Date(
                                  publikasi.createdAt
                                ).toLocaleDateString("id-ID")}
                              </p>
                              <p className="text-sm text-neutral-50">
                                Ditulis oleh: {publikasi.penulis}
                              </p>
                            </div>
                            {publikasi.file && (
                              <div className="flex justify-start mt-2">
                                <div className="bg-neutral-300 text-neutral-600 px-2 py-1 flex gap-2 rounded-full justify-center items-center">
                                  <File className="w-3 h-3" />
                                  <span className="text-xs">Mencakup File</span>
                                </div>
                              </div>
                            )}
                            <div className="mt-4 publikasi-content__card">
                              {parse(firstParagraph)}
                            </div>
                          </div>
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
                <div className="mb-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
                {publikasis
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((publikasi, index) => {
                    const firstParagraph = publikasi.isi.split("</p>")[0]

                    return (
                      <>
                        <div
                          key={index}
                          className={`w-full px-8 py-10 ${
                            index + 1 !== itemsPerPage &&
                            "border-b border-neutral-700"
                          }`}
                        >
                          <div className="w-full grid grid-cols-4 gap-6 items-center">
                            <div className={`w-full col-span-3`}>
                              <Link
                                className="hover:text-primary-100"
                                href={`/admin/publikasi/${publikasi._id}`}
                              >
                                <h1 className="text-2xl underline">
                                  {publikasi.judul}
                                </h1>
                              </Link>
                              <div className="mt-2 flex gap-4">
                                <p className="text-sm">
                                  Dipublikasi pada:{" "}
                                  {new Date(
                                    publikasi.createdAt
                                  ).toLocaleDateString("id-ID")}
                                </p>
                                <p className="text-sm">
                                  Ditulis oleh: {publikasi.penulis}
                                </p>
                              </div>
                              <div className="mt-4 publikasi-content__card">
                                {parse(firstParagraph)}
                              </div>
                            </div>

                            {publikasi.file && (
                              <div className="flex justify-center items-center col-span-1">
                                <div
                                  className="w-full rounded-2xl overflow-hidden mt-2"
                                  style={{ height: 300 }}
                                >
                                  <iframe
                                    src={listFileUrl[index]}
                                    width="100%"
                                    height="100%"
                                  ></iframe>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )
                  })}{" "}
                <div className="mt-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
