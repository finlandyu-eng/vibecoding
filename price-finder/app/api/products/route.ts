import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  await connectDB();

  const ids = req.nextUrl.searchParams.get("ids");
  if (!ids) {
    return NextResponse.json({ products: [] });
  }

  const idList = ids.split(",");
  const products = await Product.find({ _id: { $in: idList } }).sort({
    bestPrice: 1,
  });
  return NextResponse.json({ products });
}
