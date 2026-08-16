import {
  Brain,
  Code2,
  GraduationCap,
  Microscope,
  Trophy,
  Users,
} from "lucide-react";

export const profile = {
  name: "Yuvaan Gulati",
  location: "Greater Boston",
  email: "yuvaangulati7689@gmail.com",
  github: "https://github.com/yuvaang13",
  website: "https://iamyuvaangulati.vercel.app/",
  headline:
    "Student developer building AI tools, robotics systems, and STEM learning projects.",
  shortIntro:
    "I am a student developer interested in AI, machine learning, applied math, robotics, and product engineering. I like turning ambitious ideas into working software, especially tools that help students learn faster and think more clearly.",
};

export const navItems = [
  { label: "~/", href: "/" },
  { label: "projects/", href: "/projects" },
  { label: "about_me", href: "/about" },
  { label: "experience", href: "/experience" },
  { label: "contact", href: "/contact" },
];

export const homeLinks = [
  { label: "GitHub", href: profile.github },
  { label: "Projects", href: "/projects" },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const projects = [
  {
    title: "Infinit AI",
    type: "AI STEM tutoring platform",
    status: "Built and submitted to MIT Solve",
    summary:
      "An AI-powered STEM tutoring platform for K-8 learners that answers math, science, engineering, and technology questions at the student's grade level.",
    details:
      "Infinit was developed across multiple versions, building toward stronger personalization, larger knowledge bases, Retrieval-Augmented Generation, and custom model tuning. The goal is to close the tutoring access gap by giving students a patient, always-available STEM helper.",
    tags: ["AI/ML", "RAG", "Education", "K-8 STEM"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/yuvaang13/Infinit-AI-an-AI-Powered-STEM-tutor-for-K-8-Students",
      },
    ],
  },
  {
    title: "ClearEye",
    type: "Computer vision health concept",
    status: "Submitted to the 3M Young Scientist Challenge",
    summary:
      "A phone-based concussion screening app concept that analyzes pupil response and micro eye movements in under 30 seconds.",
    details:
      "ClearEye is designed around a personalized model that compares an athlete to their own eye movement baseline rather than only to a general average. It aims to make concussion screening more accessible where specialized clinical equipment is not available.",
    tags: ["Computer Vision", "Healthcare", "Mobile ML", "Accessibility"],
  },
  {
    title: "MonkMode",
    type: "Open-source iOS productivity app",
    status: "Published on GitHub",
    summary:
      "An iOS-first focus app for deep work sessions, deliberate friction, Screen Time-based blocking, rituals, and accountability tracking.",
    details:
      "The project explores how software can protect attention instead of constantly competing for it. It focuses on commitment design, session structure, and practical accountability.",
    tags: ["iOS", "Productivity", "Swift", "Open Source"],
    links: [{ label: "GitHub", href: "https://github.com/yuvaang13" }],
  },
  {
    title: "Digit Recognition Models",
    type: "Machine learning experiments",
    status: "Built with scikit-learn and CNNs",
    summary:
      "A progression from logistic regression to convolutional neural networks for recognizing tiny digit images.",
    details:
      "The first model used logistic regression on 8x8 pixel digit data and reached 97.2% accuracy. A later CNN processed images as 2D grids, learning spatial patterns like edges and curves, and improved accuracy to 98.61%.",
    tags: ["Python", "scikit-learn", "CNN", "Matplotlib", "Pandas"],
  },
  {
    title: "Math Calculator",
    type: "Python passion project",
    status: "Built",
    summary:
      "A Python calculator project with over 100 functions for math practice and experimentation.",
    details:
      "This project started as a way to make math tooling more flexible while practicing Python fundamentals, function design, and problem decomposition.",
    tags: ["Python", "Math", "CLI", "Learning Tool"],
  },
  {
    title: "next-gen-reCAPTCHA",
    type: "Security and verification project",
    status: "In progress",
    summary:
      "A human verification concept for the AI era, exploring stronger ways to separate real users from automated systems.",
    details:
      "The project investigates how verification can evolve as AI agents become more capable, with attention to usability, trust, and modern web integration.",
    tags: ["Web Security", "AI", "Verification", "TypeScript"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/yuvaang13/next-gen-reCAPTCHA",
      },
    ],
  },
  {
    title: "Personal Website",
    type: "Portfolio system",
    status: "Live on Vercel",
    summary:
      "A portfolio site for projects, STEM work, competitions, and technical interests.",
    details:
      "Built with Next.js and deployed on Vercel, the site acts as a living record of technical growth and project work.",
    tags: ["Next.js", "Vercel", "Design", "Portfolio"],
    links: [{ label: "Live site", href: profile.website }],
  },
];

export const highlights = [
  {
    icon: Trophy,
    label: "Competitions",
    title: "Math, science, and engineering competitions",
    body: "3rd place at MATHCOUNTS Southern NH Chapter 2026, top 12 at chapter, 20th at the NH state competition, AMC 8 score of 14/25, AMC 10 competitor, MOEMS competitor, Science Bowl competitor, and NHSEE 2026 first place in Computer Science and Math for Infinit.",
  },
  {
    icon: Brain,
    label: "AI & ML",
    title: "Applied AI experiments and education tools",
    body: "Built Infinit AI, explored RAG, APIs, fine-tuning, logistic regression, CNNs, pandas, Matplotlib, Kaggle workflows, Ollama, and modern AI coding tools.",
  },
  {
    icon: Code2,
    label: "Software",
    title: "Practical software across web, iOS, and Python",
    body: "Experience with Python, Java, Vite, Electron, Next.js, Vercel, GitHub, macOS, Windows, Cursor, GitHub Copilot, Codex, Claude Code, Windsurf, and Warp.",
  },
  {
    icon: Users,
    label: "Teaching",
    title: "STEM mentoring and volunteer teaching",
    body: "Volunteer math and science teaching through NorthSouth Foundation, pre-MATHCOUNTS instruction for 5th graders, and middle school math tutoring at SCA.",
  },
  {
    icon: Microscope,
    label: "Research",
    title: "Science, health, and engineering curiosity",
    body: "Interested in computer vision for healthcare, personalized AI learning, hardware-software optimization, hydroponics, and scientific problem solving.",
  },
  {
    icon: GraduationCap,
    label: "Learning",
    title: "Coursework and long-term direction",
    body: "Completed OpenAI and Anthropic AI courses, took the 2026 MIT PRIMES STEP entrance quiz, and is interested in a CS and electrical engineering path with AI/ML specialization.",
  },
];

export const timeline = [
  {
    year: "2026",
    title: "Building Infinit AI",
    body: "Built an AI-powered STEM tutoring platform for K-8 students, using grade-level explanations and a roadmap toward larger knowledge bases, RAG, and custom model tuning.",
  },
  {
    year: "2026",
    title: "Building next-gen-reCAPTCHA",
    body: "Working on a human verification project for the AI era, focused on better ways to separate real users from automated systems as AI agents become more capable.",
  },
  {
    year: "2026",
    title: "Open-source iOS productivity work",
    body: "Built MonkMode, an iOS-first focus app that uses deep work sessions, Screen Time blocking, commitment rituals, and accountability tracking.",
  },
  {
    year: "2026",
    title: "NHSEE first place with Infinit",
    body: "Placed first in the Computer Science and Math category while presenting Infinit as an applied AI education project.",
  },
  {
    year: "2026",
    title: "MATHCOUNTS state competitor",
    body: "Placed 3rd at the Southern NH Chapter competition, reached the state competition, and placed 20th statewide.",
  },
  {
    year: "2026",
    title: "FTC Team Tesseract",
    body: "Joined FTC Team 21689 as lead programmer, outreach/fundraising/social media specialist, graphic designer/video editor, and builder/hardware contributor.",
  },
];

export const skills = [
  "Python",
  "Java",
  "Next.js",
  "Vite",
  "Electron",
  "Vercel",
  "GitHub",
  "Pandas",
  "Matplotlib",
  "scikit-learn",
  "CNNs",
  "RAG",
  "APIs",
  "Fine-tuning",
  "Ollama",
  "Kaggle",
  "Cursor",
  "GitHub Copilot",
  "Codex",
  "Claude Code",
  "Windsurf",
  "Warp",
];

export const educationInterests = [
  "Computer science and electrical engineering",
  "Artificial intelligence and machine learning",
  "Computer vision in healthcare",
  "Personalized AI tutoring systems",
  "Robotics and hardware-software optimization",
  "Competitive mathematics",
];
