import SearchBar from "@/components/SearchBar";

const categories = [
  { name: "Electronics", icon: "💻" },
  { name: "Fashion", icon: "👗" },
  { name: "Home", icon: "🏠" },
  { name: "Gaming", icon: "🎮" },
  { name: "Beauty", icon: "💄" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-3">
        Find the <span className="text-pink-500">cheapest price</span>
      </h1>
      <p className="text-gray-400 text-center mb-10 max-w-md">
        Search any product and instantly see where it costs less. Save money every time.
      </p>

      <SearchBar large />

      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={`/results?category=${cat.name}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors"
          >
            <span>{cat.icon}</span>
            {cat.name}
          </a>
        ))}
      </div>
    </div>
  );
}
