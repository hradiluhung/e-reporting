"use client"
import FilledButton from "@/components/buttons/FilledButton"
import Dropdown from "@/components/dropdown/Dropdown"
import InputField from "@/components/input/InputField"
import SearchBar from "@/components/input/SearchBar"
import TextArea from "@/components/input/TextArea"
import Pagination from "@/components/pagination/Pagination"
import Skeleton from "@/components/skeleton/Skeleton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { FeedbackType } from "@/constants/feedback-types"
import { createFeedback } from "@/controllers/feedback-controller"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import { showToast } from "@/helpers/showToast"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { MapPin, Phone, Send, X } from "react-feather"

export default function Page() {
  const [lembagas, setLembagas] = useState<Lembaga[]>([])
  const [filteredLembagas, setFilteredLembagas] = useState<Lembaga[]>([])
  const [isLoadingInit, setIsLoadingInit] = useState(true)
  const [selectedLembaga, setSelectedLembaga] = useState<Lembaga | null>(null)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedLembagaFeedback, setSelectedLembagaFeedback] =
    useState<Lembaga | null>()

  // pagination
  const [page, setPage] = useState(1)
  const itemsPerPage = 8
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const [totalPages, setTotalPages] = useState(0)

  // Feedback
  const [inputFeedback, setInputFeedback] = useState<Feedback>({
    idLembaga: "",
    isi: "",
    jenis: "",
    pengirim: "",
    kontakPengirim: "",
  })
  const [isLoadingSubmitFeedback, setIsLoadingSubmitFeedback] = useState(false)

  const fetchAllLembaga = async () => {
    const res = await getAllLembaga()
    setLembagas(res.data)
    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
    setIsLoadingInit(false)
  }

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const onOpenFeedbackLembaga = (
    e: React.MouseEvent<HTMLDivElement>,
    lembaga: Lembaga
  ) => {
    e.stopPropagation()
    setSelectedLembagaFeedback(lembaga)
  }

  const onSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoadingSubmitFeedback(true)

      if (!selectedLembagaFeedback?._id) {
        return
      }

      if (
        !inputFeedback.jenis ||
        !inputFeedback.isi ||
        !inputFeedback.pengirim ||
        !inputFeedback.kontakPengirim
      ) {
        throw new Error("Mohon isi semua field")
      }

      const res = await createFeedback({
        ...inputFeedback,
        idLembaga: selectedLembagaFeedback?._id,
      })

      if (res.status === 201) {
        showToast(res.message, WidgetTypes.SUCCESS)
        setSelectedLembagaFeedback(null)
        setInputFeedback({
          idLembaga: "",
          isi: "",
          jenis: "",
          pengirim: "",
          kontakPengirim: "",
        })
      } else {
        showToast(res.message, WidgetTypes.ERROR)
      }
    } catch (error: any) {
      showToast(error.message, WidgetTypes.ERROR)
    } finally {
      setIsLoadingSubmitFeedback(false)
    }
  }

  useEffect(() => {
    if (searchKeyword !== "") {
      setFilteredLembagas(
        lembagas.filter((lembaga) =>
          lembaga.nama.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
      setPage(1)
      setTotalPages(Math.ceil(filteredLembagas.length / itemsPerPage))
    }
  }, [searchKeyword, lembagas, filteredLembagas.length])

  useEffect(() => {
    fetchAllLembaga()
  }, [])

  return (
    <div className="w-full mt-16 py-6 lg:py-24">
      <div className="px-4 md:px-8 lg:px-36">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold">List Lembaga</h1>
          <p>Lembaga Pengelola Satwa</p>
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
          ) : lembagas.length === 0 ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada lembaga
              </p>
            </div>
          ) : filteredLembagas.length !== 0 && searchKeyword !== "" ? (
            filteredLembagas
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((lembaga, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 bg-primary-10 justify-center text-center rounded-xl transition hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedLembaga(lembaga)}
                >
                  {lembaga.image ? (
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={lembaga.image}
                      alt={lembaga.nama}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                  )}
                  <h1 className="font-bold text-lg">{lembaga.nama}</h1>
                  <p className="text-sm">{lembaga.alamat}</p>
                  <div className="mt-auto">
                    <FilledButton
                      text="Kirim Feedback"
                      ButtonIcon={Send}
                      size={WidgetSizes.SMALL}
                      onClick={(e: any) => onOpenFeedbackLembaga(e, lembaga)}
                    />
                  </div>
                </div>
              ))
          ) : filteredLembagas.length === 0 && searchKeyword !== "" ? (
            <div className="w-full col-span-4">
              <p className="text-center font-semibold text-neutral-400">
                Tidak ada lembaga ditemukan
              </p>
            </div>
          ) : (
            lembagas
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((lembaga, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 bg-primary-10 justify-center text-center rounded-xl transition hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedLembaga(lembaga)}
                >
                  {lembaga.image ? (
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={lembaga.image}
                      alt={lembaga.nama}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                  )}
                  <h1 className="font-bold text-lg">{lembaga.nama}</h1>
                  <p className="text-sm">{lembaga.alamat}</p>
                  <div className="mt-auto">
                    <FilledButton
                      text="Kirim Feedback"
                      ButtonIcon={Send}
                      size={WidgetSizes.SMALL}
                      onClick={(e: any) => onOpenFeedbackLembaga(e, lembaga)}
                    />
                  </div>
                </div>
              ))
          )}
        </div>

        {/* SHOW MODAL DETAIL LEMBAGA */}
        {selectedLembaga && (
          <div
            className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-50 flex justify-center  z-50 items-center ${
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
                    </div>
                    <X
                      onClick={() => setSelectedLembaga(null)}
                      className="w-6 cursor-pointer"
                    />
                  </div>
                  {selectedLembaga.image && (
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
                  )}

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
                        {selectedLembaga?.kontak} ({selectedLembaga?.namaKontak}
                        )
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

        {/* SHOW MODAL FEEDBACK LEMBAGA */}
        {selectedLembagaFeedback && (
          <div
            className={`fixed top-0 left-0 w-full h-full px-4 py-4 bg-black bg-opacity-50 flex justify-center  z-50 items-center ${
              selectedLembagaFeedback ? "fade-in-down" : "fade-out-up"
            }`}
          >
            <div className="w-full overflow-y-auto my-4 md:w-4/12 bg-white rounded-lg p-4 md:p-6 lg:p-8">
              <div className="flex flex-col gap-4 items-start justify-start">
                <div className="w-full">
                  <div>
                    <div className="flex justify-between w-full gap-4 items-center">
                      <div className="flex gap-2 items-center">
                        <h1 className="font-semibold text-lg">
                          Kirim Feedback
                        </h1>
                      </div>
                      <X
                        onClick={() => setSelectedLembagaFeedback(null)}
                        className="w-6 cursor-pointer"
                      />
                    </div>
                    <p className="mb-3 text-sm text-neutral-700">
                      Untuk Lembaga{" "}
                      <b className="text-primary-100">
                        {selectedLembagaFeedback.nama}
                      </b>
                    </p>
                  </div>
                  <form className="mt-6" onSubmit={onSubmitFeedback}>
                    <div className="flex flex-col gap-2">
                      <InputField
                        label="Nama Pengirim"
                        placeholder="John Doe"
                        size={WidgetSizes.MEDIUM}
                        value={inputFeedback.pengirim}
                        onChange={(e) => {
                          setInputFeedback({
                            ...inputFeedback,
                            pengirim: e.target.value,
                          })
                        }}
                      />
                      <InputField
                        label="Kontak Pengirim"
                        placeholder="johndoe@gmail.com"
                        size={WidgetSizes.MEDIUM}
                        value={inputFeedback.kontakPengirim}
                        onChange={(e) => {
                          setInputFeedback({
                            ...inputFeedback,
                            kontakPengirim: e.target.value,
                          })
                        }}
                      />
                      <Dropdown
                        value={inputFeedback.jenis}
                        label="Jenis Feedback"
                        options={Object.values(FeedbackType)}
                        onChange={(e) => {
                          setInputFeedback({
                            ...inputFeedback,
                            jenis: e.target.value,
                          })
                        }}
                        size={WidgetSizes.MEDIUM}
                        defaultValue="Pilih Jenis Feedback"
                        placeholder="Pilih Jenis Feedback"
                      />
                      <TextArea
                        label="Isi Feedback"
                        placeholder="Isi Feedback"
                        value={inputFeedback.isi}
                        onChange={(e) => {
                          setInputFeedback({
                            ...inputFeedback,
                            isi: e.target.value,
                          })
                        }}
                        size={WidgetSizes.MEDIUM}
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <FilledButton
                        text="Kirim"
                        ButtonIcon={Send}
                        isSubmit={true}
                        size={WidgetSizes.MEDIUM}
                        isLoading={isLoadingSubmitFeedback}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
