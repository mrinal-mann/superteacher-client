"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-12 md:py-20 overflow-hidden relative">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* For mobile: Display image first, then text content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Product screenshot - First on mobile */}
          <motion.div
            className="w-full lg:w-1/2 relative block lg:hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Blue accent element */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0085fb]/10 rounded-full blur-3xl z-0"></div>

              {/* Product screenshot */}
              <Image
                src="/Superb.png"
                alt="Super Teacher interface showing AI-powered grading"
                width={600}
                height={600}
                className="rounded-2xl relative z-10 mx-auto"
                onError={(e) => {
                  e.currentTarget.src = "/super.png"; // Fallback to existing image
                }}
              />
            </div>
          </motion.div>

          {/* Left side - Text content */}
          <div className="lg:w-1/2 space-y-6 lg:pr-10 text-left">
            {/* Optional badge */}
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="text-gray-600">Powered by</span>
              <div className="bg-black text-white px-2 py-0.5 rounded">AI</div>
            </div>

            {/* Main headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-black inline-block">
                India's First AI-Powered
              </span>
              <br className="md:hidden" />
              <span className="text-black inline-block">Grading Platform</span>
              <br />
              <span className="text-[#0085fb]">For Teachers</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Say goodbye to long nights grading papers. Super Teacher grades
              assignments with accuracy and provides detailed feedback in
              minutes, not hours
            </p>

            {/* CTA buttons - Side by side */}
            <div className="flex flex-row gap-4 pt-4">
              <Link href="https://tally.so/r/w4ELKX">
                <Button className="bg-[#0085fb] hover:bg-blue-600 text-white px-4 py-4 h-auto text-base font-medium rounded-full">
                  Talk to Founders
                </Button>
              </Link>
              <Link href="https://tally.so/r/w4ELKX">
                <Button
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 px-4 py-4 h-auto text-base font-medium rounded-full"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Product screenshot - Only visible on desktop */}
          <motion.div
            className="lg:w-1/2 relative hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Blue accent element */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0085fb]/10 rounded-full blur-3xl z-0"></div>

              {/* Product screenshot */}
              <Image
                src="/Superb.png"
                alt="Super Teacher interface showing AI-powered grading"
                width={600}
                height={600}
                className="rounded-2xl relative z-10"
                onError={(e) => {
                  e.currentTarget.src = "/super.png"; // Fallback to existing image
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
