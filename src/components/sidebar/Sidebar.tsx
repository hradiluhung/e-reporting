"use client"
import { ADMIN_MENUS } from "@/constants/menus"
import { useDesktopSize } from "@/hooks/useWindowSize"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { LogOut, Menu, X } from "react-feather"
import OutlinedButton from "../buttons/OutlinedButton"
import { WidgetSizes } from "@/constants/button-types"
import { signOut } from "next-auth/react"

export default function Sidebar() {
  const isDesktopSize = useDesktopSize()
  const pathName = usePathname()

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const onToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const onLogout = async () => {
    await signOut()
  }

  return (
    <div>
      {/* Desktop Sidebar */}
      {isDesktopSize && (
        <div className="flex h-screen shadow-md flex-col py-4 px-8 fixed top-0 start-0 bg-neutral-0">
          <div>
            <Link
              className="flex gap-4 justify-center items-center"
              href="/admin"
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/assets/logo.png"
                alt="Logo"
                className="w-12"
              />
              <h1 className="font-semibold text-lg">Admin</h1>
            </Link>
          </div>
          <div className="flex flex-col gap-4 mt-16">
            {ADMIN_MENUS.map((menu, index) => {
              const name = menu.name.split(" ").slice(0, 2).join(" ")
              return (
                <Link
                  key={index}
                  href={menu.path}
                  className={`flex gap-4 items-center ${
                    pathName === menu.path && "text-primary-100"
                  }`}
                >
                  <menu.icon className="w-6 h-6" />
                  <span>{name}</span>
                </Link>
              )
            })}
          </div>

          <div className="mt-auto w-full flex flex-col">
            <OutlinedButton
              size={WidgetSizes.SMALL}
              ButtonIcon={LogOut}
              text="Logout"
              onClick={onLogout}
            />
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {!isDesktopSize && (
        <div
          className="fixed top-0 start-0 p-4 shadow-md w-screen bg-neutral-0"
          onClick={onToggleMobileSidebar}
        >
          <Menu className="w-6 h-6" />
        </div>
      )}

      {isMobileSidebarOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 ${
            isMobileSidebarOpen ? "fade-in-right" : "fade-out-left"
          }`}
        >
          <div
            className={`flex h-screen shadow-md flex-col py-4 px-8 fixed top-0 start-0 bg-neutral-0 ${
              isMobileSidebarOpen ? "slide-in-right" : "slide-out-left"
            }`}
          >
            <div className="flex justify-between items-center">
              <Link
                className="flex gap-4 justify-center items-center"
                href="/admin"
              >
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/assets/logo.png"
                  alt="Logo"
                  className="w-12"
                />
                <h1 className="font-semibold text-lg">Admin</h1>
              </Link>
              <X onClick={onToggleMobileSidebar} className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-4 mt-16">
              {ADMIN_MENUS.map((menu, index) => {
                const name = menu.name.split(" ").slice(0, 2).join(" ")
                return (
                  <Link
                    key={index}
                    href={menu.path}
                    className={`flex gap-4 items-center ${
                      pathName === menu.path && "text-primary-100"
                    }`}
                    onClick={onToggleMobileSidebar}
                  >
                    <menu.icon className="w-6 h-6" />
                    <span>{name}</span>
                  </Link>
                )
              })}
            </div>

            <div className="mt-auto w-full flex flex-col">
              <OutlinedButton
                size={WidgetSizes.MEDIUM}
                ButtonIcon={LogOut}
                text="Logout"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
