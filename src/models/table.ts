import mongoose, { Schema, models } from "mongoose";
const tableSchema = new Schema(
  {
    name: String,
    data: [{}],
  },
  { timestamps: true }
);

export default models.Table || mongoose.model("Table", tableSchema);
