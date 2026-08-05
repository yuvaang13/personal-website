"use client";

import { motion } from "framer-motion";
import { PageShell, PageHeader, ScrollContent, SectionDivider } from "@/components/PageShell";
import { timeline } from "@/lib/profile";
import { Reveal, StaggerContainer, StaggerItem, ScrollSection } from "@/components/ScrollSection";

const stats = [
  { value: "3rd", label: "MATHCOUNTS Southern NH Chapter 2026" },
  { value: "20th", label: "MATHCOUNTS NH State Competition 2026" },
  { value: "1st", label: "NHSEE 2026 Computer Science and Math" },
  { value: "K-8", label: "Audience for Infinit AI STEM tutoring" },
  { value: "FTC", label: "Lead programming and build work on Team 21689" },
  { value: "7th", label: "Grade level for SAT 1280 and ACT Math 32" },
];

const roles = [
  "Lead Programmer for FTC Team 21689, Team Tesseract",
  "Outreach, fundraising, and social media specialist for Team Tesseract",
  "Builder and hardware contributor for Team Tesseract",
  "Graphic designer and video editor for Team Tesseract",
  "Graphic designer for the IHF Boston Nashua Chapter",
  "Middle school math tutor at SCA",
  "NorthSouth Foundation volunteer teacher for math and science",
];

export default function ExperiencePage() {
  return (
    <PageShell backgroundVariant="structured" showBackground={true}>
      <PageHeader
        eyebrow="experience"
        title="Competition, robotics, teaching, and technical growth."
        body="A structured view of the work behind the portfolio: competitions, team roles, mentoring, coursework, and applied STEM projects."
      />

      {/* Stats Section */}
      <ScrollContent className="pb-16">
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-10">
              metrics/
            </p>
          </div>
        </Reveal>

        <StaggerContainer stagger={0.08} delayChildren={0.15} className="mx-auto max-w-7xl px-5 sm:px-8">
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label} delay={index * 0.03}>
              <ScrollSection
                className="group relative min-h-[170px] border border-zinc-800 bg-black/50 backdrop-blur-sm p-5 transition-all duration-500 hover:border-zinc-700 hover:bg-white/[0.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.02)]"
              >
                <p className="font-serif text-4xl text-white group-hover:scale-[1.02] transition-transform duration-300">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  {stat.label}
                </p>
              </ScrollSection>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollContent>

      <SectionDivider />

      {/* Timeline Section */}
      <ScrollContent className="pb-16">
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.38fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
                timeline/
              </p>
              <h2 className="mt-5 font-serif text-4xl text-white">recent_work</h2>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800" />
              <StaggerContainer stagger={0.08} delayChildren={0.15} className="border-l border-zinc-800 pl-8">
                {timeline.map((item, index) => (
                  <StaggerItem key={`${item.year}-${item.title}`} delay={index * 0.03}>
                    <ScrollSection
                      className="relative border-b border-zinc-800 pb-8 last:border-b-0"
                    >
                      <span className="absolute -left-[10px] top-4 h-3 w-3 rounded-full bg-white border-4 border-black" />
                      <p className="font-mono text-sm text-zinc-600">/{item.year}</p>
                      <h3 className="mt-2 text-2xl font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-7 text-zinc-500">
                        {item.body}
                      </p>
                    </ScrollSection>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </Reveal>
      </ScrollContent>

      <SectionDivider />

      {/* Roles Section */}
      <ScrollContent className="pb-20">
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-8">
              roles[]
            </p>
          </div>
        </Reveal>

        <StaggerContainer stagger={0.06} delayChildren={0.15} className="mx-auto max-w-7xl px-5 sm:px-8">
          {roles.map((role, index) => (
            <StaggerItem key={role} delay={index * 0.02}>
              <ScrollSection
                className="border border-zinc-800 bg-black/50 backdrop-blur-sm p-5 text-lg text-zinc-300 transition-all duration-300 hover:border-zinc-600 hover:bg-white/[0.02]"
              >
                {role}
              </ScrollSection>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollContent>
    </PageShell>
  );
}