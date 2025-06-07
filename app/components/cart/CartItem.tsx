import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import QuantitySelector from '../common/QuanttiySelector';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    brand?: string;
    price: number;
    image: string;
    quantity: number;
  };
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  const { id, name, brand, price, image, quantity } = item;
  
  return (
    <div className="flex py-4 border-b border-gray-200 last:border-0">
      {/* Product image */}
      <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
          />
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Product details */}
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            {brand && <div className="text-xs text-gray-500">{brand}</div>}
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <p className="mt-1 text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
          </div>
          
          <button
            onClick={() => removeItem(id)}
            className="text-gray-400 hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        {/* Quantity controls and price */}
        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            setQuantity={(newQuantity) => updateQuantity(id, newQuantity)}
          />
          
          <span className="font-medium">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;