"use client";

import { BookOpen, DollarSign, TrendingUp, Smartphone } from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      title: "Designed for Indian Educators",
      description:
        "Understands Indian exam patterns, recognizes regional languages, follows board marking schemes, and adapts to Indian teaching methods.",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      bgColor: "bg-[#0085fb]",
    },
    {
      title: "Time & Cost Savings",
      description:
        "Grade papers in 2 minutes, save ₹20,000+ monthly on grading costs, reduce grading time by 60%, and focus on teaching, not paperwork.",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      bgColor: "bg-black",
    },
    {
      title: "Better Student Outcomes",
      description:
        "Consistent, unbiased grading, detailed feedback for improvement, track progress systematically, and identify learning gaps early.",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bgColor: "bg-[#0085fb]",
    },
    {
      title: "Simple & Accessible",
      description:
        "Works on any device, no installation required, affordable pricing for all educators, with Hindi and English interface.",
      icon: <Smartphone className="h-6 w-6 text-white" />,
      bgColor: "bg-black",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-base uppercase tracking-wide font-medium mb-2 text-[#0085fb]">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Powerful AI tools to supercharge your assessment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 ${feature.bgColor} hover:shadow-lg transition-all duration-200 h-full flex flex-col`}
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/90 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
