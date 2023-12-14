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
        className="w-full shadow-md border border-neutral-10 px-4 py-2 rounded-full"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
