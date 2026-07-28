"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { services } from "@/data/portfolio";
import { Code, Layout, Server, Palette, Sparkles, Cloud } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code size={28} />,
  layout: <Layout size={28} />,
  server: <Server size={28} />,
  palette: <Palette size={28} />,
  sparkles: <Sparkles size={28} />,
  cloud: <Cloud size={28} />,
};

export default function Services() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#7C3AED]/6 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#00E5FF]/4 rounded-full blur-[120px]" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#00E5FF]/60 mb-4 block">
            What I Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Premium{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto">
            End-to-end solutions tailored to your vision. From concept to deployment and beyond.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass-card p-8 group hover:border-[#7C3AED]/20 transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/10 flex items-center justify-center text-[#7C3AED] group-hover:text-[#00E5FF] transition-all duration-500 mb-6 group-hover:scale-110">
                  {iconMap[service.icon]}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/50">
                      <span className="w-1 h-1 rounded-full bg-[#00E5FF]/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
