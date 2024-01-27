import React from "react"
import { Icon } from "react-feather"

type Props = {
  text: string
  CalloutIcon: Icon
}

export default function Callout({ text, CalloutIcon }: Props) {
  return (
    <div className="flex items-start justify-start px-4 py-3 gap-3 bg-neutral-950 bg-opacity-10 border border-neutral-800 rounded-lg">
      <div>
        <CalloutIcon className="w-5" />
      </div>
      <div className="text-sm">{text}</div>
    </div>
  )
}
