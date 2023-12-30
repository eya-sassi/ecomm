import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true, //par exple ktebet esem wala aamlt espace by mistake w ktbt lesem it's ok madem trim f true
      required: true,
    },
    email: { type: String, trim: true, required: true, unique: true },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
); //// The `createdAt` and `updatedAt` fields will be automatically added to the saved document.

export default mongoose.model("User", userSchema); //we write a model
