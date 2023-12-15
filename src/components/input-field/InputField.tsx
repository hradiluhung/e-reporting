import React from "react"

type Props = {
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type?: string
}

export default function InputField({
  placeholder,
  onChange,
  value,
  type = "text",
}: Props) {
  return (
    <div className="w-full">
      <input
        className="w-full border border-neutral-50 px-4 py-4 rounded-xl"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
