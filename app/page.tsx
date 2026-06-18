import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { AsciiMesh } from "@/components/AsciiMesh";
import { NavBar } from "@/components/NavBar";

const workItems = [
  {
    number: "01",
    title: "Infinit AI",
    description: "An AI-Powered STEM Tutoring Platform.",
  },
  {
    number: "02",
    title: "Competitive Mathematician",
    description: "2026 20th Place in New Hampshire State STEM Competition.",
  },
  {
    number: "03",
    title: "STEM Educator",
    description: "Middle School Math Tutor & Competitive Math Mentor.",
  },
  {
    number: "04",
    title: "Open-Source iOS Productivity App",
    description: "FTC Team 21689 | Team Tesseract. For some context, Team Tesseract, we are a very high-achieving team based out of Nashua, New Hampshire.",
  },
];

const focusAreas = [
  {
    label: "Interests",
    text: "Artificial Intelligence and Machine Learning, Full-stack and Mobile Development, Competition Math, Robotics.",
  },
  {
    label: "Academic Focus",
    text: "Prospective Major in Computer Engineering / Computer Science with a Specialization in Artificial Intelligence & Machine Learning (AI/ML).",
  },
  {
    label: "Core Research Interests",
    text: "Computer Vision in healthcare, Retrieval-Augmented Generation (RAG) for personalized education, and hardware-software optimization.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-zinc-400">
      <NavBar />

      <section
        id="home"
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[1fr_0.86fr] lg:gap-16 lg:pt-20"
      >
        <div className="pointer-events-none absolute inset-x-5 top-16 h-px bg-zinc-800 sm:inset-x-8" />
        <div className="animate-fade-up">
          <div className="mb-8 inline-flex items-center gap-3 border border-zinc-800 px-3 py-2 text-xs uppercase tracking-[0.28em] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Student Developer
          </div>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Yuvaan Gulati.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            I am a driven student and developer passionate about artificial
            intelligence, applied mathematics, and computer engineering. I build
            practical artificial intelligence applications to solve real-world
            problems, compete in state-level STEM competitions, and volunteer as
            a math and science educator for younger students.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="focus-ring group inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-sm font-medium text-black transition duration-300 hover:scale-[1.02] hover:bg-zinc-200"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://github.com/yuvaang13"
              target="_blank"
              rel="noreferrer"
              className="focus-ring group inline-flex h-12 items-center justify-center gap-2 border border-zinc-800 px-5 text-sm font-medium text-zinc-300 transition duration-300 hover:scale-[1.02] hover:border-zinc-600 hover:text-white"
            >
              GitHub Profile
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:180ms]">
          <AsciiMesh />
        </div>
      </section>
    </main>
  );
}