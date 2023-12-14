import React from "react"
import OutlinedButton from "../buttons/OutlinedButton"
import { WidgetTypes } from "../../constants/button-types"
import { ArrowRight } from "react-feather"
import Image from "next/image"
import Link from "next/link"

type Props = {
  title: string
  description: string
  url: string
  index: number
  image: string
}

export default function HomeCardMain({
  title,
  description,
  url,
  index,
  image,
}: Props) {
  return (
    <div
      className={`flex md:h-64 flex-col items-center gap-8 rounded-xl justify-between px-8 py-6 w-full ${
        index % 2 !== 0
          ? "md:rounded-tl-full md:rounded-bl-full bg-primary-10 md:flex-row-reverse "
          : "md:rounded-tr-full md:rounded-br-full bg-secondary-10 md:flex-row"
      } md:px-12 md:py-8 lg:px-24 lg:py16`}
    >
      <div className="flex flex-col gap-4 md:basis-3/5">
        <div className="flex flex-col gap-2">
          <h1
            className={`font-bold ${
              index % 2 !== 0 ? "text-primary-100" : "text-secondary-100"
            } text-base md:text-lg lg:text-xl`}
          >
            {title}
          </h1>
          <p className="font-normal text-neutral-100 text-xs md:text-base lg:text-base">
            {description}
          </p>
        </div>
        <div>
          <Link href={url}>
            <OutlinedButton
              type={
                index % 2 !== 0 ? WidgetTypes.PRIMARY : WidgetTypes.SECONDARY
              }
              text="Lebih Lanjut"
              ButtonIcon={ArrowRight}
            />
          </Link>
        </div>
      </div>
      <div className="w-full p-4 md:p-0 md:basis-2/5 lg:h-full lg:flex lg:justify-center">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={`/assets/${image}`}
          alt="Logo"
          className="w-full lg:h-full lg:w-auto"
        />
      </div>
    </div>
  )
}
