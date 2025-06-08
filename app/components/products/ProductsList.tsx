import React from "react";
import Image from "next/image";
import { Product } from "@/app/(main)/products/page";
import { Star } from "lucide-react";


interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Premium Collection
        </h2>
        <div className="text-amber-800 font-medium">
          {products.length} Product{products.length !== 1 ? 's' : ''} Found
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 overflow-hidden transform hover:-translate-y-1"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <Image
                width={300}
                height={300}
                src={product.image || "/api/placeholder/300/300"}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                {/* <span className="text-sm font-medium text-gray-700">{product.rating}</span> */}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="mb-3">
                <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-1 rounded-full">
                  {product.brand}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              {product.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-amber-800">
                  ₦{product.price?.toLocaleString() || 'N/A'}
                </div>
                <button className="bg-gradient-to-r from-amber-800 to-amber-900 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm hover:from-amber-900 hover:to-amber-800 transform hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
