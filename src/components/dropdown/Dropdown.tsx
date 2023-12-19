import { WidgetSizes } from "@/constants/button-types"
import React from "react"

type Props = {
  placeholder: string
  defaultValue: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
  size: WidgetSizes
  options: string[] | number[]
}

export default function Dropdown({
  placeholder,
  onChange,
  defaultValue,
  value,
  size,
  options,
}: Props) {
  return (
    <div className="w-full">
      <select
        className={`w-full border border-neutral-50 rounded-xl ${
          size === WidgetSizes.SMALL
            ? "text-sm px-2 py-1 "
            : size === WidgetSizes.MEDIUM
            ? "text-base px-4 py-2"
            : "text-lg px-4 py-4"
        }`}
        onChange={onChange}
        value={value}
      >
        <option value="" className="w-full">
          {defaultValue}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className="w-full">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
