import { ArrowUpRight } from "lucide-react";
import { AsciiMesh } from "@/components/AsciiMesh";
import { PageShell } from "@/components/PageShell";
import { homeLinks, profile } from "@/lib/profile";

export default function Home() {
  return (
    <PageShell>
      <section className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[0.86fr_1fr] lg:gap-16 lg:pt-20">
        <div className="pointer-events-none absolute inset-x-5 top-16 h-px bg-zinc-800 sm:inset-x-8" />
        <div className="animate-fade-up">
          <div className="mb-8 inline-flex items-center gap-3 border border-zinc-800 px-3 py-2 text-xs uppercase tracking-[0.28em] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Student Developer
          </div>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-8xl">
            {profile.name}.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            {profile.headline}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {homeLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className={`focus-ring group inline-flex h-12 items-center justify-center gap-2 px-5 text-sm font-medium transition duration-300 hover:scale-[1.02] ${
                  index === 0
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:180ms]">
          <AsciiMesh />
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-12 sm:px-8 md:grid-cols-[0.4fr_1fr]">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
            Neural Field
          </p>
          <p className="max-w-3xl text-lg leading-8 text-zinc-300">
            A live visual layer for math, AI, robotics, and learning systems.
            The deeper pages in the top navigation unpack the projects,
            competition history, and technical interests behind it.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
