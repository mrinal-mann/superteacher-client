"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, Settings, Cpu, CheckCircle, Share2 } from "lucide-react"

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
    },
    {
      title: "Set Grading Criteria",
      description:
        "Choose from pre-set rubrics for your board or create custom ones. Adjust marking schemes as needed.",
      icon: <Settings size={48} className="text-[#0085FB]" />,
    },
    {
      title: "AI Analysis & Grading",
      description:
        "Our AI, trained on millions of Indian student answers, evaluates work based on content accuracy, logic, language usage, and board-specific requirements.",
      icon: <Cpu size={48} className="text-[#0085FB]" />,
    },
    {
      title: "Review & Finalize",
      description: "Review AI suggestions, make adjustments if needed, and approve grades with one click.",
      icon: <CheckCircle size={48} className="text-[#0085FB]" />,
    },
    {
      title: "Share Results",
      description: "Instantly share results with students and parents via email, WhatsApp, or your LMS.",
      icon: <Share2 size={48} className="text-[#0085FB]" />,
    },
  ]

  return (
    <section className="py-20" id="product">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SUPERTEACHER Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Five simple steps to transform your grading process</p>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: activeStep === index ? 1.05 : 1,
                boxShadow: activeStep === index ? "0 10px 25px rgba(0, 133, 251, 0.2)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.5 }}
              className={`bg-white rounded-xl p-6 text-center shadow-md transition-all duration-300 ${
                activeStep === index ? "border-2 border-[#0085FB]" : ""
              }`}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
              <div className="mt-4 flex justify-center">
                <div className="h-1 w-12 bg-[#0085FB] rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
