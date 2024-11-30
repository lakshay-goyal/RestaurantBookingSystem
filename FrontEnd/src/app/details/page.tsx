"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "FrontEnd/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "FrontEnd/src/components/ui/card"
import { Separator } from "FrontEnd/src/components/ui/separator"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useCart } from 'FrontEnd/src/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const [mainProduct, setMainProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("http://127.0.0.1:8000/products") // Replace with your API URL
        const products: Product[] = response.data
        
        // Get the product ID from URL parameters
        const productId = searchParams.get('id');
        
        // Find the main product based on ID
        const main = products.find(p => p.id === Number(productId)) || products[0];
        
        // Filter out the main product from related products
        const related = products.filter(p => p.id !== main.id);
        
        setMainProduct(main)
        setRelatedProducts(related)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  const handleAddToCart = () => {
    if (mainProduct) {
      console.log('Adding to cart:', mainProduct);
      
      const cartItem = {
        id: mainProduct.id,
        name: mainProduct.name,
        price: mainProduct.price,
        imageUrl: mainProduct.imageUrl,
        quantity: 1
      };
      
      console.log('Cart item to add:', cartItem);
      addToCart(cartItem);
      
      setIsAddedToCart(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader"></div>
      </div>
    )
  }

  if (!mainProduct) {
    return <div className="text-center text-red-500">Failed to load products. Please try again later.</div>
  }


  return (
    <div className="w-full bg-white dark:bg-gray-950">
      <section className="grid md:grid-cols-2 gap-8 px-4 md:px-6 py-12 md:py-20 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <Card className="w-full max-w-md">
            <CardHeader>
              <img
                src={mainProduct.imageUrl}
                alt={mainProduct.name}
                className="aspect-square object-cover rounded-lg shadow-lg"
              />
            </CardHeader>
            <CardContent className="text-center">
              <h2 className="text-2xl font-bold">{mainProduct.name}</h2>
              <p className="text-xl text-primary font-semibold mt-2">${mainProduct.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {mainProduct.name}
            </h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
                <Star size={20} className="text-gray-300" />
              </div>
              <span className="text-gray-600">(4.0)</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              {mainProduct.description}
            </p>
          </div>

          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/cart">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className={`${isAddedToCart ? 'bg-green-500' : ''}`}
              >
                <ShoppingCart className="mr-2" /> 
                {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                
              </Button>
              </Link>
            </motion.div>
            <Button size="lg" variant="outline" asChild>
              <Link href={{
                pathname: '/reservations',
                query: {
                  productId: mainProduct.id,
                  productName: mainProduct.name,
                  productPrice: mainProduct.price,
                  productImage: mainProduct.imageUrl
                }
              }}>Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/details?id=${product.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="aspect-square object-cover rounded-lg mb-4"
                    />
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-0 pt-2 justify-between items-center">
                      <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                    </CardFooter>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}