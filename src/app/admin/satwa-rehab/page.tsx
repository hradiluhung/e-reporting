"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import AdminSatwaRehabCard from "@/components/cards/AdminSatwaRehabCard"
import SearchBar from "@/components/input/SearchBar"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { StatusSatwaRehab } from "@/constants/satwa-rehab"
import { getAllSatwaRehabilitasi } from "@/controllers/satwa-rehab-controller"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { ExternalLink, PlusCircle, Search, Trash2 } from "react-feather"

export default function Page() {
  const [satwaRehabs, setSatwaRehabs] = useState<SatwaRehabilitasi[]>([])
  const [filteredSatwaRehabs, setFilteredSatwaRehabs] = useState<
    SatwaRehabilitasi[]
  >([])
  const [isLoadingInit, setIsLoadingInit] = useState<boolean>(true)
  const [searchKeyword, setSearchKeyword] = useState<string>("")

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchKeyword(e.target.value)
  }

  const fetchAllSatwaRehab = async () => {
    const res = await getAllSatwaRehabilitasi()
    setSatwaRehabs(res.data)
    console.log(res)

    setIsLoadingInit(false)
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
  }, [searchKeyword, satwaRehabs])

  const onClickDetail = () => {}

  const onClickDelete = () => {}

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
        <div className="w-full flex justify-start">
          <div className="w-full md:w-64">
            <SearchBar
              searchKeyword={searchKeyword}
              onSearchKeywordChange={onSearchKeywordChange}
            />
          </div>
        </div>
        <div className="w-full">
          {isLoadingInit ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
              <Skeleton size={WidgetSizes.MEDIUM} />
            </div>
          ) : satwaRehabs.length === 0 ? (
            <div className="w-full flex justify-center">
              <p className="text-center">Belum ada data satwa rehabilitasi</p>
            </div>
          ) : searchKeyword !== "" && filteredSatwaRehabs.length !== 0 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
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
                {filteredSatwaRehabs.map((satwa, index) => (
                  <tbody key={index}>
                    <tr className="odd:bg-white even:bg-gray-50 border-b ">
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {satwa.namaIlmiah}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4">{satwa.statusDilindungi}</td>
                      <td className="px-6 py-4">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vh"
                          src={satwa.image}
                          alt="Logo"
                          className="h-24 w-auto rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 mt-4">
                          <OutlinedButton
                            ButtonIcon={Trash2}
                            size={WidgetSizes.SMALL}
                            type={WidgetTypes.ERROR}
                            onClick={onClickDelete}
                          />
                          <FilledButton
                            text="Detail"
                            size={WidgetSizes.SMALL}
                            ButtonIcon={ExternalLink}
                            onClick={onClickDetail}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : searchKeyword !== "" && filteredSatwaRehabs.length === 0 ? (
            <div className="w-full flex justify-center">
              <p className="text-center">Satwa rehabilitasi tidak ditemukan</p>
            </div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
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
                {satwaRehabs.map((satwa, index) => (
                  <tbody key={index}>
                    <tr className="odd:bg-white even:bg-gray-50 border-b ">
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {satwa.namaIlmiah}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4">{satwa.statusDilindungi}</td>
                      <td className="px-6 py-4">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vh"
                          src={satwa.image}
                          alt="Logo"
                          className="h-24 w-auto rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 mt-4">
                          <OutlinedButton
                            ButtonIcon={Trash2}
                            size={WidgetSizes.SMALL}
                            type={WidgetTypes.ERROR}
                            onClick={onClickDelete}
                          />
                          <FilledButton
                            text="Detail"
                            size={WidgetSizes.SMALL}
                            ButtonIcon={ExternalLink}
                            onClick={onClickDetail}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
