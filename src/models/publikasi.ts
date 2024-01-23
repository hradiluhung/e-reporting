import { Schema, model, models } from "mongoose"

const publikasiSchema = new Schema(
  {
    judul: {
      type: String,
      required: [true, "Judul tidak boleh kosong"],
    },
    penulis: {
      type: String,
      required: [true, "Penulis tidak boleh kosong"],
    },
    tahun: {
      type: String,
      required: [true, "Tahun tidak boleh kosong"],
    },
    isi: {
      type: String,
      required: [true, "Isi tidak boleh kosong"],
    },
    file: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Publikasi = models.publikasis || model("publikasis", publikasiSchema)

export default Publikasi
