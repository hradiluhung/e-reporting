import React from "react"
import { Search } from "react-feather"

type Props = {
  searchKeyword: string
  onSearchKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBar({
  searchKeyword,
  onSearchKeywordChange,
}: Props) {
  return (
    <div className="w-full flex gap-2 border-2 border-neutral-10 rounded-xl text-base px-4 py-2 text-neutral-50 bg-neutral-0">
      <Search className="w-6" />
      <input
        className="w-full outline-none text-base bg-transparent placeholder:opacity-50"
        placeholder="Cari Berdasarkan Nama"
        type="text"
        value={searchKeyword}
        onChange={onSearchKeywordChange}
      />
    </div>
  )
}
