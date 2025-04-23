"use client"

import { Star } from "lucide-react"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export default function Testimonials() {
  const testimonials = [
    {
      id: "t1",
      name: "Priya Sharma",
      title: "Science Teacher, Delhi Public School",
      quote:
        "SuperTeacher has revolutionized how I grade lab reports. What used to take me hours now takes minutes, and the feedback is incredibly detailed.",
      stars: 5,
    },
    {
      id: "t2",
      name: "Rajesh Kumar",
      title: "Math Teacher, Ryan International",
      quote:
        "The AI understands mathematical solutions better than any tool I've used. It catches mistakes I might miss and provides constructive feedback.",
      stars: 5,
    },
    {
      id: "t3",
      name: "Ananya Patel",
      title: "English Teacher, Kendriya Vidyalaya",
      quote:
        "Grading essays used to be my most time-consuming task. SuperTeacher helps me provide consistent, quality feedback to all my students.",
      stars: 4,
    },
    {
      id: "t4",
      name: "Vikram Singh",
      title: "Principal, Modern School",
      quote:
        "Implementing SuperTeacher across our school has improved teacher satisfaction and student performance. The data insights are invaluable.",
      stars: 5,
    },
    {
      id: "t5",
      name: "Meera Reddy",
      title: "History Teacher, Army Public School",
      quote:
        "The platform understands context in historical essays remarkably well. It's like having a teaching assistant available 24/7.",
      stars: 4,
    },
  ]

  // Add more items to ensure good scrolling
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials.map(t => ({ ...t, id: `${t.id}-copy` })) // duplicate with unique IDs
  ]

  return (
    <section className="py-20 bg-[#F7F7F7]" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Teachers Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of satisfied educators across India</p>
          <div className="h-1 w-24 bg-[#0085FB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Moving testimonials */}
          <InfiniteMovingCards 
            items={extendedTestimonials.map(testimonial => ({
              id: testimonial.id,
              name: testimonial.name,
              title: testimonial.title,
              quote: `"${testimonial.quote}" ${Array(testimonial.stars)
                .fill("★")
                .join("")}`
            }))}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
          
          {/* Second set moving in opposite direction */}
          <InfiniteMovingCards 
            className="mt-8"
            items={[...extendedTestimonials].reverse().map(testimonial => ({
              id: `rev-${testimonial.id}`,
              name: testimonial.name,
              title: testimonial.title,
              quote: `"${testimonial.quote}" ${Array(testimonial.stars)
                .fill("★")
                .join("")}`
            }))}
            direction="right"
            speed="normal"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  )
}
