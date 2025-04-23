"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, Settings, Cpu, CheckCircle, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      title: "Upload Assignments",
      description:
        "Upload scanned answer sheets or digital worksheets. Our AI recognizes handwriting in English, Hindi, and regional languages.",
      icon: <Upload size={48} className="text-[#0085FB]" />,
      className: "md:col-span-2 md:row-span-1",
    },
    {
      title: "Set Grading Criteria",
      description:
        "Choose from pre-set rubrics for your board or create custom ones. Adjust marking schemes as needed.",
      icon: <Settings size={48} className="text-[#0085FB]" />,
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "AI Analysis & Grading",
      description:
        "Our AI, trained on millions of Indian student answers, evaluates work based on content accuracy, logic, language usage, and board-specific requirements.",
      icon: <Cpu size={48} className="text-[#0085FB]" />,
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Review & Finalize",
      description: "Review AI suggestions, make adjustments if needed, and approve grades with one click.",
      icon: <CheckCircle size={48} className="text-[#0085FB]" />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Share Results",
      description: "Instantly share results with students and parents via email, WhatsApp, or your LMS.",
      icon: <Share2 size={48} className="text-[#0085FB]" />,
      className: "md:col-span-2 md:row-span-1",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="product">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SuperTeacher Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Five simple steps to transform your grading process</p>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
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
                activeStep === index ? "ring-2 ring-[#0085FB]" : "",
                step.className
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                activeStep === index ? "bg-blue-50" : "bg-gray-50"
              )}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center bg-[#0085FB] text-white w-8 h-8 rounded-full text-sm">
                  {index + 1}
                </span>
                <span>{step.title}</span>
              </h3>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-blue-50 opacity-30 -z-10"></div>
              {activeStep === index && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-transparent rounded-2xl -z-10"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}