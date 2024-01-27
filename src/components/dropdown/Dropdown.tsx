import { WidgetSizes } from "@/constants/button-types"
import React from "react"

type Props = {
  label?: string
  placeholder: string
  defaultValue: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
  size: WidgetSizes
  options: string[] | number[]
  optionsText?: string[] | number[]
  isRequired?: boolean
}

export default function Dropdown({
  label,
  placeholder,
  onChange,
  defaultValue,
  value,
  size,
  options,
  optionsText,
  isRequired = true,
}: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm">
          {label}
          {isRequired && <span className="ms-1 text-red-500">*</span>}
        </label>
      )}
      <select
        className={`w-full border border-neutral-50 rounded-xl ${
          size === WidgetSizes.SMALL
            ? "text-sm px-2 py-1 "
            : size === WidgetSizes.MEDIUM
            ? "text-base px-4 py-2"
            : "text-lg px-4 py-4"
        }
        ${value === "" && "text-neutral-50"}`}
        onChange={onChange}
        value={value}
      >
        <option value="" className="w-full text-neutral-50">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            className="w-full text-neutral-100"
          >
            {optionsText ? optionsText[index] : option}
          </option>
        ))}
      </select>
    </div>
  )
}
