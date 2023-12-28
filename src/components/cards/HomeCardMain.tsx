import React from "react"
import OutlinedButton from "../buttons/OutlinedButton"
import { WidgetSizes, WidgetTypes } from "../../constants/button-types"
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
      className={`flex items-stretch flex-col gap-8 rounded-xl justify-between p-4 md:p-6 w-full ${
        index % 2 !== 0
          ? "md:rounded-tl-full md:rounded-bl-full bg-primary-10 md:flex-row-reverse "
          : "md:rounded-tr-full md:rounded-br-full bg-secondary-10 md:flex-row"
      }`}
    >
      <div className="flex justify-center flex-col gap-4 md:basis-3/5">
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
              size={WidgetSizes.LARGE}
              type={
                index % 2 !== 0 ? WidgetTypes.PRIMARY : WidgetTypes.SECONDARY
              }
              text="Lebih Lanjut"
              ButtonIcon={ArrowRight}
            />
          </Link>
        </div>
      </div>
      <div
        className={`w-full overflow-hidden rounded-lg ${
          index % 2 !== 0
            ? "md:rounded-tl-full md:rounded-bl-full md:rounded-tr-2xl md:rounded-br-2xl"
            : "md:rounded-tr-full md:rounded-br-full md:rounded-tl-2xl md:rounded-bl-2xl"
        } md:p-0 md:flex md:justify-center md:items-center md:max-w-lg`}
      >
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={`/assets/${image}`}
          alt="Logo"
          className="w-full md:h-full md:w-full md:object-cover md:max-h-64"
        />
      </div>
    </div>
  )
}
