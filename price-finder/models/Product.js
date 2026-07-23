import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  store: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, default: "#" },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: "" },
  category: { type: String, required: true },
  image: { type: String, default: "📦" },
  description: { type: String, default: "" },
  prices: [PriceSchema],
  bestPrice: { type: Number },
  bestStore: { type: String },
});

ProductSchema.pre("save", function (next) {
  if (this.prices && this.prices.length > 0) {
    const sorted = [...this.prices].sort((a, b) => a.price - b.price);
    this.bestPrice = sorted[0].price;
    this.bestStore = sorted[0].store;
  }
  next();
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
