"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Product", link: "#product" },
    { name: "Pricing", link: "#pricing" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <Navbar>
      <NavBody>
        {/* Logo */}
        <Link href="/" className="relative z-20 flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2">
            ST
          </div>
          <span className="text-2xl font-bold text-[#0085FB]">
            SUPER<span className="text-black">TEACHER</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavItems items={navItems} />

        {/* Desktop CTA Button */}
        <div className="relative z-20">
          <Button
            className="gradient-button text-white font-medium px-6 py-2 rounded-full"
            onClick={() => window.open("#start-grading", "_self")}
          >
            Start Grading
          </Button>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2">
              ST
            </div>
            <span className="text-xl font-bold text-[#0085FB]">
              SUPER<span className="text-black">TEACHER</span>
            </span>
          </Link>
          <MobileNavToggle
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="w-full px-4 py-2 text-lg font-medium text-gray-600 hover:text-[#0085FB] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button
            className="w-full gradient-button text-white font-medium px-6 py-2 rounded-full mt-4"
            onClick={() => {
              window.open("#start-grading", "_self");
              setMobileMenuOpen(false);
            }}
          >
            Start Grading
          </Button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
