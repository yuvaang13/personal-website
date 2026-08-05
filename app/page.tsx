"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AsciiMesh } from "@/components/AsciiMesh";
import { PageShell, PageHeader, ScrollContent, SectionDivider } from "@/components/PageShell";
import { homeLinks, profile } from "@/lib/profile";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ScrollSection";

export default function Home() {
  return (
    <PageShell backgroundVariant="structured" showBackground={true}>
      {/* Hero Section */}
      <PageHeader
        eyebrow="home"
        title={`${profile.name}.`}
        body={profile.headline}
      />

      {/* Neural Field Visualization */}
      <motion.section
        className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="relative h-[60vh] min-h-[400px] max-h-[700px] border border-zinc-800 bg-black overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)'
          }} />
          <AsciiMesh />
        </div>
      </motion.section>

      {/* CTA Section */}
      <ScrollContent className="pb-20">
        <Reveal delay={0.1} distance={60} direction="up">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap gap-3">
              {homeLinks.map((link, index) => (
                <StaggerItem key={link.label} delay={index * 0.08}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className={`focus-ring group inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                      index === 0
                        ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                        : "border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </StaggerItem>
              ))}
            </div>
          </div>
        </Reveal>
      </ScrollContent>

      {/* About Preview Section */}
      <SectionDivider />
      <ScrollContent className="pb-20">
        <Reveal delay={0.15} distance={60} direction="up">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-8 md:grid-cols-[0.4fr_1fr]">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
                neural_field/
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
                A live visual layer for math, AI, robotics, and learning systems.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-zinc-300 self-center">
              The deeper pages in the top navigation unpack the projects,
              competition history, and technical interests behind it.
              Scroll to explore each dimension.
            </p>
          </div>
        </Reveal>
      </ScrollContent>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-600">
          <p className="text-[10px] uppercase tracking-[0.3em]">scroll</p>
          <motion.div
            className="h-6 w-1.5 border border-zinc-700 rounded-full overflow-hidden"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="h-full w-full bg-white"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </PageShell>
  );
}