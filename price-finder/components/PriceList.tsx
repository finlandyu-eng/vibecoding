export default function PriceList({ prices }: { prices: any[] }) {
  const sorted = [...prices].sort((a: any, b: any) => a.price - b.price);
  const cheapest = sorted[0]?.price;

  return (
    <div className="space-y-3">
      {sorted.map((item: any, i: number) => (
        <div
          key={i}
          className={`flex items-center justify-between rounded-xl px-5 py-4 ${
            item.price === cheapest
              ? "bg-green-50 border-2 border-green-200"
              : "bg-gray-50 border border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            {item.price === cheapest && (
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                CHEAPEST
              </span>
            )}
            <span className="font-medium text-gray-800">{item.store}</span>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`text-lg font-bold ${
                item.price === cheapest ? "text-green-600" : "text-gray-700"
              }`}
            >
              ${item.price.toFixed(2)}
            </span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-pink-500 hover:text-pink-600 font-medium"
            >
              Visit →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
