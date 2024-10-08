"use client"

import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import SearchBar from "@/components/input/SearchBar"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import "mapbox-gl/dist/mapbox-gl.css"
import {
  deleteMultiplePersebaranSatwa,
  deletePersebaranSatwaById,
  getAllPersebaranSatwa,
} from "@/controllers/persebaran-satwa-controller"
import { showToast } from "@/helpers/showToast"
import { deleteMedia } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  Edit2,
  ExternalLink,
  MapPin,
  PlusCircle,
  Trash2,
  X,
  Map as MapIcon,
  Calendar,
} from "react-feather"
import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl"
import Pagination from "@/components/pagination/Pagination"

export default function Home() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const [persebaranSatwas, setPersebaranSatwas] = useState<PersebaranSatwa[]>(
    []
  )
  const [filteredPersebaranSatwas, setFilteredPersebaranSatwas] = useState<
    PersebaranSatwa[]
  >([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [selectedPersebaranSatwa, setSelectedPersebaranSatwa] =
    useState<PersebaranSatwa | null>(null)
  const [selectedDeletedPersebaranSatwa, setSelectedDeletedPersebaranSatwa] =
    useState<PersebaranSatwa | null>(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
  const [selectedMarker, setSelectedMarker] = useState<{
    latitude: number | null
    longitude: number | null
  }>({
    latitude: null,
    longitude: null,
  })
  const mapRef: any = useRef(null)

  const [listDeletedPersebaran, setListDeletedPersebaran] = useState<string[]>(
    []
  )
  const [isLoadingDeleteMultiple, setIsLoadingDeleteMultiple] =
    useState<boolean>(false)
  const [isModalDeleteMultipleOpen, setIsModalDeleteMultipleOpen] =
    useState<boolean>(false)

  // pagination
  const [page, setPage] = useState<number>(1)
  const itemsPerPage = 10
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchKeyword(e.target.value)
  }

  const fetchAllPersebaranSatwa = async () => {
    const res = await getAllPersebaranSatwa()
    setPersebaranSatwas(res.data)
    setTotalPages(Math.ceil(res.data.length / itemsPerPage))

    setIsLoadingInit(false)
  }

  const onOpenDeleteModal = (satwa: PersebaranSatwa) => {
    setSelectedDeletedPersebaranSatwa(satwa)
  }

  const onCloseDeleteModal = () => {
    setSelectedDeletedPersebaranSatwa(null)
  }

  const onOpenDetailModal = (satwa: PersebaranSatwa) => {
    setSelectedPersebaranSatwa(satwa)
  }

  const onCloseDetailModal = () => {
    setSelectedPersebaranSatwa(null)
  }

  const onClickDelete = async (id: string, publicId: string) => {
    try {
      setIsLoadingDelete(true)

      await deleteMedia(publicId)
      const res = await deletePersebaranSatwaById(id)

      if (res.status === 200) {
        showToast("Berhasil menghapus satwa rehabilitasi", WidgetTypes.SUCCESS)
        fetchAllPersebaranSatwa()
        setSelectedDeletedPersebaranSatwa(null)
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  const zoomToSelectedLoc = (
    e: React.MouseEvent<HTMLDivElement>,
    lat: number,
    lon: number
  ) => {
    e.stopPropagation()
    setSelectedMarker({
      latitude: lat,
      longitude: lon,
    })

    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lon, lat], zoom: 10 })
    }
  }

  const onDeleteMultiplePersebaran = async () => {
    try {
      setIsLoadingDeleteMultiple(true)

      const res = await deleteMultiplePersebaranSatwa(listDeletedPersebaran)

      if (res.status === 200) {
        res.data.forEach(async (persebaran: PersebaranSatwa) => {
          persebaran.publicId && (await deleteMedia(persebaran.publicId))
        })

        showToast(res.message, WidgetTypes.SUCCESS)

        fetchAllPersebaranSatwa()
        setListDeletedPersebaran([])
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingDeleteMultiple(false)
      setIsModalDeleteMultipleOpen(false)
    }
  }

  const handleDeletePersebaran = (id: string) => {
    const newList = [...listDeletedPersebaran]
    const isExist = newList.includes(id)

    if (isExist) {
      const filteredList = newList.filter((item) => item !== id)
      setListDeletedPersebaran(filteredList)
    } else {
      newList.push(id)
      setListDeletedPersebaran(newList)
    }
  }

  useEffect(() => {
    fetchAllPersebaranSatwa()
  }, [])

  useEffect(() => {
    setFilteredPersebaranSatwas(
      persebaranSatwas.filter(
        (satwa) =>
          satwa.namaIlmiah
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          satwa.idSatwa.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )

    setTotalPages(Math.ceil(filteredPersebaranSatwas.length / itemsPerPage))
    setListDeletedPersebaran([])
    setPage(1)
  }, [searchKeyword, persebaranSatwas, filteredPersebaranSatwas.length])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl">
              Persebaran Satwa Rehabilitasi
            </h1>
            <p className="text-base">
              Daftar persebaran satwa liar rehabilitasi yang telah
              dilepasliarkan di Indonesia
            </p>
          </div>
          <div className="flex flex-start gap-2">
            <Link href="/admin/persebaran/maps">
              <OutlinedButton
                text="Peta Persebaran"
                ButtonIcon={MapIcon}
                type={WidgetTypes.SECONDARY}
                size={WidgetSizes.MEDIUM}
              />
            </Link>
            <Link href="/admin/persebaran/add">
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
            ) : persebaranSatwas.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">Belum ada data satwa rehabilitasi</p>
              </div>
            ) : searchKeyword !== "" &&
              filteredPersebaranSatwas.length !== 0 ? (
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
                        <th scope="col" className="px-3 py-3">
                          No
                        </th>
                        <th scope="col" className="px-3 py-3">
                          ID Satwa
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Nama Ilmiah
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Endemik/Non
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Dilindungi/Non
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Lokasi Pelepasliaran
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Tanggal Pelepasliaran
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Gambar
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    {filteredPersebaranSatwas
                      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                      .map((satwa, index) => (
                        <tbody key={index}>
                          <tr className="odd:bg-white even:bg-gray-50 border-b ">
                            <td className="px-3 py-3">
                              {index + (page - 1) * itemsPerPage + 1}
                            </td>
                            <td className="px-3 py-3">{satwa.idSatwa}</td>
                            <th
                              scope="row"
                              className="px-3 py-3 font-medium text-gray-900"
                            >
                              {satwa.namaIlmiah}
                            </th>
                            <td className="px-3 py-3">{satwa.statusEndemik}</td>
                            <td className="px-3 py-3">
                              {satwa.statusDilindungi}
                            </td>
                            <td className="px-3 py-3">
                              {satwa.lokasiPelepasliaran}
                            </td>
                            <td className="px-3 py-3">
                              {new Date(
                                satwa.tanggalPelepasliaran
                              ).toLocaleDateString("id-ID")}
                            </td>
                            <td className="px-3 py-3">
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
                            <td className="px-3 py-3">
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
                <div className="mt-4">
                  <Pagination
                    currentPage={page}
                    setCurrentPage={handlePageChange}
                    totalPages={totalPages}
                  />
                </div>
              </>
            ) : searchKeyword !== "" &&
              filteredPersebaranSatwas.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">
                  Satwa rehabilitasi tidak ditemukan
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-center items-center w-full md:justify-between">
                  <div>
                    {listDeletedPersebaran.length !== 0 && (
                      <FilledButton
                        type={WidgetTypes.ERROR}
                        size={WidgetSizes.SMALL}
                        text="Hapus Terpilih"
                        ButtonIcon={Trash2}
                        onClick={() => {
                          setIsModalDeleteMultipleOpen(true)
                        }}
                      />
                    )}
                  </div>
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
                        <th scope="col" className="px-3 py-3 text-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                            onChange={() => {
                              // select all just what in current page
                              const newList = [...listDeletedPersebaran]
                              const totalItem = persebaranSatwas.slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                              ).length
                              const isAllSelected =
                                listDeletedPersebaran.length === totalItem

                              if (isAllSelected) {
                                // remove all
                                for (let i = 0; i < totalItem; i++) {
                                  newList.pop()
                                }
                              } else {
                                for (let i = 0; i < totalItem; i++) {
                                  newList.pop()
                                }
                                for (let i = 0; i < totalItem; i++) {
                                  newList.push(
                                    persebaranSatwas[
                                      i + (page - 1) * itemsPerPage
                                    ]._id
                                  )
                                }
                              }

                              setListDeletedPersebaran(newList)
                            }}
                            checked={
                              listDeletedPersebaran.length ===
                              persebaranSatwas.slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                              ).length
                            }
                          />
                        </th>
                        <th scope="col" className="px-3 py-3">
                          No
                        </th>
                        <th scope="col" className="px-3 py-3">
                          ID Satwa
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Nama Ilmiah
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Endemik/Non
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Dilindungi/Non
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Lokasi Pelepasliaran
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Tanggal Pelepasliaran
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Gambar
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {persebaranSatwas
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((satwa, index) => (
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-gray-50 border-b"
                          >
                            <td className="px-1 py-4 text-center">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                                onChange={() =>
                                  handleDeletePersebaran(satwa._id)
                                }
                                checked={listDeletedPersebaran.includes(
                                  satwa._id
                                )}
                              />
                            </td>
                            <td className="px-3 py-3">
                              {index + (page - 1) * itemsPerPage + 1}
                            </td>
                            <td className="px-3 py-3">{satwa.idSatwa}</td>
                            <th
                              scope="row"
                              className="px-3 py-3 font-medium text-gray-900"
                            >
                              {satwa.namaIlmiah}
                            </th>
                            <td className="px-3 py-3">{satwa.statusEndemik}</td>
                            <td className="px-3 py-3">
                              {satwa.statusDilindungi}
                            </td>
                            <td className="px-3 py-3">
                              {satwa.lokasiPelepasliaran}
                            </td>
                            <td className="px-3 py-3">
                              {new Date(
                                satwa.tanggalPelepasliaran
                              ).toLocaleDateString("id-ID")}
                            </td>
                            <td className="px-3 py-3">
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
                            <td className="px-3 py-3">
                              <div className="flex gap-2 mt-4">
                                <OutlinedButton
                                  ButtonIcon={Trash2}
                                  size={WidgetSizes.SMALL}
                                  type={WidgetTypes.ERROR}
                                  onClick={() => onOpenDeleteModal(satwa)}
                                />
                                <FilledButton
                                  size={WidgetSizes.SMALL}
                                  text="Lokasi"
                                  ButtonIcon={ExternalLink}
                                  onClick={() => {
                                    onOpenDetailModal(satwa)
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
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
      {selectedDeletedPersebaranSatwa && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedDeletedPersebaranSatwa ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg p-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <h1 className="font-semibold text-lg">
                    Hapus Persebaran Satwa Rehabilitasi
                  </h1>
                  <X
                    onClick={onCloseDeleteModal}
                    className="w-6 cursor-pointer"
                  />
                </div>
                <div className="flex gap-6 items-center mt-2 justify-start ">
                  <p>
                    Yakin ingin menghapus{" "}
                    <b>{selectedDeletedPersebaranSatwa.namaIlmiah}</b>?
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
                    selectedDeletedPersebaranSatwa._id,
                    selectedDeletedPersebaranSatwa.image
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
      {selectedPersebaranSatwa && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-50 flex justify-center items-center ${
            selectedPersebaranSatwa ? "fade-in-down" : "fade-out-up"
          }`}
        >
          <div className="w-full max-h-full overflow-y-auto my-4 md:w-3/4 lg:w-2/3 bg-white rounded-lg p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="w-full">
                <div className="flex justify-between w-full gap-4 items-start">
                  <div className="flex gap-2 items-start">
                    <div>
                      <h1 className="font-semibold text-2xl">
                        Nama Ilmiah: {selectedPersebaranSatwa.namaIlmiah}
                      </h1>
                      <p className="text-neutral-500">
                        ID Satwa: {selectedPersebaranSatwa.idSatwa}
                      </p>
                    </div>
                    <Link
                      href={`/admin/persebaran/edit/${selectedPersebaranSatwa._id}`}
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
                {selectedPersebaranSatwa.image && (
                  <div className="rounded-xl mt-4 overflow-hidden flex justify-center w-full bg-neutral-900">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={selectedPersebaranSatwa.image}
                      alt="Gambar Satwa"
                      className="w-full lg:w-2/3 rounded-md"
                    />
                  </div>
                )}

                <div className="flex mt-4 gap-2">
                  <div className="px-2 py-1 rounded-full bg-neutral-200 text-neutral-100 text-xs">
                    {selectedPersebaranSatwa.statusDilindungi}
                  </div>
                  <div className="px-2 py-1 rounded-full bg-neutral-200 text-neutral-100 text-xs">
                    {selectedPersebaranSatwa.statusEndemik}
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full">
                    <h1 className="font-semibold">Lokasi Pelepasliaran</h1>
                    <div className="mt-2 flex gap-1">
                      <MapPin className="w-4" />
                      <p>{selectedPersebaranSatwa.lokasiPelepasliaran}</p>
                    </div>
                    <div className="w-full mt-1">
                      <Map
                        ref={mapRef}
                        mapboxAccessToken={mapboxToken}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        initialViewState={{
                          latitude: parseFloat(
                            selectedPersebaranSatwa.koordinatPelepasliaran.split(
                              ","
                            )[0]
                          ),
                          longitude: parseFloat(
                            selectedPersebaranSatwa.koordinatPelepasliaran.split(
                              ","
                            )[1]
                          ),
                          zoom: 10,
                        }}
                        style={{
                          width: "100%",
                          height: 300,
                          borderRadius: "16px",
                          overflow: "hidden",
                        }}
                        maxZoom={20}
                        minZoom={3}
                      >
                        <GeolocateControl position="top-left" />
                        <NavigationControl position="top-left" />
                        <Marker
                          longitude={parseFloat(
                            selectedPersebaranSatwa.koordinatPelepasliaran.split(
                              ","
                            )[1]
                          )}
                          latitude={parseFloat(
                            selectedPersebaranSatwa.koordinatPelepasliaran.split(
                              ","
                            )[0]
                          )}
                        >
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={(e: any) => {
                              zoomToSelectedLoc(
                                e,
                                parseFloat(
                                  selectedPersebaranSatwa.koordinatPelepasliaran.split(
                                    ","
                                  )[0]
                                ),
                                parseFloat(
                                  selectedPersebaranSatwa.koordinatPelepasliaran.split(
                                    ","
                                  )[1]
                                )
                              )
                            }}
                          >
                            <Image
                              width={0}
                              height={0}
                              sizes="100vh"
                              src="/assets/marker.png"
                              alt="Gambar Satwa"
                              className="w-8 h-8"
                            />
                          </button>
                        </Marker>
                        {selectedMarker.latitude !== null &&
                        selectedMarker.longitude !== null ? (
                          <Popup
                            offset={25}
                            latitude={parseFloat(
                              selectedPersebaranSatwa.koordinatPelepasliaran.split(
                                ","
                              )[0]
                            )}
                            longitude={parseFloat(
                              selectedPersebaranSatwa.koordinatPelepasliaran.split(
                                ","
                              )[1]
                            )}
                            onClose={() => {
                              setSelectedMarker({
                                latitude: null,
                                longitude: null,
                              })
                            }}
                            closeButton={false}
                          >
                            <p className="text-neutral-500 font-semibold">
                              ID Satwa: {selectedPersebaranSatwa.idSatwa}
                            </p>
                            <h3 className="text-lg">
                              Nama Ilmiah: {selectedPersebaranSatwa.namaIlmiah}
                            </h3>
                          </Popup>
                        ) : null}
                      </Map>
                    </div>
                  </div>
                  <div className="w-full mt-2">
                    <h1 className="font-semibold">Tanggal Pelepasliaran</h1>
                    <div className="mt-2 flex gap-1">
                      <Calendar className="w-4" />
                      <p>
                        {new Date(
                          selectedPersebaranSatwa.tanggalPelepasliaran
                        ).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MULTIPLE MODAL */}
      {isModalDeleteMultipleOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 bg-black bg-opacity-50 flex justify-center items-center ${
            isModalDeleteMultipleOpen ? "fade-in-down" : "fade-out-up"
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
                    onClick={() => {
                      setIsModalDeleteMultipleOpen(false)
                    }}
                    className="w-6 cursor-pointer"
                  />
                </div>
                <div className="flex gap-6 items-center mt-2 justify-start ">
                  <p>
                    Yakin ingin menghapus <b>{listDeletedPersebaran.length}</b>{" "}
                    satwa rehabilitasi?
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
                isLoading={isLoadingDeleteMultiple}
                isDisabled={isLoadingDeleteMultiple}
                onClick={() => {
                  onDeleteMultiplePersebaran()
                }}
              />
              <OutlinedButton
                text="Batal"
                size={WidgetSizes.SMALL}
                ButtonIcon={X}
                onClick={() => {
                  setIsModalDeleteMultipleOpen(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
