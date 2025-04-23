"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span>India's First </span>
              <span className="text-blue-500">AI-Powered</span>
              <span> Grading Platform for </span>
              <span className="text-blue-500">Teachers</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700">
              Say goodbye to long nights grading papers. SuperTeacher grades
              assignments with accuracy and provides detailed feedback in
              minutes, not hours.
            </p>
            <HoverBorderGradient
              containerClassName="w-auto"
              className="bg-[#0085FB] hover:bg-[#0075e0] font-bold text-lg px-8 py-6"
              onClick={() => window.open("#waitlist", "_self")}
            >
              Join the Waitlist
            </HoverBorderGradient>

            <div className="mt-8 p-4 bg-[#F7F7F7] rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">
                Trusted by 500+ schools & teachers across Delhi, Mumbai, and
                Bangalore
              </p>
            </div>
          </div>
              <div className="">
                <Image
                  src="/super.png"
                  alt="Handwritten answer example"
                  width={300}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
          </div>
        </div>
      </div>
    </section>
  );
}
