"use client"
import FilledButton from "@/components/buttons/FilledButton"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "react-feather"
import HomeCardMain from "@/components/cards/HomeCardMain"
import HomeCardSecondary from "@/components/cards/HomeCardSecondary"
import { motion } from "framer-motion"
import { fadeInUpVariants } from "@/motion/motion"
import { GUEST_MENUS } from "@/constants/menus"
import { WidgetSizes } from "@/constants/button-types"

export default function Page() {
  return (
    <div className="w-full mt-16 px-4 py-6 md:px-8 lg:px-36 lg:py-24">
      {/* SECTION 1 */}
      <div className="py-4 flex flex-col gap-24 lg:pt-6 lg:pb-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-8 basis-full md:basis-1/2 md:justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50 font-bold text-3xl lg:text-5xl">
                  Indonesia Wildlife
                </h1>
                <p className="text-lg text-neutral-100 font-medium lg:text-xl">
                  Indonesia Wildlife Rescue Data Center
                </p>
              </div>
              <div>
                <p className="font-normal text-neutral-50 text-base">
                  Sebuah pusat data yang menyediakan informasi terkini tentang
                  satwa liar di Indonesia dan upaya penyelamatan mereka.
                  Dapatkan wawasan mendalam tentang keanekaragaman hayati
                  Indonesia dan bagaimana kita bisa membantu.
                </p>
              </div>
            </div>
            <div>
              <Link href="/profil">
                <FilledButton
                  text="Lebih Lanjut"
                  ButtonIcon={ArrowRight}
                  size={WidgetSizes.LARGE}
                />
              </Link>
            </div>
          </div>
          <div className="flex basis-full justify-center items-center md:basis-1/2 md:justify-end">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/assets/home_animals.png"
              alt="Logo"
              className="w-96"
            />
          </div>
        </div>
        <div>
          <div className="flex items-stretch justify-between gap-2 bg-primary-10 p-2 rounded-full md:p-4 lg:items-center">
            <div className="flex items-center justify-center bg-neutral-0 rounded-tl-full rounded-bl-full p-4 md:px-8 lg:px-12 lg:py-16">
              <p className="font-bold text-center text-primary-100 text-base md:text-lg lg:text-xl">
                Tentang KLHK
              </p>
            </div>
            <div className="p-2 md:py-6 lg:px-16">
              <p className="pe-2 md:pe-0 text-xs md:text-base lg:text-lg">
                KLHK, atau Kementerian Lingkungan Hidup dan Kehutanan, adalah
                lembaga pemerintah Indonesia yang berkomitmen untuk mewujudkan
                pembangunan lingkungan hidup dan kehutanan secara berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* END OF SECTION 1 */}

      {/* SECTION 2 */}
      <motion.div
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={fadeInUpVariants}
      >
        <div className="py-12 flex flex-col items-center gap-12 lg:py-16">
          <div>
            <h1 className="text-neutral-100 font-bold text-2xl">Fitur Utama</h1>
          </div>
          <div className="flex flex-col gap-8 w-full">
            {GUEST_MENUS.filter(
              (menu) => menu.isMain === true && menu.name !== "Beranda"
            ).map((menu, index) => (
              <HomeCardMain
                key={index}
                index={index}
                title={menu.name}
                description={menu.description}
                image={menu.image}
                url={menu.path}
              />
            ))}
          </div>
        </div>
      </motion.div>
      {/* END OF SECTION 2 */}

      {/* SECTION 3 */}
      <motion.div
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={fadeInUpVariants}
      >
        <div className="py-12 flex flex-col items-center gap-12 lg:py-16">
          <div>
            <h1 className="text-neutral-100 font-bold text-2xl">
              Fitur Lainnya
            </h1>
          </div>
          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GUEST_MENUS.filter((menu) => menu.isMain === false).map(
              (menu, index) => (
                <HomeCardSecondary
                  key={index}
                  title={menu.name}
                  url={menu.path}
                  MenuIcon={menu.icon}
                />
              )
            )}
          </div>
        </div>
      </motion.div>
      {/* END OF SECTION # */}
    </div>
  )
}
