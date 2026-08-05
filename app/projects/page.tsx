"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PageShell, PageHeader, ScrollContent, SectionDivider } from "@/components/PageShell";
import { projects } from "@/lib/profile";
import { Reveal, StaggerContainer, StaggerItem, ScrollSection } from "@/components/ScrollSection";

const projectImages: Record<string, string> = {
  "Infinit AI": "/projects/infinit.png",
  "MonkMode": "/projects/monkmode.png",
  "next-gen-reCAPTCHA": "/projects/recaptcha.png",
};

export default function ProjectsPage() {
  return (
    <PageShell backgroundVariant="sparse" showBackground={true}>
      <PageHeader
        eyebrow="projects/"
        title="AI tools, apps, ML experiments, and STEM systems."
        body="A fuller look at the things I am building: from tutoring platforms and health-focused computer vision concepts to productivity software and machine learning experiments."
      />

      <ScrollContent className="pb-20">
        <Reveal delay={0.1} distance={60} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-12">
              featured_work
            </p>
          </div>
        </Reveal>

        <StaggerContainer stagger={0.12} delayChildren={0.15} className="mx-auto max-w-7xl px-5 sm:px-8">
          {projects.map((project, index) => {
            const imageSrc = projectImages[project.title];
            const hasImage = !!imageSrc;

            return (
              <StaggerItem key={project.title} delay={index * 0.05}>
                <ScrollSection
                  className={`group relative overflow-hidden border border-zinc-800 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-zinc-700 hover:bg-white/[0.02] ${
                    hasImage ? "md:grid md:grid-cols-[1fr_1fr]" : ""
                  }`}
                  staggerChildren={0.06}
                  delay={0.1}
                >
                  {/* Image/Visual Side */}
                  {hasImage && (
                    <motion.div
                      className="relative h-72 md:h-auto md:min-h-[420px] overflow-hidden border-b border-zinc-800 md:border-b-0 md:border-r"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={imageSrc}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      {/* Project type badge */}
                      <div className="absolute bottom-6 left-6 right-6 md:left-8 md:bottom-8">
                        <span className="inline-block px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-zinc-400 bg-black/70 backdrop-blur border border-zinc-800">
                          {project.type}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Content Side */}
                  <div className={`relative p-6 md:p-8 ${hasImage ? "" : "min-h-[420px]"}`}>
                    <div className="flex h-full flex-col justify-between gap-10">
                      <div>
                        {!hasImage && (
                          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-zinc-600">
                            <span>{project.type}</span>
                            <span className="h-1 w-1 rounded-full bg-zinc-700" />
                            <span>{project.status}</span>
                          </div>
                        )}
                        <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
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
                              className="border border-zinc-800 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
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
                                className="focus-ring inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-zinc-300"
                              >
                                {link.label}
                                {link.href.includes("github") ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </ScrollSection>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollContent>

      {/* Bottom CTA */}
      <ScrollContent className="pb-20">
        <SectionDivider />
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-6">
              more_coming/
            </p>
            <h2 className="font-serif text-4xl text-white mb-4">
              Always building. Always learning.
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 mb-8">
              New experiments in AI, robotics, and education tools are always in progress.
              Check GitHub for the latest commits and works-in-progress.
            </p>
            <a
              href="https://github.com/yuvaang13"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-zinc-800 text-zinc-300 transition-all hover:border-zinc-600 hover:text-white hover:bg-white/[0.02]"
            >
              View on GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </ScrollContent>
    </PageShell>
  );
}