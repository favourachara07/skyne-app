import React from 'react';
import Button from '../common/Button';

interface CartItem  {
  price: number;
  quantity: number;
  // Add other properties if needed (e.g., id, name)
};

interface CartSummaryProps {
  cartItems: CartItem[];
  showCheckoutButton?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, showCheckoutButton = true }) => {
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Estimate tax (for demonstration purposes)
  const taxRate = 0.08; // 8%
  const tax = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + tax;
  
  // Shipping is free above $50
  const shipping = subtotal >= 50 ? 0 : 5.99;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
          )}
        </div>
        
        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (estimated)</span>
          <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-2 pt-2"></div>
        
        {/* Total */}
        <div className="flex justify-between">
          <span className="text-gray-900 font-medium">Total</span>
          <span className="text-gray-900 font-bold">${(total + shipping).toFixed(2)}</span>
        </div>
      </div>
      
      {/* Free shipping message */}
      {subtotal < 50 && (
        <div className="mt-4 text-sm text-gray-600">
          Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping.
        </div>
      )}
      
      {/* Checkout button */}
      {showCheckoutButton && (
        <Button 
          variant="primary" 
          fullWidth 
          className="mt-6"
        >
          Checkout
        </Button>
      )}
    </div>
  );
};

export default CartSummary;