"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { navListMenu } from "./list-menu"
import { usePathname } from "next/navigation"
import { ArrowDown, ChevronDown, Menu, X } from "react-feather"
import { useDesktopSize, useTabletSize } from "@/hooks/useWindowSize"

type Props = {
  isAuth: boolean
}

export default function Navbar({ isAuth }: Props) {
  const isDesktopSize = useDesktopSize()
  const isTabletSize = useTabletSize()

  const pathName = usePathname()
  const [isOtherMenuExpanded, setIsOtherMenuExpanded] = useState(false)
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  const onOpenOtherMenu = () => {
    setIsOtherMenuExpanded(true)
  }

  const onCloseOtherMenu = () => {
    setIsOtherMenuExpanded(false)
  }

  const onToggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded)
  }

  return (
    <>
      <div className="fixed rounded-md top-0 w-full flex justify-between items-center p-2 md:px-4 lg:py-4 lg:px-36 bg-neutral-5">
        <div>
          <Link href="/">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/assets/logo.png"
              alt="Logo"
              className="w-14 md:w-16 lg:w-20"
            />
          </Link>
        </div>
        {isDesktopSize ? (
          // Desktop Navbar
          <>
            <div className="flex gap-16">
              {navListMenu
                .filter((item) => item.isMain == true)
                .map((item, index) => (
                  <div key={index}>
                    <Link href={item.path}>
                      <p
                        className={`font-semibold hover:text-primary-100 transition-all ${
                          pathName == item.path ? "text-primary-100" : ""
                        }`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </div>
                ))}
              <div
                className={`flex gap-2 cursor-pointer relative ${
                  navListMenu
                    .filter((item) => item.isMain == false)
                    .some((item) => item.path == pathName)
                    ? "text-primary-100"
                    : "text-neutral-100"
                }`}
                onMouseEnter={onOpenOtherMenu}
                onMouseLeave={onCloseOtherMenu}
              >
                <p className="font-semibold">Lainnya</p>
                <ChevronDown
                  className={`w-4 transition-all ${
                    isOtherMenuExpanded ? "rotate-180" : ""
                  }`}
                />
                <div
                  className={`absolute flex flex-col gap-2 top-6 end-0 bg-neutral-0 border border-neutral-50 px-6 py-4 rounded-lg whitespace-nowrap ${
                    isOtherMenuExpanded ? "fade-in-down" : "fade-out-up"
                  }`}
                >
                  <p className="text-neutral-50 text-sm opacity-80">
                    Menu Lainnya
                  </p>
                  <div className="flex flex-col gap-4">
                    {navListMenu
                      .filter((item) => item.isMain == false)
                      .map((item, index) => (
                        <div key={index}>
                          <Link href={item.path}>
                            <p
                              className={`font-semibold hover:text-primary-100 transition-all ${
                                pathName == item.path
                                  ? "text-primary-100"
                                  : "text-neutral-100"
                              }`}
                            >
                              {item.name}
                            </p>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {!isAuth && (
              <div>
                <button className="border-2 border-primary-100 px-8 py-2 rounded-full font-semibold text-neutral-100 transition-all hover:bg-primary-50">
                  Login
                </button>
              </div>
            )}
          </>
        ) : (
          // Mobile and Tablet Navbar
          <div className="flex gap-4 items-center">
            {isTabletSize && !isAuth && (
              <div>
                <button className="border-2 border-primary-100 px-8 py-2 rounded-full font-semibold text-neutral-100 transition-all hover:bg-primary-50">
                  Login
                </button>
              </div>
            )}
            <Menu className="w-6 cursor-pointer" onClick={onToggleMenu} />
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-neutral-0 bg-opacity-80 z-20 ${
            isMenuExpanded ? "fade-in-left" : "fade-out-right"
          }`}
        >
          <div className="flex flex-col gap-12 p-4 h-full">
            <div className="flex justify-end w-full">
              <X onClick={onToggleMenu} className="w-6 cursor-pointer" />
            </div>
            <div className="flex gap-8 flex-col items-center justify-center">
              <div className="flex flex-col gap-4 items-center">
                {navListMenu.map((item, index) => (
                  <div key={index}>
                    <Link href={item.path}>
                      <p
                        className={`font-semibold hover:text-primary-100 transition-all ${
                          pathName == item.path ? "text-primary-100" : ""
                        }`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
              {!isAuth && (
                <div>
                  <button className="border-2 border-primary-100 px-8 py-2 rounded-full font-semibold text-neutral-100 transition-all hover:bg-primary-50">
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
