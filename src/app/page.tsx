import FilledButton from "@/components/buttons/FilledButton"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "react-feather"
import { MAIN_FEATURES_LIST, OTHER_FEATURES_LIST } from "./features-list"
import HomeCardMain from "@/components/home-cards/HomeCardMain"
import HomeCardSecondary from "@/components/home-cards/HomeCardSecondary"

export default function Home() {
  return (
    <main className="w-full mt-16 px-4 py-6 md:px-8 lg:px-36 lg:py-24">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  dignissim sit amet lacus quis tristique. Pellentesque
                  vulputate porttitor molestie.
                </p>
              </div>
            </div>
            <div>
              <Link href="/profil">
                <FilledButton text="Lebih Lanjut" ButtonIcon={ArrowRight} />
              </Link>
            </div>
          </div>
          <div className="flex basis-full justify-center items-center md:basis-1/2 md:justify-end">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/assets/home_bird.png"
              alt="Logo"
              className="w-96"
            />
          </div>
        </div>
        <div>
          <div className="flex items-stretch justify-between gap-2 bg-primary-10 p-2 rounded-full md:p-4 lg:items-center">
            <div className="flex items-center justify-center bg-neutral-0 rounded-tl-full rounded-bl-full p-4 md:px-8 lg:px-12 lg:py-16">
              <p className="font-bold text-primary-100 text-base md:text-lg lg:text-xl">
                Tentang
              </p>
            </div>
            <div className="p-2 md:py-6 lg:px-16">
              <p className="pe-2 md:pe-0 text-xs md:text-base lg:text-lg">
                (Deskripsi Tentang Sistem) Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Eget duis mi nunc bibendum. Tellus
                elementum nec lorem eget dictumst. Risus in gravida eu, enim
                lorem. Sed consequat ut suspendisse eros. Nunc nunc accumsan,
                viverra enim. Mi.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* END OF SECTION 1 */}

      {/* SECTION 2 */}
      <div className="py-12 flex flex-col items-center gap-12 lg:py-16">
        <div>
          <h1 className="text-neutral-100 font-bold text-2xl">Fitur Utama</h1>
        </div>
        <div className="flex flex-col gap-8 w-full">
          {MAIN_FEATURES_LIST.map((feature, index) => (
            <HomeCardMain key={index} index={index} {...feature} />
          ))}
        </div>
      </div>
      {/* END OF SECTION 2 */}

      {/* SECTION 3 */}
      <div className="py-12 flex flex-col items-center gap-12 lg:py-16">
        <div>
          <h1 className="text-neutral-100 font-bold text-2xl">Fitur Lainnya</h1>
        </div>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OTHER_FEATURES_LIST.map((feature, index) => (
            <HomeCardSecondary
              key={index}
              title={feature.title}
              MenuIcon={feature.MenuIcon}
              url={feature.url}
            />
          ))}
        </div>
      </div>
      {/* END OF SECTION # */}
    </main>
  )
}
