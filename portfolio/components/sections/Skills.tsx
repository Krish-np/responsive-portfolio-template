"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import dynamic from "next/dynamic";

const SkillSphere = dynamic(() => import("@/components/three/SkillSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="text-white/20 text-sm">Loading 3D Skills...</div>
    </div>
  ),
});

export default function Skills() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-[150px]" />

      <div className="container-custom" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#00E5FF]/60 mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Technical{" "}
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto">
            A constellation of technologies I&apos;ve mastered over the years. Hover to explore proficiency and experience.
          </p>
        </motion.div>

        {/* 3D Skill Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <SkillSphere />
        </motion.div>
      </div>
    </section>
  );
}
