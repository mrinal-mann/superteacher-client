"use client";

import { useState } from "react";
import { Zap, BookOpen, MessageSquare, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SolutionSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  const solutions = [
    {
      id: 1,
      title: "Lightning Fast Grading",
      content:
        "Upload assignments in bulk. AI grades all types: MCQs, short answers, essays. Results in minutes, not days. Works with handwritten answers.",
      icon: <Zap size={32} className="text-[#000000]" />,
    },
    {
      id: 2,
      title: "Indian Curriculum Expertise",
      content:
        "Aligned with CBSE, ICSE, and State Boards. Understands Indian English variations. Supports multiple regional languages. In alignment with NEP 2020.",
      icon: <BookOpen size={32} className="text-[#000000]" />,
    },
    {
      id: 3,
      title: "Detailed Feedback",
      content:
        "Personalized comments for each student. Identifies learning gaps. Suggests improvement areas. Tracks progress over time.",
      icon: <MessageSquare size={32} className="text-[#000000]" />,
    },
    {
      id: 4,
      title: "Teacher-Centric Design",
      content:
        "Simple interface, no tech skills needed. Customizable rubrics and criteria. Easy report generation. WhatsApp integration for parent updates.",
      icon: <Laptop size={32} className="text-[#000000]" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            How Super Teacher Solves These Problems
          </h2>
          <div className="h-1 w-24 bg-[#0085fb] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((card, index) => (
            <div
              key={card.id}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "rounded-lg relative bg-white shadow-sm overflow-hidden h-64 w-full transition-all duration-300 ease-out",
                hovered === index
                  ? "border-2 border-[#0085fb]"
                  : "border border-gray-200",
                hovered !== null &&
                  hovered !== index &&
                  "blur-sm scale-[0.98] opacity-80"
              )}
            >
              <div className="absolute inset-0 p-6 flex flex-col h-full">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-[#0085fb]/10">
                  {card.icon}
                </div>
                <h3
                  className={cn(
                    "text-xl md:text-2xl font-bold mb-2 transition-colors duration-300",
                    hovered === index ? "text-[#0085fb]" : "text-black"
                  )}
                >
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "text-sm md:text-base transition-opacity duration-300",
                    hovered === index
                      ? "text-black opacity-100"
                      : "text-gray-600"
                  )}
                >
                  {card.content}
                </p>
              </div>
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 bg-[#0085fb] transition-all duration-300",
                  hovered === index ? "opacity-100" : "opacity-0"
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
