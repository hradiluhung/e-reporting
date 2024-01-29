"use client"
import SearchBar from "@/components/input/SearchBar"
import Pagination from "@/components/pagination/Pagination"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes } from "@/constants/button-types"
import { getAllPersebaranSatwa } from "@/controllers/persebaran-satwa-controller"
import React, { useCallback, useEffect, useRef, useState } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl"
import Image from "next/image"
import { Calendar, MapPin, X } from "react-feather"

export default function Page() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const [persebaranSatwa, setPersebaranSatwa] = useState<PersebaranSatwa[]>([])
  const [filteredPersebaranSatwa, setFilteredPersebaranSatwa] = useState<
    PersebaranSatwa[]
  >([])
  const [isLoadingInit, setIsLoadingInit] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedPersebaranSatwa, setSelectedPersebaranSatwa] =
    useState<PersebaranSatwa | null>(null)

  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 12
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  // maps
  const [groupedPersebaranSatwas, setGroupedPersebaranSatwas] = useState<
    [any][any]
  >([])
  const [selectedMarker, setSelectedMarker] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const mapRef: any = useRef(null)

  const fetchAllData = useCallback(async () => {
    const res = await getAllPersebaranSatwa()

    // group persebaran satwa based on similar longitude and latitude with typescript
    const grouped = res.data.reduce((r: any, a: any) => {
      r[a.koordinatPelepasliaran] = [...(r[a.koordinatPelepasliaran] || []), a]
      return r
    }, {})

    setGroupedPersebaranSatwas(grouped)
    setPersebaranSatwa(res.data)
    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
    setIsLoadingInit(false)
  }, [])

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const zoomToSelectedLoc = (
    e: React.MouseEvent<HTMLDivElement>,
    koordinat: string
  ) => {
    e.stopPropagation()

    setSelectedMarker({
      latitude: parseFloat(koordinat.split(",")[0]),
      longitude: parseFloat(koordinat.split(",")[1]),
    })

    // get array of grouped persebaran satwa with key == koordinat
    const persebaranSatwa = groupedPersebaranSatwas[koordinat]
    console.log(persebaranSatwa)

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [
          parseFloat(koordinat.split(",")[1]),
          parseFloat(koordinat.split(",")[0]),
        ],
        zoom: 10,
      })
    }
  }

  useEffect(() => {
    if (searchKeyword !== "") {
      setFilteredPersebaranSatwa(
        persebaranSatwa.filter((satwa) =>
          satwa.namaIlmiah.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
      setTotalPages(Math.ceil(filteredPersebaranSatwa.length / itemsPerPage))
      setPage(1)
    }
  }, [searchKeyword, persebaranSatwa, filteredPersebaranSatwa.length])

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
        <div className="mt-10">
          {isLoadingInit ? (
            <div className="w-full">
              <Skeleton size={WidgetSizes.MEDIUM} />
            </div>
          ) : (
            <Map
              ref={mapRef}
              mapboxAccessToken={mapboxToken}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              initialViewState={{
                latitude: 0.7893,
                longitude: 113.9213,
                zoom: 4,
              }}
              style={{
                width: "100%",
                height: 600,
                borderRadius: "16px",
                overflow: "hidden",
              }}
              maxZoom={20}
              minZoom={3}
            >
              <GeolocateControl position="top-left" />
              <NavigationControl position="top-left" />

              {Object.keys(groupedPersebaranSatwas).map(
                (persebaranSatwa: any, index: any) => (
                  <Marker
                    key={index}
                    longitude={parseFloat(persebaranSatwa.split(",")[1])}
                    latitude={parseFloat(persebaranSatwa.split(",")[0])}
                  >
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={(e: any) => {
                        zoomToSelectedLoc(e, persebaranSatwa)
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
                )
              )}

              {selectedMarker ? (
                <Popup
                  offset={25}
                  latitude={parseFloat(selectedMarker.latitude.toString())}
                  longitude={parseFloat(selectedMarker.longitude.toString())}
                  onClose={() => {
                    setSelectedMarker(null)
                  }}
                  closeButton={false}
                >
                  <div
                    style={{ maxHeight: "200px" }}
                    className="overflow-y-scroll overflow-x-hidden p-2"
                  >
                    {groupedPersebaranSatwas[
                      `${selectedMarker.latitude}, ${selectedMarker.longitude}`
                    ].map((persebaranSatwa: any, index: any) => (
                      <div
                        key={index}
                        className="flex flex-col border-b py-2 last:border-none"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <p>{index + 1}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="font-bold">Id Satwa</p>
                          <p className="text-gray-400">
                            {persebaranSatwa.idSatwa}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="font-bold">Nama Ilmiah</p>
                          <p className="text-gray-400">
                            {persebaranSatwa.namaIlmiah}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popup>
              ) : null}
            </Map>
          )}
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
          ) : persebaranSatwa.length === 0 ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada persebaran satwa
              </p>
            </div>
          ) : filteredPersebaranSatwa.length !== 0 && searchKeyword !== "" ? (
            filteredPersebaranSatwa
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((satwa, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 bg-primary-10 justify-center text-center rounded-xl transition hover:shadow-lg cursor-pointer"
                  onClick={() => {
                    setSelectedPersebaranSatwa(satwa)
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
                      {satwa.lokasiPelepasliaran
                        ? satwa.lokasiPelepasliaran
                        : "-"}
                    </p>
                  </div>
                </div>
              ))
          ) : filteredPersebaranSatwa.length === 0 && searchKeyword !== "" ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada satwa rehabilitasi ditemukan
              </p>
            </div>
          ) : (
            persebaranSatwa
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((satwa, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 bg-primary-10 justify-center text-center rounded-xl transition hover:shadow-lg cursor-pointer"
                  onClick={() => {
                    setSelectedPersebaranSatwa(satwa)
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
                      {satwa.lokasiPelepasliaran
                        ? satwa.lokasiPelepasliaran
                        : "-"}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedPersebaranSatwa && (
        <div
          className={`fixed top-0 left-0 w-full h-full px-4 py-4 z-50 bg-black bg-opacity-50 flex justify-center items-center ${
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
                  </div>
                  <X
                    onClick={() => setSelectedPersebaranSatwa(null)}
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
                                selectedPersebaranSatwa.koordinatPelepasliaran
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
                        {selectedMarker &&
                        selectedMarker.latitude !== null &&
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
                              setSelectedMarker(null)
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
    </div>
  )
}
