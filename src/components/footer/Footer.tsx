import Image from "next/image"
import React from "react"

export default function Footer() {
  return (
    <div className="bg-neutral-900 text-neutral-10 p-4 md:p-6 flex flex-col gap-4 md:flex-row md:justify-between lg:px-16 lg:py-12">
      <div className="grid grid-cols-3 place-items-center md:max-w-sm lg:max-w-lg md:flex md:flex-col md:gap-4">
        <div className="p-4 md:h-32 md:justify-start md:w-full md:p-0">
          <div className="w-full md:h-full md:w-auto">
            <Image
              width={0}
              height={0}
              sizes="100vh"
              src="/assets/logo.png"
              alt="Logo"
              className="w-auto h-full"
            />
          </div>
        </div>
        <div className="col-span-2">
          <p className="font-semibold text-lg">Indonesian Wildlife</p>
          <p className="text-xs md:text-base mt-2">
            Direktorat Konservasi Keanekaragaman Hayati Spesies dan Genetik
            Kementerian Lingkungan Hidup dan Kehutanan
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 place-items-center md:max-w-sm lg:max-w-lg md:flex md:flex-col md:gap-4">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:h-32 md:gap-4 md:justify-start md:items-center md:w-full md:p-0">
          <div className="bg-white basis-1/2 h-full flex items-center justify-center rounded-xl overflow-hidden">
            <Image
              width={0}
              height={0}
              sizes="100vh"
              src="/assets/wildlife.png"
              alt="Logo"
              className="w-auto h-full"
            />
          </div>
          <div className="basis-1/2 h-full rounded-xl overflow-hidden">
            <Image
              width={0}
              height={0}
              sizes="100vh"
              src="/assets/figth-xcrime.png"
              alt="Logo"
              className="w-auto h-full"
            />
          </div>
        </div>
        <div className="col-span-2">
          <p className="font-semibold text-lg">
            © Seluruh Hak Cipta Kementerian LHK
          </p>
          <p className="text-xs md:text-base mt-2">
            Prototype Pelatihan Kepemimpinan Perlindungan Habitat dan
            Pengendalian Pemanfaatan Tumbuhan dan Satwa Liar Batch II
          </p>
        </div>
      </div>
    </div>
  )
}
