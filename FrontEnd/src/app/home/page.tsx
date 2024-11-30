"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  ChefHat, 
  Clock, 
  MapPin
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "FrontEnd/src/components/ui/card";
import { Button } from "FrontEnd/src/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "FrontEnd/src/components/ui/carousel";
import { motion } from 'framer-motion';

const featuredDishes = [
  {
    name: "Masala Dosa",
    description: "Masala Dosa",
    image: "https://imgs.search.brave.com/_WSzrx0B2lSpUMECu-2jOpb7m8HiaWn_AMccgTj9dFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGlzdGNoYWxsZW5n/ZXMuY29tL2YvaXRl/bXMvMmYyYjEwYTkt/OTU5NC00ODZhLTkw/NGItMmZmZGY0Yzhl/Mzg3LmpwZw"
  },
  {
    name: "Italian Pizza",
    description: "Italian Pizza",
    image: "https://imgs.search.brave.com/QbJbOaCcDmUm25oJuCVNpHMIZyJbGey8PIWqMr-sLUE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wb2xp/c2h3aWZpLmNvbS91/cGxvYWRzL3VzZXJf/ZmlsZXMvcGl6emEt/NzExNjcwXzk2MF83/MjAuanBn"
  },
  {
    name: "American Burger",
    description: "American Burger",
    image: "https://imgs.search.brave.com/7utshmKHxOwZ_HfG0Ro97CjrskTh8iaSzyCHQhqBKe4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wb2xp/c2h3aWZpLmNvbS91/cGxvYWRzL3VzZXJf/ZmlsZXMvYnVyZ2Vy/LTczMTI5OF85NjBf/NzIwLmpwZw"
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-gray-800 tracking-tight">
                  Gourmet Haven
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/home" 
                className="text-gray-600 hover:text-primary font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
              >
                Home
              </Link>
              <Link 
                href="/menu" 
                className="text-gray-600 hover:text-primary font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
              >
                Menu
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-primary font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-primary font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
              >
                Contact
              </Link>
              <Button asChild size="sm" className="ml-4">
                <Link href="/cart">Cart</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: 'url("/restaurant-bg.jpg")' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold mb-6 text-white">
                Gourmet Haven
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
                Experience culinary excellence in an elegant, intimate setting. 
                Every dish tells a story of passion and craftsmanship.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild size="lg">
                  <Link href="/menu">View Menu</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Section - Updated title and content */}
        <section className="container mx-auto py-24 px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Culinary Excellence
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredDishes.map((dish, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full overflow-hidden">
                      <CardContent className="p-0">
                        <img 
                          src={dish.image} 
                          alt={dish.name} 
                          className="w-full h-56 object-cover transition-transform hover:scale-110 duration-300"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                          <p className="text-muted-foreground">
                            {dish.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/5 dark:bg-secondary/10 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Choose Gourmet Haven
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
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
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="text-center p-8 h-full hover:shadow-xl transition-all border-2 hover:border-primary/20">
                    <CardContent className="flex flex-col items-center space-y-4">
                      {feature.icon}
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                      <p className="text-muted-foreground text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto py-24 px-4">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
              <CardContent className="py-20">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to Indulge?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                  Experience a culinary journey that tantalizes your taste buds and creates lasting memories.
                </p>
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/reservations">Reserve Your Table Now</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
