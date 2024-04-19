import mongoose, { Schema, models } from "mongoose";
const oiListSchema = new Schema(
  {
    name: String,
    blocked: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);
export default models.OiList || mongoose.model("OiList", oiListSchema);
