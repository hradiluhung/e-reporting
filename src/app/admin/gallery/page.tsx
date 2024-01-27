"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import Dropdown from "@/components/dropdown/Dropdown"
import Pagination from "@/components/pagination/Pagination"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { MediaType } from "@/constants/media-type"
import {
  deleteGalleryById,
  getAllGallery,
} from "@/controllers/gallery-controller"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import { showToast } from "@/helpers/showToast"
import { deleteMedia } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { ExternalLink, PlusCircle, Trash2, X } from "react-feather"

export default function Page() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [filteredGalleries, setFilteredGalleries] = useState<Gallery[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [filterLembaga, setFilterLembaga] = useState<string>("")
  const [listLembaga, setListLembaga] = useState<Lembaga[]>([])
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null)
  const [selectedDeletedGallery, setSelectedDeletedGallery] =
    useState<Gallery | null>(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 6
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  const fetchAllGallery = useCallback(async () => {
    const res = await getAllGallery()
    setGalleries(res.data)

    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
  }, [])

  const fetchAllLembaga = useCallback(async () => {
    const res = await getAllLembaga()
    setListLembaga(res.data)
  }, [])

  const fetchAllData = useCallback(async () => {
    setIsLoadingInit(true)
    await fetchAllGallery()
    await fetchAllLembaga()
    setIsLoadingInit(false)
  }, [fetchAllGallery, fetchAllLembaga])

  const onDeleteGallery = async (idGallery: string, publicId: string) => {
    try {
      setIsLoadingDelete(true)
      await deleteMedia(publicId)
      const res = await deleteGalleryById(idGallery)

      if (res.status === 200) {
        showToast(res.message, WidgetTypes.SUCCESS)
        await fetchAllData()
        setSelectedDeletedGallery(null)
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
    fetchAllData()
  }, [fetchAllData])

  useEffect(() => {
    setFilteredGalleries(
      galleries.filter((gallery) => gallery.lembaga._id === filterLembaga)
    )
  }, [filterLembaga, galleries])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl text-neutral-100">Gallery</h1>
            <p className="text-base">Gallery Lembaga</p>
          </div>
          <div className="flex flex-start">
            <Link href="/admin/gallery/add">
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
              <Dropdown
                options={listLembaga.map((lembaga) => lembaga._id)}
                optionsText={listLembaga.map((lembaga) => lembaga.nama)}
                defaultValue="Lembaga"
                onChange={(e) => {
                  setFilterLembaga(e.target.value)
                }}
                placeholder="Semua Lembaga"
                size={WidgetSizes.MEDIUM}
                value={filterLembaga}
              />
            </div>
          </div>

          {/*  */}
          <div className="w-full">
            {isLoadingInit ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
              </div>
            ) : galleries.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">Belum ada data gallery</p>
              </div>
            ) : filterLembaga !== "" && filteredGalleries.length !== 0 ? (
              <>
                <div className="mb-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGalleries
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((gallery, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden bg-white shadow-md"
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

                          <div className="mt-2 flex gap-2">
                            <OutlinedButton
                              size={WidgetSizes.SMALL}
                              type={WidgetTypes.ERROR}
                              ButtonIcon={Trash2}
                              onClick={() => {
                                setSelectedDeletedGallery(gallery)
                              }}
                            />
                            <FilledButton
                              size={WidgetSizes.SMALL}
                              type={WidgetTypes.PRIMARY}
                              ButtonIcon={ExternalLink}
                              onClick={() => {
                                setSelectedGallery(gallery)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
              </>
            ) : filterLembaga !== "" && filteredGalleries.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">
                  Belum ada galeri untuk lembaga tersebut
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleries
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((gallery, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden bg-white shadow-md"
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

                          <div className="mt-2 flex gap-2">
                            <OutlinedButton
                              size={WidgetSizes.SMALL}
                              type={WidgetTypes.ERROR}
                              ButtonIcon={Trash2}
                              onClick={() => {
                                setSelectedDeletedGallery(gallery)
                              }}
                            />
                            <FilledButton
                              size={WidgetSizes.SMALL}
                              type={WidgetTypes.PRIMARY}
                              ButtonIcon={ExternalLink}
                              onClick={() => {
                                setSelectedGallery(gallery)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {selectedDeletedGallery && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedDeletedGallery ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg p-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <h1 className="font-semibold text-lg">Hapus Lembaga</h1>
                  <X
                    onClick={() => setSelectedDeletedGallery(null)}
                    className="w-6 cursor-pointer"
                  />
                </div>
                <div className="flex gap-6 items-center mt-2 justify-start ">
                  <p>Yakin ingin menghapus galeri tersebut?</p>
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
                onClick={() =>
                  onDeleteGallery(
                    selectedDeletedGallery._id,
                    selectedDeletedGallery.publicId
                  )
                }
              />
              <OutlinedButton
                text="Batal"
                size={WidgetSizes.SMALL}
                ButtonIcon={X}
                onClick={() => setSelectedDeletedGallery(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedGallery && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-70 flex justify-center items-center ${
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
