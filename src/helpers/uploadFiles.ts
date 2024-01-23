"use server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
})

export async function uploadPhoto(formData: any) {
  const image = await formData.get("file")
  const fileBuffer = await image.arrayBuffer()

  var mime = image.type
  var encoding = "base64"
  var base64Data = Buffer.from(fileBuffer).toString("base64")
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
            folder: "e-reporting",
          })
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    const result: any = await uploadToCloudinary()

    return {
      status: 201,
      message: "Berhasil mengupload gambar",
      data: {
        publicId: result.public_id,
        url: result.secure_url,
      },
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

export async function deletePhoto(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId)

    return {
      status: 200,
      message: "Berhasil menghapus gambar",
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

export async function uploadVideo(formData: any) {
  const video = await formData.get("file")
  const fileBuffer = await video.arrayBuffer()

  var mime = video.type
  var encoding = "base64"
  var base64Data = Buffer.from(fileBuffer).toString("base64")
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
            folder: "e-reporting",
            resource_type: "video",
          })
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    const result: any = await uploadToCloudinary()

    return {
      status: 201,
      message: "Berhasil mengupload video",
      data: {
        publicId: result.public_id,
        url: result.secure_url,
      },
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

export async function uploadDocument(formData: any) {
  const document = await formData.get("file")
  const fileBuffer = await document.arrayBuffer()

  var mime = document.type
  var encoding = "base64"
  var base64Data = Buffer.from(fileBuffer).toString("base64")
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
            folder: "e-reporting",
            resource_type: "raw",
          })
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    const result: any = await uploadToCloudinary()

    return {
      status: 201,
      message: "Berhasil mengupload dokumen",
      data: {
        publicId: result.public_id,
        url: result.secure_url,
      },
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

// if I uploaded the pdf file, the result will be encoded in base64
// how to convert it back and then the file will be downloaded
export async function downloadDocument(publicId: string) {
  try {
    const result: any = await cloudinary.api.resource(publicId, {
      resource_type: "raw",
    })

    return {
      status: 200,
      message: "Berhasil mendownload dokumen",
      data: {
        publicId: result.public_id,
        url: result.secure_url,
      },
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}
