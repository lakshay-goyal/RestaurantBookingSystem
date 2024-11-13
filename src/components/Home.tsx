import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover"
          src="/placeholder.svg"
          alt="Restaurant ambiance"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Welcome to Gourmet Haven
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Experience culinary excellence in a warm and inviting atmosphere. Book your table now and embark on a gastronomic journey.
        </p>
        <div className="mt-10">
          <Link href="/reservations">
            <Button size="lg">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

