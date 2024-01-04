"use client"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import AdminSatwaRehabCard from "@/components/cards/AdminSatwaRehabCard"
import SearchBar from "@/components/input/SearchBar"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { getAllSatwaRehabilitasi } from "@/controllers/satwa-rehab-controller"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { PlusCircle, Search } from "react-feather"

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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSatwaRehabs.map((satwa, index) => (
                <AdminSatwaRehabCard
                  key={index}
                  satwa={satwa}
                  onClickDelete={onClickDelete}
                  onClickDetail={onClickDetail}
                />
              ))}
            </div>
          ) : searchKeyword !== "" && filteredSatwaRehabs.length === 0 ? (
            <div className="w-full flex justify-center">
              <p className="text-center">Satwa rehabilitasi tidak ditemukan</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {satwaRehabs.map((satwa, index) => (
                <AdminSatwaRehabCard
                  key={index}
                  satwa={satwa}
                  onClickDelete={onClickDelete}
                  onClickDetail={onClickDetail}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
