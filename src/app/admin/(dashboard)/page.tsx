import HomeCardSecondary from "@/components/home-cards/HomeCardSecondary"
import { ADMIN_MENUS } from "@/constants/menus"
import React from "react"

type Props = {}

function page({}: Props) {
  return (
    <div className="w-full px-4 pt-24 pb-12 md:px-8 lg:px-36 lg:pt-36 lg:pb-24">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
            Dashboard Admin
          </h1>
          <p className="text-base">Selamat Datang, Admin!</p>
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          <div>
            <h1 className="font-semibold">Fitur Anda</h1>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADMIN_MENUS.filter((menu) => menu.name !== "Dashboard").map(
              (menu, index) => (
                <HomeCardSecondary
                  key={index}
                  title={menu.name}
                  MenuIcon={menu.icon}
                  url={menu.path}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
