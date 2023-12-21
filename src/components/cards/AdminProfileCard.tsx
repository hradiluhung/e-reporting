import React from "react"
import { ExternalLink, MapPin, Trash2 } from "react-feather"
import OutlinedButton from "../buttons/OutlinedButton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import FilledButton from "../buttons/FilledButton"
import Image from "next/image"

type Props = {
  lembaga: Lembaga
  onClickDetail: () => void
  onClickDelete: () => void
}

export default function AdminProfileCard({
  lembaga,
  onClickDetail,
  onClickDelete,
}: Props) {
  return (
    <div className="relative w-full flex flex-col gap-4 p-8 items-center justify-center bg-neutral-0 border-2 border-neutral-10 rounded-lg overflow-hidden group">
      <div
        className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${lembaga.image})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-80"></div>
      </div>
      <div className="w-full flex flex-col items-start justify-start relative">
        <div className="mt-24 group-hover:-translate-y-12 transition-transform">
          <div>
            <h1 className="font-semibold text-lg text-neutral-0">
              {lembaga.nama}
            </h1>
            <div className="flex gap-1 items-center text-neutral-0 text-sm">
              <MapPin className="w-4" />
              <p>{lembaga.alamat}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-neutral-0 line-clamp-2">
              {lembaga.tentang}
            </p>
          </div>
        </div>
        <div className="gap-2 absolute bottom-0 start-0 hidden transition-transform group-hover:flex mt-8">
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
      </div>
    </div>
  )
}
