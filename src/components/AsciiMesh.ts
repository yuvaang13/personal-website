// AsciiMesh - Neural Network Visualization
// Ported from React to vanilla TypeScript for Astro

interface NodePoint {
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
}

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

export class AsciiMesh {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private nodes: NodePoint[] = [];
  private mouse = { x: 0.5, y: 0.5, active: false };
  private frame = 0;
  private width = 0;
  private height = 0;
  private animationFrame = 0;
  private scrollProgress = 0;
  private resizeObserver: ResizeObserver | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d', { alpha: true });
    this.init();
  }

  private init(): void {
    if (!this.canvas || !this.context) return;

    this.setupResize();
    this.setupMouseEvents();
    this.resize();
    this.draw();
  }

  private setupResize(): void {
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.canvas!);
    window.addEventListener('resize', () => this.resize());
  }

  private setupMouseEvents(): void {
    this.canvas!.addEventListener('mousemove', (event) => {
      const rect = this.canvas!.getBoundingClientRect();
      this.mouse = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
        active: true,
      };
    });

    this.canvas!.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
  }

  private resize(): void {
    if (!this.canvas || !this.context) return;

    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.recreateNodes();
  }

  private recreateNodes(): void {
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
      const baseX = x * this.width;
      const baseY = y * this.height;

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

    const count = Math.max(54, Math.floor((this.width * this.height) / 7800));
    const fillers = Array.from({ length: count }, (_, index) => {
      const baseX = (0.08 + Math.random() * 0.84) * this.width;
      const baseY = (0.1 + Math.random() * 0.78) * this.height;

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

    this.nodes = [...anchors, ...fillers];
  }

  private drawLabel(node: NodePoint, x: number, y: number): void {
    if (!node.label || !this.context) return;

    const lines = node.label.split("\n");
    this.context.font = '12px "Styrene A", ui-sans-serif, system-ui, sans-serif';
    const widthText = Math.max(...lines.map((line) => this.context!.measureText(line).width));
    const boxWidth = widthText + 22;
    const boxHeight = lines.length * 16 + 16;

    this.context.fillStyle = "rgba(0, 0, 0, 0.72)";
    this.context.strokeStyle = "rgba(244, 244, 245, 0.2)";
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.roundRect(x - 10, y - 24, boxWidth, boxHeight, 6);
    this.context.fill();
    this.context.stroke();

    lines.forEach((line, index) => {
      this.context!.fillStyle = index === 0 ? "rgba(255, 255, 255, 0.92)" : "rgba(212, 212, 216, 0.68)";
      this.context!.fillText(line, x + 1, y - 3 + index * 16);
    });
  }

  private drawStructuredGrid(): void {
    if (!this.context) return;

    const gridSize = 80;
    const offsetX = (this.frame * 20) % gridSize;
    const offsetY = (this.frame * 15) % gridSize;
    const alpha = 0.02 * (1 - this.scrollProgress * 0.5);

    this.context.strokeStyle = `rgba(244, 244, 245, ${alpha})`;
    this.context.lineWidth = 0.3;

    for (let x = -offsetX; x < this.width; x += gridSize) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.height);
      this.context.stroke();
    }
    for (let y = -offsetY; y < this.height; y += gridSize) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.width, y);
      this.context.stroke();
    }

    const centerAlpha = 0.04 * (1 - this.scrollProgress * 0.3);
    this.context.strokeStyle = `rgba(244, 244, 245, ${centerAlpha})`;
    this.context.lineWidth = 0.5;
    this.context.beginPath();
    this.context.moveTo(this.width / 2, 0);
    this.context.lineTo(this.width / 2, this.height);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0, this.height / 2);
    this.context.lineTo(this.width, this.height / 2);
    this.context.stroke();
  }

  private draw(): void {
    if (!this.context || !this.canvas) return;

    this.frame += 0.008;
    this.context.clearRect(0, 0, this.width, this.height);

    const mouse = this.mouse;
    const driftX = (mouse.x - 0.5) * (mouse.active ? 18 : 5);
    const driftY = (mouse.y - 0.5) * (mouse.active ? 18 : 5);

    // Update node positions
    this.nodes.forEach((node, index) => {
      const floatX = Math.sin(this.frame * (0.8 + index * 0.005) + index) * (node.anchor ? 4 : 10);
      const floatY = Math.cos(this.frame * (0.9 + index * 0.006) + index * 0.7) * (node.anchor ? 4 : 10);
      const targetX = node.baseX + floatX;
      const targetY = node.baseY + floatY;

      // Add scroll influence
      const scrollInfluenceX = Math.sin(this.frame * 0.3 + index) * 20 * this.scrollProgress;
      const scrollInfluenceY = Math.cos(this.frame * 0.4 + index) * 15 * this.scrollProgress;

      node.vx += (targetX + scrollInfluenceX - node.x) * (node.anchor ? 0.012 : 0.004);
      node.vy += (targetY + scrollInfluenceY - node.y) * (node.anchor ? 0.012 : 0.004);
      node.vx *= 0.9;
      node.vy *= 0.9;
      node.x += node.vx;
      node.y += node.vy;
    });

    // Draw connections
    for (let i = 0; i < this.nodes.length; i += 1) {
      for (let j = i + 1; j < this.nodes.length; j += 1) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const threshold = a.anchor || b.anchor ? 210 : 122;

        if (distance < threshold) {
          const opacity = (1 - distance / threshold) * (a.anchor || b.anchor ? 0.22 : 0.11);
          this.context!.strokeStyle = `rgba(244, 244, 245, ${opacity})`;
          this.context!.lineWidth = a.anchor && b.anchor ? 1.3 : 1;
          this.context!.beginPath();
          this.context!.moveTo(a.x + driftX, a.y + driftY);
          this.context!.lineTo(b.x + driftX, b.y + driftY);
          this.context!.stroke();
        }
      }
    }

    // Draw nodes
    this.nodes.forEach((node, index) => {
      const x = node.x + driftX;
      const y = node.y + driftY;
      const pulse = Math.sin(this.frame * 4 + index) * 1.3;

      this.context!.fillStyle = node.anchor
        ? "rgba(255, 255, 255, 0.88)"
        : `rgba(244, 244, 245, ${node.alpha})`;
      this.context!.beginPath();
      this.context!.arc(x, y, (node.anchor ? 3.2 : 1.8) + pulse * 0.18, 0, Math.PI * 2);
      this.context!.fill();

      if (node.anchor) {
        this.drawLabel(node, x + 10, y + 2);
      } else {
        this.context!.font = `${node.size}px "Styrene A", ui-sans-serif, system-ui, sans-serif`;
        this.context!.fillStyle = `rgba(244, 244, 245, ${node.alpha})`;
        this.context!.fillText(node.glyph, x + 5, y - 5);
      }
    });

    // Draw structured grid overlay
    this.drawStructuredGrid();

    this.animationFrame = requestAnimationFrame(() => this.draw());
  }

  public setScrollProgress(progress: number): void {
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  public destroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    this.canvas?.removeEventListener('mousemove', () => {});
    this.canvas?.removeEventListener('mouseleave', () => {});
    window.removeEventListener('resize', () => this.resize());
  }
}

// Auto-initialize on elements with data-ascii-mesh
export function initAsciiMesh(): void {
  const canvases = document.querySelectorAll<HTMLCanvasElement>('[data-ascii-mesh] canvas');
  const instances: AsciiMesh[] = [];

  canvases.forEach((canvas) => {
    const instance = new AsciiMesh(canvas);
    instances.push(instance);

    const updateScrollProgress = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      instance.setScrollProgress((window.scrollY || document.documentElement.scrollTop) / maxScroll);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    instances.forEach(inst => inst.destroy());
  });
}

// Make available globally for Astro scripts
if (typeof window !== 'undefined') {
  (window as any).AsciiMesh = AsciiMesh;
  (window as any).initAsciiMesh = initAsciiMesh;
}