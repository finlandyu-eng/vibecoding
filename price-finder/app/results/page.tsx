import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter).sort({ bestPrice: 1 });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <SearchBar defaultValue={search} />
      </div>

      {search && (
        <p className="text-sm text-gray-400 mb-6">
          {products.length} result{products.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          {category && (
            <>
              {" "}
              in{" "}
              <span className="font-medium text-gray-600">{category}</span>
            </>
          )}
        </p>
      )}

      {!search && !category && (
        <p className="text-sm text-gray-400 mb-6">
          Showing all {products.length} products
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product._id.toString()} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-400">No products found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
