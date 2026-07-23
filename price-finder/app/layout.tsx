import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PriceFinder — Find the Cheapest Price",
  description: "Search any product and see prices from multiple stores. Never overpay again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-65px)]">{children}</main>
        <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100">
          PriceFinder — Never overpay again
        </footer>
      </body>
    </html>
  );
}
