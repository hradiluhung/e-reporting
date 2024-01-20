import { WidgetSizes } from "@/constants/button-types"
import React from "react"

type Props = {
  label: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type?: string
  size: WidgetSizes
  acceptedFileTypes?: string
  isRequired?: boolean
}

export default function InputField({
  label,
  placeholder,
  onChange,
  value,
  type = "text",
  size,
  acceptedFileTypes = "",
  isRequired = true,
}: Props) {
  return (
    <div className="w-full">
      <label className="text-neutral-500 text-sm">
        {label}
        {isRequired && <span className="ms-1 text-red-500">*</span>}
      </label>
      <input
        className={`w-full border border-neutral-50 bg-neutral-0 rounded-xl ${
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
        accept={acceptedFileTypes ? acceptedFileTypes : ""}
      />
    </div>
  )
}
