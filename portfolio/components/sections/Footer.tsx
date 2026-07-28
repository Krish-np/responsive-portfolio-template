"use client";

import { motion } from "framer-motion";
import { personalInfo, navItems, socialLinks } from "@/data/portfolio";
import { ArrowUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon, MailIcon } from "@/components/ui/SocialIcons";

const socialIcons: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  twitter: <XIcon size={18} />,
  email: <MailIcon size={18} />,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left - Logo & tagline */}
          <div>
            <a href="#hero" className="text-2xl font-bold font-[family-name:var(--font-heading)] inline-block mb-3">
              <span className="gradient-text">{personalInfo.name.split(" ")[0]}</span>
              <span className="text-white/60">.</span>
            </a>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              {personalInfo.tagline}. Available for freelance and full-time opportunities.
            </p>
          </div>

          {/* Center - Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/30 hover:text-white/70 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right - Social */}
          <div className="flex items-center gap-3 justify-end">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 transition-all duration-300"
                aria-label={link.name}
              >
                {socialIcons[link.icon]}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 flex items-center gap-1">
            © {new Date().getFullYear()} {personalInfo.name}. Made with{" "}
            <Heart size={12} className="text-[#7C3AED] inline" /> and lots of coffee.
          </p>
          <p className="text-xs text-white/20">
            Designed & Developed by {personalInfo.name}
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#7C3AED]/30 transition-all duration-300 backdrop-blur-sm z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
