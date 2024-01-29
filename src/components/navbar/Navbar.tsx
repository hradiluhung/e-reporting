"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, LogIn, LogOut, Menu, User, X } from "react-feather"
import { useDesktopSize } from "@/hooks/useWindowSize"
import InputField from "../input/InputField"
import FilledButton from "../buttons/FilledButton"
import { showToast } from "@/helpers/showToast"
import { WidgetSizes, WidgetTypes } from "@/constants/button-types"
import { signIn, signOut } from "next-auth/react"
import OutlinedButton from "../buttons/OutlinedButton"
import { GUEST_MENUS, NAVBAR_MENUS } from "@/constants/menus"
import { signUp } from "@/controllers/admin-controller"

type Props = {
  isAuthed: boolean
}

export default function Navbar({ isAuthed }: Props) {
  const isDesktopSize = useDesktopSize()
  const router = useRouter()

  const pathName = usePathname()
  const [isOtherMenuExpanded, setIsOtherMenuExpanded] = useState(false)
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

  const onOpenOtherMenu = () => {
    setIsOtherMenuExpanded(true)
  }

  const onCloseOtherMenu = () => {
    setIsOtherMenuExpanded(false)
  }

  const onToggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded)
  }

  const onToggleModalLogin = () => {
    setIsModalLoginOpen(!isModalLoginOpen)
    setIsMenuExpanded(false)
  }

  const onLogout = async () => {
    await signOut()
  }

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoadingLogin(true)
    if (username == "" || password == "") {
      setIsLoadingLogin(false)
      showToast("Username dan Password tidak boleh kosong", WidgetTypes.ERROR)
      return
    }
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })
      if (res?.error) {
        setIsLoadingLogin(false)
        return showToast(res.error, WidgetTypes.ERROR)
      }
      router.push("/admin")
      setIsLoadingLogin(false)
    } catch (error: any) {
      setIsLoadingLogin(false)
      showToast(error.message, WidgetTypes.ERROR)
    }
  }

  return (
    <>
      <div className="fixed rounded-md z-10 top-0 w-full flex justify-between items-center p-2 md:px-4 lg:py-4 lg:px-36 bg-neutral-5">
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
            <div className="flex gap-6 items-center">
              <>
                {NAVBAR_MENUS.filter((item) => item.isMain == true).map(
                  (item, index) => (
                    <div key={index} className="break-words text-center">
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
                  )
                )}
                <div
                  className={`flex gap-2 cursor-pointer group relative ${
                    NAVBAR_MENUS.filter((item) => item.isMain == false).some(
                      (item) => item.path == pathName
                    )
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
                      isOtherMenuExpanded
                        ? "group-hover:fade-in-down"
                        : "fade-out-up"
                    }`}
                  >
                    <p className="text-neutral-50 text-sm opacity-80">
                      Menu Lainnya
                    </p>
                    <div className="flex flex-col gap-4">
                      {NAVBAR_MENUS.filter((item) => item.isMain == false).map(
                        (item, index) => (
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
                        )
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>

            <div className="flex gap-2">
              {isAuthed ? (
                <>
                  <Link href="/admin">
                    <FilledButton
                      text="Admin"
                      ButtonIcon={User}
                      size={WidgetSizes.MEDIUM}
                    />
                  </Link>
                  <OutlinedButton
                    size={WidgetSizes.MEDIUM}
                    tooltip="Logout"
                    onClick={onLogout}
                    ButtonIcon={LogOut}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <OutlinedButton
                    size={WidgetSizes.MEDIUM}
                    text="Login"
                    onClick={onToggleModalLogin}
                    ButtonIcon={LogIn}
                  />
                  <p className="text-xs mt-1 font-medium">
                    <span className="text-red-500">* </span>Khusus walidata
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          // Mobile and Tablet Navbar
          <div className="flex gap-4 items-center">
            <Menu className="w-6 cursor-pointer" onClick={onToggleMenu} />
          </div>
        )}

        {/* Mobile & Tablet Menu */}
        {isMenuExpanded && (
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
                <div className="flex flex-col gap-4 items-center w-80 md:w-96">
                  {NAVBAR_MENUS.map((item, index) => (
                    <div key={index}>
                      <Link href={item.path} onClick={onToggleMenu}>
                        <p
                          className={`font-semibold text-center hover:text-primary-100 transition-all ${
                            pathName == item.path ? "text-primary-100" : ""
                          }`}
                        >
                          {item.name}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>

                {isAuthed ? (
                  <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-start md:justify-center">
                    <Link href="/admin">
                      <FilledButton
                        text="Admin"
                        ButtonIcon={User}
                        size={WidgetSizes.MEDIUM}
                      />
                    </Link>
                    <OutlinedButton
                      size={WidgetSizes.MEDIUM}
                      text="Logout"
                      onClick={onLogout}
                      ButtonIcon={LogOut}
                    />
                  </div>
                ) : (
                  <OutlinedButton
                    size={WidgetSizes.MEDIUM}
                    text="Login"
                    onClick={onToggleModalLogin}
                    ButtonIcon={LogIn}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {isModalLoginOpen && (
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-20 flex justify-center items-center px-4 ${
              isModalLoginOpen ? "fade-in-down" : "fade-out-up"
            }`}
          >
            <div className="bg-neutral-0 p-6 rounded-xl flex flex-col justify-center gap-6 items-start w-full md:w-96">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-semibold text-neutral-100">
                  Login Admin
                </h1>
                <X
                  className="w-6 cursor-pointer stroke-primary-50"
                  onClick={onToggleModalLogin}
                />
              </div>
              <form
                className="flex flex-col gap-6 w-full"
                method="POST"
                onSubmit={onLogin}
              >
                <div className="flex flex-col gap-4 w-full">
                  <InputField
                    label="Username"
                    placeholder="Username"
                    onChange={onUsernameChange}
                    value={username}
                    size={WidgetSizes.MEDIUM}
                  />
                  <InputField
                    label="Password"
                    placeholder="Password"
                    onChange={onPasswordChange}
                    value={password}
                    type="password"
                    size={WidgetSizes.MEDIUM}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FilledButton
                    size={WidgetSizes.MEDIUM}
                    text="Login"
                    isSubmit={true}
                    ButtonIcon={LogIn}
                    isLoading={isLoadingLogin}
                    isDisabled={isLoadingLogin}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
