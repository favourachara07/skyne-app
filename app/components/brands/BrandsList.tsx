import React, { useState } from 'react';
import { Search, Star, Clock } from 'lucide-react';
import Image from 'next/image';

interface Brand {
  id: string;
  name: string;
  description?: string;
  image?: string;
  rating?: number;
  deliveryTime?: string;
  category?: string;
}

interface BrandsListProps {
  brands: Brand[];
}

const BrandsList: React.FC<BrandsListProps> = ({ brands }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use provided brands or sample data
  const displayBrands = brands.length > 0 ? brands : [];
  
  // Filter brands based on search query
  const filteredBrands = displayBrands.filter((brand: Brand) => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (brand.description && brand.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (brand.category && brand.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Featured Brands</h1>
        <p className="text-amber-700 text-lg">Discover amazing brands</p>
      </div>

      {/* Search Section */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-amber-400 group-focus-within:text-amber-600 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for brands, restaurants, or cuisines..."
          className="w-full pl-12 pr-6 py-4 bg-white border-2 border-amber-200 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 text-amber-900 placeholder-amber-400 shadow-lg"
        />
        </div>
      </div>
      
      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBrands.map((brand: Brand) => (
          <div
          key={brand.id}
          className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
          >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent z-10"></div>
            <Image
            width={400}
            height={300}
            src={brand.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"}
            alt={brand.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Rating Badge */}
            {brand.rating && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 z-20">
              <Star size={14} className="text-amber-500 fill-current" />
              <span className="text-sm font-semibold text-amber-900">{brand.rating}</span>
            </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-3">
            <h3 className="text-xl font-bold text-amber-900 mb-1 group-hover:text-amber-700 transition-colors">
              {brand.name}
            </h3>
            {brand.description && (
              <p className="text-amber-700 text-sm line-clamp-2">{brand.description}</p>
            )}
            </div>

            {/* Info Row */}
            <div className="flex items-center justify-between text-sm text-amber-600">
            {brand.deliveryTime && (
              <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{brand.deliveryTime}</span>
              </div>
            )}
            {brand.category && (
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
              {brand.category}
              </span>
            )}
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-600/0 to-amber-600/0 group-hover:from-amber-600/10 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
          </div>
        ))}
        </div>
      ) : (
        <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">No brands found</h3>
          <p className="text-amber-700">
            We couldn&apos;t find any brands matching your search. Try adjusting your search terms.
          </p>
          </div>
        </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-12 text-center text-amber-600">
        <p>Showing {filteredBrands.length} of {displayBrands.length} brands</p>
      </div>
      </div>
    </div>
  );
};

export default BrandsList;