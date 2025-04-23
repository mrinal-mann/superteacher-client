"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  scrollY: number
}

export default function Header({ scrollY }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    setIsSticky(scrollY > 50)
  }, [scrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#0085FB]">
              SUPER<span className="text-black">TEACHER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#product" className="font-medium hover:text-[#0085FB] transition-colors">
              Product
            </Link>
            <Link href="#pricing" className="font-medium hover:text-[#0085FB] transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="font-medium hover:text-[#0085FB] transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="font-medium hover:text-[#0085FB] transition-colors">
              Contact
            </Link>
          </nav>

          <Button
            className="hidden md:flex gradient-button text-white font-medium px-6 py-2 rounded-full"
            onClick={() => window.open("#start-grading", "_self")}
          >
            Start Grading
          </Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link
              href="#product"
              className="font-medium hover:text-[#0085FB] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Product
            </Link>
            <Link
              href="#pricing"
              className="font-medium hover:text-[#0085FB] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="font-medium hover:text-[#0085FB] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="font-medium hover:text-[#0085FB] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              className="gradient-button text-white font-medium px-6 py-2 rounded-full w-full"
              onClick={() => {
                window.open("#start-grading", "_self")
                setMobileMenuOpen(false)
              }}
            >
              Start Grading
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
