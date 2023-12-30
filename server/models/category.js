import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
  //for example you write react js it will be react-js in the url
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
});
export default mongoose.model("Category",categorySchema);
