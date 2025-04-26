"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 space-y-6 lg:pr-10">
            {/* Optional badge like "Backed by Y Combinator" */}
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
              <span className="text-gray-600">For Teachers</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Say goodbye to long nights grading papers. Super Teacher grades
              assignments with accuracy and provides detailed feedback in
              minutes, not hours
            </p>

    

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#try-free">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 h-auto text-base font-medium rounded-md">
                  Talk to Founders
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 px-8 py-6 h-auto text-base font-medium rounded-md"
                >
                  Contact Us
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
            <div className="relativep-0.5">
              {/* Product screenshot */}
              <Image
                src="/super.png"
                alt="Super Teacher interface showing AI-powered grading"
                width={800}
                height={600}
                className="rounded-2xl"
                // If you don't have this exact image, you'll need to create a screenshot of your app
                // Fallback if image is not available
                onError={(e) => {
                  e.currentTarget.src = "/super.png"; // Fallback to existing image
                }}
              />

              {/* Optional grading annotation overlay */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
