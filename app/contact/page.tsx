"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { PageShell, PageHeader, ScrollContent, SectionDivider } from "@/components/PageShell";
import { profile } from "@/lib/profile";
import { Reveal, StaggerContainer, StaggerItem, ScrollSection } from "@/components/ScrollSection";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    description: "Best for project inquiries, collaborations, or just saying hi",
  },
  {
    label: "GitHub",
    value: "github.com/yuvaang13",
    href: profile.github,
    icon: Github,
    description: "All repositories, experiments, and works in progress",
  },
  {
    label: "Location",
    value: profile.location,
    href: "https://www.google.com/maps/place/Nashua,+NH",
    icon: MapPin,
    description: "Based in Southern New Hampshire, open to remote work",
  },
];

export default function ContactPage() {
  return (
    <PageShell backgroundVariant="sparse" showBackground={true}>
      <PageHeader
        eyebrow="contact"
        title="Projects, STEM ideas, robotics, or AI work."
        body="The best way to reach me is email. You can also find my code and current experiments on GitHub."
      />

      <ScrollContent className="pb-16">
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-10">
              channels/
            </p>
          </div>
        </Reveal>

        <StaggerContainer stagger={0.1} delayChildren={0.15} className="mx-auto max-w-7xl px-5 sm:px-8">
          {contactLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.label} delay={index * 0.05}>
                <ScrollSection
                  className="group relative min-h-[260px] border border-zinc-800 bg-black/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-zinc-700 hover:bg-white/[0.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="focus-ring flex h-full flex-col justify-between gap-10"
                  >
                    <div>
                      <Icon className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                      <p className="mt-6 text-xs uppercase tracking-[0.28em] text-zinc-600">
                        {item.label}
                      </p>
                    </div>
                    <div>
                      <p className="break-words text-xl text-zinc-300 group-hover:text-white transition-colors">
                        {item.value}
                      </p>
                      <p className="mt-3 text-sm text-zinc-500">
                        {item.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm text-white transition-transform group-hover:translate-x-1">
                        open
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </a>
                </ScrollSection>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollContent>

      <SectionDivider />

      {/* Additional Contact Info */}
      <ScrollContent className="pb-20">
        <Reveal delay={0.1} distance={40} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600 mb-8">
              notes/
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <ScrollSection className="border border-zinc-800 bg-black/50 backdrop-blur-sm p-6">
                <h3 className="font-medium text-white mb-2">Response Time</h3>
                <p className="text-zinc-400">Usually within 24 hours. If it's urgent, mention it in the subject line.</p>
              </ScrollSection>
              <ScrollSection className="border border-zinc-800 bg-black/50 backdrop-blur-sm p-6">
                <h3 className="font-medium text-white mb-2">Open to</h3>
                <p className="text-zinc-400">Research collaborations, internship opportunities, AI/ML projects, STEM education initiatives.</p>
              </ScrollSection>
              <ScrollSection className="border border-zinc-800 bg-black/50 backdrop-blur-sm p-6">
                <h3 className="font-medium text-white mb-2">Currently Exploring</h3>
                <p className="text-zinc-400">Computer vision for healthcare, personalized AI tutoring, FTC robotics, competitive math.</p>
              </ScrollSection>
            </div>
          </div>
        </Reveal>
      </ScrollContent>
    </PageShell>
  );
}