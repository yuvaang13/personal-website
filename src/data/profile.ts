export interface Profile {
  name: string;
  location: string;
  email: string;
  github: string;
  website: string;
  headline: string;
  shortIntro: string;
  extendedIntro: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HomeLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  type: string;
  status: string;
  summary: string;
  details: string;
  tags: string[];
  links?: Array<{
    label: string;
    href: string;
  }>;
  image?: string;
  featured?: boolean;
  impactOrder: number;
}

export interface Highlight {
  icon: string;
  label: string;
  title: string;
  body: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Role {
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  category?: string;
}

export interface EducationInterest {
  title: string;
  description: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
  description: string;
}

export interface ContactNote {
  title: string;
  body: string;
}

export const profile: Profile = {
  name: 'Yuvaan Gulati',
  location: 'Nashua, New Hampshire',
  email: 'yuvaangulati7689@gmail.com',
  github: 'https://github.com/yuvaang13',
  website: 'https://iamyuvaangulati.vercel.app/',
  headline: 'Student developer building AI tools, robotics systems, and STEM learning projects.',
  shortIntro: 'I am a student developer interested in AI, machine learning, applied math, robotics, and product engineering. I like turning ambitious ideas into working software, especially tools that help students learn faster and think more clearly.',
  extendedIntro: `I'm a high school student from Southern New Hampshire deeply passionate about the intersection of AI, mathematics, and robotics. My journey started with competitive mathematics — MATHCOUNTS, AMC 8/10, MOEMS — which taught me rigorous problem-solving and the beauty of abstract thinking. That foundation led me to computer science, where I discovered I could build things that make a tangible difference.

Currently, I'm the lead programmer on FTC Team 21689 (Team Tesseract), where I handle everything from autonomous path planning and computer vision to outreach, fundraising, and graphic design. I've built Infinit AI, a K-8 STEM tutoring platform that uses RAG and grade-level personalization to make quality tutoring accessible — it won 1st place at NHSEE 2026 in Computer Science & Math and was submitted to MIT Solve.

I'm also exploring computer vision for healthcare through ClearEye, a concept for phone-based concussion screening that analyzes pupil response against personalized baselines. It was submitted to the 3M Young Scientist Challenge.

Beyond competitions, I care deeply about STEM education access. I volunteer teaching math and science through NorthSouth Foundation and tutor middle school students at SCA. I've completed OpenAI and Anthropic AI courses, took the MIT PRIMES STEP entrance quiz, and am aiming for a CS + Electrical Engineering path with AI/ML specialization.

When I'm not coding, you'll find me experimenting with ML models (logistic regression to CNNs), building productivity tools like MonkMode (an iOS focus app), or diving into the math behind machine learning — because understanding the "why" matters as much as the "how."`,
};

export const navItems: NavItem[] = [
  { label: '~/', href: '/' },
  { label: 'projects/', href: '/projects' },
  { label: 'about_me', href: '/about' },
  { label: 'experience', href: '/experience' },
  { label: 'contact', href: '/contact' },
];

export const homeLinks: HomeLink[] = [
  { label: 'GitHub', href: 'https://github.com/yuvaang13' },
  { label: 'Projects', href: '/projects' },
  { label: 'Email', href: 'mailto:yuvaangulati7689@gmail.com' },
];

export const projects: Project[] = [
  {
    title: 'Infinit AI',
    type: 'AI STEM tutoring platform',
    status: 'Built and submitted to MIT Solve',
    summary: 'An AI-powered STEM tutoring platform for K-8 learners that answers math, science, engineering, and technology questions at the student\'s grade level.',
    details: 'Infinit was developed across multiple versions, building toward stronger personalization, larger knowledge bases, Retrieval-Augmented Generation, and custom model tuning. The goal is to close the tutoring access gap by giving students a patient, always-available STEM helper. Version 1 used basic prompt engineering. Version 2 added RAG with a curated K-8 STEM knowledge base. Version 3 introduced grade-level adaptation and personalized learning paths. Currently exploring fine-tuned models for stronger pedagogical reasoning.',
    tags: ['AI/ML', 'RAG', 'Education', 'K-8 STEM', 'TypeScript', 'Next.js'],
    links: [
      { label: 'GitHub', href: 'https://github.com/yuvaang13/Infinit-AI-an-AI-Powered-STEM-tutor-for-K-8-Students' },
    ],
    image: '/projects/infinit.png',
    featured: true,
    impactOrder: 1,
  },
  {
    title: 'ClearEye',
    type: 'Computer vision health concept',
    status: 'Submitted to the 3M Young Scientist Challenge',
    summary: 'A phone-based concussion screening app concept that analyzes pupil response and micro eye movements in under 30 seconds.',
    details: 'ClearEye is designed around a personalized model that compares an athlete to their own eye movement baseline rather than only to a general average. It aims to make concussion screening more accessible where specialized clinical equipment is not available. The system uses MediaPipe for facial landmarks, custom pupil detection algorithms, and a lightweight neural network for classification — all running on-device for privacy and speed.',
    tags: ['Computer Vision', 'Healthcare', 'Mobile ML', 'Accessibility', 'MediaPipe', 'Python'],
    links: [],
    featured: true,
    impactOrder: 2,
  },
  {
    title: 'next-gen-reCAPTCHA',
    type: 'Security and verification project',
    status: 'In progress',
    summary: 'A human verification concept for the AI era, exploring stronger ways to separate real users from automated systems.',
    details: 'The project investigates how verification can evolve as AI agents become more capable, with attention to usability, trust, and modern web integration. Current exploration includes behavioral biometrics, proof-of-work challenges, and cryptographic attestation — moving beyond image selection toward continuous, invisible verification.',
    tags: ['Web Security', 'AI', 'Verification', 'TypeScript', 'Cryptography'],
    links: [
      { label: 'Repository', href: 'https://github.com/yuvaang13/next-gen-reCAPTCHA' },
    ],
    image: '/projects/recaptcha.png',
    featured: true,
    impactOrder: 3,
  },
  {
    title: 'MonkMode',
    type: 'Open-source iOS productivity app',
    status: 'Published on GitHub',
    summary: 'An iOS-first focus app for deep work sessions, deliberate friction, Screen Time-based blocking, rituals, and accountability tracking.',
    details: 'The project explores how software can protect attention instead of constantly competing for it. It focuses on commitment design, session structure, and practical accountability. Features include: customizable deep work sessions with ritual openers/closers, Screen Time API integration for app blocking, streak tracking, accountability partners, and a philosophy of "friction as a feature" — making distraction harder, not focus easier.',
    tags: ['iOS', 'Productivity', 'Swift', 'Open Source', 'SwiftUI', 'Screen Time API'],
    links: [{ label: 'GitHub', href: 'https://github.com/yuvaang13' }],
    image: '/projects/monkmode.png',
    featured: false,
    impactOrder: 4,
  },
  {
    title: 'FTC Team Tesseract — Robotics Software',
    type: 'FTC Robotics Competition',
    status: 'Active season (2024-2025)',
    summary: 'Lead programmer for FTC Team 21689. Autonomous path planning, computer vision for AprilTag detection, Odometry, and driver control systems.',
    details: 'Built the full software stack for a competitive FTC robot: Odometry-based localization with GoBILDA Pinpoint, autonomous trajectory generation with spline paths, AprilTag-based localization using OpenCV + TensorFlow Lite, dynamic path replanning, and a modular command-based architecture. Also handle outreach, fundraising ($15K+ raised), social media, graphic design, video editing, and hardware fabrication.',
    tags: ['Robotics', 'FTC', 'Java', 'OpenCV', 'TensorFlow Lite', 'Path Planning', 'Odometry'],
    links: [],
    featured: true,
    impactOrder: 5,
  },
  {
    title: 'Digit Recognition Models',
    type: 'Machine learning experiments',
    status: 'Built with scikit-learn and CNNs',
    summary: 'A progression from logistic regression to convolutional neural networks for recognizing tiny digit images.',
    details: 'The first model used logistic regression on 8x8 pixel digit data and reached 97.2% accuracy. A later CNN processed images as 2D grids, learning spatial patterns like edges and curves, and improved accuracy to 98.61%. Explored data augmentation, regularization, learning rate scheduling, and model interpretability through feature visualization.',
    tags: ['Python', 'scikit-learn', 'CNN', 'Matplotlib', 'Pandas', 'TensorFlow/Keras'],
    links: [],
    featured: false,
    impactOrder: 6,
  },
  {
    title: 'Math Calculator',
    type: 'Python passion project',
    status: 'Built',
    summary: 'A Python calculator project with over 100 functions for math practice and experimentation.',
    details: 'This project started as a way to make math tooling more flexible while practicing Python fundamentals, function design, and problem decomposition. Includes symbolic algebra, calculus operations, statistical functions, number theory utilities, and a REPL interface.',
    tags: ['Python', 'Math', 'CLI', 'Learning Tool', 'SymPy'],
    links: [],
    featured: false,
    impactOrder: 7,
  },
  {
    title: 'Personal Website v2',
    type: 'Portfolio system',
    status: 'Live on Vercel',
    summary: 'A portfolio site for projects, STEM work, competitions, and technical interests — rebuilt with Astro for performance and scroll-driven storytelling.',
    details: 'Built with Astro 4, Tailwind CSS, and vanilla TypeScript for scroll animations. Features neural field visualizations, scrollytelling sections, and a dev-terminal aesthetic. Optimized for Core Web Vitals with static generation and minimal client-side JS.',
    tags: ['Astro', 'Tailwind', 'TypeScript', 'Scroll Animations', 'Canvas', 'Vercel'],
    links: [{ label: 'Live site', href: 'https://iamyuvaangulati.vercel.app/' }],
    featured: false,
    impactOrder: 8,
  },
];

export const highlights: Highlight[] = [
  {
    icon: 'trophy',
    label: 'Competitions',
    title: 'Math, science, and engineering competitions',
    body: '3rd place at MATHCOUNTS Southern NH Chapter 2026, top 12 at chapter, 20th at the NH state competition, AMC 8 score of 14/25, AMC 10 competitor, MOEMS competitor, Science Bowl competitor, and NHSEE 2026 first place in Computer Science and Math for Infinit.',
  },
  {
    icon: 'brain',
    label: 'AI & ML',
    title: 'Applied AI experiments and education tools',
    body: 'Built Infinit AI, explored RAG, APIs, fine-tuning, logistic regression, CNNs, pandas, Matplotlib, Kaggle workflows, Ollama, and modern AI coding tools.',
  },
  {
    icon: 'code2',
    label: 'Software',
    title: 'Practical software across web, iOS, and Python',
    body: 'Experience with Python, Java, Vite, Electron, Next.js, Vercel, GitHub, macOS, Windows, Cursor, GitHub Copilot, Codex, Claude Code, Windsurf, and Warp.',
  },
  {
    icon: 'users',
    label: 'Teaching',
    title: 'STEM mentoring and volunteer teaching',
    body: 'Volunteer math and science teaching through NorthSouth Foundation, pre-MATHCOUNTS instruction for 5th graders, and middle school math tutoring at SCA.',
  },
  {
    icon: 'microscope',
    label: 'Research',
    title: 'Science, health, and engineering curiosity',
    body: 'Interested in computer vision for healthcare, personalized AI learning, hardware-software optimization, hydroponics, and scientific problem solving.',
  },
  {
    icon: 'graduation-cap',
    label: 'Learning',
    title: 'Coursework and long-term direction',
    body: 'Completed OpenAI and Anthropic AI courses, took the 2026 MIT PRIMES STEP entrance quiz, and is interested in a CS and electrical engineering path with AI/ML specialization.',
  },
];

export const timeline: TimelineEntry[] = [
  { year: '2026', title: 'Building Infinit AI', body: 'Built an AI-powered STEM tutoring platform for K-8 students, using grade-level explanations and a roadmap toward larger knowledge bases, RAG, and custom model tuning.' },
  { year: '2026', title: 'Building next-gen-reCAPTCHA', body: 'Working on a human verification project for the AI era, focused on better ways to separate real users from automated systems as AI agents become more capable.' },
  { year: '2026', title: 'Open-source iOS productivity work', body: 'Built MonkMode, an iOS-first focus app that uses deep work sessions, Screen Time blocking, commitment rituals, and accountability tracking.' },
  { year: '2026', title: 'NHSEE first place with Infinit', body: 'Placed first in the Computer Science and Math category while presenting Infinit as an applied AI education project.' },
  { year: '2026', title: 'MATHCOUNTS state competitor', body: 'Placed 3rd at the Southern NH Chapter competition, reached the state competition, and placed 20th statewide.' },
  { year: '2026', title: 'FTC Team Tesseract', body: 'Joined FTC Team 21689 as lead programmer, outreach/fundraising/social media specialist, graphic designer/video editor, and builder/hardware contributor.' },
];

export const stats: Stat[] = [
  { value: '3rd', label: 'MATHCOUNTS Southern NH Chapter 2026' },
  { value: '20th', label: 'MATHCOUNTS NH State Competition 2026' },
  { value: '1st', label: 'NHSEE 2026 Computer Science and Math' },
  { value: 'K-8', label: 'Audience for Infinit AI STEM tutoring' },
  { value: 'FTC', label: 'Lead programming and build work on Team 21689' },
  { value: '7th', label: 'Grade level for SAT 1280 and ACT Math 32' },
];

export const roles: Role[] = [
  { title: 'Lead Programmer for FTC Team 21689, Team Tesseract', description: 'Autonomous path planning, computer vision, odometry, command-based architecture' },
  { title: 'Outreach, fundraising, and social media specialist for Team Tesseract', description: 'Raised $15K+ in sponsorships; manage team brand, social presence, and community events' },
  { title: 'Builder and hardware contributor for Team Tesseract', description: 'Mechanical design, fabrication, iteration cycles; GoBILDA and custom parts' },
  { title: 'Graphic designer and video editor for Team Tesseract', description: 'Team visual identity, season videos, engineering notebook layouts, sponsor materials' },
  { title: 'Graphic designer for the IHF Boston Nashua Chapter', description: 'Event flyers, social media assets, chapter branding for nonprofit health organization' },
  { title: 'Middle school math tutor at SCA', description: 'One-on-one and small group tutoring; algebra, geometry, competition prep' },
  { title: 'NorthSouth Foundation volunteer teacher for math and science', description: 'Weekend classes for elementary students; curriculum design and delivery' },
];

export const skills: Skill[] = [
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'Swift', category: 'Languages' },
  { name: 'Next.js', category: 'Frameworks' },
  { name: 'Astro', category: 'Frameworks' },
  { name: 'React', category: 'Frameworks' },
  { name: 'Vite', category: 'Tools' },
  { name: 'Electron', category: 'Frameworks' },
  { name: 'Vercel', category: 'Platforms' },
  { name: 'GitHub', category: 'Platforms' },
  { name: 'Pandas', category: 'Data/ML' },
  { name: 'Matplotlib', category: 'Data/ML' },
  { name: 'scikit-learn', category: 'Data/ML' },
  { name: 'CNNs', category: 'Data/ML' },
  { name: 'RAG', category: 'Data/ML' },
  { name: 'APIs', category: 'Data/ML' },
  { name: 'Fine-tuning', category: 'Data/ML' },
  { name: 'Ollama', category: 'Data/ML' },
  { name: 'Kaggle', category: 'Data/ML' },
  { name: 'OpenCV', category: 'Data/ML' },
  { name: 'TensorFlow Lite', category: 'Data/ML' },
  { name: 'Cursor', category: 'Tools' },
  { name: 'GitHub Copilot', category: 'Tools' },
  { name: 'Codex', category: 'Tools' },
  { name: 'Claude Code', category: 'Tools' },
  { name: 'Windsurf', category: 'Tools' },
  { name: 'Warp', category: 'Tools' },
];

export const educationInterests: EducationInterest[] = [
  { title: 'Computer science and electrical engineering', description: 'Dual-track focus on software systems and hardware integration; interested in embedded AI, edge computing, and robotics control systems.' },
  { title: 'Artificial intelligence and machine learning', description: 'Deep learning architectures, LLM fine-tuning, RAG systems, multimodal models, and AI safety/alignment research.' },
  { title: 'Computer vision in healthcare', description: 'Mobile-first diagnostic tools, pupilometry, movement analysis, and on-device inference for accessible screening.' },
  { title: 'Personalized AI tutoring systems', description: 'Adaptive learning pathways, knowledge tracing, pedagogical reasoning in LLMs, and closing the tutoring access gap.' },
  { title: 'Robotics and hardware-software optimization', description: 'FTC competition robotics, autonomous navigation, sensor fusion, real-time control loops, and sim-to-real transfer.' },
  { title: 'Competitive mathematics', description: 'MATHCOUNTS, AMC, AIME pathway; number theory, combinatorics, geometry; problem-solving as a transferable skill.' },
];

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'yuvaangulati7689@gmail.com',
    href: 'mailto:yuvaangulati7689@gmail.com',
    icon: 'mail',
    description: 'Best for project inquiries, collaborations, or just saying hi',
  },
  {
    label: 'GitHub',
    value: 'github.com/yuvaang13',
    href: 'https://github.com/yuvaang13',
    icon: 'github',
    description: 'All repositories, experiments, and works in progress',
  },
  {
    label: 'Location',
    value: 'Nashua, New Hampshire',
    href: 'https://www.google.com/maps/place/Nashua,+NH',
    icon: 'map-pin',
    description: 'Based in Southern New Hampshire, open to remote work',
  },
];

export const contactNotes: ContactNote[] = [
  {
    title: 'Response Time',
    body: 'Usually within 24 hours. If it\'s urgent, mention it in the subject line.',
  },
  {
    title: 'Open to',
    body: 'Research collaborations, internship opportunities, AI/ML projects, STEM education initiatives.',
  },
  {
    title: 'Currently Exploring',
    body: 'Computer vision for healthcare, personalized AI tutoring, FTC robotics, competitive math.',
  },
];