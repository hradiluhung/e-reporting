"use client"
import SearchBar from "@/components/input/SearchBar"
import Pagination from "@/components/pagination/Pagination"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes } from "@/constants/button-types"
import { StatusSatwaRehab } from "@/constants/satwa-rehab"
import { getAllInterkoneksi } from "@/controllers/interkoneksi-controller"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Calendar, MapPin, X } from "react-feather"

export default function Page() {
  const [interkoneksis, setInterkoneksis] = useState<Interkoneksi[]>([])
  const [filteredInterkoneksis, setFilteredInterkoneksis] = useState<
    Interkoneksi[]
  >([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [selectedinterkoneksi, setSelectedinterkoneksi] =
    useState<Interkoneksi | null>(null)
  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 12
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  const fetchAllInterkoneksi = async () => {
    const res = await getAllInterkoneksi()
    setInterkoneksis(res.data)
    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
    setIsLoadingInit(false)
  }

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  useEffect(() => {
    if (searchKeyword === "") {
      setFilteredInterkoneksis(
        interkoneksis.filter((interkoneksi) => {
          return String(interkoneksi.namaIlmiah)
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
        })
      )

      setTotalPages(Math.ceil(filteredInterkoneksis.length / itemsPerPage))
      setPage(1)
    }
  }, [searchKeyword, interkoneksis, filteredInterkoneksis.length])

  useEffect(() => {
    fetchAllInterkoneksi()
  }, [])

  return (
    <div className="w-full mt-16 py-6 lg:py-24">
      <div className="px-4 md:px-8 lg:px-36">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold">
            List Interkoneksi Satwa Rehabilitasi
          </h1>
          <p>integrasi satu data satwa liar rehabilitasi di Indonesia</p>
        </div>
        <div className="mt-10 flex justify-between">
          <div>
            <SearchBar
              onSearchKeywordChange={onSearchKeywordChange}
              prompt="Cari Nama Ilmiah Satwa"
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {isLoadingInit ? (
            <>
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
            </>
          ) : interkoneksis.length === 0 ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada satwa rehabilitasi
              </p>
            </div>
          ) : filteredInterkoneksis.length !== 0 && searchKeyword !== "" ? (
            filteredInterkoneksis
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((satwa, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 bg-primary-10 justify-center text-center rounded-xl transition hover:shadow-lg cursor-pointer"
                  onClick={() => {
                    setSelectedinterkoneksi(satwa)
                  }}
                >
                  {satwa.image ? (
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={satwa.image}
                      alt={satwa.namaIlmiah}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                  )}
                  <div>
                    <h1 className="font-bold text-lg">{satwa.namaIlmiah}</h1>
                    <p className="text-xs mt-1">{satwa.idSatwa}</p>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-center">
                    {satwa.status ? (
                      <div
                        className={`px-2 py-1 rounded-full bg-neutral-0 text-neutral-0 font-semibold text-center text-xs ${
                          satwa.status === StatusSatwaRehab.REHABILITASI
                            ? "bg-gradient-to-tr from-amber-400 to-amber-500"
                            : satwa.status === StatusSatwaRehab.MATI
                            ? "bg-gradient-to-tr from-red-400 to-red-500"
                            : "bg-gradient-to-tr from-green-400 to-green-500"
                        }`}
                      >
                        {satwa.status}
                      </div>
                    ) : (
                      "-"
                    )}
                    <div className="px-2 py-1 rounded-full bg-neutral-0 text-neutral-100 text-xs">
                      {satwa.statusDilindungi ? satwa.statusDilindungi : "-"}
                    </div>
                    <div className="px-2 py-1 rounded-full bg-neutral-0 text-neutral-100 text-xs">
                      {satwa.statusEndemik ? satwa.statusEndemik : "-"}
                    </div>
                  </div>
                  <div className="text-sm flex gap-2 items-center">
                    <div>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <p className="text-start">
                      {satwa.lokasiRehabilitasi
                        ? satwa.lokasiRehabilitasi
                        : "-"}
                    </p>
                  </div>
                </div>
              ))
          ) : filteredInterkoneksis.length === 0 && searchKeyword !== "" ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada satwa rehabilitasi ditemukan
              </p>
            </div>
          ) : (
            interkoneksis
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((satwa, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 bg-primary-10 justify-center text-center rounded-xl transition hover:shadow-lg cursor-pointer"
                  onClick={() => {
                    setSelectedinterkoneksi(satwa)
                  }}
                >
                  {satwa.image ? (
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={satwa.image}
                      alt={satwa.namaIlmiah}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                  )}
                  <div>
                    <h1 className="font-bold text-lg">{satwa.namaIlmiah}</h1>
                    <p className="text-xs mt-1">{satwa.idSatwa}</p>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-center">
                    {satwa.status ? (
                      <div
                        className={`px-2 py-1 rounded-full bg-neutral-0 text-neutral-0 font-semibold text-center text-xs ${
                          satwa.status === StatusSatwaRehab.REHABILITASI
                            ? "bg-gradient-to-tr from-amber-400 to-amber-500"
                            : satwa.status === StatusSatwaRehab.MATI
                            ? "bg-gradient-to-tr from-red-400 to-red-500"
                            : "bg-gradient-to-tr from-green-400 to-green-500"
                        }`}
                      >
                        {satwa.status}
                      </div>
                    ) : (
                      "-"
                    )}
                    <div className="px-2 py-1 rounded-full bg-neutral-0 text-neutral-100 text-xs">
                      {satwa.statusDilindungi ? satwa.statusDilindungi : "-"}
                    </div>
                    <div className="px-2 py-1 rounded-full bg-neutral-0 text-neutral-100 text-xs">
                      {satwa.statusEndemik ? satwa.statusEndemik : "-"}
                    </div>
                  </div>
                  <div className="text-sm flex gap-2 items-center">
                    <div>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <p className="text-start">
                      {satwa.lokasiRehabilitasi
                        ? satwa.lokasiRehabilitasi
                        : "-"}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      {/* DETAIL MODAL */}
      {selectedinterkoneksi && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 py-4  z-50 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedinterkoneksi ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="w-full max-h-full overflow-y-auto my-4 md:w-3/4 lg:w-2/3 bg-white rounded-lg p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="w-full">
                <div className="flex justify-between w-full gap-4 items-start">
                  <div className="flex gap-2 items-start">
                    <div>
                      <h1 className="font-semibold text-2xl">
                        Nama Ilmiah:{" "}
                        {selectedinterkoneksi.namaIlmiah
                          ? selectedinterkoneksi.namaIlmiah
                          : "-"}
                      </h1>
                      <p className="text-neutral-500">
                        ID Satwa:{" "}
                        {selectedinterkoneksi.idSatwa
                          ? selectedinterkoneksi.idSatwa
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <X
                    onClick={() => setSelectedinterkoneksi(null)}
                    className="w-6 cursor-pointer"
                  />
                </div>
                {selectedinterkoneksi.image && (
                  <div className="rounded-xl mt-4 overflow-hidden flex justify-center w-full bg-neutral-900">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={selectedinterkoneksi.image}
                      alt="Gambar Satwa"
                      className="w-full lg:w-2/3 rounded-md"
                    />
                  </div>
                )}

                <div className="flex mt-4 gap-2">
                  {selectedinterkoneksi.status ? (
                    <div
                      className={`px-2 py-1 rounded-full bg-neutral-0 text-neutral-10 font-semibold text-center text-xs ${
                        selectedinterkoneksi.status ===
                        StatusSatwaRehab.REHABILITASI
                          ? "bg-gradient-to-tr from-amber-400 to-amber-500"
                          : selectedinterkoneksi.status ===
                            StatusSatwaRehab.MATI
                          ? "bg-gradient-to-tr from-red-400 to-red-500"
                          : "bg-gradient-to-tr from-green-400 to-green-500"
                      }`}
                    >
                      {selectedinterkoneksi.status}
                    </div>
                  ) : (
                    "-"
                  )}

                  <div className="px-2 py-1 rounded-full bg-neutral-200 text-neutral-100 text-xs">
                    {selectedinterkoneksi.statusDilindungi
                      ? selectedinterkoneksi.statusDilindungi
                      : "-"}
                  </div>
                  <div className="px-2 py-1 rounded-full bg-neutral-200 text-neutral-100 text-xs">
                    {selectedinterkoneksi.statusEndemik
                      ? selectedinterkoneksi.statusEndemik
                      : "-"}
                  </div>
                </div>

                <div className="flex flex-col gap-1 justify-start items-center mt-4 md:flex-row md:gap-4">
                  <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start">
                    <div>
                      <MapPin className="w-4" />
                    </div>
                    <p>
                      Lokasi Rehabilitasi:{" "}
                      {selectedinterkoneksi.lokasiRehabilitasi
                        ? selectedinterkoneksi.lokasiRehabilitasi
                        : "-"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start">
                    <div>
                      <Calendar className="w-4" />
                    </div>
                    <p>
                      Tanggal Serah Terima:{" "}
                      {selectedinterkoneksi.tanggalSerahTerima
                        ? new Date(
                            selectedinterkoneksi.tanggalSerahTerima
                          ).toLocaleDateString("id-ID")
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between gap-4">
                <div className="basis-1/2 flex flex-col gap-2">
                  <div>
                    <h1 className="font-semibold">Jenis Satwa</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedinterkoneksi.jenisSatwa
                        ? selectedinterkoneksi.jenisSatwa
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-semibold">Kondisi Satwa</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedinterkoneksi.kondisiSatwa
                        ? selectedinterkoneksi.kondisiSatwa
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="basis-1/2 flex flex-col gap-2">
                  <div>
                    <h1 className="font-semibold">Keterangan</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedinterkoneksi.keterangan
                        ? selectedinterkoneksi.keterangan
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-semibold">Asal Usul</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedinterkoneksi.asalUsul
                        ? selectedinterkoneksi.asalUsul
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
