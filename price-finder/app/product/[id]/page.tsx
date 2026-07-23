import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import PriceList from "@/components/PriceList";
import SaveButton from "@/components/SaveButton";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const product = await Product.findById(id).lean();
  if (!product) return notFound();

  const prices = (product as any).prices || [];
  const bestPrice = (product as any).bestPrice || 0;
  const savings =
    prices.length > 1
      ? (Math.max(...prices.map((p: any) => p.price)) - bestPrice).toFixed(2)
      : null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <a
        href="/results"
        className="text-sm text-pink-500 hover:text-pink-600 font-medium"
      >
        ← Back to results
      </a>

      <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex items-start gap-5">
          <div className="text-6xl">{(product as any).image}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {(product as any).name}
            </h1>
            <p className="text-gray-400">
              {(product as any).brand} · {(product as any).category}
            </p>
            <p className="text-gray-500 mt-2">{(product as any).description}</p>
          </div>
          <SaveButton productId={(product as any)._id.toString()} />
        </div>

        {savings && (
          <div className="mt-6 bg-green-50 border border-green-100 rounded-xl px-5 py-3 text-sm text-green-700 font-medium">
            💰 You save ${savings} compared to the most expensive store
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Prices from {prices.length} stores
          </h2>
          <PriceList prices={prices} />
        </div>
      </div>
    </div>
  );
}
