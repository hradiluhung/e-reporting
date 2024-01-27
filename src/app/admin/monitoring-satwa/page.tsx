"use client"

import FilledButton from "@/components/buttons/FilledButton"
import { WidgetSizes } from "@/constants/button-types"
import Link from "next/link"

export default function page() {
  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl">
              Monitoring Satwa
            </h1>
            <p className="text-base">Informasi Monitoring Satwa</p>
          </div>
          {/* <div className="flex flex-start">
            <Link href="/admin/monitoring-satwa/add">
              <FilledButton
                text="Tambah"
                ButtonIcon={PlusCircle}
                type={WidgetTypes.PRIMARY}
                size={WidgetSizes.MEDIUM}
              />
            </Link>
          </div> */}
        </div>

        <div className="w-full h-96 bg-white rounded-lg shadow-md flex-col flex items-center justify-center">
          <p className="text-xl text-neutral-50 italic">
            Fitur ini sedang dalam pengembangan
          </p>
          <Link className="mt-4" href="/admin">
            <FilledButton
              text="Kembali ke Dashboard"
              size={WidgetSizes.MEDIUM}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
