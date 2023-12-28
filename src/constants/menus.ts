import {
  CornerDownRight,
  Disc,
  Hexagon,
  Home,
  Image,
  LifeBuoy,
  Monitor,
  User,
} from "react-feather"

export const ADMIN_MENUS = [
  {
    name: "Dashboard",
    description: "",
    path: "/admin",
    icon: Home,
    image: "",
    isMain: true,
  },
  {
    name: "Profil Lembaga",
    description:
      "Informasi tentang informasi lembaga, termasuk alamat, kontak, dan fitur untuk memberikan laporan atau saran.",
    path: "/admin/profil",
    icon: User,
    image: "",
    isMain: true,
  },
  {
    name: "Satwa Rehabilitasi",
    description:
      "Informasi tentang satwa yang sedang menjalani rehabilitasi. Pengguna dapat melihat jenis satwa, status kesehatannya, dan perkembangan proses rehabilitasinya.",
    path: "/admin/satwa-rehab",
    icon: LifeBuoy,
    image: "",
    isMain: true,
  },
  {
    name: "Monitoring Satwa Rehabilitasi",
    description:
      "Informasi tentang monitoring satwa. Pengguna dapat melihat data dan statistik terkini tentang populasi satwa, serta upaya yang dilakukan untuk melestarikannya.",
    path: "/admin/monitoring-satwa",
    icon: Monitor,
    image: "",
    isMain: true,
  },
  {
    name: "Persebaran Satwa",
    description: "",
    path: "/admin/persebaran",
    icon: Disc,
    image: "",
    isMain: false,
  },
  {
    name: "Interkoneksi Rehabilitasi Satwa",
    description: "",
    path: "/admin/interkoneksi-rehab",
    icon: CornerDownRight,
    image: "",
    isMain: false,
  },
  {
    name: "Publikasi",
    description: "",
    path: "/admin/publikasi",
    icon: Hexagon,
    image: "",
    isMain: false,
  },
  {
    name: "Gallery",
    description: "",
    path: "/admin/gallery",
    icon: Image,
    image: "",
    isMain: false,
  },
]

export const GUEST_MENUS = [
  {
    name: "Beranda",
    description: "",
    path: "/",
    icon: Home,
    image: "",
    isMain: true,
  },
  {
    name: "Profil Lembaga",
    description:
      "Informasi tentang peruntukan Lembaga Konservasi/organisasi/pusat rehabilitasi satwa, termasuk alamat, kontak, dan fitur partisipasi publik untuk menyampaikan laporan atau saran.",
    path: "/profil",
    icon: User,
    image: "home_feature_illustration_1.png",
    isMain: true,
  },
  {
    name: "Satwa Rehabilitasi",
    description:
      "Informasi tentang satwa yang sedang menjalani rehabilitasi. Pengguna dapat melihat jenis satwa, nomor ID, asal usul, status kesehatan dan perkembangan proses rehabilitasi.",
    path: "/satwa-rehab",
    icon: LifeBuoy,
    image: "home_feature_illustration_2.jpg",
    isMain: true,
  },
  {
    name: "Monitoring Satwa Rehabilitasi/Persebaran Satwa Rehabilitasi",
    description:
      "Informasi tentang monitoring persebaran satwa rehabilitasi yang telah dilepasliarkan. Pengguna dapat melihat data dan statistik terkini tentang satwa yang telah dilepasliarkan beserta peta persebarannya",
    path: "/monitoring-satwa",
    icon: Monitor,
    image: "home_feature_illustration_3.jpg",
    isMain: true,
  },
  {
    name: "Persebaran Satwa",
    description: "",
    path: "/persebaran",
    icon: Disc,
    image: "",
    isMain: false,
  },
  {
    name: "Interkoneksi Rehabilitasi Satwa",
    description: "",
    path: "/interkoneksi-rehab",
    icon: CornerDownRight,
    image: "",
    isMain: false,
  },
  {
    name: "Publikasi",
    description: "",
    path: "/publikasi",
    icon: Hexagon,
    image: "",
    isMain: false,
  },
  {
    name: "Gallery",
    description: "",
    path: "/gallery",
    icon: Image,
    image: "",
    isMain: false,
  },
]

export const NAVBAR_MENUS = GUEST_MENUS.map((menu) => {
  if (
    menu.name === "Monitoring Satwa Rehabilitasi/Persebaran Satwa Rehabilitasi"
  ) {
    return {
      ...menu,
      name: "Monitoring Satwa Rehabilitasi",
    }
  }
  return menu
})
