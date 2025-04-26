"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Settings, Cpu, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <section className="py-12 subtle-gradient" id="product">
      <div className="container mx-auto px-1 md:px-4">
        <div className="text-center mb-8">
          <p className="text-base uppercase tracking-wide font-medium mb-2 text-[#0085fb]">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Four simple steps to transform your grading process
          </h2>
        </div>

        {/* Flowchart Images - Different for PC and Mobile */}
        <div className="w-full mx-auto">
          {/* Desktop Image - Hidden on mobile */}
          <div className="hidden md:block">
            <Image
              src="/Flowchart-pc.png"
              alt="Grading process flowchart"
              width={1600}
              height={800}
              className="w-full h-auto object-contain"
              priority
              style={{ maxHeight: "90vh" }}
            />
          </div>

          {/* Mobile Image - Hidden on desktop */}
          <div className="block md:hidden">
            <Image
              src="/mobile.png"
              alt="Grading process flowchart"
              width={600}
              height={1200}
              className="w-full h-auto object-contain"
              priority
              style={{ maxHeight: "95vh" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
