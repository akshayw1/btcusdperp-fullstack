import mongoose, { Schema, models } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerifiedUser: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      tokenId: String,
      validUntil: Date,
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", userSchema);
