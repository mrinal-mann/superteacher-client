"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Product", link: "#product" },
    { name: "Features", link: "#features" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <>
      {/* Regular navbar that's always visible */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="relative z-20 flex items-center">
            <div className="w-10 h-10 ">
              <Image src="/Logo.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-2xl font-bold text-black">
              Super<span className="text-black"> Teacher</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="text-gray-600 hover:text-black font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link href="#try-free">
            <HoverBorderGradient
              containerClassName="w-auto"
              className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-2"
            >
              Try Free
            </HoverBorderGradient>
          </Link>
        </div>
      </header>

      {/* Floating navbar that appears on scroll */}
      <FloatingNav navItems={[...navItems]} className="py-3" />
    </>
  );
}
