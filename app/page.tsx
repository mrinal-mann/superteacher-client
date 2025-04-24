"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ValueProposition from "@/components/value-proposition";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import HowItWorks from "@/components/how-it-works";
import LiveDemo from "@/components/live-demo";
import FeatureGrid from "@/components/feature-grid";
import Testimonials from "@/components/testimonials";
import FinalCta from "@/components/final-cta";
import Footer from "@/components/footer";

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

  return (
    <main className="overflow-x-hidden">
      <Header />

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
          sectionsRef.current[1] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <ValueProposition />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[2] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <ProblemSection />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[3] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <SolutionSection />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[4] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <HowItWorks />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[5] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <LiveDemo />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[6] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <FeatureGrid />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[7] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <Testimonials />
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[8] = el;
          return undefined;
        }}
        className="fade-in-up"
      >
        <FinalCta />
      </section>

      <Footer />
    </main>
  );
}
