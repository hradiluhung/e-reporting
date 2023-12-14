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

export const navListMenu = [
  {
    name: "Beranda",
    path: "/",
    icon: Home,
    isMain: true,
  },
  {
    name: "Profil Lembaga",
    path: "/profil",
    icon: User,
    isMain: true,
  },
  {
    name: "Satwa Rehabilitasi",
    path: "/satwa-rehab",
    icon: LifeBuoy,
    isMain: true,
  },
  {
    name: "Monitoring Satwa",
    path: "/monitoring-satwa",
    icon: Monitor,
    isMain: true,
  },
  {
    name: "Persebaran Satwa",
    path: "/persebaran",
    icon: Disc,
    isMain: false,
  },
  {
    name: "Interkoneksi Rehabilitasi Satwa",
    path: "/interkoneksi-rehab",
    icon: CornerDownRight,
    isMain: false,
  },
  {
    name: "Publikasi",
    path: "/publikasi",
    icon: Hexagon,
    isMain: false,
  },
  {
    name: "Gallery",
    path: "/gallery",
    icon: Image,
    isMain: false,
  },
]
