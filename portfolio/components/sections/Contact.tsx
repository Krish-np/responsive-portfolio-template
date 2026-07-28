"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/SocialIcons";
import { personalInfo } from "@/data/portfolio";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { ref, isInView } = useInView(0.1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/6 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00E5FF]/4 rounded-full blur-[120px]" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#00E5FF]/60 mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto">
            Have a project in mind? Let&apos;s create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">
                Let&apos;s build something{" "}
                <span className="gradient-text">amazing</span>
              </h3>
              <p className="text-white/40 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                { icon: <Mail size={20} />, label: "Email", value: personalInfo.email },
                { icon: <MapPin size={20} />, label: "Location", value: personalInfo.location },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/10 flex items-center justify-center text-[#7C3AED]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-white/70">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-4">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Follow Me</p>
              <div className="flex gap-3">
                {[
                  { icon: <GithubIcon size={20} />, label: "GitHub", url: "https://github.com" },
                  { icon: <LinkedinIcon size={20} />, label: "LinkedIn", url: "https://linkedin.com" },
                  { icon: <XIcon size={20} />, label: "Twitter", url: "https://x.com" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 transition-all duration-300"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
                    placeholder="you@email.com"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
                  placeholder="Project inquiry"
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", { required: "Message is required", minLength: { value: 20, message: "At least 20 characters" } })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED]/30 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn-primary w-full !py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={18} className="relative z-10" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={18} className="relative z-10" />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
