import { StatusSatwaRehab } from "@/constants/satwa-rehab"
import React from "react"
import OutlinedButton from "../buttons/OutlinedButton"
import FilledButton from "../buttons/FilledButton"
import { ExternalLink, Trash2 } from "react-feather"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"

type Props = {
  satwa: SatwaRehabilitasi
  onClickDetail: () => void
  onClickDelete: () => void
}

export default function AdminSatwaRehabCard({
  satwa,
  onClickDetail,
  onClickDelete,
}: Props) {
  return (
    <div className="relative w-full flex flex-col gap-4 p-8 items-center justify-end bg-neutral-0 border-2 border-neutral-10 rounded-lg overflow-hidden group text-neutral-0">
      <div
        className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${satwa.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-80"></div>
      </div>
      <div className="w-full flex flex-col items-start justify-start relative mt-24">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-lg">{satwa.namaIlmiah}</p>
          <p className="text-sm font-extralight opacity-70">{satwa.idSatwa}</p>
        </div>
        <div className="mt-2 flex gap-2 justify-start flex-wrap">
          <div
            className={`px-2 py-1 rounded-full bg-neutral-0 text-neutral-10 text-xs ${
              satwa.status === StatusSatwaRehab.REHABILITASI
                ? "bg-gradient-to-tr from-amber-400 to-amber-500"
                : satwa.status === StatusSatwaRehab.MATI
                ? "bg-gradient-to-tr from-red-400 to-red-500"
                : "bg-gradient-to-tr from-green-400 to-green-500"
            }`}
          >
            {satwa.status}
          </div>
          <div className="px-2 py-1 rounded-full bg-neutral-0 text-neutral-100 text-xs">
            {satwa.statusDilindungi}
          </div>
          <div className="px-2 py-1 rounded-full bg-neutral-0 text-neutral-100 text-xs">
            {satwa.statusEndemik}
          </div>
        </div>
        <div className="mt-2 line-clamp-2">
          <p>{satwa.keterangan}</p>
        </div>

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
      </div>
    </div>
  )
}
