"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Science Teacher, Delhi Public School",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "SUPERTEACHER has revolutionized how I grade lab reports. What used to take me hours now takes minutes, and the feedback is incredibly detailed.",
      stars: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Math Teacher, Ryan International",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The AI understands mathematical solutions better than any tool I've used. It catches mistakes I might miss and provides constructive feedback.",
      stars: 5,
    },
    {
      name: "Ananya Patel",
      role: "English Teacher, Kendriya Vidyalaya",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Grading essays used to be my most time-consuming task. SUPERTEACHER helps me provide consistent, quality feedback to all my students.",
      stars: 4,
    },
    {
      name: "Vikram Singh",
      role: "Principal, Modern School",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Implementing SUPERTEACHER across our school has improved teacher satisfaction and student performance. The data insights are invaluable.",
      stars: 5,
    },
    {
      name: "Meera Reddy",
      role: "History Teacher, Army Public School",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The platform understands context in historical essays remarkably well. It's like having a teaching assistant available 24/7.",
      stars: 4,
    },
  ]

  const visibleTestimonials = () => {
    const result = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      result.push(testimonials[index])
    }
    return result
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <section className="py-20 bg-[#F7F7F7]" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Teachers Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of satisfied educators across India</p>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {visibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 flex-1"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-[#0085FB]" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-[#0085FB]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
