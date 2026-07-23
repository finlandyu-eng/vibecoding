# Full-Stack Web App Proposal

## Project Vision

A **simple price finder** — search for any product, instantly see where it's cheapest. No clutter, no complexity. Just type, compare, and save money.

**Goal:** Build a clean, easy-to-use tool that anyone can figure out in 5 seconds.

---

## The Simple Experience

```
┌──────────────────────────────────────────────────┐
│           🔍  What are you looking for?          │
│        ┌──────────────────────────────────┐      │
│        │  AirPods Pro                     │      │
│        └──────────────────────────────────┘      │
│                                                  │
└──────────────────────────────────────────────────┘

  Results for "AirPods Pro"

  ┌─────────────────────────────────────────────────┐
  │ 🎧 AirPods Pro 2 - Apple                       │
  │                                                 │
  │  Amazon         $189.99  ← CHEAPEST            │
  │  Best Buy       $224.99                        │
  │  Walmart        $229.99                        │
  │  Apple Store    $249.99                        │
  │                                                 │
  │  💰 You save $60                               │
  └─────────────────────────────────────────────────┘
```

**That's it.** One page. One search. All prices. Done.

---

## Features (Keep It Simple)

| # | Feature | What It Does |
|---|---------|--------------|
| 1 | **Big Search Bar** | Center of the home page, impossible to miss |
| 2 | **Price Results** | List of stores + prices, best price highlighted |
| 3 | **Category Chips** | One-tap filters: Electronics, Fashion, Home, etc. |
| 4 | **Save Button** | Heart icon to save products you like |
| 5 | **Simple Account** | Sign up / log in (optional, not forced) |

**That's the whole app.** No dashboards, no complex filters, no walls of settings.

---

## What We're NOT Building (Keeping It Simple)

- ~~Price alerts~~ — add later
- ~~Price history charts~~ — add later
- ~~Admin panel~~ — add later
- ~~Social features~~ — add later
- ~~Complex filters~~ — just category chips

**Focus: One search bar, clean results, that's it.**

---

## Tech Stack

| Tool | Why |
|------|-----|
| **Next.js** | Fast, simple, one project for frontend + backend |
| **MongoDB** | Easy to store products and prices |
| **Tailwind CSS** | Quick to build clean, minimal UI |
| **NextAuth** | Simple login, 2 lines of setup |
| **OpenAI API** | Smart search that understands plain English |

---

## Page Breakdown (Only 4 Pages)

### 1. Home Page
- Big search bar in the center
- Category chips below (tap to browse)
- Popular deals at the bottom

### 2. Results Page
- Shows matching products from search
- Each product card shows: image, name, best price, store count
- Tap a product to see full comparison

### 3. Product Page
- Product name + image
- All store prices listed, cheapest first
- "Visit Store" button for each
- Heart icon to save

### 4. Saved Page
- Your saved products (heart icon)
- Simple list, tap to view again

---

## Simple Data Structure

```json
{
  "name": "AirPods Pro 2",
  "brand": "Apple",
  "category": "Electronics",
  "image": "airpods.jpg",
  "prices": [
    { "store": "Amazon", "price": 189.99, "url": "#" },
    { "store": "Best Buy", "price": 224.99, "url": "#" },
    { "store": "Walmart", "price": 229.99, "url": "#" }
  ]
}
```

That's the whole database model. Simple.

---

## Project Structure

```
price-finder/
├── app/
│   ├── page.js                # Home - search bar
│   ├── results/page.js        # Search results
│   ├── product/[id]/page.js   # Price comparison
│   ├── saved/page.js          # Saved products
│   ├── auth/login/page.js     # Login
│   ├── auth/signup/page.js    # Sign up
│   └── api/
│       ├── search/route.js    # Search logic
│       ├── save/route.js      # Save/unsave
│       └── auth/[...nextauth]/route.js
├── components/
│   ├── SearchBar.js           # Big search input
│   ├── PriceList.js           # Store prices list
│   ├── ProductCard.js         # Result card
│   └── SaveButton.js          # Heart icon
├── models/
│   └── Product.js
├── lib/
│   ├── mongodb.js
│   └── openai.js
├── seed.js                    # Sample products
└── package.json
```

---

## Build Order (Quick & Easy)

| Step | What | Time |
|------|------|------|
| 1 | Setup Next.js + MongoDB | Day 1 |
| 2 | Seed 10 sample products | Day 1 |
| 3 | Build home page with search bar | Day 2 |
| 4 | Build results page | Day 2 |
| 5 | Build product comparison page | Day 3 |
| 6 | Add save/unsave feature | Day 3 |
| 7 | Add simple login/signup | Day 4 |
| 8 | Connect AI search | Day 4 |
| 9 | Polish + responsive | Day 5 |
| 10 | Deploy | Day 5 |

**~1 week to build.** Keep it simple, ship it fast.

---

## Summary

| What | Details |
|------|---------|
| **Project** | Simple Price Finder |
| **Pages** | 4 (Home, Results, Product, Saved) |
| **Stack** | Next.js + MongoDB + Tailwind |
| **AI** | Natural language search |
| **Design** | Clean, minimal, easy |
| **Build Time** | ~1 week |

---

*Simple is better. We can always add more features later.*
