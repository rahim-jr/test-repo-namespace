import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: String,
    description: String,
    price: Number,
    imageURL: String,
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
