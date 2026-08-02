"use client";

import { useEffect, useRef } from "react";

const glyphs = [
  "AI",
  "ML",
  "RAG",
  "FTC",
  "∑",
  "π",
  "∂",
  "01",
  "∞",
  "CNN",
  "K-8",
  "SAT",
];

const signals = [
  "Infinit AI",
  "ClearEye",
  "MATHCOUNTS",
  "FTC 21689",
  "NHSEE",
  "RAG",
  "CNN 98.61%",
  "MIT HSSP",
  "MonkMode",
  "Python",
];

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  glyph: string;
  label?: string;
  alpha: number;
  ring: number;
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

      const count = Math.max(48, Math.floor((width * height) / 8500));
      particles = Array.from({ length: count }, (_, index) => {
        const ring = index % 5;
        const angle = (index / count) * Math.PI * 2;
        const radius = Math.min(width, height) * (0.16 + ring * 0.075);
        const originX = width / 2 + Math.cos(angle) * radius;
        const originY = height / 2 + Math.sin(angle) * radius * 0.78;

        return {
          x: originX + (Math.random() - 0.5) * 32,
          y: originY + (Math.random() - 0.5) * 32,
          originX,
          originY,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: 10 + Math.random() * 12,
          glyph: glyphs[index % glyphs.length],
          label: index % 9 === 0 ? signals[index % signals.length] : undefined,
          alpha: 0.18 + Math.random() * 0.38,
          ring,
        };
      });
    };

    const drawCore = (pulse: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * (0.16 + pulse * 0.014);

      const gradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * 2.6,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      gradient.addColorStop(0.45, "rgba(161, 161, 170, 0.06)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(centerX, centerY, radius * 2.6, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "rgba(244, 244, 245, 0.18)";
      context.lineWidth = 1;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();
    };

    const draw = () => {
      frame += 0.007;
      context.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const driftX = (mouse.x - 0.5) * (mouse.active ? 26 : 8);
      const driftY = (mouse.y - 0.5) * (mouse.active ? 26 : 8);
      const pulse = Math.sin(frame * 5);

      drawCore(pulse);

      particles.forEach((particle, index) => {
        const orbit = frame * (0.36 + particle.ring * 0.035) + index * 0.08;
        const targetX = particle.originX + Math.cos(orbit) * (8 + particle.ring * 2);
        const targetY = particle.originY + Math.sin(orbit) * (8 + particle.ring * 2);

        particle.vx += (targetX - particle.x) * 0.0008;
        particle.vy += (targetY - particle.y) * 0.0008;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        particle.x += particle.vx + Math.sin(frame + index) * 0.035;
        particle.y += particle.vy + Math.cos(frame + index * 0.7) * 0.035;
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 132) {
            const opacity = (1 - distance / 132) * 0.16;
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
        const wobble = Math.sin(frame * 3 + index) * 0.24;
        context.font = `${particle.size + wobble}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillStyle = `rgba(244, 244, 245, ${particle.alpha})`;
        context.fillText(
          particle.label ?? particle.glyph,
          particle.x + driftX,
          particle.y + driftY,
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
    <div className="relative h-[390px] overflow-hidden border border-zinc-800 bg-black md:h-[600px]">
      <div className="noise-mask pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/[0.045]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/[0.045]" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-95"
      />
      <div className="pointer-events-none absolute left-5 top-5 border border-zinc-800 bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500 backdrop-blur">
        AI / Math / Robotics
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-[10px] uppercase tracking-[0.28em] text-zinc-600">
        <span>Neural Field</span>
        <span className="animate-soft-pulse text-zinc-400">Live Signal</span>
      </div>
    </div>
  );
}
