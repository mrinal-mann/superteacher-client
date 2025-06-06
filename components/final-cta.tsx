"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pencil, FileText, CheckSquare } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function FinalCta() {
  return (
    <section className="py-20 relative overflow-hidden" id="try-free">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 opacity-10">
          <Pencil size={80} className="text-black" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <FileText size={100} className="text-black" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-10">
          <CheckSquare size={60} className="text-black" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black rounded-2xl shadow-xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Super Teacher — Try It Now
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Transform your grading process today. Join thousands of teachers
            saving hours every week.
          </p>
          <HoverBorderGradient
            containerClassName="w-auto mx-auto"
            className="bg-[#0085fb] text-white hover:bg-blue-600 font-bold text-lg px-8 py-6 pulse"
            onClick={() => window.open("https://tally.so/r/w4ELKX", "_blank")}
          >
            Get Early Access
          </HoverBorderGradient>
          <p className="mt-6 text-sm opacity-90">
            Limited spots available. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
