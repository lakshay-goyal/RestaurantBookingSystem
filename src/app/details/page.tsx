import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Component() {
  return (
    <div className="w-full">
      <section className="grid md:grid-cols-2 gap-8 px-4 md:px-6 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="grid gap-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW3NgPg9zcQkjOSfL0qYPHbnsRLDe-DyeOnw&s"
            alt="Product"
            width={600}
            height={600}
            className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Acme Prism T-Shirt</h1>
            <p className="text-2xl font-bold mt-2">$49.99</p>
          </div>
          <div className="grid gap-4">
            <p>
              Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern individual. This
              tee is crafted with a meticulous composition of 60% combed ringspun cotton and 40% polyester jersey,
              ensuring a soft and breathable fabric that feels gentle against the skin.
            </p>
            <p>
              The design of the Acme Prism T-Shirt is as striking as it is comfortable. The shirt features a unique
              prism-inspired pattern that adds a modern and eye-catching touch to your ensemble.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg"><Link href="/reservations">Book Now</Link></Button>
            <Button size="lg" variant="outline">
            Add to Cart
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW3NgPg9zcQkjOSfL0qYPHbnsRLDe-DyeOnw&s"
              alt="Related Product 1"
              width={300}
              height={300}
              className="aspect-square object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">Acme Circles Tee</h3>
              <p className="text-gray-500 dark:text-gray-400">$29.99</p>
            </div>
          </div>
          <div className="grid gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW3NgPg9zcQkjOSfL0qYPHbnsRLDe-DyeOnw&s"
              alt="Related Product 2"
              width={300}
              height={300}
              className="aspect-square object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">Acme Stripes Hoodie</h3>
              <p className="text-gray-500 dark:text-gray-400">$59.99</p>
            </div>
          </div>
          <div className="grid gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW3NgPg9zcQkjOSfL0qYPHbnsRLDe-DyeOnw&s"
              alt="Related Product 3"
              width={300}
              height={300}
              className="aspect-square object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">Acme Dots Sweatpants</h3>
              <p className="text-gray-500 dark:text-gray-400">$39.99</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}