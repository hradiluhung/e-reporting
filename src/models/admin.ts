import { timeStamp } from "console"
import { Schema, model, models } from "mongoose"

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username tidak boleh kosong"],
    },
    password: {
      type: String,
      required: [true, "Password tidak boleh kosong"],
    },
  },
  {
    timestamps: true,
  }
)

const Admin = models.admins || model("admins", adminSchema)

export default Admin
