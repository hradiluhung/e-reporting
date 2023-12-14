import React from "react"

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className="w-full bg-neutral-100 flex justify-between items-center p-4 md:px-8 md:py-6 lg:px-36 lg:py-8">
      <div>
        <p className="text-neutral-0 text-sm md:text-base">
          Indonesia Wildlife
        </p>
      </div>
      <div>
        <p className="text-neutral-0 text-end text-sm md:text-base">
          Indonesia Wildlife , {new Date().getFullYear()} © Seluruh Hak Cipta
        </p>
      </div>
    </div>
  )
}
