"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { experiences } from "@/data/portfolio";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#A855F7]/8 rounded-full blur-[120px]" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#00E5FF]/60 mb-4 block">
            Career
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Work{" "}
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#7C3AED]/30 to-transparent md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[#7C3AED] border-2 border-[#050816] -translate-x-1.5 mt-8 z-10">
                <div className="absolute inset-0 rounded-full bg-[#7C3AED] animate-ping opacity-20" />
              </div>

              {/* Content card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div
                  className="glass-card p-6 hover:border-[#7C3AED]/20 transition-all duration-500 group"
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  {/* Duration badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-[#00E5FF]/60" />
                    <span className="text-xs text-[#00E5FF]/60 font-mono">{exp.duration}</span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-1">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase size={14} className="text-[#7C3AED]" />
                    <span className="text-sm text-[#7C3AED]">{exp.company}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/40 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/40 mt-1.5 shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Spacer for the other side on desktop */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
