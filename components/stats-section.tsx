"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  from: number;
  to: number;
  duration: number;
  delay?: number;
}

const Counter = ({ from, to, duration, delay = 0 }: CounterProps) => {
  const [count, setCount] = useState(from);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.floor(from + progress * (to - from)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    const startAnimation = () => {
      animationFrame = requestAnimationFrame(updateCount);
    };

    const animationTimeout = setTimeout(startAnimation, delay);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(animationTimeout);
    };
  }, [from, to, duration, delay, inView]);

  return <span ref={ref}>{count}</span>;
};

export default function StatsSection() {
  const stats = [
    {
      value: 100,
      suffix: "+",
      label: "Papers in minutes",
      description: "Grade large batches of papers quickly",
    },
    {
      value: 99,
      suffix: "%",
      label: "Marking accuracy",
      description: "With CBSE curriculum",
    },
    {
      value: 60,
      suffix: "%",
      label: "Save time",
      description: "On grading tasks",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 md:p-10 border border-[#0085fb]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <h2 className="text-6xl md:text-7xl font-bold text-[#000000] flex items-center">
                  <Counter
                    from={0}
                    to={stat.value}
                    duration={2000}
                    delay={index * 200}
                  />
                  <span>{stat.suffix}</span>
                </h2>
                <p className="text-xl md:text-2xl font-semibold mt-2 text-gray-800">
                  {stat.label}
                </p>
                <p className="text-gray-600 mt-1">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}