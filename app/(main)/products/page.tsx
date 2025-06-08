'use client'

import { mockProducts } from "@/app/components/products/array";
import ProductsList from "@/app/components/products/ProductsList";
import { Filter, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [filterName, setFilterName] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const allBrands = ['CeraVe', 'The Ordinary', 'Neutrogena', 'Olay', 'Nivea'];
  const brandId = 'Premium Skincare';

  const filteredProducts = mockProducts.filter(product => {
    const matchesName = product.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesBrand = !filterBrand || product.brand === filterBrand;
    const matchesMinPrice = !filterMinPrice || Number(product.price) >= parseFloat(filterMinPrice);
    const matchesMaxPrice = !filterMaxPrice || Number(product.price) <= parseFloat(filterMaxPrice);
    return matchesName && matchesBrand && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Products by {brandId}
          </h1>
          <p className="text-amber-100 text-center text-lg max-w-2xl mx-auto">
            Discover our curated collection of premium skincare products designed specifically for African skin
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Advanced Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-amber-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Filter className="w-5 h-5 text-amber-800" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Filter Products</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Brand Filter */}
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">All Brands</option>
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min ₦"
                value={filterMinPrice}
                onChange={(e) => setFilterMinPrice(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                min="0"
              />
              <input
                type="number"
                placeholder="Max ₦"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setFilterName('');
                setFilterBrand('');
                setFilterMinPrice('');
                setFilterMaxPrice('');
              }}
              className="px-6 py-3 bg-amber-100 text-amber-800 rounded-xl hover:bg-amber-200 transition-all font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-800 absolute top-0 left-0"></div>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductsList products={filteredProducts} />
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="bg-amber-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
              <button
                onClick={() => {
                  setFilterName('');
                  setFilterBrand('');
                  setFilterMinPrice('');
                  setFilterMaxPrice('');
                }}
                className="bg-amber-800 text-white px-6 py-3 rounded-xl hover:bg-amber-900 transition-all font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;