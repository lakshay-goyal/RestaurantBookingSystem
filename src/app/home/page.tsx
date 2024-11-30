"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  ChefHat, 
  Clock, 
  MapPin,
  Sun,
  Moon
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const featuredDishes = [
  {
    name: "Truffle Risotto",
    description: "Creamy Arborio rice with black truffle and parmesan",
    image: "/api/placeholder/400/300"
  },
  {
    name: "Seafood Paella",
    description: "Classic Spanish dish with saffron-infused rice and fresh seafood",
    image: "/api/placeholder/400/300"
  },
  {
    name: "Wagyu Steak",
    description: "Premium A5 Japanese Wagyu with roasted vegetables",
    image: "/api/placeholder/400/300"
  }
];

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
                Gourmet Haven
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/home">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/reservations">Reservations</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/20 py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 text-primary">
              Gourmet Haven
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience culinary excellence in an elegant, intimate setting. 
              Every dish tells a story of passion and craftsmanship.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg">
                <Link href="/reservations">Book a Table</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
              >
                <Link href="/menu">View Menu</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Dishes Carousel */}
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Our Featured Dishes
          </h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {featuredDishes.map((dish, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center p-6">
                      <img 
                        src={dish.image} 
                        alt={dish.name} 
                        className="rounded-lg mb-4 w-full h-48 object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                      <p className="text-muted-foreground text-center">
                        {dish.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Why Choose Gourmet Haven
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ChefHat className="w-12 h-12 text-primary" />,
                  title: "Expert Chefs",
                  description: "Our world-class chefs bring international culinary experience to your plate."
                },
                {
                  icon: <Clock className="w-12 h-12 text-primary" />,
                  title: "Flexible Booking",
                  description: "Easy online reservations with instant confirmation and flexible timing."
                },
                {
                  icon: <MapPin className="w-12 h-12 text-primary" />,
                  title: "Prime Location",
                  description: "Conveniently located in the heart of the city with elegant ambiance."
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center">
                    {feature.icon}
                    <CardTitle className="mt-4 mb-2">{feature.title}</CardTitle>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto py-16 text-center">
          <Card className="bg-primary/10 border-none">
            <CardContent className="py-16">
              <h2 className="text-3xl font-semibold mb-6">
                Ready to Indulge?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                Experience a culinary journey that tantalizes your taste buds and creates lasting memories.
              </p>
              <Button size="lg" asChild>
                <Link href="/reservations">Reserve Your Table Now</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
