"use client"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather"

type props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  maxPageNumbersToShow: number
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  maxPageNumbersToShow,
}: props) {
  // Calculate the range of page numbers to show
  let startPage = Math.max(
    currentPage - Math.floor(maxPageNumbersToShow / 2),
    1
  )
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages)

  // Adjust if we're at the end of the pages
  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1)
  }

  return (
    <div className="flex justify-end">
      <div className="flex justify-end items-center gap-10 bg-white shadow-md py-2 px-4 rounded-full">
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(1)}>
            <ChevronsLeft className="w-5" />
          </button>
          <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}>
            <ChevronLeft className="w-5" />
          </button>
        </div>
        <div className="flex gap-2">
          {startPage > 1 && <div>...</div>}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, idx) => startPage + idx
          ).map((pageNum) => (
            <button
              key={pageNum}
              className={`px-2 ${
                currentPage === pageNum ? "bg-primary-50 text-white" : ""
              } rounded-full`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          {endPage < totalPages && <div>...</div>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
          >
            <ChevronRight className="w-5" />
          </button>

          <button onClick={() => setCurrentPage(totalPages)}>
            <ChevronsRight className="w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
