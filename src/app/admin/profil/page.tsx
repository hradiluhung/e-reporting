"use client"
import FilledButton from "@/components/buttons/FilledButton"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import AdminProfileCard from "@/components/cards/AdminProfileCard"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input-field/InputField"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import {
  deleteLembagaById,
  getAllLembaga,
} from "@/controllers/lembaga-controller"
import { showToast } from "@/helpers/showToast"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ExternalLink,
  Loader,
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
    console.log(res.data)
  }

  const handleSelectedLembaga = (lembaga: Lembaga) => {
    setSelectedLembaga(lembaga)
  }

  const handleDeleteLembaga = (lembaga: Lembaga) => {
    setSelectedDeletedLembaga(lembaga)
  }

  const onDeleteLembaga = async (id: string) => {
    try {
      setIsLoadingDelete(true)

      const res = await deleteLembagaById(id)

      if (res.status === 200) {
        showToast("Berhasil menghapus lembaga", WidgetTypes.SUCCESS)
        fetchAllLembaga()
        setSelectedDeletedLembaga(null)
      } else {
        showToast("Gagal menghapus lembaga", WidgetTypes.ERROR)
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
          <div>
            <Link href="/admin/profil/add">
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
            <div className="w-full flex gap-2 border border-neutral-50 rounded-xl text-base px-4 py-2 text-neutral-50">
              <Search className="w-6" />
              <input
                className="w-full outline-none text-base placeholder:opacity-50"
                placeholder="Cari Berdasarkan Nama"
                type="text"
                value={searchKeyword}
                onChange={onSearchKeywordChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          {isLoadingInit ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
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

          {/* SHOW DETAIL LEMBAGA */}
          {selectedLembaga && (
            <div
              className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
                selectedLembaga ? "fade-in-down" : "fade-out-up"
              }`}
            >
              <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg p-8">
                <div className="flex flex-col gap-4 items-start justify-start">
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <h1 className="font-semibold text-lg">
                        {selectedLembaga?.nama}
                      </h1>
                      <X
                        onClick={() => setSelectedLembaga(null)}
                        className="w-6 cursor-pointer"
                      />
                    </div>
                    <div className="flex gap-6 items-center mt-2 justify-start ">
                      <div className="flex gap-1 text-sm text-neutral-50 items-center justify-center">
                        <MapPin className="w-4" />
                        <p>{selectedLembaga?.alamat}</p>
                      </div>
                      <div className="flex gap-1 text-sm text-neutral-50 items-center justify-center">
                        <Phone className="w-4" />
                        <p>
                          {selectedLembaga?.kontak} (
                          {selectedLembaga?.namaKontak})
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-100 line-clamp-2">
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
              className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
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
                        Yakin ingin menghapus {selectedDeletedLembaga.nama}?
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
                    onClick={() => onDeleteLembaga(selectedDeletedLembaga._id)}
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
  )
}
