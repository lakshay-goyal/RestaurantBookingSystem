// app/page.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from "@/components/ui/button" // Ensure this path is correct for your Button component
import '../globals.css'  // Ensure your global styles are imported here

export default function Page() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

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
                <NavLink href="/home">Home</NavLink>
                <NavLink href="/menu">Menu</NavLink>
                <NavLink href="/reservations">Reservations</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Content of your page */}
      </main>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  )
}
