"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import SearchBar from "@/components/input/SearchBar"
import Pagination from "@/components/pagination/Pagination"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { StatusSatwaRehab } from "@/constants/satwa-rehab"
import {
  deleteInterkoneksiById,
  getAllInterkoneksi,
} from "@/controllers/interkoneksi-controller"
import { showToast } from "@/helpers/showToast"
import { deleteMedia } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Calendar,
  Edit2,
  ExternalLink,
  MapPin,
  PlusCircle,
  Trash2,
  User,
  X,
} from "react-feather"

export default function Page() {
  const [interkoneksiSatwas, setInterkoneksiSatwas] = useState<Interkoneksi[]>(
    []
  )
  const [filteredInterkoneksiSatwas, setfilteredInterkoneksiSatwas] = useState<
    Interkoneksi[]
  >([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [
    selectedDeletedInterkoneksiSatwa,
    setSelectedDeletedInterkoneksiSatwa,
  ] = useState<Interkoneksi | null>(null)
  const [selectedInterkoneksiSatwa, setSelectedInterkoneksiSatwa] =
    useState<Interkoneksi | null>(null)
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

  const fetchAllInterkoneksi = async () => {
    const res = await getAllInterkoneksi()
    setInterkoneksiSatwas(res.data)
    setTotalPages(Math.ceil(res.data.length / itemsPerPage))

    setIsLoadingInit(false)
  }

  const onOpenDeleteModal = (satwa: Interkoneksi) => {
    setSelectedDeletedInterkoneksiSatwa(satwa)
  }

  const onCloseDeleteModal = () => {
    setSelectedDeletedInterkoneksiSatwa(null)
  }

  const onOpenDetailModal = (satwa: Interkoneksi) => {
    setSelectedInterkoneksiSatwa(satwa)
  }

  const onCloseDetailModal = () => {
    setSelectedInterkoneksiSatwa(null)
  }

  useEffect(() => {
    fetchAllInterkoneksi()
  }, [])

  useEffect(() => {
    setfilteredInterkoneksiSatwas(
      interkoneksiSatwas.filter((satwa) =>
        satwa.namaIlmiah.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )

    setPage(1)
  }, [searchKeyword, interkoneksiSatwas])

  const onClickDelete = async (id: string, publicId: string) => {
    try {
      setIsLoadingDelete(true)

      await deleteMedia(publicId)
      const res = await deleteInterkoneksiById(id)

      if (res.status === 200) {
        showToast(res.message, WidgetTypes.SUCCESS)
        fetchAllInterkoneksi()
        setSelectedDeletedInterkoneksiSatwa(null)
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
            <h1 className="font-bold text-2xl">
              Interkoneksi Satwa Rehabilitasi
            </h1>
            <p className="text-base">
              integrasi satu data satwa liar rehabilitasi di Indonesia
            </p>
          </div>
          <div className="flex flex-start">
            <Link href="/admin/interkoneksi-rehab/add">
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
          <div className="w-full flex justify-between">
            <div className="w-full md:w-64">
              <SearchBar
                prompt="Cari Nama Ilmiah"
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
            ) : interkoneksiSatwas.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">Belum ada data satwa rehabilitasi</p>
              </div>
            ) : searchKeyword !== "" &&
              filteredInterkoneksiSatwas.length !== 0 ? (
              <>
                <div className="mb-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>

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
                    {filteredInterkoneksiSatwas
                      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                      .map((satwa, index) => (
                        <tbody key={index}>
                          <tr className="odd:bg-white even:bg-gray-50 border-b ">
                            <td className="px-6 py-4">
                              {index + (page - 1) * itemsPerPage + 1}
                            </td>
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
                              {satwa.image ? (
                                <Image
                                  width={0}
                                  height={0}
                                  sizes="100vh"
                                  src={satwa.image}
                                  alt="Gambar Satwa"
                                  className="h-24 w-32 object-cover rounded-md"
                                />
                              ) : (
                                <div>-</div>
                              )}
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
                <div className="mt-4 flex justify-center w-full md:justify-end">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
              </>
            ) : searchKeyword !== "" &&
              filteredInterkoneksiSatwas.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">
                  Satwa rehabilitasi tidak ditemukan
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
                    {interkoneksiSatwas
                      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                      .map((satwa, index) => (
                        <tbody key={index}>
                          <tr className="odd:bg-white even:bg-gray-50 border-b ">
                            <td className="px-6 py-4">
                              {index + (page - 1) * itemsPerPage + 1}
                            </td>
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
                              {satwa.image ? (
                                <Image
                                  width={0}
                                  height={0}
                                  sizes="100vh"
                                  src={satwa.image}
                                  alt="Gambar Satwa"
                                  className="h-24 w-32 object-cover rounded-md"
                                />
                              ) : (
                                <div>-</div>
                              )}
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

      {/* DELETE MODAL */}
      {selectedDeletedInterkoneksiSatwa && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedDeletedInterkoneksiSatwa ? "fade-in-down" : "fade-out-up"
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
                    <b>{selectedDeletedInterkoneksiSatwa.namaIlmiah}</b>?
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
                    selectedDeletedInterkoneksiSatwa._id,
                    selectedDeletedInterkoneksiSatwa.image
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
      {selectedInterkoneksiSatwa && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedInterkoneksiSatwa ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="w-full max-h-full overflow-y-auto my-4 md:w-3/4 lg:w-2/3 bg-white rounded-lg p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="w-full">
                <div className="flex justify-between w-full gap-4 items-start">
                  <div className="flex gap-2 items-start">
                    <div>
                      <h1 className="font-semibold text-2xl">
                        Nama Ilmiah: {selectedInterkoneksiSatwa.namaIlmiah}
                      </h1>
                      <p className="text-neutral-500">
                        ID Satwa: {selectedInterkoneksiSatwa.idSatwa}
                      </p>
                    </div>
                    <Link
                      href={`/admin/interkoneksi-rehab/edit/${selectedInterkoneksiSatwa._id}`}
                    >
                      <OutlinedButton
                        size={WidgetSizes.SMALL}
                        ButtonIcon={Edit2}
                      />
                    </Link>
                  </div>
                  <X
                    onClick={onCloseDetailModal}
                    className="w-6 cursor-pointer"
                  />
                </div>
                {selectedInterkoneksiSatwa.image && (
                  <div className="rounded-xl mt-4 overflow-hidden flex justify-center w-full bg-neutral-900">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={selectedInterkoneksiSatwa.image}
                      alt="Gambar Satwa"
                      className="w-full lg:w-2/3 rounded-md"
                    />
                  </div>
                )}

                <div className="flex mt-4 gap-2">
                  <div
                    className={`px-2 py-1 rounded-full bg-neutral-0 text-neutral-10 font-semibold text-center text-xs ${
                      selectedInterkoneksiSatwa.status ===
                      StatusSatwaRehab.REHABILITASI
                        ? "bg-gradient-to-tr from-amber-400 to-amber-500"
                        : selectedInterkoneksiSatwa.status ===
                          StatusSatwaRehab.MATI
                        ? "bg-gradient-to-tr from-red-400 to-red-500"
                        : "bg-gradient-to-tr from-green-400 to-green-500"
                    }`}
                  >
                    {selectedInterkoneksiSatwa.status}
                  </div>

                  <div className="px-2 py-1 rounded-full bg-neutral-200 text-neutral-100 text-xs">
                    {selectedInterkoneksiSatwa.statusDilindungi}
                  </div>
                  <div className="px-2 py-1 rounded-full bg-neutral-200 text-neutral-100 text-xs">
                    {selectedInterkoneksiSatwa.statusEndemik}
                  </div>
                </div>

                <div className="flex flex-col gap-1 justify-start items-center mt-4 md:flex-row md:gap-4">
                  <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start">
                    <div>
                      <MapPin className="w-4" />
                    </div>
                    <p>
                      Lokasi Rehabilitasi:{" "}
                      {selectedInterkoneksiSatwa.lokasiRehabilitasi}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start">
                    <div>
                      <Calendar className="w-4" />
                    </div>
                    <p>
                      Tanggal Serah Terima:{" "}
                      {new Date(
                        selectedInterkoneksiSatwa.tanggalSerahTerima
                      ).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start">
                    <div>
                      <User className="w-4" />
                    </div>
                    <p>
                      PIC: {selectedInterkoneksiSatwa.personInCharge} (
                      {selectedInterkoneksiSatwa.kontakPIC})
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between gap-4">
                <div className="basis-1/2 flex flex-col gap-2">
                  <div>
                    <h1 className="font-semibold">Jenis Satwa</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedInterkoneksiSatwa.jenisSatwa}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-semibold">Kondisi Satwa</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedInterkoneksiSatwa.kondisiSatwa}
                    </p>
                  </div>
                </div>
                <div className="basis-1/2 flex flex-col gap-2">
                  <div>
                    <h1 className="font-semibold">Keterangan</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedInterkoneksiSatwa.keterangan}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-semibold">Asal Usul</h1>
                    <p className="text-sm text-neutral-100">
                      {selectedInterkoneksiSatwa.asalUsul}
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
