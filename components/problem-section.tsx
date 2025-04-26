"use client";

import { motion } from "framer-motion";

export default function ProblemSection() {
  return (
    <section className="py-20 subtle-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Grading Crisis in Indian Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, millions of Indian educators face overwhelming challenges
          </p>
          <div className="h-1 w-24 bg-black mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Overwhelming Workload
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Teachers spend 15-20 hours weekly grading assignments, with
              countless weekly tests and assessments. Many educators work late
              into the night and sacrifice weekends just to keep up, leaving
              less time for quality teaching and meaningful student interaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Feedback Limitations
            </h3>
            <p className="text-gray-700 leading-relaxed">
              With 40-60 students per class across multiple subjects, teachers
              struggle to provide personalized, in-depth feedback. Time
              constraints lead to inconsistent evaluation, potential grading
              bias, and difficulty in tracking individual student progress and
              learning gaps.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
