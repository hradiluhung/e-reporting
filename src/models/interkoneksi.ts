import { Schema, model, models } from "mongoose"

const interkoneksiSchema = new Schema(
  {
    namaPusatRehabilitasi: {
      type: String,
      required: [true, "Nama pusat rehabilitasi tidak boleh kosong"],
    },
    personInCharge: {
      type: String,
      required: [true, "Person in charge tidak boleh kosong"],
    },
    kontakHp: {
      type: String,
      required: [true, "Kontak hp tidak boleh kosong"],
    },
    kontakEmail: {
      type: String,
      required: [true, "Kontak email tidak boleh kosong"],
    },
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
    asalUsul: {
      type: String,
      required: [true, "Asal usul tidak boleh kosong"],
    },
    lokasiRehabilitasi: {
      type: String,
      required: [true, "Lokasi rehabilitasi tidak boleh kosong"],
    },
    tanggalSerahTerima: {
      type: Date,
      required: [true, "Tanggal serah terima tidak boleh kosong"],
    },
    kondisiSatwa: {
      type: String,
      required: [true, "Kondisi satwa tidak boleh kosong"],
    },
    status: {
      type: String,
      required: [true, "Status tidak boleh kosong"],
    },
    keterangan: {
      type: String,
      required: [true, "Keterangan tidak boleh kosong"],
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

const Interkoneksi =
  models.Interkoneksis || model("Interkoneksis", interkoneksiSchema)

export default Interkoneksi
