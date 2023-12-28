import Image from "next/image"
import React from "react"

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className="w-full bg-neutral-100 flex  flex-col md:flex-row justify-between items-center p-4 md:px-8 md:py-6 lg:px-36 lg:py-5">
      <div className="flex items-center gap-2 md:w-1/2 lg:w-1/2">
        <div className="w-1/4 p-4 lg:w-1/6">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/assets/logo.png"
            alt="Logo"
            className="w-full"
          />
        </div>
        <div className="w-3/4">
          <p className="text-neutral-0 text-sm md:text-base font-semibold">
            Indonesia Wildlife
          </p>
          <p className="text-neutral-0 text-xs md:text-sm">
            Direktorat Konservasi Keanekaragaman Hayati Spesies dan Genetik
            Kementerian Lingkungan Hidup dan Kehutanan
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:w-1/2 lg:w-1/2 lg:justify-end">
        <div className="w-1/4 p-4 lg:w-1/6">
          <div className="bg-white">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/assets/home_feature_illustration_1.png"
              alt="Logo"
              className="w-full"
            />
          </div>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/assets/figth-xcrime.png"
            alt="Logo"
            className="w-full"
          />
        </div>
        <div className="w-3/4 ">
          <p className="text-neutral-0 text-sm md:text-base font-semibold">
            © Seluruh Hak Cipta Kementerian LHK
          </p>
          <p className="text-neutral-0 text-xs md:text-sm">
            Prototype Pelatihan Kepemimpinan Perlindungan Habitat dan
            Pengendalian Pemanfaatan Tumbuhan dan Satwa Liar Batch II
          </p>
        </div>
      </div>
    </div>
  )
}
