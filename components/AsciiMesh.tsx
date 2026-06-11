"use client";

import { useEffect, useRef } from "react";

const glyphs = ["∑", "π", , "∂", "AI", "01", "ƒ", "RAG", "⊕", "∞", "MATH"];

const highlights = [
  "Infinit AI (MIT Solve)",
  "ClearEye (3M Challenge)",
  "FTC 21689 - Tesseract",
  "MathCounts NH 2026",
  "AMC 10 2025",
  "HSSP @ MIT 2026",
  "CNN Model 98.6%",
  "RAG Systems"
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  glyph: string;
  label?: string;
  alpha: number;
};

export function AsciiMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(34, Math.floor((width * height) / 12600));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: 10 + Math.random() * 12,
        glyph: glyphs[index % glyphs.length],
        label: Math.random() < 0.12 ? highlights[index % highlights.length] : undefined,
        alpha: 0.14 + Math.random() * 0.3,
      }));
    };

    const draw = () => {
      frame += 0.006;
      context.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const driftX = (mouse.x - 0.5) * (mouse.active ? 18 : 6);
      const driftY = (mouse.y - 0.5) * (mouse.active ? 18 : 6);

      particles.forEach((particle, index) => {
        particle.x += particle.vx + Math.sin(frame + index) * 0.025;
        particle.y += particle.vy + Math.cos(frame + index * 0.7) * 0.025;

        if (particle.x < -24) particle.x = width + 24;
        if (particle.x > width + 24) particle.x = -24;
        if (particle.y < -24) particle.y = height + 24;
        if (particle.y > height + 24) particle.y = -24;
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 112) {
            const opacity = (1 - distance / 112) * 0.12;
            context.strokeStyle = `rgba(244, 244, 245, ${opacity})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x + driftX, a.y + driftY);
            context.lineTo(b.x + driftX, b.y + driftY);
            context.stroke();
          }
        }
      }

      particles.forEach((particle, index) => {
        const wobble = Math.sin(frame * 3 + index) * 0.22;
        context.font = `${particle.size + wobble}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillStyle = `rgba(244, 244, 245, ${particle.alpha})`;
        context.fillText(
          particle.label ?? particle.glyph,
          particle.x + driftX,
          particle.y + driftY
        );
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative h-[360px] overflow-hidden border border-zinc-800 bg-black md:h-[560px]">
      <div className="noise-mask pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/[0.045]" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-90"
      />
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-[10px] uppercase tracking-[0.28em] text-zinc-600">
        <span>Neural Field</span>
        <span className="animate-soft-pulse text-zinc-400">Live</span>
      </div>
    </div>
  );
}
