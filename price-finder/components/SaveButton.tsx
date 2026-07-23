"use client";

import { useState, useEffect } from "react";

export default function SaveButton({ productId }: { productId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("saved") || "[]");
    setSaved(savedList.includes(productId));
  }, [productId]);

  function toggle() {
    const savedList = JSON.parse(localStorage.getItem("saved") || "[]");
    let updated: string[];
    if (savedList.includes(productId)) {
      updated = savedList.filter((id: string) => id !== productId);
    } else {
      updated = [...savedList, productId];
    }
    localStorage.setItem("saved", JSON.stringify(updated));
    setSaved(!saved);
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
        saved
          ? "bg-pink-500 text-white"
          : "bg-pink-50 text-pink-500 hover:bg-pink-100"
      }`}
    >
      {saved ? "♥ Saved" : "♡ Save"}
    </button>
  );
}
