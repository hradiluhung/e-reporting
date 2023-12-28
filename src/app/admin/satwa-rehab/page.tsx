"use client"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import SearchBar from "@/components/input/SearchBar"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { getAllSatwaRehabilitasi } from "@/controllers/satwa-rehab-controller"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { PlusCircle, Search } from "react-feather"

export default function Page() {
  const [satwaRehabs, setSatwaRehabs] = useState<SatwaRehabilitasi[]>([])
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
        <div className="w-full"></div>
      </div>
    </div>
  )
}
