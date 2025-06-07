import React from "react";
import Image from "next/image";
import { Product } from "@/app/(main)/products/page";


interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
          >
            <Image
              height={192}
              width={192}
              src={product.image || "/default-product.png"}
              alt={product.name}
              className="rounded-t-xl h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>
              <span className="text-sm text-amber-700 font-medium mb-2">
                {product.brand}
              </span>
              {product.description && (
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {product.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-amber-800">
                  {typeof product.price === "number"
                    ? `₦${product.price}`
                    : product.price}
                </span>
                <button className="bg-amber-800 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-900 transition text-sm font-semibold">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
