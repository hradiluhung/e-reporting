import { CornerDownRight, Disc, Hexagon, Image } from "react-feather"

export const MAIN_FEATURES_LIST = [
  {
    title: "Profil Lembaga",
    description:
      "Informasi tentang informasi lembaga, termasuk menu, alamat, kontak, dan fitur untuk memberikan laporan atau saran",
    url: "/profil",
    image: "home_feature_illustration_1.png",
  },
  {
    title: "Satwa Rehabilitasi",
    description:
      "Informasi tentang satwa yang sedang menjalani rehabilitasi. Pengguna dapat melihat jenis satwa, status kesehatannya, dan perkembangan proses rehabilitasinya.",
    url: "/satwa-rehab",
    image: "home_feature_illustration_2.png",
  },
  {
    title: "Monitoring Satwa",
    description:
      "Informasi tentang monitoring satwa. Pengguna dapat melihat data dan statistik terkini tentang populasi satwa, serta upaya yang dilakukan untuk melestarikannya",
    url: "/monitoring-satwa",
    image: "home_feature_illustration_3.png",
  },
]

export const OTHER_FEATURES_LIST = [
  {
    title: "Persebaran Satwa Rehabilitasi",
    url: "/persebaran",
    MenuIcon: Disc,
  },
  {
    title: "Interkoneksi Pusat Rehabilitasi Satwa",
    url: "/interkoneksi-rehab",
    MenuIcon: CornerDownRight,
  },
  {
    title: "Publikasi",
    url: "/publikasi",
    MenuIcon: Hexagon,
  },
  {
    title: "Gallery",
    url: "/gallery",
    MenuIcon: Image,
  },
]
