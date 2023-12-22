import imageCompression from "browser-image-compression"

const defaultOptions = {
  maxSizeMB: 1,
}

export function compressFile(imageFile: File, options = defaultOptions) {
  return imageCompression(imageFile, options)
}
