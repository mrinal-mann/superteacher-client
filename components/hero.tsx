"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
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
            <Button
              className="gradient-button text-white font-bold text-lg px-8 py-6 rounded-full"
              onClick={() => window.open("#waitlist", "_self")}
            >
              Join the Waitlist
            </Button>

            <div className="mt-8 p-4 bg-[#F7F7F7] rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">
                Trusted by 500+ schools & teachers across Delhi, Mumbai, and
                Bangalore
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative bg-white rounded-xl shadow-2xl p-4 border border-gray-200"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Handwritten answer example"
                  width={300}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
                <p className="text-sm text-center mt-2 text-gray-600">
                  Student's handwritten answer
                </p>
              </div>

              <div className="bg-[#F7F7F7] rounded-lg p-4 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-1">AI Feedback</h3>
                  <div className="h-1 w-16 bg-[#0085FB] rounded-full"></div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <p className="font-semibold text-sm text-gray-600">
                      Score:
                    </p>
                    <p className="font-bold text-xl ai-typing">4/6</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-sm text-gray-600">
                      Feedback:
                    </p>
                    <div className="ai-typing text-sm">
                      Good explanation of the concept, but missing examples to
                      demonstrate understanding.
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-sm text-gray-600">
                      Improvements:
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Include practical examples</li>
                      <li>Expand on second point</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
