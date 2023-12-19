import React from "react"
import { ExternalLink, MapPin, Trash2 } from "react-feather"
import OutlinedButton from "../buttons/OutlinedButton"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import FilledButton from "../buttons/FilledButton"

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
    <div className="w-full flex flex-col gap-4 p-8 items-center justify-center bg-neutral-5 border border-neutral-10 rounded-lg">
      <div className="w-full flex flex-col gap-4 items-start justify-start">
        <div>
          <h1 className="font-semibold text-lg">{lembaga.nama}</h1>
          <div className="flex gap-1 text-neutral-50 mt-2">
            <MapPin className="w-4" />
            <p>{lembaga.alamat}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-neutral-50 line-clamp-2">
            {lembaga.tentang}
          </p>
        </div>
        <div className="flex gap-2">
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
