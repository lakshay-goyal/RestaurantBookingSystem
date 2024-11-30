"use client"
import { CartProvider } from 'FrontEnd/src/context/CartContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
} 