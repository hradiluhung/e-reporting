import { Schema, model, models } from "mongoose"

const satwaRehabilitasiSchema = new Schema(
  {
    jenisSatwa: {
      type: String,
      default: "",
    },
    namaIlmiah: {
      type: String,
      default: "",
    },
    idSatwa: {
      type: String,
      default: "",
    },
    statusDilindungi: {
      type: String,
      default: "",
    },
    statusEndemik: {
      type: String,
      default: "",
    },
    asalUsulSatwa: {
      type: String,
      default: "",
    },
    lokasiRehabilitasi: {
      type: String,
      default: "",
    },
    tanggalSerahTerima: {
      type: Date,
      default: "",
    },
    kondisiSatwa: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    keterangan: {
      type: String,
      default: "",
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

const SatwaRehabilitasi =
  models.satwaRehabilitasis ||
  model("satwaRehabilitasis", satwaRehabilitasiSchema)

export default SatwaRehabilitasi
