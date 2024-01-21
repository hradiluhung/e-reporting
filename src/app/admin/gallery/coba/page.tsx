// "use client"
// import { useRef, useState, useEffect } from "react"

// export default function VideoPreview() {
//   const [file, setFile] = useState<File | null>(null) // The file state is either a File object or null
//   const [videoSrc, setVideoSrc] = useState<string | null>(null) // The videoSrc state is either a string or null
//   const videoRef = useRef<HTMLVideoElement | null>(null) // The videoRef is either a HTMLVideoElement or null

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null
//     setFile(file)
//   }

//   // Use useEffect hook to update the videoSrc when the file state changes
//   useEffect(() => {
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file))
//     } else {
//       setVideoSrc(null)
//     }
//   }, [file])

//   const handleVideoLoad = () => {
//     if (videoRef.current) {
//       videoRef.current.load()
//       videoRef.current.play()
//     }
//   }

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       {videoSrc && (
//         <video ref={videoRef} onLoadedData={handleVideoLoad} controls>
//           {file && <source src={URL.createObjectURL(file)} type={file.type} />}
//         </video>
//       )}
//     </div>
//   )
// }

"use client"
import FilledButton from "@/components/buttons/FilledButton"
import InputField from "@/components/input/InputField"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { ArrowLeftCircle, Trash2 } from "react-feather"

export default function Page() {
  const [file, setFile] = useState<File | null>()
  const [listLembaga, setListLembaga] = useState<Lembaga[]>([])
  const [inputGallery, setInputGallery] = useState({
    idLembaga: "",
    image: "",
    publicId: "",
  })

  const onChangeInputFile = async (e: any) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const fetchLembagas = async () => {
    const res = await getAllLembaga()
    setListLembaga(res.data)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {}

  useEffect(() => {
    fetchLembagas()
  }, [])

  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="w-full flex flex-col items-start justify-center gap-6 md:w-1/3 lg:w-1/2">
          <div className="flex gap-3 items-center">
            <div>
              <Link href="/admin/persebaran" passHref>
                <ArrowLeftCircle className="cursor-pointer w-6 stroke-primary-100" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              Tambah Gallery
            </h1>
          </div>

          <form
            method="POST"
            onSubmit={onSubmit}
            className="flex flex-col gap-3 w-full"
          >
            {!file ? (
              <InputField
                label="Gambar/Video"
                acceptedFileTypes="image/*,video/*"
                placeholder="Gambar/Video"
                type="file"
                onChange={onChangeInputFile}
                size={WidgetSizes.MEDIUM}
                value={inputGallery.image}
              />
            ) : (
              <div className="w-full">
                <label className="text-neutral-500 text-sm">Gambar</label>
                <div className="relative w-full rounded-md border border-neutral-50 bg-neutral-0">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={URL.createObjectURL(file)}
                    alt="Cover Mata Kuliah"
                    className="w-full object-cover rounded-md"
                  />

                  <div className="absolute top-2 right-2">
                    <FilledButton
                      ButtonIcon={Trash2}
                      onClick={() => setFile(null)}
                      size={WidgetSizes.MEDIUM}
                      type={WidgetTypes.ERROR}
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
