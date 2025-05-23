"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import HowItWorks from "@/components/how-it-works";
import LiveDemo from "@/components/live-demo";
import FeatureGrid from "@/components/feature-grid";
import FinalCta from "@/components/final-cta";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import StatsSection from "@/components/stats-section";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Animate sections on scroll
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure page starts at the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Header />
      <ThemeToggle />

      <section
        ref={(el) => {
          sectionsRef.current[0] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <Hero />
      </section>
      <section
        ref={(el) => {
          sectionsRef.current[3] = el;
          return undefined;
        }}
        className="fade-in-up"
        id="stats"
      >
        <StatsSection />
      </section>
      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
          return undefined;
        }}
        id="problem"
      >
        <ProblemSection />
      </section>
      <section
        ref={(el) => {
          sectionsRef.current[2] = el;
          return undefined;
        }}
        className="fade-in-up"
        id="solution"
      >
        <SolutionSection />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[4] = el;
          return undefined;
        }}
        className="fade-in-up"
        id="how-it-works"
      >
        <HowItWorks />
      </section>
      <section
        ref={(el) => {
          sectionsRef.current[5] = el;
          return undefined;
        }}
        className="fade-in-up"
        id="features"
      >
        <FeatureGrid />
      </section>

      {/* <section
        ref={(el) => {
          sectionsRef.current[6] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <LiveDemo />
      </section> */}

      <section
        ref={(el) => {
          sectionsRef.current[6] = el;
          return undefined;
        }}
        className="fade-in-up"
        id="contact"
      >
        <FinalCta />
      </section>

      <Footer />
    </main>
  );
}
