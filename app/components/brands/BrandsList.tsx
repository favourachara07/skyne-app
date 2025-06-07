import React, { useState } from 'react';
// import BrandCard from './BrandCard';
import { Search } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  description?: string;
};

interface BrandsListProps {
  brands: Brand[];
}

const BrandsList: React.FC<BrandsListProps> = ({ brands }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter brands based on search query
  const filteredBrands = brands.filter((brand: Brand) => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (brand.description && brand.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for brands"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      
      {/* Display brands */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {filteredBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))} */}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No brands found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default BrandsList;