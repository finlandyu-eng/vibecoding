const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://finlandyu_db_user:jSkoQM6VjQSQohLh@comrite001.paf5lhn.mongodb.net/price-finder?retryWrites=true&w=majority";

const PriceSchema = new mongoose.Schema({ store: String, price: Number, url: String });
const ProductSchema = new mongoose.Schema({
  name: String, brand: String, category: String, image: String, description: String,
  prices: [PriceSchema], bestPrice: Number, bestStore: String,
});
ProductSchema.pre("save", function (next) {
  if (this.prices && this.prices.length > 0) {
    const sorted = [...this.prices].sort((a, b) => a.price - b.price);
    this.bestPrice = sorted[0].price;
    this.bestStore = sorted[0].store;
  }
  next();
});
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const products = [
  {
    name: "AirPods Pro 2", brand: "Apple", category: "Electronics", image: "🎧",
    description: "Active noise cancelling wireless earbuds with USB-C charging.",
    prices: [
      { store: "Amazon", price: 189.99, url: "https://amazon.com" },
      { store: "Best Buy", price: 224.99, url: "https://bestbuy.com" },
      { store: "Walmart", price: 229.99, url: "https://walmart.com" },
      { store: "Apple Store", price: 249.99, url: "https://apple.com" },
    ],
  },
  {
    name: 'Samsung 55" 4K TV', brand: "Samsung", category: "Electronics", image: "📺",
    description: "55 inch Crystal UHD 4K Smart TV with HDR.",
    prices: [
      { store: "Walmart", price: 349.99, url: "https://walmart.com" },
      { store: "Amazon", price: 379.99, url: "https://amazon.com" },
      { store: "Best Buy", price: 399.99, url: "https://bestbuy.com" },
    ],
  },
  {
    name: "Nike Air Max 270", brand: "Nike", category: "Fashion", image: "👟",
    description: "Comfortable running shoes with Max Air cushioning.",
    prices: [
      { store: "Nike.com", price: 109.99, url: "https://nike.com" },
      { store: "Amazon", price: 119.99, url: "https://amazon.com" },
      { store: "Foot Locker", price: 129.99, url: "https://footlocker.com" },
    ],
  },
  {
    name: "Dyson V15 Vacuum", brand: "Dyson", category: "Home", image: "🧹",
    description: "Cordless stick vacuum with laser dust detection.",
    prices: [
      { store: "Dyson.com", price: 549.99, url: "https://dyson.com" },
      { store: "Amazon", price: 569.99, url: "https://amazon.com" },
      { store: "Best Buy", price: 599.99, url: "https://bestbuy.com" },
    ],
  },
  {
    name: "Kindle Paperwhite", brand: "Amazon", category: "Electronics", image: "📖",
    description: "6.8 inch display e-reader with warm light and waterproof design.",
    prices: [
      { store: "Amazon", price: 139.99, url: "https://amazon.com" },
      { store: "Target", price: 144.99, url: "https://target.com" },
      { store: "Best Buy", price: 149.99, url: "https://bestbuy.com" },
    ],
  },
  {
    name: "Levi's 501 Jeans", brand: "Levi's", category: "Fashion", image: "👖",
    description: "Classic straight fit jeans, 100% cotton denim.",
    prices: [
      { store: "Amazon", price: 39.99, url: "https://amazon.com" },
      { store: "Levi's", price: 59.50, url: "https://levi.com" },
      { store: "Nordstrom", price: 69.50, url: "https://nordstrom.com" },
    ],
  },
  {
    name: "Ninja Air Fryer", brand: "Ninja", category: "Home", image: "🍳",
    description: "4 quart air fryer with 4 cooking functions.",
    prices: [
      { store: "Target", price: 69.99, url: "https://target.com" },
      { store: "Amazon", price: 79.99, url: "https://amazon.com" },
      { store: "Walmart", price: 89.99, url: "https://walmart.com" },
    ],
  },
  {
    name: "PlayStation 5", brand: "Sony", category: "Gaming", image: "🎮",
    description: "Next-gen gaming console with 4K gaming and ray tracing.",
    prices: [
      { store: "Walmart", price: 449.99, url: "https://walmart.com" },
      { store: "Amazon", price: 469.99, url: "https://amazon.com" },
      { store: "Best Buy", price: 499.99, url: "https://bestbuy.com" },
      { store: "GameStop", price: 499.99, url: "https://gamestop.com" },
    ],
  },
  {
    name: "Stanley Quencher Tumbler 40oz", brand: "Stanley", category: "Home", image: "🥤",
    description: "Insulated stainless steel tumbler, keeps drinks cold for hours.",
    prices: [
      { store: "Target", price: 35.00, url: "https://target.com" },
      { store: "Amazon", price: 42.99, url: "https://amazon.com" },
      { store: "Dick's Sporting Goods", price: 45.00, url: "https://dickssportinggoods.com" },
    ],
  },
  {
    name: "CeraVe Moisturizing Cream", brand: "CeraVe", category: "Beauty", image: "🧴",
    description: "16 oz daily face and body moisturizer with ceramides.",
    prices: [
      { store: "Amazon", price: 15.99, url: "https://amazon.com" },
      { store: "Target", price: 17.49, url: "https://target.com" },
      { store: "Ulta", price: 18.99, url: "https://ulta.com" },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  await Product.deleteMany({});
  console.log("Cleared old products");
  await Product.insertMany(products);
  console.log("Seeded " + products.length + " products");
  await mongoose.disconnect();
  console.log("Done!");
}

seed().catch((err) => { console.error(err); process.exit(1); });
