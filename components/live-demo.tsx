"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"

export default function LiveDemo() {
  const [isTyping, setIsTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const fullText =
    "This answer demonstrates a good understanding of the concept of photosynthesis. The student has correctly identified the main reactants and products. However, the explanation of the light-dependent reactions could be more detailed. The diagram is accurate but missing labels for the thylakoid membrane. Overall score: 7/10"

  useEffect(() => {
    if (isTyping) {
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setCurrentText(fullText.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => {
            setCurrentText("")
            setIsTyping(false)
          }, 3000)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [isTyping])

  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See SUPERTEACHER in Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how our AI instantly grades and provides feedback
          </p>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-[#0085FB] text-white p-4">
              <h3 className="text-xl font-bold">Live Grading Demo</h3>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-bold mb-2">Question:</h4>
                <p className="bg-gray-100 p-3 rounded-md">
                  Explain the process of photosynthesis and draw a simple diagram to illustrate it.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Student's Answer:</h4>
                <div className="bg-gray-100 p-3 rounded-md h-32 overflow-y-auto">
                  <p>
                    Photosynthesis is the process where plants make their own food using sunlight. The plant takes in
                    carbon dioxide and water and converts them into glucose and oxygen. This happens in the chloroplasts
                    which contain chlorophyll. The process has light-dependent reactions and light-independent
                    reactions. [Student's diagram showing basic photosynthesis process]
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">AI Feedback:</h4>
                <div className="bg-[#F7F7F7] p-4 rounded-md min-h-32 border border-gray-200">
                  {isTyping ? (
                    <p>
                      {currentText}
                      <span className="animate-pulse">|</span>
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Click "Grade Now" to see AI feedback</p>
                  )}
                </div>
              </div>

              <div className="text-center">
                <HoverBorderGradient
                  containerClassName="w-auto mx-auto"
                  className="bg-[#0085FB] text-white font-bold px-8 py-3"
                  onClick={() => setIsTyping(true)}
                  disabled={isTyping}
                  as={isTyping ? "div" : "button"}
                >
                  {isTyping ? "Grading..." : "Grade Now"}
                </HoverBorderGradient>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
