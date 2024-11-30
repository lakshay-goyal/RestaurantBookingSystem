"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductPage() {
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const mainProduct: Product = {
    id: 1,
    name: "Acme Prism T-Shirt",
    price: 49.99,
    description: "A perfect blend of style and comfort, crafted with 60% combed ringspun cotton and 40% polyester jersey.",
    imageUrl: "/placeholder-product.jpg"
  }

  const relatedProducts: Product[] = [
    {
      id: 2,
      name: "Acme Circles Tee",
      price: 29.99,
      description: "Stylish circular pattern tee",
      imageUrl: "/placeholder-product.jpg"
    },
    {
      id: 3,
      name: "Acme Stripes Hoodie",
      price: 59.99,
      description: "Comfortable striped hoodie",
      imageUrl: "../assets/demo.jpg"
    },
    {
      id: 4,
      name: "Acme Dots Sweatpants",
      price: 39.99,
      description: "Relaxed fit sweatpants with dot pattern",
      imageUrl: "/placeholder-product.jpg"
    }
  ]

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    setTimeout(() => {
      window.location.href = '/cart'
    }, 1000)
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
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className={`${isAddedToCart ? 'bg-green-500' : ''}`}
              >
                <ShoppingCart className="mr-2" /> 
                {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
              </Button>
            </motion.div>
            <Button size="lg" variant="outline" asChild>
              <Link href="/reservations">Book Now</Link>
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
              <Link key={product.id} href={`/product/${product.id}`}>
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