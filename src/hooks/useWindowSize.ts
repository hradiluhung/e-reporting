import { useWindowSize } from "@uidotdev/usehooks"

export const useMobileSize = () => {
  const windowSize = useWindowSize()
  const isMobileSize = windowSize && windowSize.width && windowSize.width < 640

  return isMobileSize
}

export const useTabletSize = () => {
  const windowSize = useWindowSize()
  const isTabletSize =
    windowSize &&
    windowSize.width &&
    windowSize.width >= 640 &&
    windowSize.width < 1024

  return isTabletSize
}

export const useDesktopSize = () => {
  const windowSize = useWindowSize()
  const isDesktopSize =
    windowSize && windowSize.width && windowSize.width >= 1024

  return isDesktopSize
}
