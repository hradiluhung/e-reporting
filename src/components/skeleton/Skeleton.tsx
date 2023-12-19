import React from "react"

type Props = {
  height: number
}

export default function Skeleton({ height }: Props) {
  return (
    <div
      className={`w-full flex flex-col gap-4 p-8 h-${height} items-center justify-center bg-neutral-200 animate-pulse border border-neutral-10 rounded-lg`}
    ></div>
  )
}
