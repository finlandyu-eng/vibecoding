# PriceFinder

Find the cheapest price for any product across multiple stores.

## What Is This?

A simple website where you:
1. Type a product name (like "AirPods")
2. See prices from Amazon, Best Buy, Walmart, etc.
3. The cheapest price is always shown first
4. You save money!

## How to Run It

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free)

### Step 1: Install dependencies
Open a terminal in this folder and run:
```bash
npm install
```

### Step 2: Set up the database
Your MongoDB connection string is already in `.env.local`. 

To load sample products into the database, run:
```bash
node seed.js
```
You should see "Seeded 10 products" — that means it worked!

### Step 3: Start the app
```bash
npm run dev
```

### Step 4: Open in your browser
Go to [http://localhost:3000](http://localhost:3000)

That's it! You should see a search bar. Type a product name and hit Search.

## What Can I Do?

| Page | What It Does |
|------|-------------|
| **Home** (`/`) | Big search bar + category buttons |
| **Results** (`/results?search=airpods`) | Shows matching products with cheapest price |
| **Product** (`/product/123`) | See all store prices side by side |
| **Saved** (`/saved`) | Products you saved with the heart button |

## Project Files (What Goes Where)

```
price-finder/
├── app/                    # Pages (each folder = a page)
│   ├── page.tsx            # Home page (search bar)
│   ├── results/            # Search results page
│   ├── product/[id]/       # Product comparison page
│   ├── saved/              # Your saved products
│   └── api/                # Backend API routes
├── components/             # Reusable UI pieces
│   ├── SearchBar.tsx       # The search input
│   ├── ProductCard.tsx     # Product card in results
│   ├── PriceList.tsx       # List of store prices
│   ├── SaveButton.tsx      # Heart/save button
│   └── Navbar.tsx          # Top navigation bar
├── lib/
│   └── mongodb.js          # Database connection
├── models/
│   └── Product.js          # Product data structure
├── seed.js                 # Script to load sample data
├── .env.local              # Your secret settings (don't share!)
└── package.json            # Project info and dependencies
```

## How to Add Your Own Products

Edit the `seed.js` file. Each product looks like this:

```js
{
  name: "AirPods Pro 2",           // Product name
  brand: "Apple",                   // Brand name
  category: "Electronics",          // Category
  image: "🎧",                     // Emoji icon
  description: "Wireless earbuds", // Short description
  prices: [
    { store: "Amazon", price: 189.99, url: "https://amazon.com" },
    { store: "Best Buy", price: 224.99, url: "https://bestbuy.com" },
  ],
}
```

Then run `node seed.js` again to update the database.

## Tech Stack

- **Next.js** — The web framework (handles pages and API)
- **MongoDB** — The database (stores products and prices)
- **Tailwind CSS** — Makes the site look nice
- **Mongoose** — Helps talk to MongoDB from JavaScript

## Questions?

If something breaks, try:
1. Delete the `.next` folder
2. Run `npm install` again
3. Run `node seed.js` again
4. Run `npm run dev` again
