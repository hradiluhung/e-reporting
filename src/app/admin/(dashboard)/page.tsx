"use client"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes } from "@/constants/button-types"
import { getAllGallery } from "@/controllers/gallery-controller"
import { getAllInterkoneksi } from "@/controllers/interkoneksi-controller"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import { getAllPersebaranSatwa } from "@/controllers/persebaran-satwa-controller"
import { getAllPublikasi } from "@/controllers/publikasi-controller"
import { getAllSatwaRehabilitasi } from "@/controllers/satwa-rehab-controller"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  CornerDownRight,
  Disc,
  Hexagon,
  Image as ImageIcon,
  LifeBuoy,
  User,
} from "react-feather"

export default function Page() {
  const [lembagas, setLembagas] = useState<Lembaga[]>([])
  const [satwaRehabs, setSatwaRehabs] = useState<SatwaRehabilitasi[]>([])
  const [persebaranSatwas, setPersebaranSatwas] = useState<PersebaranSatwa[]>(
    []
  )
  const [interkoneksiSatwas, setInterkoneksiSatwas] = useState<Interkoneksi[]>(
    []
  )
  const [publikasis, setPublikasis] = useState<Publikasi[]>([])
  const [galleris, setGalleris] = useState<Gallery[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState(true)

  const fetchLembagas = async () => {
    const { data } = await getAllLembaga()
    setLembagas(data)
  }

  const fetchSatwaRehabs = async () => {
    const { data } = await getAllSatwaRehabilitasi()
    setSatwaRehabs(data)
  }

  const fetchPersebaranSatwas = async () => {
    const { data } = await getAllPersebaranSatwa()
    setPersebaranSatwas(data)
  }

  const fetchInterkoneksiSatwas = async () => {
    const { data } = await getAllInterkoneksi()
    setInterkoneksiSatwas(data)
  }

  const fetchPublikasis = async () => {
    const { data } = await getAllPublikasi()
    setPublikasis(data)
  }

  const fetchGalleris = async () => {
    const { data } = await getAllGallery()
    setGalleris(data)
  }

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchLembagas()
      await fetchSatwaRehabs()
      await fetchPersebaranSatwas()
      await fetchInterkoneksiSatwas()
      await fetchPublikasis()
      await fetchGalleris()
      setIsLoadingInit(false)
    }

    fetchAllData()
  }, [])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="w-full flex flex-col items-start gap-8">
        <div className="flex flex-col gap-1 items-start">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <p className="text-base">Selamat Datang, Admin!</p>
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingInit ? (
              <>
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
                <Skeleton size={WidgetSizes.MEDIUM} />
              </>
            ) : (
              <>
                <Link href="/admin/profil">
                  <div className="relative overflow-hidden p-6 border border-slate-600 rounded-lg shadow-sm w-full bg-white hover:shadow-lg cursor-pointer transition-all group">
                    <div
                      className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(/assets/dashboard-card/lembaga.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-60"></div>
                    </div>
                    <div className="relative">
                      <div>
                        <p className="text-neutral-0 font-medium">
                          Jumlah Lembaga
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-2xl text-neutral-0">
                          {lembagas.length}
                        </p>

                        <div className="p-2 bg-green-200 rounded-full">
                          <User className="w-5 h-5 stroke-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/satwa-rehab">
                  <div className="relative overflow-hidden p-6 border border-slate-600 rounded-lg shadow-sm w-full bg-white hover:shadow-lg cursor-pointer transition-all group">
                    <div
                      className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(/assets/dashboard-card/satwa-rehab.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-60"></div>
                    </div>
                    <div className="relative">
                      <div>
                        <p className="text-neutral-0 font-medium">
                          Jumlah Satwa Rehabilitasi
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-2xl text-neutral-0">
                          {satwaRehabs.length}
                        </p>

                        <div className="p-2 bg-blue-200 rounded-full">
                          <LifeBuoy className="w-5 h-5 stroke-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/persebaran">
                  <div className="relative overflow-hidden p-6 border border-slate-600 rounded-lg shadow-sm w-full bg-white hover:shadow-lg cursor-pointer transition-all group">
                    <div
                      className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(/assets/dashboard-card/persebaran.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-60"></div>
                    </div>
                    <div className="relative">
                      <div>
                        <p className="text-neutral-0 font-medium">
                          Jumlah Persebaran Satwa
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-2xl text-neutral-0">
                          {persebaranSatwas.length}
                        </p>

                        <div className="p-2 bg-fuchsia-200 rounded-full">
                          <Disc className="w-5 h-5 stroke-fuchsia-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/interkoneksi-rehab">
                  <div className="relative overflow-hidden p-6 border border-slate-600 rounded-lg shadow-sm w-full bg-white hover:shadow-lg cursor-pointer transition-all group">
                    <div
                      className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(/assets/dashboard-card/interkoneksi.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-60"></div>
                    </div>
                    <div className="relative">
                      <div>
                        <p className="text-neutral-0 font-medium">
                          Jumlah Interkoneksi Rehabilitasi Satwa
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-2xl text-neutral-0">
                          {interkoneksiSatwas.length}
                        </p>

                        <div className="p-2 bg-rose-200 rounded-full">
                          <CornerDownRight className="w-5 h-5 stroke-rose-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/publikasi">
                  <div className="relative overflow-hidden p-6 border border-slate-600 rounded-lg shadow-sm w-full bg-white hover:shadow-lg cursor-pointer transition-all group">
                    <div
                      className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(/assets/dashboard-card/publikasi.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-60"></div>
                    </div>
                    <div className="relative">
                      <div>
                        <p className="text-neutral-0 font-medium">
                          Jumlah Publikasi
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-2xl text-neutral-0">
                          {publikasis.length}
                        </p>

                        <div className="p-2 bg-amber-200 rounded-full">
                          <Hexagon className="w-5 h-5 stroke-amber-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/gallery">
                  <div className="relative overflow-hidden p-6 border border-slate-600 rounded-lg shadow-sm w-full bg-white hover:shadow-lg cursor-pointer transition-all group">
                    <div
                      className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(/assets/dashboard-card/gallery.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-60"></div>
                    </div>
                    <div className="relative">
                      <div>
                        <p className="font-medium text-neutral-0">
                          Jumlah Gallery
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-2xl text-neutral-0">
                          {galleris.length}
                        </p>

                        <div className="p-2 bg-purple-200 rounded-full">
                          <ImageIcon className="w-5 h-5 stroke-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
