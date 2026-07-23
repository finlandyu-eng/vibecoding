"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

export default function SavedPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("saved") || "[]");
    if (savedIds.length === 0) {
      setLoading(false);
      return;
    }

    fetch(`/api/products?ids=${savedIds.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Saved Products</h1>

      {loading && (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">♡</p>
          <p className="text-gray-400">No saved products yet.</p>
          <a
            href="/"
            className="text-pink-500 font-medium text-sm mt-2 inline-block"
          >
            Start searching →
          </a>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
