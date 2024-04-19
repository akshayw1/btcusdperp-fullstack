import mongoose, { Schema, models } from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    tag: { type: String },
    totalViews: { type: Number, default: 0 },
    totalShare: { type: Number, default: 0 },
    datePost: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Post || mongoose.model("Post", postSchema);
