"use client"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes } from "@/constants/button-types"
import { getAllPersebaranSatwa } from "@/controllers/persebaran-satwa-controller"
import React, { useEffect, useRef, useState } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl"
import Link from "next/link"
import { ArrowLeftCircle } from "react-feather"
import Image from "next/image"

export default function Page() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const [persebaranSatwas, setPersebaranSatwas] = useState<PersebaranSatwa[]>(
    []
  )
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [selectedMarker, setSelectedMarker] = useState<{
    latitude: number | null
    longitude: number | null
  }>({
    latitude: null,
    longitude: null,
  })
  const [selectedPersebaranSatwa, setSelectedPersebaranSatwa] =
    useState<PersebaranSatwa | null>(null)
  const mapRef: any = useRef(null)

  const fetchAllPersebaranSatwa = async () => {
    const res = await getAllPersebaranSatwa()
    setPersebaranSatwas(res.data)
    setIsLoadingInit(false)
  }

  const zoomToSelectedLoc = (
    e: React.MouseEvent<HTMLDivElement>,
    satwa: PersebaranSatwa
  ) => {
    e.stopPropagation()

    setSelectedPersebaranSatwa(satwa)

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [
          parseFloat(satwa.koordinatPelepasliaran.split(",")[1]),
          parseFloat(satwa.koordinatPelepasliaran.split(",")[0]),
        ],
        zoom: 10,
      })
    }
  }

  useEffect(() => {
    fetchAllPersebaranSatwa()
  }, [])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="flex gap-3 items-center">
            <div>
              <Link href="/admin/persebaran" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Peta Persebaran Satwa Rehabilitasi
            </h1>
          </div>
        </div>

        <div className="w-full">
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

              {persebaranSatwas.map((persebaranSatwa, index) => (
                <Marker
                  key={index}
                  longitude={parseFloat(
                    persebaranSatwa.koordinatPelepasliaran.split(",")[1]
                  )}
                  latitude={parseFloat(
                    persebaranSatwa.koordinatPelepasliaran.split(",")[0]
                  )}
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
              ))}

              {selectedPersebaranSatwa ? (
                <Popup
                  offset={25}
                  latitude={parseFloat(
                    selectedPersebaranSatwa.lokasiPelepasliaran.split(",")[0]
                  )}
                  longitude={parseFloat(
                    selectedPersebaranSatwa.lokasiPelepasliaran.split(",")[1]
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
                    ID Satwa:
                    {selectedPersebaranSatwa.idSatwa}
                  </p>
                  <h3 className="text-lg">
                    Nama Ilmiah:
                    {selectedPersebaranSatwa.namaIlmiah}
                  </h3>
                </Popup>
              ) : null}
            </Map>
          )}
        </div>
      </div>
    </div>
  )
}
