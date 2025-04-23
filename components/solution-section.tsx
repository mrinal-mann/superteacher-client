"use client"

import { motion } from "framer-motion"
import { Zap, BookOpen, MessageSquare, Laptop } from "lucide-react"

export default function SolutionSection() {
  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Superteacher Solves These Problems</h2>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#0085FB]/10 rounded-full flex items-center justify-center">
                <Zap size={32} className="text-[#0085FB]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast Grading</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Upload assignments in bulk</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>AI grades all types: MCQs, short answers, essays</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Results in minutes, not days</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Works with handwritten answers</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#0085FB]/10 rounded-full flex items-center justify-center">
                <BookOpen size={32} className="text-[#0085FB]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Indian Curriculum Expertise</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Aligned with CBSE, ICSE, and State Boards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Understands Indian English variations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Supports multiple regional languages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Recognizes common student mistakes</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#0085FB]/10 rounded-full flex items-center justify-center">
                <MessageSquare size={32} className="text-[#0085FB]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Detailed Feedback</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Personalized comments for each student</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Identifies learning gaps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Suggests improvement areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Tracks progress over time</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#0085FB]/10 rounded-full flex items-center justify-center">
                <Laptop size={32} className="text-[#0085FB]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Teacher-Centric Design</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Simple interface, no tech skills needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Customizable rubrics and criteria</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>Easy report generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0085FB] mr-2">•</span>
                  <span>WhatsApp integration for parent updates</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
