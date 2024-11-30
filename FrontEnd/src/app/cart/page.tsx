"use client"
import React from 'react';
import { Button } from "FrontEnd/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "FrontEnd/src/components/ui/card"
import { Separator } from "FrontEnd/src/components/ui/separator"
import { Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useCart } from 'FrontEnd/src/context/CartContext';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CartPage() {
  const { cartItems, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button asChild>
          <Link href="/menu">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex justify-between items-center">
            Your Cart 
            <span className="text-sm text-gray-500">
              {cartItems.reduce((total, item) => total + item.quantity, 0)} Items
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-full">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="px-3">{item.quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => updateQuantity(item.id, 0)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">Total</h4>
            <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button className="w-full" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/menu">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}