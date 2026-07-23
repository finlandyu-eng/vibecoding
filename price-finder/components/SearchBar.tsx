"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ large = false, defaultValue = "" }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/results?search=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className={`w-full rounded-full border-2 border-gray-200 bg-white px-6 py-4 text-gray-800 outline-none transition-colors focus:border-pink-400 ${
            large ? "text-xl" : "text-base"
          }`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-pink-500 px-6 py-2 text-white font-medium hover:bg-pink-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
