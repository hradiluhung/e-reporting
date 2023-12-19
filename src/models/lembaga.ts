import { Schema, model, models } from "mongoose"

const lembagaSchema = new Schema(
  {
    nama: {
      type: String,
      required: [true, "nama tidak boleh kosong"],
    },
    tentang: {
      type: String,
      required: [true, "Tentang tidak boleh kosong"],
    },
    alamat: {
      type: String,
      required: [true, "Alamat tidak boleh kosong"],
    },
    kontak: {
      type: String,
      required: [true, "Kontak tidak boleh kosong"],
    },
    namaKontak: {
      type: String,
      required: [true, "Nama kontak tidak boleh kosong"],
    },
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: "feedbacks",
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Lembaga = models.lembagas || model("lembagas", lembagaSchema)

export default Lembaga
