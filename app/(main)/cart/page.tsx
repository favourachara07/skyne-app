'use client'

import React from "react";
import CartItem from "@/app/components/cart/CartItem";
import CartSummary from "@/app/components/cart/CartSummary";
import { mockCartItems } from "@/app/components/cart/array";


const Cart = () => {
  const [cartItems, setCartItems] = React.useState<typeof mockCartItems>(mockCartItems);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  return (
      <div className="py-6 md:py-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Your Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
          <CartSummary cartItems={cartItems} />
        </div>
      </div>
  );
};

export default Cart;
