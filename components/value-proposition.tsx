"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ValueProposition() {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLSpanElement
            const value = Number.parseInt(target.dataset.value || "0", 10)
            target.style.setProperty("--target-count", value.toString())
            target.classList.add("count-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    counterRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      counterRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of SuperTeacher</h2>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { value: 100, label: "Grade 100+ papers in minutes", suffix: "+" },
            { value: 99, label: "Accuracy with CBSE curriculum", suffix: "%" },
            { value: 100, label: "Instant & Personalised insights", suffix: "%" },
            { value: 80, label: "Save time on grading tasks", suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <span
                  ref={(el) => {
                    counterRefs.current[index] = el;
                  }}
                  data-value={stat.value}
                  className="text-5xl font-bold text-[#0085FB]"
                >
                  0
                </span>
                <span className="text-5xl font-bold text-[#0085FB]">{stat.suffix}</span>
              </div>
              <p className="text-xl font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-6">Trusted By Leading Schools</h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {["CBSE", "ICSE", "Delhi Public School", "Ryan International", "Kendriya Vidyalaya"].map((school, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16 w-40">
              <p className="font-semibold text-gray-600">{school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
