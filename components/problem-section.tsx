"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, AlertTriangle, BookX } from "lucide-react";

export default function ProblemSection() {
  const [headingRef, headingInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const problems = [
    {
      title: "Overwhelming Workload",
      description:
        "Teachers spend 15-20 hours weekly grading assignments, with countless weekly tests and assessments. Many educators work late into the night and sacrifice weekends just to keep up.",
      icon: <Clock className="h-12 w-12 text-[#000000]" />,
    },
    {
      title: "Feedback Limitations",
      description:
        "With 40-60 students per class across multiple subjects, teachers struggle to provide personalized, in-depth feedback. Time constraints lead to inconsistent evaluation.",
      icon: <AlertTriangle className="h-12 w-12 text-[#020303]" />,
    },
    {
      title: "Less Time For Teaching",
      description:
        "The heavy grading burden means less time for quality teaching and meaningful student interaction. This affects the overall education quality and teacher satisfaction.",
      icon: <BookX className="h-12 w-12 text-[#000000]" />,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute -left-64 top-20 w-96 h-96 rounded-full bg-[#0085fb]"
        style={{ filter: "blur(80px)" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute -right-64 bottom-20 w-96 h-96 rounded-full bg-[#0085fb]"
        style={{ filter: "blur(80px)" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Grading Crisis in Indian Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, millions of Indian educators face overwhelming challenges
          </p>
          <div className="h-1 w-24 bg-[#0085fb] mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 25px rgba(0, 133, 251, 0.1)",
              }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-8 border border-[#0085fb]/10 transform transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 p-4 bg-[#0085fb]/5 rounded-full">
                  {problem.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {problem.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
