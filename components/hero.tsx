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
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 space-y-6 lg:pr-10">
            {/* Optional badge */}
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="text-gray-600">Powered by</span>
              <div className="bg-black text-white px-2 py-0.5 rounded">AI</div>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-black">India's First AI-Powered</span>
              <br />
              <span className="text-black">Grading Platform</span>
              <br />
              <span className="text-[#0085fb]">For Teachers</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Say goodbye to long nights grading papers. Super Teacher grades
              assignments with accuracy and provides detailed feedback in
              minutes, not hours
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="https://tally.so/r/w4ELKX">
                <Button className="bg-[#0085fb] hover:bg-blue-600 text-white px-8 py-6 h-auto text-base font-medium rounded-md">
                  Talk to Founders
                </Button>
              </Link>
              <Link href="https://tally.so/r/w4ELKX">
                <Button
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 px-8 py-6 h-auto text-base font-medium rounded-md"
                >
                  Get Early Access
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Product screenshot */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Blue accent element */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0085fb]/10 rounded-full blur-3xl z-0"></div>

              {/* Product screenshot */}
              <Image
                src="/super.png"
                alt="Super Teacher interface showing AI-powered grading"
                width={800}
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
