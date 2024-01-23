import { Schema, model, models } from "mongoose"

const gallerySchema = new Schema(
  {
    media: {
      type: String,
      required: [true, "Media tidak boleh kosong"],
    },
    publicId: {
      type: String,
      required: [true, "Public Id tidak boleh kosong"],
    },
    type: {
      type: String,
      required: [true, "Type tidak boleh kosong"],
    },
    idLembaga: {
      // reference to lembaga
      type: Schema.Types.ObjectId,
      ref: "lembagas",
    },
  },
  { timestamps: true }
)

const Gallery = models.galleries || model("galleries", gallerySchema)

export default Gallery
