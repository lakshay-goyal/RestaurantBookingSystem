"use client"

import Image from "next/image"
import demo from "../assets/demo.jpg"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

// Mock product data
const products = [
  { id: 1, name: "Restaurant 1", price: 19.99, image: {demo} },
  { id: 2, name: "Restaurant 2", price: 49.99, image:{demo} },
  { id: 3, name: "Restaurant 3", price: 199.99, image:{demo} },
  { id: 4, name: "Restaurant 4", price: 79.99, image:{demo} },
  { id: 5, name: "Restaurant 5", price: 29.99, image:{demo} },
  { id: 6, name: "Restaurant 6", price: 149.99, image: {demo} },
]

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48">
                <Image
                  src={demo}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full">
              <Link href="/details">View Details</Link></Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}