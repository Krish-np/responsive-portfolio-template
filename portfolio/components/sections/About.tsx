"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { personalInfo, focusAreas } from "@/data/portfolio";
import { Monitor, Server, Cloud, Brain, Settings } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={24} />,
  server: <Server size={24} />,
  cloud: <Cloud size={24} />,
  brain: <Brain size={24} />,
  settings: <Settings size={24} />,
};

function CountUp({ end, suffix = "" }: { end: number; suffix: string }) {
  const { ref, isInView } = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: personalInfo.projectsCompleted, suffix: "+", label: "Projects Completed" },
  { value: personalInfo.yearsExperience, suffix: "+", label: "Years Experience" },
  { value: personalInfo.technologiesUsed, suffix: "+", label: "Technologies" },
  { value: personalInfo.clientsServed, suffix: "+", label: "Happy Clients" },
];

export default function About() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#7C3AED]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#00E5FF]/5 rounded-full blur-[100px]" />

      <div className="container-custom" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#00E5FF]/60 mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Crafting Digital{" "}
            <span className="gradient-text">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-white/60 leading-relaxed mb-6">
              I&apos;m a passionate Full Stack Developer with over {personalInfo.yearsExperience} years
              of experience building scalable, performant, and visually stunning web applications.
              I specialize in transforming complex ideas into elegant, user-centric digital products.
            </p>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              My approach combines technical excellence with creative problem-solving.
              I believe that great software isn&apos;t just functional — it&apos;s an experience.
              From crafting pixel-perfect interfaces to architecting robust backend systems,
              I bring a holistic perspective to every project.
            </p>

            {/* Focus Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  className="glass-card p-4 flex items-start gap-3 group hover:border-[#7C3AED]/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center text-[#7C3AED] group-hover:text-[#00E5FF] transition-colors shrink-0">
                    {iconMap[area.icon]}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-0.5">{area.title}</h4>
                    <p className="text-xs text-white/40">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card p-8 text-center group hover:border-[#7C3AED]/20 transition-all duration-500"
                whileHover={{ scale: 1.03, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] gradient-text">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <p className="text-sm text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
