import { ArrowUpRight } from "lucide-react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { projects } from "@/lib/profile";

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="projects/"
        title="AI tools, apps, ML experiments, and STEM systems."
        body="A fuller look at the things I am building: from tutoring platforms and health-focused computer vision concepts to productivity software and machine learning experiments."
      />

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid grid-cols-1 border border-zinc-800 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group min-h-[420px] border-b border-zinc-800 p-6 transition duration-300 hover:bg-white/[0.035] lg:border-r lg:even:border-r-0 lg:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="flex h-full flex-col justify-between gap-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-zinc-600">
                      <span>{project.type}</span>
                      <span className="h-1 w-1 rounded-full bg-zinc-700" />
                      <span>{project.status}</span>
                    </div>
                    <h2 className="mt-6 font-serif text-4xl leading-tight text-white">
                      {project.title}
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-zinc-300">
                      {project.summary}
                    </p>
                    <p className="mt-5 leading-7 text-zinc-500">
                      {project.details}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-zinc-800 px-3 py-1 text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.links ? (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="focus-ring inline-flex items-center gap-2 text-sm text-white transition hover:text-zinc-300"
                          >
                            {link.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
