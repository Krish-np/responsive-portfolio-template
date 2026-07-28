"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { projects } from "@/data/portfolio";
import { ExternalLink, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="glass-card overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-90" : "opacity-40"}`} />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm text-white/70 border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Hover links */}
        <motion.div
          className="absolute bottom-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-[#7C3AED]/30 transition-all"
            aria-label="View source code"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00E5FF]/30 transition-all"
            aria-label="View live demo"
          >
            <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] group-hover:text-[#00E5FF] transition-colors duration-300">
            {project.title}
          </h3>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={20} className="text-white/30 group-hover:text-[#00E5FF] transition-colors" />
          </motion.div>
        </div>

        <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/50 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Animated border glow on hover */}
      <div className={`absolute inset-0 rounded-[1.5rem] border transition-all duration-500 pointer-events-none ${isHovered ? "border-[#7C3AED]/30 shadow-[0_0_30px_rgba(124,58,237,0.1)]" : "border-transparent"}`} />
    </motion.article>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView(0.05);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#00E5FF]/5 rounded-full blur-[120px]" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#00E5FF]/60 mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto">
            A selection of projects that showcase my expertise in building modern, scalable applications.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === cat
                  ? "bg-[#7C3AED]/20 text-white border border-[#7C3AED]/40"
                  : "text-white/40 hover:text-white/70 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
