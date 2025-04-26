"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Settings, Cpu, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Step 1: Upload Assignments",
      description:
        "Upload scanned answer sheets or digital worksheets. Our AI recognizes handwriting in English, Hindi, and regional languages.",
      icon: <Upload size={48} className="text-black" />,
    },
    {
      title: "Step 2: Set Grading Criteria",
      description:
        "Choose from pre-set rubrics for your board or create custom ones. Adjust marking schemes as needed.",
      icon: <Settings size={48} className="text-black" />,
    },
    {
      title: "Step 3: AI Analysis & Grading",
      description:
        "Our AI evaluates work based on content accuracy, logic, language usage, and board-specific requirements.",
      icon: <Cpu size={48} className="text-black" />,
    },
    {
      title: "Step 4: Share Results",
      description:
        "Instantly share results with students and parents via email, WhatsApp, or your LMS.",
      icon: <Share2 size={48} className="text-black" />,
    },
  ];

  return (
    <section className="py-20 subtle-gradient" id="product">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Super Teacher Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four simple steps to transform your grading process
          </p>
          <div className="h-1 w-24 bg-black mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Flow chart visualization */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between relative z-10">
            {steps.map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-300",
                    activeStep === index
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {index + 1}
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps detail */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: activeStep === index ? 1.03 : 1,
              }}
              transition={{ duration: 0.5 }}
              className={cn(
                "relative bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-gray-100",
                activeStep === index ? "ring-2 ring-black" : ""
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                  activeStep === index ? "bg-black/10" : "bg-gray-50"
                )}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center bg-black text-white w-8 h-8 rounded-full text-sm">
                  {index + 1}
                </span>
                <span>{step.title}</span>
              </h3>
              <p className="text-gray-600">{step.description}</p>

              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-black/5 opacity-30 -z-10"></div>
              {activeStep === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent rounded-2xl -z-10"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
