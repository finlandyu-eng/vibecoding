import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  await connectDB();

  const search = req.nextUrl.searchParams.get("search") || "";
  const category = req.nextUrl.searchParams.get("category") || "";
  const ids = req.nextUrl.searchParams.get("ids") || "";

  if (ids) {
    const idList = ids.split(",");
    const products = await Product.find({ _id: { $in: idList } }).sort({
      bestPrice: 1,
    });
    return NextResponse.json({ products });
  }

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
  return NextResponse.json({ products });
}
