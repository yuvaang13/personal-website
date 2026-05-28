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
    description: 'Launched an Open-Source Productivity App Called "MonkMode".',
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

      <section id="about" className="section-shell">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
              About
            </p>
          </div>
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
              Applied intelligence, rigorous math, and engineering curiosity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Yuvaan builds with a practical lens: turning research ideas,
              classroom concepts, and competition discipline into usable
              products for students, mentors, and communities.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
                Highlighted Work
              </p>
              <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
                Experience Grid
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-zinc-500">
              A compact view of projects, competitions, and teaching work across
              AI, mathematics, and product development.
            </p>
          </div>

          <div className="grid grid-cols-1 border border-zinc-800 md:grid-cols-2">
            {workItems.map((item) => (
              <article
                key={item.number}
                className="group min-h-[260px] border-b border-zinc-800 p-6 transition duration-300 hover:bg-white/[0.035] md:border-r md:even:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="flex h-full flex-col justify-between gap-12">
                  <span className="font-mono text-sm text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="max-w-md text-2xl font-medium tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-md leading-7 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <blockquote className="max-w-5xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            “Building applications is my favorite thing to do. There&apos;s
            something beautiful about transforming complex logic into tools that
            solve real-world problems and help people learn.”
          </blockquote>
        </div>
      </section>

      <section id="projects" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
              Aspirations
            </p>
            <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
              Focus Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 border border-zinc-800 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <div
                key={area.label}
                className="min-h-[280px] border-b border-zinc-800 p-6 transition duration-300 hover:bg-white/[0.03] lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
                  {area.label}
                </p>
                <p className="mt-10 text-xl leading-8 text-zinc-300">
                  {area.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
              Contact
            </p>
            <h2 className="mt-4 font-serif text-4xl text-white">
              Let&apos;s build useful systems.
            </h2>
          </div>
          <a
            href="mailto:yuvaangulati7689@gmail.com"
            className="focus-ring group inline-flex h-12 items-center justify-center gap-2 border border-zinc-700 px-5 text-sm font-medium text-white transition duration-300 hover:scale-[1.02] hover:bg-white hover:text-black"
          >
            Start a Conversation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </section>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-zinc-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-white">Yuvaan Gulati</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/yuvaang13"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="mailto:yuvaangulati7689@gmail.com"
              className="focus-ring inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Nashua, NH
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
