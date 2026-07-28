export const personalInfo = {
  name: "Alex Morgan",
  title: "Full Stack Developer",
  tagline: "Crafting digital experiences that push boundaries",
  email: "hello@alexmorgan.dev",
  location: "San Francisco, CA",
  avatar: "/avatar-placeholder.jpg",
  yearsExperience: 7,
  projectsCompleted: 120,
  clientsServed: 45,
  technologiesUsed: 50,
};

export const typingTexts = [
  "Full Stack Developer",
  "Software Engineer",
  "UI/UX Enthusiast",
  "AI Explorer",
  "Problem Solver",
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Twitter/X", url: "https://x.com", icon: "twitter" },
  { name: "Email", url: "mailto:hello@alexmorgan.dev", icon: "email" },
];

export const focusAreas = [
  { title: "Frontend", description: "React, Next.js, TypeScript, Modern CSS", icon: "monitor" },
  { title: "Backend", description: "Node.js, Python, REST & GraphQL APIs", icon: "server" },
  { title: "Cloud", description: "AWS, Docker, Kubernetes, CI/CD", icon: "cloud" },
  { title: "AI / ML", description: "LLM integration, RAG pipelines, Agents", icon: "brain" },
  { title: "DevOps", description: "Infrastructure as Code, Monitoring", icon: "settings" },
];

export const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", proficiency: 95, years: 6 },
      { name: "Next.js", proficiency: 92, years: 4 },
      { name: "TypeScript", proficiency: 93, years: 5 },
      { name: "Tailwind CSS", proficiency: 90, years: 3 },
      { name: "Three.js", proficiency: 78, years: 3 },
      { name: "JavaScript", proficiency: 96, years: 7 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", proficiency: 92, years: 6 },
      { name: "Express", proficiency: 90, years: 5 },
      { name: "NestJS", proficiency: 82, years: 3 },
      { name: "Python", proficiency: 85, years: 4 },
      { name: "GraphQL", proficiency: 80, years: 3 },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "MongoDB", proficiency: 88, years: 5 },
      { name: "PostgreSQL", proficiency: 85, years: 4 },
      { name: "MySQL", proficiency: 80, years: 4 },
      { name: "Redis", proficiency: 75, years: 3 },
      { name: "Firebase", proficiency: 82, years: 3 },
    ],
  },
  {
    name: "Cloud",
    skills: [
      { name: "AWS", proficiency: 83, years: 4 },
      { name: "Docker", proficiency: 88, years: 4 },
      { name: "Kubernetes", proficiency: 72, years: 2 },
      { name: "Vercel", proficiency: 90, years: 3 },
      { name: "Terraform", proficiency: 70, years: 2 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", proficiency: 95, years: 7 },
      { name: "Figma", proficiency: 80, years: 4 },
      { name: "VS Code", proficiency: 92, years: 6 },
      { name: "Postman", proficiency: 85, years: 4 },
      { name: "Linux", proficiency: 82, years: 5 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "NebulaOS",
    description: "A cloud-native operating system interface built with real-time collaboration, AI-powered workflows, and a modular plugin architecture.",
    image: "https://picsum.photos/seed/nebula/800/500",
    techStack: ["Next.js", "TypeScript", "WebSocket", "AWS", "Docker"],
    category: "Full Stack",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "SynthWave AI",
    description: "An AI-powered music composition platform that generates unique soundscapes using neural networks and user mood analysis.",
    image: "https://picsum.photos/seed/synth/800/500",
    techStack: ["React", "Python", "TensorFlow", "FastAPI", "MongoDB"],
    category: "AI / ML",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "CryptoVault",
    description: "A decentralized finance dashboard with real-time portfolio tracking, DeFi yield optimization, and multi-chain support.",
    image: "https://picsum.photos/seed/crypto/800/500",
    techStack: ["Next.js", "Ethers.js", "The Graph", "Tailwind", "Node.js"],
    category: "Web3",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 4,
    title: "DataPulse",
    description: "Enterprise analytics platform processing millions of events per second with real-time dashboards and predictive insights.",
    image: "https://picsum.photos/seed/datapulse/800/500",
    techStack: ["React", "D3.js", "Node.js", "PostgreSQL", "Redis"],
    category: "Data",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 5,
    title: "EcoTrack",
    description: "Sustainability tracking platform helping companies measure, report, and reduce their carbon footprint with AI recommendations.",
    image: "https://picsum.photos/seed/ecotrack/800/500",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "GPT-4", "Vercel"],
    category: "SaaS",
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    id: 6,
    title: "PixelForge",
    description: "Real-time collaborative design tool with AI-assisted generation, version control for designs, and developer handoff.",
    image: "https://picsum.photos/seed/pixelforge/800/500",
    techStack: ["React", "Canvas API", "WebSocket", "S3", "Express"],
    category: "Design Tool",
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
];

export const experiences = [
  {
    company: "TechNova Labs",
    role: "Senior Full Stack Engineer",
    duration: "2023 – Present",
    description: "Leading the frontend architecture team, building scalable micro-frontend systems serving 2M+ users. Implemented AI-powered features that increased user engagement by 340%.",
    achievements: [
      "Architected micro-frontend platform serving 2M+ users",
      "Reduced page load times by 65% through optimization",
      "Led team of 8 engineers across 3 time zones",
    ],
  },
  {
    company: "Quantum Digital",
    role: "Full Stack Developer",
    duration: "2021 – 2023",
    description: "Built and maintained 12+ production applications using React, Node.js, and cloud-native architectures. Introduced AI/ML features across the product suite.",
    achievements: [
      "Shipped 12 production applications from concept to launch",
      "Built real-time collaboration system handling 10K concurrent users",
      "Implemented CI/CD pipelines reducing deployment time by 80%",
    ],
  },
  {
    company: "Skyline Software",
    role: "Frontend Developer",
    duration: "2019 – 2021",
    description: "Developed responsive, accessible web applications with a focus on performance and user experience. Led the migration from legacy jQuery to React.",
    achievements: [
      "Led migration from jQuery to React for 5 enterprise apps",
      "Achieved 98+ Lighthouse scores across all projects",
      "Built component library used by 30+ developers",
    ],
  },
  {
    company: "CodeCraft Studio",
    role: "Junior Developer",
    duration: "2018 – 2019",
    description: "Started career building WordPress sites and custom plugins, quickly transitioning to modern JavaScript frameworks and full-stack development.",
    achievements: [
      "Built 20+ client websites with custom themes",
      "Developed internal tooling reducing project setup time by 50%",
      "Promoted from intern to full-time within 6 months",
    ],
  },
];

export const services = [
  {
    title: "Full Stack Development",
    description: "End-to-end application development from database design to pixel-perfect interfaces. Scalable architectures that grow with your business.",
    icon: "code",
    features: ["React / Next.js", "Node.js / Python", "REST & GraphQL", "Database Design"],
  },
  {
    title: "Frontend Engineering",
    description: "High-performance, accessible interfaces with cinematic animations, responsive layouts, and exceptional user experiences.",
    icon: "layout",
    features: ["Component Architecture", "Animation Systems", "Performance Optimization", "Accessibility"],
  },
  {
    title: "Backend & APIs",
    description: "Robust, scalable backend systems with clean APIs. Microservices, real-time features, and enterprise-grade reliability.",
    icon: "server",
    features: ["API Design", "Microservices", "Real-time Systems", "Security"],
  },
  {
    title: "UI/UX Design",
    description: "User-centered design that balances aesthetics with functionality. From wireframes to high-fidelity prototypes.",
    icon: "palette",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    title: "AI Integration",
    description: "Leverage the power of AI with custom integrations. From LLM-powered features to intelligent automation.",
    icon: "sparkles",
    features: ["LLM Integration", "RAG Pipelines", "AI Agents", "Custom Models"],
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud-native infrastructure that scales. From containerization to CI/CD, monitoring to auto-scaling.",
    icon: "cloud",
    features: ["AWS / GCP", "Docker & K8s", "CI/CD Pipelines", "Monitoring"],
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    company: "TechNova Labs",
    role: "VP of Engineering",
    text: "Alex is one of the most talented engineers I've worked with. Their ability to translate complex requirements into elegant, performant solutions is remarkable. A true full-stack virtuoso.",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    company: "Quantum Digital",
    role: "Product Director",
    text: "Working with Alex transformed our product. They don't just write code - they understand the business, the users, and the vision. The results speak for themselves: 3x engagement.",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
  },
  {
    name: "Emily Watson",
    company: "Skyline Software",
    role: "CTO",
    text: "Alex brought a level of craft and attention to detail that elevated our entire team. Their component architecture became the gold standard. Absolutely world-class developer.",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    name: "David Park",
    company: "CodeCraft Studio",
    role: "Founder & CEO",
    text: "From day one, Alex showed exceptional talent and dedication. Their growth from junior to senior was the fastest I've seen in 15 years of running engineering teams.",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
  },
];

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
