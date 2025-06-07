"use client";

import { mockProducts } from "@/app/components/products/array";
import ProductsList from "@/app/components/products/ProductsList";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  description:string;
  image: string;
}

const Products = () => {
  const { brandId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (brandId) {
        setProducts(
          mockProducts.filter(
            (product) =>
              product.brand.toLowerCase() === String(brandId).toLowerCase()
          )
        );
      } else {
        setProducts([]);
      }
      setLoading(false);
    }, 500);
  }, [brandId]);

  return (
    <div className="py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
        Products by {brandId || "All Brands"}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-800"></div>
        </div>
      ) : products.length > 0 ? (
        <ProductsList products={products} />
      ) : (
        <div className="text-center text-gray-500 py-20">
          No products found for this brand.
        </div>
      )}
    </div>
  );
};

export default Products;
