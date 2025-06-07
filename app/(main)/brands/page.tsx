import { mockBrands } from "@/app/components/brands/array";
import BrandsList from "@/app/components/brands/BrandsList";
import React, { useState, useEffect } from "react";

interface Brand {
  id: string;
  name: string;
  rating: number;
  description: string;
  logo: string;
};

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true); // Reset loading state
        setTimeout(() => {
          setBrands(mockBrands);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load brands. Please try again later.");
        setLoading(false);
      }
    };

    fetchBrands();
  }, []); // Ensure the dependency array is empty to avoid re-fetching

  return (
    <div className="py-6 md:py-10 ">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
        Explore Skyne&apos;s trusted brands
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-800"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-800">{error}</div>
      ) : (
        <BrandsList brands={brands} />
      )}
    </div>
  );
};

export default Brands;
