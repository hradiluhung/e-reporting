import { ArrowDownCircle, Image, Monitor, User } from "react-feather"

export const MAIN_FEATURES_LIST = [
  {
    title: "Publikasi",
    description:
      "(Deskripsi Tentang Publikasi) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum.",
    url: "/publikasi",
    image: "home_feature_illustration_1.png",
  },
  {
    title: "Satwa Rehabilitasi",
    description:
      "(Deskripsi Tentang Satwa Rehabilitasi) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum.",
    url: "/satwa-rehab",
    image: "home_feature_illustration_2.png",
  },
  {
    title: "Persebaran Satwa",
    description:
      "(Deskripsi Tentang Persebaran Satwa) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum.",
    url: "/persebaran",
    image: "home_feature_illustration_3.png",
  },
]

export const OTHER_FEATURES_LIST = [
  {
    title: "Profil Lembaga",
    description:
      "(Deskripsi Tentang Profil Lembaga) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum.",
    url: "/profil",
    MenuIcon: User,
  },
  {
    title: "Monitoring Satwa",
    description:
      "(Deskripsi Tentang Monitoring Satwa) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum.",
    url: "/monitoring-satwa",
    MenuIcon: Monitor,
  },
  {
    title: "Interkoneksi Rehabilitasi Satwa",
    description:
      "(Deskripsi Tentang Interkoneksi Rehabilitasi Satwa) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum.",
    url: "/interkoneksi-rehab",
    MenuIcon: ArrowDownCircle,
  },
  {
    title: "Galeri",
    description:
      "(Deskripsi Tentang Galeri) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum.",
    url: "/galeri",
    MenuIcon: Image,
  },
]
