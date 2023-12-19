import { WidgetSizes } from "@/constants/button-types"
import React from "react"

type Props = {
  size: WidgetSizes
}

export default function Skeleton({ size }: Props) {
  return (
    <div
      className={`w-full flex flex-col gap-4 p-8 ${
        size === WidgetSizes.MEDIUM ? "h-48" : "h-24"
      } items-center justify-center bg-neutral-200 animate-pulse border border-neutral-10 rounded-lg`}
    ></div>
  )
}
