"use client"

import { motion } from "framer-motion"
import { Clock, Users, AlertTriangle } from "lucide-react"

export default function ProblemSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Grading Crisis in Indian Education</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, millions of Indian educators face these challenges:
          </p>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <div className="flex justify-center mb-6">
              <Clock size={48} className="text-[#0085FB]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Time Drain</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Teachers spend 15-20 hours weekly on grading</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Tuition teachers grade till midnight</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Weekends lost to paper checking</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Less time for actual teaching and student interaction</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <div className="flex justify-center mb-6">
              <Users size={48} className="text-[#0085FB]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Scale Issues</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Average class size: 40-60 students</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Multiple subjects to grade</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Daily worksheets and assignments</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Monthly tests and assessments</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <div className="flex justify-center mb-6">
              <AlertTriangle size={48} className="text-[#0085FB]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Quality Concerns</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Fatigue leads to inconsistent grading</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Subjective bias affects fairness</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Limited feedback due to time constraints</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0085FB] mr-2">•</span>
                <span>Difficulty tracking student progress patterns</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
