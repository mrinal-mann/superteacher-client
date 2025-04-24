"use client"

import { motion } from "framer-motion"
import { BookOpen, DollarSign, TrendingUp, Smartphone } from "lucide-react"

export default function FeatureGrid() {
  const features = [
    {
      title: "Built for Indian Education",
      description:
        "Understands Indian exam patterns, recognizes regional language influences, follows board marking schemes, and adapts to Indian teaching methods.",
      icon: <BookOpen className="h-10 w-10 text-[#0085FB]" />,
    },
    {
      title: "Time & Cost Savings",
      description:
        "Grade 100 papers in 10 minutes, save ₹20,000+ monthly on grading costs, reduce grading time by 80%, and focus on teaching, not paperwork.",
      icon: <DollarSign className="h-10 w-10 text-[#0085FB]" />,
    },
    {
      title: "Better Student Outcomes",
      description:
        "Consistent, unbiased grading, detailed feedback for improvement, track progress systematically, and identify learning gaps early.",
      icon: <TrendingUp className="h-10 w-10 text-[#0085FB]" />,
    },
    {
      title: "Simple & Accessible",
      description:
        "Works on any device, no installation required, affordable pricing for all educators, with Hindi and English interface.",
      icon: <Smartphone className="h-10 w-10 text-[#0085FB]" />,
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Super Teacher</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Designed specifically for Indian educators</p>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-card bg-white rounded-xl shadow-md p-6 text-center h-full"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
