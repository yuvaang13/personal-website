"use client";

import { useEffect, useRef } from "react";

const labelNodes = [
  "Infinit AI\nK-8 STEM Tutor",
  "next-gen-reCAPTCHA\nAI Verification",
  "FTC 21689\nTeam Tesseract",
  "MATHCOUNTS\nNH 2026",
  "ClearEye\nComputer Vision",
  "MonkMode\niOS Focus App",
  "RAG + APIs\nAI Apps",
  "NHSEE 1st\nCS + Math",
];

const glyphs = ["AI", "ML", "RAG", "∑", "π", "01", "FTC", "K-8", "CS"];

type NodePoint = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  label?: string;
  glyph: string;
  alpha: number;
  anchor: boolean;
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
    let nodes: NodePoint[] = [];
    let animationFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const anchorPositions = [
        [0.24, 0.22],
        [0.66, 0.2],
        [0.43, 0.36],
        [0.78, 0.42],
        [0.2, 0.56],
        [0.57, 0.62],
        [0.34, 0.78],
        [0.75, 0.76],
      ];

      const anchors = anchorPositions.map(([x, y], index) => {
        const baseX = x * width;
        const baseY = y * height;

        return {
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: 0,
          vy: 0,
          size: 13,
          label: labelNodes[index],
          glyph: glyphs[index % glyphs.length],
          alpha: 0.88,
          anchor: true,
        };
      });

      const count = Math.max(54, Math.floor((width * height) / 7800));
      const fillers = Array.from({ length: count }, (_, index) => {
        const baseX = (0.08 + Math.random() * 0.84) * width;
        const baseY = (0.1 + Math.random() * 0.78) * height;

        return {
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          size: 8 + Math.random() * 7,
          glyph: glyphs[index % glyphs.length],
          alpha: 0.16 + Math.random() * 0.26,
          anchor: false,
        };
      });

      nodes = [...anchors, ...fillers];
    };

    const drawLabel = (node: NodePoint, x: number, y: number) => {
      if (!node.label) return;

      const lines = node.label.split("\n");
      context.font = '12px "Styrene A", ui-sans-serif, system-ui, sans-serif';
      const widthText = Math.max(...lines.map((line) => context.measureText(line).width));
      const boxWidth = widthText + 22;
      const boxHeight = lines.length * 16 + 16;

      context.fillStyle = "rgba(0, 0, 0, 0.72)";
      context.strokeStyle = "rgba(244, 244, 245, 0.2)";
      context.lineWidth = 1;
      context.beginPath();
      context.roundRect(x - 10, y - 24, boxWidth, boxHeight, 6);
      context.fill();
      context.stroke();

      lines.forEach((line, index) => {
        context.fillStyle = index === 0 ? "rgba(255, 255, 255, 0.92)" : "rgba(212, 212, 216, 0.68)";
        context.fillText(line, x + 1, y - 3 + index * 16);
      });
    };

    const draw = () => {
      frame += 0.008;
      context.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const driftX = (mouse.x - 0.5) * (mouse.active ? 18 : 5);
      const driftY = (mouse.y - 0.5) * (mouse.active ? 18 : 5);

      nodes.forEach((node, index) => {
        const floatX = Math.sin(frame * (0.8 + index * 0.005) + index) * (node.anchor ? 4 : 10);
        const floatY = Math.cos(frame * (0.9 + index * 0.006) + index * 0.7) * (node.anchor ? 4 : 10);
        const targetX = node.baseX + floatX;
        const targetY = node.baseY + floatY;

        node.vx += (targetX - node.x) * (node.anchor ? 0.012 : 0.004);
        node.vy += (targetY - node.y) * (node.anchor ? 0.012 : 0.004);
        node.vx *= 0.9;
        node.vy *= 0.9;
        node.x += node.vx;
        node.y += node.vy;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const threshold = a.anchor || b.anchor ? 210 : 122;

          if (distance < threshold) {
            const opacity = (1 - distance / threshold) * (a.anchor || b.anchor ? 0.22 : 0.11);
            context.strokeStyle = `rgba(244, 244, 245, ${opacity})`;
            context.lineWidth = a.anchor && b.anchor ? 1.3 : 1;
            context.beginPath();
            context.moveTo(a.x + driftX, a.y + driftY);
            context.lineTo(b.x + driftX, b.y + driftY);
            context.stroke();
          }
        }
      }

      nodes.forEach((node, index) => {
        const x = node.x + driftX;
        const y = node.y + driftY;
        const pulse = Math.sin(frame * 4 + index) * 1.3;

        context.fillStyle = node.anchor
          ? "rgba(255, 255, 255, 0.88)"
          : `rgba(244, 244, 245, ${node.alpha})`;
        context.beginPath();
        context.arc(x, y, (node.anchor ? 3.2 : 1.8) + pulse * 0.18, 0, Math.PI * 2);
        context.fill();

        if (node.anchor) {
          drawLabel(node, x + 10, y + 2);
        } else {
          context.font = `${node.size}px "Styrene A", ui-sans-serif, system-ui, sans-serif`;
          context.fillStyle = `rgba(244, 244, 245, ${node.alpha})`;
          context.fillText(node.glyph, x + 5, y - 5);
        }
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
        <span>Neural Network</span>
        <span className="animate-soft-pulse text-zinc-400">Connected</span>
      </div>
    </div>
  );
}
