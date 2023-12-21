import { WidgetSizes } from "@/constants/button-types"
import React from "react"

type Props = {
  label: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
  size: WidgetSizes
}

export default function TextArea({
  label,
  placeholder,
  onChange,
  value,
  size,
}: Props) {
  return (
    <div className="w-full">
      <label className="text-neutral-500 text-sm">{label}</label>
      <textarea
        className={`w-full border border-neutral-50 bg-neutral-0 rounded-xl resize-none h-24 ${
          size === WidgetSizes.SMALL
            ? "text-sm px-2 py-1 "
            : size === WidgetSizes.MEDIUM
            ? "text-base px-4 py-2"
            : "text-lg px-4 py-4"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
