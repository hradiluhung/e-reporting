import Link from "next/link"
import { Icon } from "react-feather"

type Props = {
  title: string
  url: string
  MenuIcon: Icon
}

export default function HomeCardSecondary({ title, url, MenuIcon }: Props) {
  return (
    <div className="p-8 md:p-10 lg:p-12 border border-neutral-50 rounded-lg flex flex-col items-start justify-center gap-2 transition-all hover:bg-black hover:bg-opacity-5 hover:backdrop-filter hover:backdrop-blur-lg">
      <div className="flex flex-col gap-1">
        <MenuIcon className="w-6" />
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      <Link className="text-neutral-50 underline" href={url}>
        Lebih Lanjut
      </Link>
    </div>
  )
}
