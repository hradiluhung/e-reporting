import { Schema, model, models } from "mongoose"

const feedbackSchema = new Schema(
  {
    idLembaga: {
      type: Schema.Types.ObjectId,
      ref: "feedbacks",
    },
    jenis: {
      type: String,
      required: [true, "Jenis tidak boleh kosong"],
    },
    isi: {
      type: String,
      required: [true, "Isi tidak boleh kosong"],
    },
    pengirim: {
      type: String,
      required: [true, "Pengirim tidak boleh kosong"],
    },
    kontakPengirim: {
      type: String,
      required: [true, "Kontak pengirim tidak boleh kosong"],
    },
  },
  {
    timestamps: true,
  }
)

const Feedback = models.feedbacks || model("feedbacks", feedbackSchema)

export default Feedback
