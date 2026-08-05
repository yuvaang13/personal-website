"use client";

import { motion } from "framer-motion";
import { Trophy, Brain, Code2, Users, Microscope, GraduationCap } from "lucide-react";
import { PageShell, PageHeader, ScrollContent, SectionDivider } from "@/components/PageShell";
import { educationInterests, highlights, profile, skills } from "@/lib/profile";
import { Reveal, StaggerContainer, StaggerItem, ScrollSection } from "@/components/ScrollSection";

export default function AboutPage() {
  const highlightIcons = {
    Trophy,
    Brain,
    Code2,
    Users,
    Microscope,
    GraduationCap,
  };

  return (
    <PageShell backgroundVariant="dense" showBackground={true}>
      <PageHeader
        eyebrow="about_me"
        title="A math-heavy builder with a practical AI streak."
        body={profile.shortIntro}
      />

      {/* Direction Section */}
      <ScrollContent className="pb-16">
        <Reveal delay={0.1} distance={60} direction="up">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1fr] lg:py-8">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
                direction/
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl">
                I like projects where software meets rigorous thinking.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-zinc-300 self-center">
              <p>
                My work sits between math, science, and technology. I compete in
                math and science events, build AI applications, experiment with
                machine learning models, and mentor younger students in STEM.
              </p>
              <p>
                I am especially interested in computer science, electrical
                engineering, AI/ML, robotics, computer vision in healthcare, and
                personalized tutoring systems. Long term, I want to build tools
                that make high-quality learning and problem solving more
                accessible.
              </p>
            </div>
          </div>
        </Reveal>
      </ScrollContent>

      <SectionDivider />

      {/* Highlights Section */}
      <ScrollContent className="pb-16">
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-10">
              highlights/
            </p>
          </div>
        </Reveal>

        <StaggerContainer stagger={0.1} delayChildren={0.15} className="mx-auto max-w-7xl px-5 sm:px-8">
          {highlights.map((item, index) => {
            const Icon = highlightIcons[item.icon as keyof typeof highlightIcons] || Trophy;
            return (
              <StaggerItem key={item.label} delay={index * 0.05}>
                <ScrollSection
                  className="group relative border border-zinc-800 bg-black/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-zinc-700 hover:bg-white/[0.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.02)]"
                  staggerChildren={0.06}
                >
                  <div className="flex h-full flex-col gap-6">
                    <div>
                      <Icon className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                      <p className="mt-6 text-xs uppercase tracking-[0.28em] text-zinc-600">
                        {item.label}
                      </p>
                      <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="leading-7 text-zinc-500 flex-1">
                      {item.body}
                    </p>
                  </div>
                </ScrollSection>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollContent>

      <SectionDivider />

      {/* Interests & Skills Section */}
      <ScrollContent className="pb-20">
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2">
            {/* Interests */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-6">
                interests[]
              </p>
              <StaggerContainer stagger={0.04} delayChildren={0.1} className="grid gap-3">
                {educationInterests.map((interest) => (
                  <StaggerItem key={interest}>
                    <ScrollSection className="border border-zinc-800 px-4 py-4 text-zinc-300 transition-all duration-300 hover:border-zinc-600 hover:bg-white/[0.02] hover:text-white">
                      {interest}
                    </ScrollSection>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-6">
                tools_and_skills
              </p>
              <StaggerContainer stagger={0.03} delayChildren={0.1} className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <ScrollSection className="border border-zinc-800 px-3 py-2 text-sm text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:bg-white/[0.02] hover:text-zinc-200">
                      {skill}
                    </ScrollSection>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </Reveal>
      </ScrollContent>
    </PageShell>
  );
}