"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Pencil, FileText, CheckSquare } from "lucide-react"

export default function FinalCta() {
  return (
    <section className="py-20 relative overflow-hidden" id="try-free">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 opacity-10">
          <Pencil size={80} className="text-[#0085FB]" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <FileText size={100} className="text-[#0085FB]" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-10">
          <CheckSquare size={60} className="text-[#0085FB]" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0085FB] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join SUPERTEACHER — Try It Now</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Transform your grading process today. Join thousands of teachers saving hours every week.
          </p>
          <Button
            className="bg-white text-[#0085FB] hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full pulse"
            onClick={() => window.open("#waitlist", "_self")}
          >
            Get Early Access
          </Button>
          <p className="mt-6 text-sm opacity-90">Limited spots available. No credit card required.</p>
        </motion.div>
      </div>
    </section>
  )
}
