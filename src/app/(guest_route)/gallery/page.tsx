"use client"
import FilledButton from "@/components/buttons/FilledButton"
import Dropdown from "@/components/dropdown/Dropdown"
import Pagination from "@/components/pagination/Pagination"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { MediaType } from "@/constants/media-type"
import { getAllGallery } from "@/controllers/gallery-controller"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { X } from "react-feather"

export default function Page() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [filteredGalleries, setFilteredGalleries] = useState<Gallery[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null)

  const [lembagas, setLembagas] = useState<Lembaga[]>([])
  const [filterLembaga, setFilterLembaga] = useState<string>("")

  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 8
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  const fetchAllGalleries = useCallback(async () => {
    const res = await getAllGallery()
    setGalleries(res.data)

    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
  }, [])

  const fetchAllLembagas = useCallback(async () => {
    const res = await getAllLembaga()
    setLembagas(res.data)
  }, [])

  const fetchAllData = useCallback(async () => {
    await fetchAllGalleries()
    await fetchAllLembagas()
    setIsLoadingInit(false)
  }, [fetchAllGalleries, fetchAllLembagas])

  useEffect(() => {
    if (filterLembaga !== "") {
      setFilteredGalleries(
        galleries.filter((gallery) => {
          return gallery.lembaga._id === filterLembaga
        })
      )

      setTotalPages(Math.ceil(filteredGalleries.length / itemsPerPage))
      setPage(1)
    }
  }, [filterLembaga, galleries, filteredGalleries.length])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  return (
    <div className="w-full mt-16 py-6 lg:py-24">
      <div className="px-4 md:px-8 lg:px-36">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold">List Satwa Rehabilitasi</h1>
          <p>Rehabilitasi satwa untuk pemulihan alam</p>
        </div>
        <div className="mt-10 flex justify-between">
          <div className="w-64">
            <Dropdown
              options={lembagas.map((lembaga) => lembaga._id)}
              optionsText={lembagas.map((lembaga) => lembaga.nama)}
              defaultValue="Lembaga"
              onChange={(e) => {
                setFilterLembaga(e.target.value)
              }}
              placeholder="Semua Lembaga"
              size={WidgetSizes.MEDIUM}
              value={filterLembaga}
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
          ) : galleries.length === 0 ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada gallery
              </p>
            </div>
          ) : filteredGalleries.length !== 0 && filterLembaga !== "" ? (
            filteredGalleries
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((gallery, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg"
                  onClick={() => setSelectedGallery(gallery)}
                >
                  {gallery.type === MediaType.IMAGE ? (
                    <Image
                      src={gallery.media}
                      width={500}
                      height={500}
                      alt="Galeri lembaga"
                      className="w-full object-cover h-52"
                    />
                  ) : (
                    // video with video control only play or pause
                    <video controls className="w-full object-cover h-52">
                      <source src={gallery.media} />
                    </video>
                  )}
                  <div className="p-4">
                    <div>
                      <p className="text-xs font-normal">Nama Lembaga</p>
                      <p className="text-primary-100 font-semibold">
                        {gallery.lembaga.nama}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          ) : filteredGalleries.length === 0 && filterLembaga !== "" ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada gallery ditemukan
              </p>
            </div>
          ) : (
            galleries
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((gallery, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg"
                  onClick={() => setSelectedGallery(gallery)}
                >
                  {gallery.type === MediaType.IMAGE ? (
                    <Image
                      src={gallery.media}
                      width={500}
                      height={500}
                      alt="Galeri lembaga"
                      className="w-full object-cover h-52"
                    />
                  ) : (
                    // video with video control only play or pause
                    <video controls className="w-full object-cover h-52">
                      <source src={gallery.media} />
                    </video>
                  )}
                  <div className="p-4">
                    <div>
                      <p className="text-xs font-normal">Nama Lembaga</p>
                      <p className="text-primary-100 font-semibold">
                        {gallery.lembaga.nama}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedGallery && (
        <div
          className={`fixed top-0 left-0 w-full z-50 h-full px-4 py-4 bg-black bg-opacity-70 flex justify-center items-center ${
            selectedGallery ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="flex flex-col gap-4 items-start justify-start relative">
              <div className="absolute top-4 end-4 cursor-pointer z-10">
                <FilledButton
                  size={WidgetSizes.SMALL}
                  type={WidgetTypes.ERROR}
                  ButtonIcon={X}
                  onClick={() => setSelectedGallery(null)}
                />
              </div>

              {selectedGallery.type === MediaType.IMAGE ? (
                <Image
                  src={selectedGallery.media}
                  width={0}
                  height={0}
                  sizes="100vh"
                  alt="Galeri lembaga"
                  className="h-full w-auto object-cover"
                />
              ) : (
                // video with video control only play or pause
                <video controls className="w-full object-cover">
                  <source src={selectedGallery.media} />
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
