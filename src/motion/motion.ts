import { Variants } from "framer-motion"

export const fadeInUpVariants: Variants = {
  hide: {
    opacity: 0,
    y: 100,
    zIndex: -1,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
    zIndex: 1,
  },
}
