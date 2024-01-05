"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import AdminSatwaRehabCard from "@/components/cards/AdminSatwaRehabCard"
import SearchBar from "@/components/input/SearchBar"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { StatusSatwaRehab } from "@/constants/satwa-rehab"
import {
  deleteSatwaRehabById,
  getAllSatwaRehabilitasi,
} from "@/controllers/satwa-rehab-controller"
import { showToast } from "@/helpers/showToast"
import { deletePhoto } from "@/helpers/uploadPhotos"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import {
  Calendar,
  Edit2,
  ExternalLink,
  MapPin,
  PlusCircle,
  Search,
  Trash2,
  X,
} from "react-feather"

export default function Page() {
  const [satwaRehabs, setSatwaRehabs] = useState<SatwaRehabilitasi[]>([])
  const [filteredSatwaRehabs, setFilteredSatwaRehabs] = useState<
    SatwaRehabilitasi[]
  >([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [selectedDeletedSatwaRehab, setSelectedDeletedSatwaRehab] =
    useState<SatwaRehabilitasi | null>(null)
  const [selectedSatwaRehab, setSelectedSatwaRehab] =
    useState<SatwaRehabilitasi | null>(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchKeyword(e.target.value)
  }

  const fetchAllSatwaRehab = async () => {
    const res = await getAllSatwaRehabilitasi()
    setSatwaRehabs(res.data)
    setTotalPages(Math.ceil(res.data.length / itemsPerPage))

    setIsLoadingInit(false)
  }

  const onOpenDeleteModal = (satwa: SatwaRehabilitasi) => {
    setSelectedDeletedSatwaRehab(satwa)
  }

  const onCloseDeleteModal = () => {
    setSelectedDeletedSatwaRehab(null)
  }

  const onOpenDetailModal = (satwa: SatwaRehabilitasi) => {
    setSelectedSatwaRehab(satwa)
  }

  const onCloseDetailModal = () => {
    setSelectedSatwaRehab(null)
  }

  useEffect(() => {
    fetchAllSatwaRehab()
  }, [])

  useEffect(() => {
    setFilteredSatwaRehabs(
      satwaRehabs.filter((satwa) =>
        satwa.namaIlmiah.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )

    setPage(1)
  }, [searchKeyword, satwaRehabs])

  const onClickDetail = () => {}

  const onClickDelete = async (id: string, publicId: string) => {
    try {
      setIsLoadingDelete(true)

      await deletePhoto(publicId)
      const res = await deleteSatwaRehabById(id)

      if (res.status === 200) {
        showToast("Berhasil menghapus satwa rehabilitasi", WidgetTypes.SUCCESS)
        fetchAllSatwaRehab()
        setSelectedDeletedSatwaRehab(null)
      } else {
        showToast("Gagal menghapus lembaga", WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Kelola Satwa Rehabilitasi
            </h1>
            <p className="text-base">Rehabilitasi satwa untuk pemulihan alam</p>
          </div>
          <div className="flex flex-start">
            <Link href="/admin/satwa-rehab/add">
              <OutlinedButton
                text="Tambah"
                ButtonIcon={PlusCircle}
                type={WidgetTypes.PRIMARY}
                size={WidgetSizes.MEDIUM}
              />
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-full md:w-64">
            <SearchBar
              searchKeyword={searchKeyword}
              onSearchKeywordChange={onSearchKeywordChange}
            />
          </div>
        </div>
        <div className="w-full">
          {isLoadingInit ? (
            <div className="w-full">
              <Skeleton size={WidgetSizes.MEDIUM} />
            </div>
          ) : satwaRehabs.length === 0 ? (
            <div className="w-full flex justify-center">
              <p className="text-center">Belum ada data satwa rehabilitasi</p>
            </div>
          ) : searchKeyword !== "" && filteredSatwaRehabs.length !== 0 ? (
            <>
              {filteredSatwaRehabs.length > itemsPerPage && (
                <div className="flex justify-end mb-4">
                  {new Array(totalPages).fill(null).map((_, index) => (
                    <button
                      key={index + 1}
                      className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        page === index + 1
                          ? "bg-gradient-to-tr from-primary-50 to-primary-100 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ID Satwa
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama Ilmiah
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Endemik/Non
                      </th>
                      <th scope="col" className="px-6 py-3">
                        DIlindungi/Non
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Gambar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {filteredSatwaRehabs
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((satwa, index) => (
                      <tbody key={index}>
                        <tr className="odd:bg-white even:bg-gray-50 border-b ">
                          <td className="px-6 py-4">{index + page}</td>
                          <td className="px-6 py-4">{satwa.idSatwa}</td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900"
                          >
                            {satwa.namaIlmiah}
                          </th>
                          <td className="px-6 py-4">
                            <div
                              className={`px-2 py-1 rounded-full bg-neutral-0 text-neutral-10 font-semibold text-center text-xs ${
                                satwa.status === StatusSatwaRehab.REHABILITASI
                                  ? "bg-gradient-to-tr from-amber-400 to-amber-500"
                                  : satwa.status === StatusSatwaRehab.MATI
                                  ? "bg-gradient-to-tr from-red-400 to-red-500"
                                  : "bg-gradient-to-tr from-green-400 to-green-500"
                              }`}
                            >
                              {satwa.status}
                            </div>
                          </td>
                          <td className="px-6 py-4">{satwa.statusEndemik}</td>
                          <td className="px-6 py-4">
                            {satwa.statusDilindungi}
                          </td>
                          <td className="px-6 py-4">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vh"
                              src={satwa.image}
                              alt="Logo"
                              className="h-24 w-32 object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 mt-4">
                              <OutlinedButton
                                ButtonIcon={Trash2}
                                size={WidgetSizes.SMALL}
                                type={WidgetTypes.ERROR}
                                onClick={() => onOpenDeleteModal(satwa)}
                              />
                              <FilledButton
                                size={WidgetSizes.SMALL}
                                ButtonIcon={ExternalLink}
                                onClick={() => {
                                  onOpenDetailModal(satwa)
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </>
          ) : searchKeyword !== "" && filteredSatwaRehabs.length === 0 ? (
            <div className="w-full flex justify-center">
              <p className="text-center">Satwa rehabilitasi tidak ditemukan</p>
            </div>
          ) : (
            <>
              {satwaRehabs.length > itemsPerPage && (
                <div className="flex justify-end mb-4">
                  {new Array(totalPages).fill(null).map((_, index) => (
                    <button
                      key={index + 1}
                      className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        page === index + 1
                          ? "bg-gradient-to-tr from-primary-50 to-primary-100 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ID Satwa
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama Ilmiah
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Endemik/Non
                      </th>
                      <th scope="col" className="px-6 py-3">
                        DIlindungi/Non
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Gambar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {satwaRehabs
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((satwa, index) => (
                      <tbody key={index}>
                        <tr className="odd:bg-white even:bg-gray-50 border-b ">
                          <td className="px-6 py-4">{index + page}</td>
                          <td className="px-6 py-4">{satwa.idSatwa}</td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900"
                          >
                            {satwa.namaIlmiah}
                          </th>
                          <td className="px-6 py-4">
                            <div
                              className={`px-2 py-1 rounded-full bg-neutral-0 text-neutral-10 font-semibold text-center text-xs ${
                                satwa.status === StatusSatwaRehab.REHABILITASI
                                  ? "bg-gradient-to-tr from-amber-400 to-amber-500"
                                  : satwa.status === StatusSatwaRehab.MATI
                                  ? "bg-gradient-to-tr from-red-400 to-red-500"
                                  : "bg-gradient-to-tr from-green-400 to-green-500"
                              }`}
                            >
                              {satwa.status}
                            </div>
                          </td>
                          <td className="px-6 py-4">{satwa.statusEndemik}</td>
                          <td className="px-6 py-4">
                            {satwa.statusDilindungi}
                          </td>
                          <td className="px-6 py-4">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vh"
                              src={satwa.image}
                              alt="Logo"
                              className="h-24 w-32 object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 mt-4">
                              <OutlinedButton
                                ButtonIcon={Trash2}
                                size={WidgetSizes.SMALL}
                                type={WidgetTypes.ERROR}
                                onClick={() => onOpenDeleteModal(satwa)}
                              />
                              <FilledButton
                                size={WidgetSizes.SMALL}
                                ButtonIcon={ExternalLink}
                                onClick={() => {
                                  onOpenDetailModal(satwa)
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {selectedDeletedSatwaRehab && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedDeletedSatwaRehab ? "fade-in-down" : "fade-out-up"
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
                    onClick={onCloseDeleteModal}
                    className="w-6 cursor-pointer"
                  />
                </div>
                <div className="flex gap-6 items-center mt-2 justify-start ">
                  <p>
                    Yakin ingin menghapus{" "}
                    <b>{selectedDeletedSatwaRehab.namaIlmiah}</b>?
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
                  onClickDelete(
                    selectedDeletedSatwaRehab._id,
                    selectedDeletedSatwaRehab.image
                  )
                }}
              />
              <OutlinedButton
                text="Batal"
                size={WidgetSizes.SMALL}
                ButtonIcon={X}
                onClick={onCloseDeleteModal}
              />
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedSatwaRehab && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedSatwaRehab ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="w-full max-h-full overflow-y-auto my-4 md:w-3/4 lg:w-2/3 bg-white rounded-lg p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="w-full">
                <div className="flex justify-between w-full gap-4 items-center">
                  <div className="flex gap-2 items-center">
                    <h1 className="font-semibold text-lg">
                      {selectedSatwaRehab.namaIlmiah}
                    </h1>
                    <Link
                      href={`/admin/satwa-rehab/edit/${selectedSatwaRehab._id}`}
                    >
                      <OutlinedButton
                        size={WidgetSizes.SMALL}
                        ButtonIcon={Edit2}
                      />
                    </Link>
                  </div>
                  <X
                    onClick={() => setSelectedSatwaRehab(null)}
                    className="w-6 cursor-pointer"
                  />
                </div>
                <div className="rounded-xl mt-4 overflow-hidden flex justify-center w-full bg-neutral-900">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={selectedSatwaRehab.image}
                    alt="Logo"
                    className="w-full lg:w-2/3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 justify-start items-center mt-4 md:flex-row md:gap-4">
                  <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start">
                    <div>
                      <MapPin className="w-4" />
                    </div>
                    <p>
                      Lokasi Rehabilitasi:{" "}
                      {selectedSatwaRehab.lokasiRehabilitasi}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start">
                    <div>
                      <Calendar className="w-4" />
                    </div>
                    <p>
                      Tanggal Serah Terima:{" "}
                      {new Date(
                        selectedSatwaRehab.tanggalSerahTerima
                      ).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="font-semibold">Keterangan</h1>
                <p className="text-sm text-neutral-100">
                  {selectedSatwaRehab.keterangan}
                </p>
              </div>
              <div>
                <h1 className="font-semibold">Asal Usul</h1>
                <p className="text-sm text-neutral-100">
                  {selectedSatwaRehab.asalUsulSatwa}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
