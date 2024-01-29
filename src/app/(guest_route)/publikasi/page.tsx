"use client"
import SearchBar from "@/components/input/SearchBar"
import Pagination from "@/components/pagination/Pagination"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes } from "@/constants/button-types"
import { getAllPublikasi } from "@/controllers/publikasi-controller"
import parse from "html-react-parser"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function Page() {
  const [publikasis, setPublikasis] = useState<Publikasi[]>([])
  const [filteredPublikasis, setFilteredPublikasis] = useState<Publikasi[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [listFileUrl, setListFileUrl] = useState<
    { judul: string; url: string }[]
  >([])
  const [filteredListFileUrl, setFilteredListFileUrl] = useState<
    { judul: string; url: string }[]
  >([])

  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 12
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  const fetchAllPublikasis = async () => {
    const res = await getAllPublikasi()
    setPublikasis(res.data)

    res.data.forEach(async (publikasi: Publikasi) => {
      if (publikasi.file) {
        const response = await fetch(publikasi.file)
        const blob = await response.blob()
        var urlBlob = new Blob([blob], { type: "application/pdf" })
        var url = URL.createObjectURL(urlBlob)
        setListFileUrl((prev) => [...prev, { judul: publikasi.judul, url }])
      }
    })

    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
    setIsLoadingInit(false)
  }

  useEffect(() => {
    console.log(listFileUrl)
  }, [listFileUrl])

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  useEffect(() => {
    fetchAllPublikasis()
  }, [])

  useEffect(() => {
    if (searchKeyword !== "") {
      setFilteredPublikasis(
        publikasis.filter((publikasi) => {
          return String(publikasi.judul)
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
        })
      )

      setFilteredListFileUrl(
        listFileUrl.filter((file) =>
          file.judul.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )

      setTotalPages(Math.ceil(filteredPublikasis.length / itemsPerPage))
      setPage(1)
    }
  }, [searchKeyword, publikasis, filteredPublikasis.length, listFileUrl])

  return (
    <div className="w-full mt-16 py-6 lg:py-24">
      <div className="px-4 md:px-8 lg:px-36">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold">List Publikasi</h1>
          <p>Artikel, Berita, dan Publikasi lainnya</p>
        </div>
        <div className="mt-10 flex justify-between">
          <div>
            <SearchBar
              onSearchKeywordChange={onSearchKeywordChange}
              prompt="Cari Judul"
              searchKeyword={searchKeyword}
            />
          </div>
          <div>
            <Pagination
              currentPage={page}
              setCurrentPage={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {isLoadingInit ? (
            <>
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
            </>
          ) : publikasis.length === 0 ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada publikasi
              </p>
            </div>
          ) : filteredPublikasis.length !== 0 && searchKeyword !== "" ? (
            filteredPublikasis
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((publikasi, index) => (
                <Link href={`/publikasi/${publikasi._id}`} key={index}>
                  <div className="grid grid-cols-3 items-center gap-4 p-6 bg-primary-10 text-center rounded-xl transition hover:shadow-lg cursor-pointer">
                    <div
                      className={`${
                        publikasi.file ? "col-span-2" : "col-span-3"
                      } text-start`}
                    >
                      <h2 className="text-xl font-bold ">{publikasi.judul}</h2>
                      <p className="text-sm mt-2">{publikasi.penulis}</p>
                    </div>

                    {publikasi.file && (
                      <div className="flex justify-center items-center col-span-1">
                        <div
                          className="w-full rounded-2xl overflow-hidden mt-2"
                          style={{ height: 250 }}
                        >
                          <iframe
                            src={
                              filteredListFileUrl.filter(
                                (file) => file.judul === publikasi.judul
                              )[0]?.url
                            }
                            width="100%"
                            height="100%"
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))
          ) : filteredPublikasis.length === 0 && searchKeyword !== "" ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada publikasi ditemukan
              </p>
            </div>
          ) : (
            publikasis
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((publikasi, index) => (
                <Link href={`/publikasi/${publikasi._id}`} key={index}>
                  <div className="grid grid-cols-3 items-center gap-4 p-6 bg-primary-10 text-center rounded-xl transition hover:shadow-lg cursor-pointer">
                    <div
                      className={`${
                        publikasi.file ? "col-span-2" : "col-span-3"
                      } text-start`}
                    >
                      <h2 className="text-xl font-bold ">{publikasi.judul}</h2>
                      <p className="text-sm mt-2">{publikasi.penulis}</p>
                    </div>

                    {publikasi.file && (
                      <div className="flex justify-center items-center col-span-1">
                        <div
                          className="w-full rounded-2xl overflow-hidden mt-2"
                          style={{ height: 250 }}
                        >
                          <iframe
                            src={
                              listFileUrl.filter(
                                (file) => file.judul === publikasi.judul
                              )[0]?.url
                            }
                            width="100%"
                            height="100%"
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  )
}
