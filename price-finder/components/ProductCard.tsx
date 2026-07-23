import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  const savings =
    product.prices.length > 1
      ? (
          Math.max(...product.prices.map((p: any) => p.price)) - product.bestPrice
        ).toFixed(2)
      : null;

  return (
    <Link
      href={`/product/${product._id}`}
      className="block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{product.image}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-sm text-gray-400">{product.brand}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold text-green-600">
            ${product.bestPrice?.toFixed(2)}
          </span>
          <span className="ml-2 text-sm text-gray-400">at {product.bestStore}</span>
        </div>
        {savings && (
          <span className="text-xs font-medium text-pink-500 bg-pink-50 px-2 py-1 rounded-full">
            Save ${savings}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {product.prices.length} stores compared
      </p>
    </Link>
  );
}
