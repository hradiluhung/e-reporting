"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import AdminProfileCard from "@/components/cards/AdminProfileCard"
import SearchBar from "@/components/input/SearchBar"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  deleteLembagaById,
  getAllLembaga,
} from "@/controllers/lembaga-controller"
import { showToast } from "@/helpers/showToast"
import { deleteMedia } from "@/helpers/uploadFiles"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Edit2,
  MapPin,
  Phone,
  PlusCircle,
  Search,
  Trash2,
  X,
} from "react-feather"

export default function Page() {
  const [lembagas, setLembagas] = useState<Lembaga[]>([])
  const [filteredLembagas, setFilteredLembagas] = useState<Lembaga[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState(true)
  const [selectedLembaga, setSelectedLembaga] = useState<Lembaga | null>(null)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedDeletedLembaga, setSelectedDeletedLembaga] =
    useState<Lembaga | null>(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchKeyword(e.target.value)
  }

  const fetchAllLembaga = async () => {
    const res = await getAllLembaga()
    setLembagas(res.data)
    setIsLoadingInit(false)
  }

  const handleSelectedLembaga = (lembaga: Lembaga) => {
    setSelectedLembaga(lembaga)
  }

  const handleDeleteLembaga = (lembaga: Lembaga) => {
    setSelectedDeletedLembaga(lembaga)
  }

  const onDeleteLembaga = async (id: string, publicId: string) => {
    try {
      setIsLoadingDelete(true)

      await deleteMedia(publicId)
      const res = await deleteLembagaById(id)

      if (res.status === 200) {
        showToast(res.message, WidgetTypes.SUCCESS)
        fetchAllLembaga()
        setSelectedDeletedLembaga(null)
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
    fetchAllLembaga()
  }, [])

  useEffect(() => {
    setFilteredLembagas(
      lembagas.filter((lembaga) =>
        lembaga.nama.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
  }, [searchKeyword, lembagas])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Kelola Profil Lembaga
            </h1>
            <p className="text-base">Lembaga Pengelola Satwa</p>
          </div>
          <div className="flex flex-start">
            <Link href="/admin/profil/add">
              <FilledButton
                text="Tambah"
                ButtonIcon={PlusCircle}
                type={WidgetTypes.PRIMARY}
                size={WidgetSizes.MEDIUM}
              />
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-start">
            <div className="w-full md:w-64">
              <SearchBar
                prompt="Cari Nama Lembaga"
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
            ) : lembagas.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">Belum ada data lembaga</p>
              </div>
            ) : searchKeyword !== "" && filteredLembagas.length !== 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLembagas.map((lembaga, index) => (
                  <AdminProfileCard
                    key={index}
                    lembaga={lembaga}
                    onClickDetail={() => handleSelectedLembaga(lembaga)}
                    onClickDelete={() => handleDeleteLembaga(lembaga)}
                  />
                ))}
              </div>
            ) : searchKeyword !== "" && filteredLembagas.length === 0 ? (
              <div className="w-full flex justify-center">
                <p className="text-center">Lembaga tidak ditemukan</p>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lembagas.map((lembaga, index) => (
                  <AdminProfileCard
                    key={index}
                    lembaga={lembaga}
                    onClickDetail={() => handleSelectedLembaga(lembaga)}
                    onClickDelete={() => handleDeleteLembaga(lembaga)}
                  />
                ))}
              </div>
            )}

            {/* SHOW MODAL DETAIL LEMBAGA */}
            {selectedLembaga && (
              <div
                className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-50 flex justify-center items-center ${
                  selectedLembaga ? "fade-in-down" : "fade-out-up"
                }`}
              >
                <div className="w-full max-h-full overflow-y-auto my-4 md:w-3/4 lg:w-2/3 bg-white rounded-lg p-4 md:p-6 lg:p-8">
                  <div className="flex flex-col gap-4 items-start justify-start">
                    <div className="w-full">
                      <div className="flex justify-between w-full gap-4 items-center">
                        <div className="flex gap-2 items-center">
                          <h1 className="font-semibold text-lg">
                            {selectedLembaga?.nama}
                          </h1>
                          <Link
                            href={`/admin/profil/edit/${selectedLembaga?._id}`}
                          >
                            <OutlinedButton
                              size={WidgetSizes.SMALL}
                              ButtonIcon={Edit2}
                            />
                          </Link>
                        </div>
                        <X
                          onClick={() => setSelectedLembaga(null)}
                          className="w-6 cursor-pointer"
                        />
                      </div>
                      <div className="rounded-xl mt-4 overflow-hidden flex justify-center w-full bg-neutral-900">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          src={selectedLembaga.image}
                          alt="Logo"
                          className="w-full lg:w-2/3 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col gap-1 justify-start items-center mt-4 md:flex-row md:gap-4">
                        <div className="flex gap-2 text-sm text-neutral-50 items-center justify-start lg:w-1/2">
                          <div>
                            <MapPin className="w-4" />
                          </div>
                          <p>{selectedLembaga?.alamat}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-neutral-50 items-center justify-end lg:w-1/2">
                          <div>
                            <Phone className="w-4" />
                          </div>
                          <p>
                            {selectedLembaga?.kontak} (
                            {selectedLembaga?.namaKontak})
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-100">
                        {selectedLembaga?.tentang}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* SHOW MODAL DELETE LEMBAGA */}
            {selectedDeletedLembaga && (
              <div
                className={`fixed top-0 left-0 w-full h-full px-4 bg-black bg-opacity-50 flex justify-center items-center ${
                  selectedDeletedLembaga ? "fade-in-down" : "fade-out-up"
                }`}
              >
                <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg p-8">
                  <div className="flex flex-col gap-4 items-start justify-start">
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <h1 className="font-semibold text-lg">Hapus Lembaga</h1>
                        <X
                          onClick={() => setSelectedDeletedLembaga(null)}
                          className="w-6 cursor-pointer"
                        />
                      </div>
                      <div className="flex gap-6 items-center mt-2 justify-start ">
                        <p>
                          Yakin ingin menghapus{" "}
                          <b>{selectedDeletedLembaga.nama}</b>?
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
                      onClick={() =>
                        onDeleteLembaga(
                          selectedDeletedLembaga._id,
                          selectedDeletedLembaga.publicId
                        )
                      }
                    />
                    <OutlinedButton
                      text="Batal"
                      size={WidgetSizes.SMALL}
                      ButtonIcon={X}
                      onClick={() => setSelectedDeletedLembaga(null)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
