"use client";

import { motion } from "framer-motion";
import { Zap, BookOpen, MessageSquare, Laptop } from "lucide-react";
import { NeonCard } from "./ui/neon-card";

export default function SolutionSection() {
  const solutions = [
    {
      id: 1,
      title: "Lightning Fast Grading",
      content:
        "Upload assignments in bulk. AI grades all types: MCQs, short answers, essays. Results in minutes, not days. Works with handwritten answers.",
      icon: <Zap size={32} className="text-[#0085fb]" />,
      gradientColors: ["#0085fb", "#33a0ff", "#0085fb"],
      titleColor: "from-[#0085fb] to-[#33a0ff]",
      glowIntensity: 0.4,
    },
    {
      id: 2,
      title: "Indian Curriculum Expertise",
      content:
        "Aligned with CBSE, ICSE, and State Boards. Understands Indian English variations. Supports multiple regional languages. In alignment with NEP 2020.",
      icon: <BookOpen size={32} className="text-[#0085fb]" />,
      gradientColors: ["#0085fb", "white", "#0085fb"],
      titleColor: "from-[#0085fb] to-[#33a0ff]",
      glowIntensity: 0.5,
    },
    {
      id: 3,
      title: "Detailed Feedback",
      content:
        "Personalized comments for each student. Identifies learning gaps. Suggests improvement areas. Tracks progress over time.",
      icon: <MessageSquare size={32} className="text-[#0085fb]" />,
      gradientColors: ["#000000", "#0085fb", "#000000"],
      titleColor: "from-[#0085fb] to-[#33a0ff]",
      glowIntensity: 0.5,
    },
    {
      id: 4,
      title: "Teacher-Centric Design",
      content:
        "Simple interface, no tech skills needed. Customizable rubrics and criteria. Easy report generation. WhatsApp integration for parent updates.",
      icon: <Laptop size={32} className="text-[#0085fb]" />,
      gradientColors: ["white", "#0085fb", "white"],
      titleColor: "from-[#0085fb] to-[#33a0ff]",
      glowIntensity: 0.5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Super Teacher Solves These Problems
          </h2>
          <div className="h-1 w-24 bg-[#0085fb] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <NeonCard
              key={solution.id}
              gradientColors={solution.gradientColors}
              glowIntensity={solution.glowIntensity}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-16 h-16 bg-[#0085fb]/10 rounded-full flex items-center justify-center mb-2">
                  {solution.icon}
                </div>
                <span
                  className={`bg-gradient-to-r ${solution.titleColor} bg-clip-text text-2xl font-bold text-transparent drop-shadow-lg`}
                >
                  {solution.title}
                </span>
                <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300/90">
                  {solution.content}
                </p>
              </div>
            </NeonCard>
          ))}
        </div>
      </div>
    </section>
  );
}
