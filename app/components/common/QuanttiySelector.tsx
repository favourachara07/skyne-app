import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity, min = 1, max = 99, className = '' }) => {
  const handleDecrease = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < min) {
        setQuantity(min);
      } else if (value > max) {
        setQuantity(max);
      } else {
        setQuantity(value);
      }
    }
  };

  return (
    <div className={`inline-flex items-center border border-gray-300 rounded-md ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={`px-2 py-1 ${quantity <= min ? 'text-gray-300' : 'text-gray-600 hover:text-amber-800'}`}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none text-gray-700"
        aria-label="Quantity"
      />
      
      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={`px-2 py-1 ${quantity >= max ? 'text-gray-300' : 'text-gray-600 hover:text-amber-800'}`}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;