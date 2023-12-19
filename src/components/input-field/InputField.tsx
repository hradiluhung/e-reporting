import { WidgetSizes } from "@/constants/button-types"
import React from "react"

type Props = {
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type?: string
  size: WidgetSizes
}

export default function InputField({
  placeholder,
  onChange,
  value,
  type = "text",
  size,
}: Props) {
  return (
    <div className="w-full">
      <input
        className={`w-full border border-neutral-50 rounded-xl ${
          size === WidgetSizes.SMALL
            ? "text-sm px-2 py-1 "
            : size === WidgetSizes.MEDIUM
            ? "text-base px-4 py-2"
            : "text-lg px-4 py-4"
        }`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
