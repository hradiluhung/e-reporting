import { Schema, model, models } from "mongoose"

const persebaranSatwaSchema = new Schema(
  {
    jenisSatwa: {
      type: String,
      required: [true, "Jenis satwa tidak boleh kosong"],
    },
    namaIlmiah: {
      type: String,
      required: [true, "Nama ilmiah tidak boleh kosong"],
    },
    idSatwa: {
      type: String,
      required: [true, "Id satwa tidak boleh kosong"],
    },
    statusDilindungi: {
      type: String,
      required: [true, "Status dilindungi tidak boleh kosong"],
    },
    statusEndemik: {
      type: String,
      required: [true, "Status endemik tidak boleh kosong"],
    },
    koordinatPelepasliaran: {
      type: String,
      required: [true, "Koordinat pelepasliaran tidak boleh kosong"],
    },
    image: {
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

const PersebaranSatwa =
  models.persebaranSatwas || model("persebaranSatwas", persebaranSatwaSchema)

export default PersebaranSatwa
