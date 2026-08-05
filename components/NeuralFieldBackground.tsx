"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface NeuralFieldBackgroundProps {
  className?: string;
  variant?: "dense" | "sparse" | "structured";
  colorScheme?: "mono" | "subtle-accent";
}

interface NeuralNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  connections: number[];
  orbitSpeed: number;
  orbitRadius: number;
  orbitAngle: number;
  pulsePhase: number;
}

export function NeuralFieldBackground({
  className = "",
  variant = "structured",
  colorScheme = "mono",
}: NeuralFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      setDimensions({ width: rect.width, height: rect.height });
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = dimensions;
    const w = width * dpr;
    const h = height * dpr;

    // Generate static node positions based on variant
    const nodeCount = variant === "dense" ? 120 : variant === "sparse" ? 40 : 80;
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = Math.min(w, h) * (0.15 + Math.random() * 0.35);
      const baseX = w / 2 + Math.cos(angle) * radius * (0.7 + Math.random() * 0.6);
      const baseY = h / 2 + Math.sin(angle) * radius * (0.7 + Math.random() * 0.6);

      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.08 + Math.random() * 0.22,
        connections: [] as number[],
        orbitSpeed: 0.0003 + Math.random() * 0.0008,
        orbitRadius: 5 + Math.random() * 20,
        orbitAngle: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Build connection graph
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (i !== j) {
          const dx = a.baseX - b.baseX;
          const dy = a.baseY - b.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = variant === "dense" ? 200 : variant === "sparse" ? 160 : 180;
          if (dist < threshold && Math.random() < 0.3) {
            a.connections.push(j);
          }
        }
      });
    });

    let frame = 0;
    let animationFrame = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getScrollProgress = () => scrollYProgress.get();

    const draw = () => {
      const scrollProgress = getScrollProgress();

      if (prefersReducedMotion) {
        context.clearRect(0, 0, w, h);
        drawStaticFrame(context, nodes, w, h, scrollProgress, colorScheme);
        return;
      }

      frame += 0.003;
      context.clearRect(0, 0, w, h);

      // Update node positions based on scroll and time
      nodes.forEach((node) => {
        // Orbital motion
        node.orbitAngle += node.orbitSpeed;
        const orbitalX = Math.cos(node.orbitAngle) * node.orbitRadius;
        const orbitalY = Math.sin(node.orbitAngle) * node.orbitRadius;

        // Scroll influence
        const scrollInfluence = scrollProgress * 100;
        const scrollX = Math.sin(frame * 0.5 + node.pulsePhase) * 15 * (1 - scrollProgress * 0.5);
        const scrollY = Math.cos(frame * 0.7 + node.pulsePhase) * 15 * (1 - scrollProgress * 0.5);

        // Drift toward base with spring
        node.vx += (node.baseX + orbitalX + scrollX + scrollInfluence * 0.3 - node.x) * 0.008;
        node.vy += (node.baseY + orbitalY + scrollY - node.y) * 0.008;
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw connections
      nodes.forEach((a, i) => {
        a.connections.forEach((j) => {
          if (j > i) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const threshold = variant === "dense" ? 220 : variant === "sparse" ? 180 : 200;

            if (distance < threshold) {
              const opacity = (1 - distance / threshold) * 0.15 * (1 - scrollProgress * 0.3);
              const pulse = Math.sin(frame * 3 + i) * 0.3 + 0.7;

              context.strokeStyle = colorScheme === "mono"
                ? `rgba(244, 244, 245, ${opacity * pulse})`
                : `rgba(100, 200, 255, ${opacity * pulse * 0.4})`;
              context.lineWidth = 0.5;
              context.beginPath();
              context.moveTo(a.x, a.y);
              context.lineTo(b.x, b.y);
              context.stroke();
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(frame * 4 + node.pulsePhase) * 0.4 + 0.6;
        const scrollAlpha = 1 - scrollProgress * 0.4;
        const alpha = node.alpha * pulse * scrollAlpha;

        context.fillStyle = colorScheme === "mono"
          ? `rgba(244, 244, 245, ${alpha})`
          : `rgba(200, 230, 255, ${alpha})`;
        context.beginPath();
        context.arc(node.x, node.y, Math.max(0.5, node.size * pulse), 0, Math.PI * 2);
        context.fill();
      });

      // Draw structured grid lines for "structured" variant
      if (variant === "structured") {
        drawStructuredGrid(context, w, h, frame, scrollProgress, colorScheme);
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const drawStaticFrame = (
      ctx: CanvasRenderingContext2D,
      nodes: NeuralNode[],
      w: number,
      h: number,
      progress: number,
      scheme: "mono" | "subtle-accent"
    ) => {
      nodes.forEach((a, i) => {
        a.connections.forEach((j) => {
          if (j > i) {
            const b = nodes[j];
            const dx = a.baseX - b.baseX;
            const dy = a.baseY - b.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const threshold = variant === "dense" ? 220 : variant === "sparse" ? 180 : 200;

            if (distance < threshold) {
              const opacity = (1 - distance / threshold) * 0.1 * (1 - progress * 0.3);
              ctx.strokeStyle = scheme === "mono"
                ? `rgba(244, 244, 245, ${opacity})`
                : `rgba(100, 200, 255, ${opacity * 0.4})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.baseX, a.baseY);
              ctx.lineTo(b.baseX, b.baseY);
              ctx.stroke();
          }
        });
      });

      nodes.forEach((node) => {
        const scrollAlpha = 1 - progress * 0.4;
        ctx.fillStyle = scheme === "mono"
          ? `rgba(244, 244, 245, ${node.alpha * scrollAlpha})`
          : `rgba(200, 230, 255, ${node.alpha * scrollAlpha})`;
        ctx.beginPath();
        ctx.arc(node.baseX, node.baseY, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (variant === "structured") {
        drawStructuredGrid(ctx, w, h, 0, progress, scheme);
      }
    };

    const drawStructuredGrid = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      frame: number,
      progress: number,
      scheme: "mono" | "subtle-accent"
    ) => {
      const gridSize = 80;
      const offsetX = (frame * 20) % gridSize;
      const offsetY = (frame * 15) % gridSize;
      const alpha = 0.02 * (1 - progress * 0.5);

      ctx.strokeStyle = scheme === "mono"
        ? `rgba(244, 244, 245, ${alpha})`
        : `rgba(100, 200, 255, ${alpha * 0.5})`;
      ctx.lineWidth = 0.3;

      // Vertical lines
      for (let x = -offsetX; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = -offsetY; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center crosshairs
      const centerAlpha = 0.04 * (1 - progress * 0.3);
      ctx.strokeStyle = scheme === "mono"
        ? `rgba(244, 244, 245, ${centerAlpha})`
        : `rgba(100, 200, 255, ${centerAlpha * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [dimensions, scrollYProgress, variant, colorScheme]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: "none" }}
      />
      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
      }} />
    </div>
  );
}