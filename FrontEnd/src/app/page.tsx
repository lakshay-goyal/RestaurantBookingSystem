"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sun,
  Moon
} from 'lucide-react';
import { Button } from "FrontEnd/src/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "FrontEnd/src/components/ui/carousel";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
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
  );
}
